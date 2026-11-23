# Reader Goose — project notes

Static GitHub Pages site (no build step) for Para Hills High School Years 7–10, made for the English faculty and library. Students take the faculty's 10-question genre quiz; each answer scores one of 10 PHHS library fiction labels, and the top score gives a goose-themed reader type, the library sticker to look for, 2nd/3rd matches and a book list.

- `index.html`, `style.css` — page shell and styles
- `app.js` — scoring, rendering and hash routing
- `data.js` — questions, answer key, reader types, book lists (normally the only file edited)

Live site: https://mrross9.github.io/reader-goose/ (Pages deploys from `main`, root folder).

## Rules

- Keep the faculty's question wording and answer key unchanged unless asked.
- Each label appears exactly 5 times in the answer key, so each label scores 0–5.
- Ties go to the label picked in Q10, then Q1, Q8, Q6, Q2, Q3, Q4, Q5, Q7, Q9 (`TIE_BREAK_QUESTION_ORDER` in `data.js`). Students are told when it was a tie.
- No student data is collected or stored. The result URL encodes the answers and year level, e.g. `#/result?a=ABCDEABCDE&y=8` (`y` is optional; old links without it still work).
- Before Q1, students pick Year 7–10. It isn't scored and isn't one of the faculty's 10 questions.
- The result page shows 5 books (`BOOKS_SHOWN` in `app.js`) from the top reader type. A Year N student counts as age N + 5 and only sees books whose `age` rating is at or below that (Year 7 → up to 12+). Books no more than 4 years younger are shown first. The pick is seeded from the answers + year, so the same link always shows the same 5 books. Type pages list every book (filtered by year when the link has `?y=`).
- Keep at least 9 books per reader type available to every year level, so there's always a choice of 5. Each book's `shelf` must be one of its type's `shelves`.
- Use Australian English spelling.
- Content edits go in `data.js`. Keep its format valid (commas, quotes, brackets).
- Images live in the repo root as `.webp`. Reference them by bare name; `app.js` adds `.webp`. The one exception is book covers, which live in `covers/` (see below).
- Book covers: `covers/<slug>.webp`, about 240px wide. Each book in `data.js` names its file with `cover: "<slug>"` (no folder or extension). The slug is the title in lowercase with hyphens and without the series note in brackets, e.g. "Stormbreaker (Alex Rider #1)" → `stormbreaker`. A book with no `cover`, or whose image fails to load, shows a plain coloured tile with its title. Covers are saved in the repo, never loaded from another site, so students' browsers don't contact outside services.

## Open questions for the English faculty (don't act on these yet)

- Should book lists be limited to titles the library holds? (They may send a catalogue export.)
- Is "The Chill Reader" an OK name for the Light Reading type?
- Content check for Year 7: The Hunger Games, Once, Tomorrow When the War Began, My Hero Academia, Heartstopper.
- Content and age-rating check for the books added in November 2026 (book bank expanded from 77 to 172). Age ratings were set by Claude, conservatively. Titles rated 14+/15+ (shown to Years 9–10 only) need the most attention: A Good Girl's Guide to Murder, One of Us Is Lying, Ghost Bird, Deadly Unna?, Scythe, Illuminae, Six of Crows, The Book Thief, Wolf by Wolf, Maus, Demon Slayer, Looking for Alibrandi, The Fault in Our Stars, Adrian Mole, Catching Teller Crow, Long Way Down.
- Should results be collected (e.g. a Google Form link), or is printing enough?
- Should the non-fiction labels become quiz outcomes, or stay as "also try" suggestions?
