# Reader Goose: What should I read next?

A reader-type quiz for Years 7–10 at Para Hills High School, built from the English faculty's genre quiz and the PHHS library labels.

Students answer 10 questions, meet their Reader Goose (one of 10 types matching the library's fiction labels), see which library sticker to look for, and get a list of books to try. No data is collected.

## Put it online with GitHub Pages (about 5 minutes)

1. Sign in at github.com and click **New repository**. Name it e.g. `reader-goose`, set it to **Public**, and click **Create repository**.
2. On the new repo page, click **uploading an existing file**.
3. Unzip `reader-goose.zip` on your computer, then drag **everything inside the `site` folder** (`index.html`, `app.js`, `data.js`, `style.css`, `README.md` and the `img` folder) into the upload box. `index.html` must sit at the top level, not inside a folder.
4. Click **Commit changes**.
5. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, pick `main` and `/ (root)`, then click **Save**.
6. After a minute or two the site will be live at `https://YOUR-USERNAME.github.io/reader-goose/`.

## Changing questions, types or books

Everything students see is in **`data.js`**. On GitHub, open the file, click the pencil icon, edit it, and commit. The site updates within a couple of minutes.

- **Questions**: `QUESTIONS`. Each answer's `type` is the scoring key.
- **Reader types**: `READER_TYPES`. Each type has a name, description, library shelves and a book list.
- **Books**: `{ title, author, shelf, age, aus, blurb }`. Set `aus: true` to show the AUS badge.

Keep the commas and quote marks in place. If the page goes blank after an edit, a comma or quote is usually missing.

## Pages

| Link | What it is |
|---|---|
| `#/` | Welcome page |
| `#/quiz` | The quiz |
| `#/result?a=ABCDEABCDE` | A result (the letters are the student's answers, so the link can be shared or reopened) |
| `#/types` | All 10 reader types |
| `#/type/magical` | One reader type |
| `#/teachers` | Scoring key, tie rules and library labels |

## Scoring

Each of the 10 labels appears exactly 5 times in the key, so every label can score 0–5. Ties are broken by the answer to Q10 (the library question), then Q1, Q8, Q6, Q2, Q3, Q4, Q5, Q7 and Q9. Students are told when their result was a tie.
