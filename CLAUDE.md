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
- No student data is collected or stored. The result URL encodes the answers, e.g. `#/result?a=ABCDEABCDE`.
- Use Australian English spelling.
- Content edits go in `data.js`. Keep its format valid (commas, quotes, brackets).
- Images live in the repo root as `.webp` (no subfolders). Reference them by bare name; `app.js` adds `.webp`.

## Open questions for the English faculty (don't act on these yet)

- Should book lists be limited to titles the library holds? (They may send a catalogue export.)
- Is "The Chill Reader" an OK name for the Light Reading type?
- Content check for Year 7: The Hunger Games, Once, Tomorrow When the War Began, My Hero Academia, Heartstopper.
- Should results be collected (e.g. a Google Form link), or is printing enough?
- Should the non-fiction labels become quiz outcomes, or stay as "also try" suggestions?
