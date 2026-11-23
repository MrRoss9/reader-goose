"""Fetch covers for books in data.js that don't have one yet.

Run by the "Fetch missing book covers" GitHub Action (.github/workflows/fetch-covers.yml).
For each book without a `cover`, it looks for an exact title match on Open Library,
then Google Books, saves the image as covers/<slug>.webp (max 240px wide) and adds
`cover: "<slug>"` to the book in data.js. Books with no confident match are left
alone and keep the coloured title tile on the site.
"""
import io
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA = os.path.join(ROOT, "data.js")
COVERS = os.path.join(ROOT, "covers")
UA = {"User-Agent": "ReaderGooseCoverFetch/1.0 (school library quiz)"}
BOOK_RE = re.compile(r'\{ title: "([^"]+)", author: "([^"]+)",( cover: "[^"]*",)?')
BAD_TITLE = re.compile(r"guide for|study guide|literature kit|box(ed)? set|collection|collector|related readings|book guides|omnibus|trilogy|summary|analysis|sparknotes|cliffsnotes", re.I)


def slug_for(title):
    clean = re.sub(r"\s*\(.*?\)\s*", " ", title).strip()
    return re.sub(r"[^a-z0-9]+", "-", re.sub(r"['’]", "", clean.lower())).strip("-"), clean


def norm(s):
    s = re.sub(r"[^a-z0-9]+", " ", re.sub(r"['’]", "", s.lower())).strip()
    return re.sub(r"^(the|a|an) ", "", s)


def title_ok(candidate, clean):
    if not candidate or BAD_TITLE.search(candidate):
        return False
    main = norm(re.split(r"[:(]", candidate)[0])
    return main in (norm(clean), norm(clean.split(":")[0]))


START = time.time()
TIME_BUDGET = 25 * 60  # stop looking after 25 min and save what we have


def get(url, as_json=False, tries=3):
    last = None
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=20) as r:
                data = r.read()
                return json.loads(data) if as_json else data
        except urllib.error.HTTPError as e:
            last = e
            if e.code != 429 and e.code < 500:
                break  # 404 etc.: retrying won't help
            time.sleep(2 * (i + 1))
        except Exception as e:  # noqa: BLE001 - timeouts, resets: try again
            last = e
            time.sleep(2 * (i + 1))
    print(f"    ! {url[:90]} -> {last}", flush=True)
    return None


def first_author(author):
    return re.split(r" and |, |&", author)[0].strip()


def open_library_candidates(clean, author):
    queries = [
        {"title": clean, "author": first_author(author)},
        {"q": f"{clean} {first_author(author)}"},
    ]
    for q in queries:
        q.update({"limit": "15", "fields": "title,author_name,cover_i,language"})
        res = get("https://openlibrary.org/search.json?" + urllib.parse.urlencode(q), as_json=True)
        docs = [d for d in (res or {}).get("docs", []) if d.get("cover_i") and title_ok(d.get("title"), clean)
                and (not d.get("language") or "eng" in d["language"])]
        if docs:
            return [(f"https://covers.openlibrary.org/b/id/{d['cover_i']}-L.jpg?default=false",
                     f"Open Library: {d['title']} / {', '.join(d.get('author_name', []))}") for d in docs[:6]]
    return []


def google_candidates(clean, author):
    q = f'intitle:"{clean}" inauthor:"{first_author(author)}"'
    url = "https://www.googleapis.com/books/v1/volumes?" + urllib.parse.urlencode(
        {"q": q, "maxResults": "10", "printType": "books", "langRestrict": "en",
         "fields": "items(volumeInfo(title,subtitle,authors,imageLinks))"})
    res = get(url, as_json=True) or {}
    out = []
    for item in res.get("items", []):
        v = item.get("volumeInfo", {})
        link = (v.get("imageLinks") or {}).get("thumbnail")
        if link and title_ok(v.get("title"), clean):
            link = link.replace("http://", "https://").replace("&edge=curl", "")
            out.append((link, f"Google Books: {v.get('title')} / {', '.join(v.get('authors', []))}"))
    return out[:6]


def save_cover(raw, path):
    """Validate and save as webp. Returns False for placeholders or odd shapes."""
    try:
        img = Image.open(io.BytesIO(raw))
        img.load()
    except Exception:  # noqa: BLE001
        return False
    w, h = img.size
    if w < 90 or h < 120 or not (1.2 <= h / w <= 1.8):
        return False  # too small, or not book-shaped (audiobook squares, banners, placeholders)
    if len(raw) < 3000:
        return False  # "image not available" placeholders are tiny
    img = img.convert("RGB")
    if w > 240:
        img = img.resize((240, round(h * 240 / w)), Image.LANCZOS)
    img.save(path, "WEBP", quality=80, method=6)
    return True


def main():
    os.makedirs(COVERS, exist_ok=True)
    with open(DATA, encoding="utf-8", newline="") as f:
        text = f.read()

    found, missing = [], []
    done = set()
    for m in BOOK_RE.finditer(text):
        title, author, has_cover = m.group(1), m.group(2), m.group(3)
        slug, clean = slug_for(title)
        if has_cover or slug in done:
            continue
        done.add(slug)
        if time.time() - START > TIME_BUDGET:
            missing.append(f"{title} (not tried: out of time, run the job again)")
            continue
        print(f"- {title}", flush=True)
        saved = None
        for source in (open_library_candidates, google_candidates):
            for url, label in source(clean, author)[:4]:
                raw = get(url, tries=1)
                if raw and save_cover(raw, os.path.join(COVERS, f"{slug}.webp")):
                    saved = label
                    break
            if saved:
                break
        if saved:
            print(f"    found ({saved})", flush=True)
            found.append((title, slug, saved))
        else:
            print("    no confident match", flush=True)
            missing.append(title)

    slugs = {s for _, s, _ in found}

    def link(m):
        slug, _ = slug_for(m.group(1))
        head = f'{{ title: "{m.group(1)}", author: "{m.group(2)}",'
        if m.group(3) or slug not in slugs:
            return m.group(0)
        return f'{head} cover: "{slug}",'

    with open(DATA, "w", encoding="utf-8", newline="") as f:
        f.write(BOOK_RE.sub(link, text))

    summary = [f"## Book covers: {len(found)} found, {len(missing)} still missing", ""]
    if found:
        summary += ["| Book | Matched | File |", "|---|---|---|"]
        summary += [f"| {t} | {lab.replace('|', '/')} | covers/{s}.webp |" for t, s, lab in found]
    if missing:
        summary += ["", "**No confident match (these keep the title tile):**", ""] + [f"- {t}" for t in missing]
    report = "\n".join(summary)
    print(report)
    if os.environ.get("GITHUB_STEP_SUMMARY"):
        with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as f:
            f.write(report + "\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
