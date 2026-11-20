/* Reader Goose — app logic. Content lives in data.js. */
(function () {
  const app = document.getElementById("app");
  const TYPE_IDS = Object.keys(READER_TYPES);
  const LETTERS = ["A", "B", "C", "D", "E"];
  let answers = [];         // index of chosen option per question
  let current = 0;

  const goose = (n) => `img/geese/${n}.webp`;
  const scene = (n) => `img/scenes/${n}.webp`;
  const label = (n) => `img/labels/${n}.webp`;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------------- scoring ---------------- */
  function score(ans) {
    const s = Object.fromEntries(TYPE_IDS.map((t) => [t, 0]));
    ans.forEach((a, qi) => { if (a != null) s[QUESTIONS[qi].options[a].type]++; });
    // tie-break rank: position of the earliest tie-break question where this type was picked
    const tb = {};
    TYPE_IDS.forEach((t) => {
      const pos = TIE_BREAK_QUESTION_ORDER.findIndex((qi) => ans[qi] != null && QUESTIONS[qi].options[ans[qi]].type === t);
      tb[t] = pos === -1 ? 99 : pos;
    });
    const ranked = TYPE_IDS.slice().sort((a, b) => s[b] - s[a] || tb[a] - tb[b] || TYPE_IDS.indexOf(a) - TYPE_IDS.indexOf(b));
    return { scores: s, ranked };
  }
  const encode = (ans) => ans.map((a) => LETTERS[a] || "-").join("");
  const decode = (str) => (str || "").split("").slice(0, QUESTIONS.length).map((c) => { const i = LETTERS.indexOf(c.toUpperCase()); return i < 0 ? null : i; });

  /* ---------------- router ---------------- */
  function route() {
    const h = location.hash.replace(/^#\/?/, "");
    const [path, qs] = h.split("?");
    const params = new URLSearchParams(qs || "");
    const parts = path.split("/").filter(Boolean);
    document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === (parts[0] || "")));
    if (parts[0] === "quiz") { if (answers.filter((a) => a != null).length === QUESTIONS.length) { answers = []; current = 0; } renderQuiz(); }
    else if (parts[0] === "result") renderResult(decode(params.get("a")));
    else if (parts[0] === "types") renderTypes();
    else if (parts[0] === "type" && READER_TYPES[parts[1]]) renderType(parts[1]);
    else if (parts[0] === "teachers") renderTeachers();
    else renderHome();
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", route);

  /* ---------------- home ---------------- */
  function renderHome() {
    document.title = "Reader Goose — What should I read next?";
    app.innerHTML = `
      <section class="hero">
        <div class="hero-text">
          <p class="eyebrow">PHHS Library · Years 7–10</p>
          <h1>What kind of <span class="hl">reader</span> are you?</h1>
          <p class="lead">Answer 10 quick questions. There are no right or wrong answers. Meet your Reader Goose, find your shelf in the library, and get a stack of books to try next.</p>
          <a class="btn big" href="#/quiz" id="startBtn">Start the quiz →</a>
          <p class="small muted">About 3 minutes · nothing is saved</p>
        </div>
        <div class="hero-art">
          <img class="float" src="${goose("golden")}" alt="A golden goose holding a stack of books">
        </div>
      </section>

      <section class="flock">
        <h2>Ten reader types. Which goose are you?</h2>
        <div class="flock-row">
          ${TYPE_IDS.map((id) => { const t = READER_TYPES[id]; return `
            <a class="flock-goose" href="#/type/${id}" style="--c:${t.colour}">
              <img src="${goose(t.goose)}" alt="">
              <span>${esc(t.name.replace(/^The /, ""))}</span>
            </a>`; }).join("")}
        </div>
      </section>

      <section class="steps">
        <div class="step"><img src="${goose("reading-lamp")}" alt=""><h3>1. Answer</h3><p>Pick the answer that sounds most like you for each of 10 questions.</p></div>
        <div class="step"><img src="${goose("super")}" alt=""><h3>2. Meet your goose</h3><p>Find out your reader type, plus a second type that's worth a look.</p></div>
        <div class="step"><img src="${goose("winter")}" alt=""><h3>3. Find your shelf</h3><p>Look for your label sticker in the library and grab a book from your list.</p></div>
      </section>`;
    document.getElementById("startBtn").addEventListener("click", () => { answers = []; current = 0; });
  }

  /* ---------------- quiz ---------------- */
  function renderQuiz() {
    document.title = `Question ${current + 1} — Reader Goose`;
    const q = QUESTIONS[current];
    const n = QUESTIONS.length;
    const pct = (current / (n - 1)) * 100;
    app.innerHTML = `
      <section class="quiz">
        <div class="track" aria-label="Question ${current + 1} of ${n}">
          <div class="rail"></div>
          ${QUESTIONS.map((_, i) => `<span class="stop ${i < current ? "done" : ""} ${i === current ? "now" : ""}" style="left:${(i / (n - 1)) * 100}%"></span>`).join("")}
          <img class="train" src="${goose("train")}" alt="" style="left:${pct}%">
        </div>
        <p class="qcount">Question ${current + 1} of ${n}</p>
        <div class="qcard">
          <img class="qgoose" src="${goose(q.goose)}" alt="">
          <div class="qbody">
            <h2 class="qtext">${esc(q.q)}</h2>
            <div class="options" role="radiogroup" aria-label="${esc(q.q)}">
              ${q.options.map((o, i) => `
                <button class="opt ${answers[current] === i ? "picked" : ""}" role="radio" aria-checked="${answers[current] === i}" data-i="${i}">
                  <span class="letter">${LETTERS[i]}</span><span>${esc(o.text)}</span>
                </button>`).join("")}
            </div>
          </div>
        </div>
        <div class="quiz-nav">
          <button class="btn ghost" id="backBtn" ${current === 0 ? "disabled" : ""}>← Back</button>
          <span class="muted small">Tip: press A–E on a keyboard</span>
        </div>
      </section>`;
    app.querySelectorAll(".opt").forEach((b) => b.addEventListener("click", () => choose(+b.dataset.i)));
    document.getElementById("backBtn").addEventListener("click", () => { if (current > 0) { current--; renderQuiz(); } });
  }
  let locked = false;
  function choose(i) {
    if (locked) return;
    locked = true;
    answers[current] = i;
    app.querySelectorAll(".opt").forEach((b) => { const on = +b.dataset.i === i; b.classList.toggle("picked", on); b.setAttribute("aria-checked", on); });
    setTimeout(() => {
      locked = false;
      if (current < QUESTIONS.length - 1) { current++; renderQuiz(); window.scrollTo(0, 0); }
      else location.hash = `#/result?a=${encode(answers)}`;
    }, 320);
  }
  document.addEventListener("keydown", (e) => {
    if (!location.hash.startsWith("#/quiz") || e.ctrlKey || e.metaKey || e.altKey) return;
    const i = LETTERS.indexOf(e.key.toUpperCase());
    const d = "12345".indexOf(e.key);
    if (i >= 0) choose(i); else if (d >= 0) choose(d);
    else if (e.key === "Backspace" && current > 0) { current--; renderQuiz(); }
  });

  /* ---------------- shared pieces ---------------- */
  function bookCards(t) {
    return `<div class="books">${t.books.map((b) => `
      <article class="book" style="--c:${t.colour}">
        <div class="spine"><span>${esc(b.shelf)}</span></div>
        <div class="book-info">
          <h4>${esc(b.title)}</h4>
          <p class="author">${esc(b.author)}${b.aus ? ` <span class="aus" title="Australian author">AUS</span>` : ""}</p>
          <p>${esc(b.blurb)}</p>
          <p class="age">${esc(b.age)}</p>
        </div>
      </article>`).join("")}</div>`;
  }
  function shelfBlock(t) {
    return `
      <div class="shelf">
        <img class="label-img" src="${label(t.labelImg)}" alt="${esc(t.label)} library label">
        <div>
          <h3>Look for this sticker in the library</h3>
          <p>Your books live on the <b>${esc(t.label)}</b> shelves. Ask for, or look out for:</p>
          <div class="chips">${t.shelves.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}</div>
          ${t.nonfiction.length ? `
            <p class="nf-title">Into true stories and facts? Try these non-fiction labels too:</p>
            <div class="nf">${t.nonfiction.map((n) => `<figure><img src="${label(n)}" alt=""><figcaption>${esc(NONFICTION_LABELS[n])}</figcaption></figure>`).join("")}</div>` : ""}
        </div>
      </div>`;
  }
  function banner(t, big) {
    const bg = t.scene ? `<img class="scene" src="${scene(t.scene)}" alt="">` : `<div class="scene pattern"></div>`;
    return `
      <div class="banner ${t.scene ? "has-scene" : ""} ${big ? "big" : ""}" style="--c:${t.colour}">
        ${bg}
        ${t.scene ? "" : `<div class="banner-geese">${t.gallery.slice(0, 3).map((g) => `<img src="${goose(g)}" alt="">`).join("")}</div>`}
      </div>`;
  }
  function typeHeader(t, kicker) {
    return `
      <div class="type-head" style="--c:${t.colour}">
        <img class="main-goose" src="${goose(t.goose)}" alt="">
        <div>
          ${kicker ? `<p class="kicker">${kicker}</p>` : ""}
          <h1>${esc(t.name)}</h1>
          <p class="label-name">Library label: ${esc(t.label)}</p>
          <p class="tagline">${esc(t.tagline)}</p>
        </div>
      </div>`;
  }

  /* ---------------- result ---------------- */
  function renderResult(ans) {
    if (ans.filter((a) => a != null).length < QUESTIONS.length) { answers = []; current = 0; location.hash = "#/quiz"; return; }
    answers = ans; current = QUESTIONS.length - 1;
    const { scores, ranked } = score(ans);
    const top = READER_TYPES[ranked[0]];
    const second = ranked[1], third = ranked[2];
    const tied = scores[ranked[0]] === scores[second];
    document.title = `${top.name} — Reader Goose`;
    const max = QUESTIONS.length / TYPE_IDS.length; // 5 with the current key
    app.innerHTML = `
      <section class="result" style="--c:${top.colour}">
        ${banner(top, true)}
        <div class="sheet">
          ${typeHeader(top, "Your reader type is…")}
          ${tied ? `<p class="tie">It's close! You scored the same for <b>${esc(top.label)}</b> and <b>${esc(READER_TYPES[second].label)}</b>. Both are a great fit, so check out the second one below too.</p>` : ""}
          <div class="two-col">
            <div>
              <p class="about">${esc(top.about)}</p>
              <ul class="traits">${top.traits.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
            </div>
            <div class="mix">
              <h3>Your reading mix</h3>
              ${ranked.filter((id) => scores[id] > 0).map((id) => { const t = READER_TYPES[id]; return `
                <div class="bar-row"><span class="bar-label">${esc(t.label)}</span>
                  <span class="bar"><i style="width:${(scores[id] / max) * 100}%;background:${t.colour}"></i></span>
                  <span class="bar-n">${scores[id]}</span></div>`; }).join("")}
            </div>
          </div>
          ${shelfBlock(top)}
          <h2 class="section-title">Books to try next</h2>
          ${bookCards(top)}

          <h2 class="section-title">Also worth a look</h2>
          <div class="also">
            ${[second, third].filter((id) => scores[id] > 0).map((id) => { const t = READER_TYPES[id]; return `
              <a class="also-card" href="#/type/${id}" style="--c:${t.colour}">
                <img src="${goose(t.goose)}" alt="">
                <div><p class="kicker">${id === second ? "Your second match" : "Your third match"}</p>
                <h3>${esc(t.name)}</h3><p class="label-name">${esc(t.label)}</p>
                <p class="small">${esc(t.tagline)}</p><span class="link">See books →</span></div>
              </a>`; }).join("")}
          </div>

          <div class="actions">
            <button class="btn" id="printBtn">Print my result</button>
            <a class="btn ghost" href="#/quiz" id="retakeBtn">Take it again</a>
            <a class="btn ghost" href="#/types">Meet all 10 geese</a>
          </div>
        </div>
      </section>`;
    document.getElementById("printBtn").addEventListener("click", () => window.print());
    document.getElementById("retakeBtn").addEventListener("click", () => { answers = []; current = 0; });
  }

  /* ---------------- all types ---------------- */
  function renderTypes() {
    document.title = "Reader types — Reader Goose";
    app.innerHTML = `
      <section class="types-page">
        <h1>Meet the flock</h1>
        <p class="lead">Every reader type matches a label in the PHHS library. Tap a goose to see its books.</p>
        <div class="type-grid">
          ${TYPE_IDS.map((id) => { const t = READER_TYPES[id]; return `
            <a class="type-card" href="#/type/${id}" style="--c:${t.colour}">
              <div class="tc-art"><img src="${goose(t.goose)}" alt=""></div>
              <h3>${esc(t.name)}</h3>
              <p class="label-name">${esc(t.label)}</p>
              <p class="small">${esc(t.tagline)}</p>
            </a>`; }).join("")}
        </div>
        <p class="center"><a class="btn big" href="#/quiz">Find out which one you are →</a></p>
      </section>`;
  }

  function renderType(id) {
    const t = READER_TYPES[id];
    document.title = `${t.name} — Reader Goose`;
    app.innerHTML = `
      <section class="result" style="--c:${t.colour}">
        ${banner(t, false)}
        <div class="sheet">
          ${typeHeader(t, "Reader type")}
          <p class="about">${esc(t.about)}</p>
          <ul class="traits">${t.traits.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
          ${shelfBlock(t)}
          <h2 class="section-title">Books to try</h2>
          ${bookCards(t)}
          <div class="gallery">${t.gallery.map((g) => `<img src="${goose(g)}" alt="">`).join("")}</div>
          <div class="actions">
            <a class="btn" href="#/quiz">Take the quiz</a>
            <a class="btn ghost" href="#/types">← All reader types</a>
          </div>
        </div>
      </section>`;
  }

  /* ---------------- teachers ---------------- */
  function renderTeachers() {
    document.title = "For teachers — Reader Goose";
    const nf = Object.keys(NONFICTION_LABELS);
    app.innerHTML = `
      <section class="teachers">
        <h1>For teachers &amp; library staff</h1>
        <div class="tcols">
          <div>
            <h3>How it works</h3>
            <p>Students answer the English faculty's 10 questions. Each answer counts one point toward one of the ten PHHS library <b>fiction</b> labels (each label can score 0–5). The highest score is the student's reader type, and the next two are shown as "also worth a look".</p>
            <p><b>Ties:</b> if two labels score the same, the one picked in the library question (Q10) wins, then Q1, Q8, Q6 and so on. The result page tells students when it was a tie.</p>
            <h3>Privacy</h3>
            <p>Nothing is stored or sent anywhere. Results only exist on the student's screen. Students can <b>print</b> their result, or copy the page link, which contains their answers (e.g. <code>#/result?a=ABCDEABCDE</code>), so a teacher can open the same result later.</p>
            <h3>Editing</h3>
            <p>Questions, reader types and book lists are all in <code>data.js</code>. Edit that file on GitHub and the site updates in a minute or two.</p>
          </div>
          <div>
            <h3>Scoring key</h3>
            <table class="key">
              <thead><tr><th>Q</th>${LETTERS.map((l) => `<th>${l}</th>`).join("")}</tr></thead>
              <tbody>${QUESTIONS.map((q, i) => `<tr><td>${i + 1}</td>${q.options.map((o) => `<td><span class="dot" style="background:${READER_TYPES[o.type].colour}"></span>${esc(READER_TYPES[o.type].label)}</td>`).join("")}</tr>`).join("")}</tbody>
            </table>
          </div>
        </div>
        <h3>Library labels</h3>
        <div class="label-wall">
          ${TYPE_IDS.map((id) => `<figure><img src="${label(READER_TYPES[id].labelImg)}" alt=""><figcaption>${esc(READER_TYPES[id].label)}<br><span class="muted">→ ${esc(READER_TYPES[id].name)}</span></figcaption></figure>`).join("")}
          ${nf.map((n) => `<figure class="nfl"><img src="${label(n)}" alt=""><figcaption>${esc(NONFICTION_LABELS[n])}<br><span class="muted">non-fiction</span></figcaption></figure>`).join("")}
        </div>
      </section>`;
  }

  route();
})();
