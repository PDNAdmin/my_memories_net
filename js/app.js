/* ==========================================================
   Memorial site: tabs, reader, service, hymns, tributes,
   gallery, hymn player.
   Content: js/content.js (window.MEMORIAL) and
            js/tributes-data.js (window.MEMORIAL_TRIBUTES)
   ========================================================== */
(function () {
  "use strict";

  const M = window.MEMORIAL;
  const TRIBUTES = window.MEMORIAL_TRIBUTES || [];
  const PHOTO_COUNT = 32;
  const PHOTOS = Array.from({ length: PHOTO_COUNT }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return { src: `assets/gallery/photo-${n}.jpg`, thumb: `assets/gallery/thumbs/photo-${n}.jpg`, alt: `Photo ${i + 1} of ${M.person.shortName}` };
  });
  const TABS = ["home", "service", "hymns", "tributes", "photos"];

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const store = {
    get(k, a = localStorage) { try { return a.getItem(k); } catch (e) { return null; } },
    set(k, v, a = localStorage) { try { a.setItem(k, v); } catch (e) { /* blocked */ } }
  };
  // Phosphor icon font (loaded in index.html)
  const PH = { heart: "heart", arrow: "arrow-right", pin: "map-pin", "cal-plus": "calendar-plus", play: "play", music: "music-notes" };
  const icon = name => `<i class="ph ph-${PH[name] || name}" aria-hidden="true"></i>`;
  // Plain punctuation only: swap long dashes from source text for commas
  const clean = s => typeof s === "string" ? s.replace(/\s*[—–]\s*/g, ", ").replace(/,\s*,/g, ",") : s;

  function el(tag, attrs = {}, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = clean(v);
      else if (k === "html") n.innerHTML = v; // static icon markup only
      else n.setAttribute(k, v === true ? "" : v);
    }
    for (const c of kids.flat()) if (c != null && c !== false) n.append(c.nodeType ? c : document.createTextNode(clean(String(c))));
    return n;
  }
  const initials = name => name.replace(/^(mr|mrs|ms|miss|dr|rev|revd|pastor|chief|hon|ven|pa)\.?\s+/i, "").replace(/^(mrs|mr)\.?\s+/i, "").split(/[\s&/]+/).filter(w => /^[A-Za-z]/.test(w)).slice(0, 2).map(w => w[0].toUpperCase()).join("") || "♥";
  const firstSentence = (text, find) => {
    const parts = text.match(/[^.!?]+[.!?]+["”]?/g) || [text];
    const hit = find ? parts.find(p => p.toLowerCase().includes(find.toLowerCase())) : null;
    return (hit || parts[0]).trim();
  };

  /* ---------- Language (English / Yorùbá / Both) ---------- */
  const LANGS = [["en", "English"], ["yo", "Yorùbá"], ["both", "Both"]];
  let lang = store.get("lang") || "en";
  function renderLangBars() {
    $$("[data-lang-bar]").forEach(bar => {
      bar.replaceChildren(
        el("span", { class: "lang-label", text: "Language" }),
        el("div", { class: "seg", role: "group", "aria-label": "Choose language" },
          LANGS.map(([code, label]) => {
            const b = el("button", { type: "button", "aria-pressed": String(lang === code), text: label });
            b.addEventListener("click", () => setLang(code));
            return b;
          })));
    });
  }
  function setLang(code) {
    lang = code; store.set("lang", code);
    renderLangBars();
    renderHymnList();
    Reader.refresh();
  }

  /* ---------- Text bindings ---------- */
  function bindText() {
    const p = M.person;
    const v = {
      fullName: p.fullName, firstName: p.firstName, shortName: p.shortName, lastName: p.lastName,
      firstMiddle: `${p.firstName} ${p.middleName}`, born: p.born, died: p.died, yearRange: p.yearRange,
      headline: p.headline, ageLabel: p.ageLabel, hymnTitle: M.backgroundHymn.title,
      photoCount: String(PHOTO_COUNT), tributeCount: String(TRIBUTES.length)
    };
    $$("[data-bind]").forEach(n => {
      const k = n.dataset.bind;
      if (k === "portrait") { n.src = p.portrait; n.alt = n.classList.contains("brand-photo") ? "" : `Portrait of ${p.fullName}`; }
      else if (k in v) n.textContent = v[k];
    });
  }

  /* ---------- Event card ---------- */
  function directionsUrl(dest) {
    const d = encodeURIComponent(dest);
    const ua = navigator.userAgent || "";
    const apple = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
    return apple ? `https://maps.apple.com/?daddr=${d}&dirflg=d` : `https://www.google.com/maps/dir/?api=1&destination=${d}&travelmode=driving`;
  }
  function downloadCalendar() {
    const s = M.service;
    const day = s.isoDate.replace(/-/g, "");
    const next = new Date(s.isoDate + "T00:00:00"); next.setDate(next.getDate() + 1);
    const end = next.toISOString().slice(0, 10).replace(/-/g, "");
    const esc = t => t.replace(/[,;]/g, m => "\\" + m);
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Memorial//EN", "BEGIN:VEVENT",
      `UID:${day}-${Date.now()}@memorial`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
      `DTSTART;VALUE=DATE:${day}`, `DTEND;VALUE=DATE:${end}`,
      `SUMMARY:${esc(`${s.title} · ${M.person.fullName}`)}`,
      `LOCATION:${esc(`${s.church}, ${s.place}`)}`,
      `DESCRIPTION:${esc(`In loving memory of ${M.person.fullName}. ${location.href.split("#")[0]}`)}`,
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    const a = el("a", { href: URL.createObjectURL(new Blob([ics], { type: "text/calendar" })), download: "funeral-service.ics" });
    document.body.append(a); a.click(); a.remove();
    App.toast("Calendar file downloaded. Open it to add the service.");
  }
  function renderEvent() {
    const s = M.service;
    const d = new Date(s.isoDate + "T12:00:00");
    const today = new Date(); today.setHours(12, 0, 0, 0);
    const days = Math.round((d - today) / 86400000);
    const count = days > 1 ? [String(days), "days to go"] : days === 1 ? ["1", "day to go"] : days === 0 ? ["Today", ""] : ["", ""];

    const cal = el("button", { class: "tile tile-cal reveal", type: "button" },
      el("span", { class: "tile-ico", html: icon("cal-plus") }),
      el("span", { class: "tile-t", text: "Add to calendar" }),
      el("span", { class: "tile-s", text: "Save the date on your phone" }));
    cal.addEventListener("click", downloadCalendar);

    $("#bento").append(
      el("div", { class: "tile tile-date reveal" },
        el("p", { class: "tile-label", text: s.title }),
        el("p", { class: "tile-big" }, el("span", { text: d.toLocaleDateString("en-GB", { weekday: "long" }) }), el("strong", { text: d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) })),
        s.time ? el("p", { class: "tile-s", text: s.time }) : null,
        count[0] ? el("p", { class: "tile-count" }, el("strong", { text: count[0] }), " ", count[1]) : null),
      el("a", { class: "tile tile-place reveal", href: directionsUrl(s.directionsTo), target: "_blank", rel: "noopener" },
        el("span", { class: "tile-ico", html: icon("pin") }),
        el("span", { class: "tile-t", text: s.church }),
        el("span", { class: "tile-s", text: s.place }),
        el("span", { class: "tile-cta", html: "Get directions " + icon("arrow") })),
      cal,
      el("a", { class: "tile tile-programme reveal", href: "#service" },
        el("img", { src: M.appreciation.image, alt: "", loading: "lazy" }),
        el("span", { class: "tile-t", text: "Follow the service" }),
        el("span", { class: "tile-s", text: "17 parts, in English and Yorùbá" })));
  }

  /* ---------- Home sections ---------- */
  const QUOTES = [["t06", "second father"], ["t05", "life and soul"], ["t18", "genuine Christian faith"], ["t03", "hearty laughter"], ["t01", "father"]];
  let quoteIdx = 0, quoteTimer = null;
  const reduceMotion = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function renderQuote() {
    const box = $("#pullQuote");
    const [id, find] = QUOTES[quoteIdx];
    const t = TRIBUTES.find(x => x.id === id);
    if (!t) return;
    let inner = $(".quote-inner", box);
    if (!inner) {
      inner = el("div", { class: "quote-inner wrap" });
      const prev = el("button", { class: "round-btn", type: "button", "aria-label": "Previous memory", html: icon("caret-left") });
      const next = el("button", { class: "round-btn", type: "button", "aria-label": "Next memory", html: icon("caret-right") });
      prev.addEventListener("click", () => stepQuote(-1));
      next.addEventListener("click", () => stepQuote(1));
      box.append(inner, el("div", { class: "quote-controls wrap" }, prev, el("span", { class: "quote-dots", id: "quoteDots" }), next,
        el("a", { class: "link", href: "#tributes", text: `All ${TRIBUTES.length} tributes` })));
    }
    const read = el("button", { class: "link", type: "button", html: "Read the full tribute " + icon("arrow") });
    read.addEventListener("click", () => openTribute(TRIBUTES, TRIBUTES.indexOf(t)));
    inner.classList.remove("is-in");
    inner.replaceChildren(
      el("p", { class: "quote-text", text: `“${firstSentence(t.body.join(" "), find)}”` }),
      el("p", { class: "quote-by" }, el("strong", { text: t.name }), t.relation ? el("span", { text: t.relation }) : null),
      read);
    requestAnimationFrame(() => inner.classList.add("is-in"));
    $("#quoteDots").replaceChildren(...QUOTES.map((_, i) => el("i", { class: i === quoteIdx ? "on" : "" })));
  }
  function stepQuote(dir) {
    quoteIdx = (quoteIdx + dir + QUOTES.length) % QUOTES.length;
    renderQuote();
    startQuoteTimer();
  }
  function startQuoteTimer() {
    clearInterval(quoteTimer);
    if (!reduceMotion()) quoteTimer = setInterval(() => { quoteIdx = (quoteIdx + 1) % QUOTES.length; renderQuote(); }, 9000);
  }

  function renderHome() {
    $("#lifeLead").textContent = M.biography[0].p[1];
    $("#timeline").append(...M.timeline.map(t => el("li", { class: "reveal" }, el("span", { class: "tl-year", text: t.year }), el("span", { class: "tl-text", text: t.text }))));

    renderQuote();
    startQuoteTimer();

    // Moving band of photos (duplicated once so the loop is seamless)
    const track = $("#marqueeTrack");
    const picks = [7, 22, 19, 26, 23, 15, 30, 2, 12, 20, 5, 28];
    [...picks, ...picks].forEach((n, i) => {
      const b = el("button", { type: "button", "aria-label": `Open photo ${n}`, tabindex: i >= picks.length ? "-1" : null, "aria-hidden": i >= picks.length ? "true" : null },
        el("img", { src: PHOTOS[n - 1].thumb, alt: "", loading: "lazy" }));
      b.addEventListener("click", () => Lightbox.open(n - 1));
      track.append(b);
    });

    const a = M.appreciation;
    $("#appreciation").append(
      el("img", { class: "appreciation-img", src: a.image, alt: "", loading: "lazy" }),
      el("div", { class: "appreciation-body wrap" },
        el("h2", { class: "h2", id: "appTitle", text: "Appreciation" }),
        el("div", { class: "appreciation-cols" }, ...a.paragraphs.map(t => el("p", { text: t }))),
        el("p", { class: "sig", text: a.signature })));
  }

  // Fade sections in as they scroll into view
  function initReveal() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion()) { items.forEach(n => n.classList.add("in")); return; }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach((n, i) => { n.style.setProperty("--d", `${(i % 4) * 70}ms`); io.observe(n); });
  }

  /* ---------- Rendering service text ---------- */
  const WHO = { en: { P: "Priest", C: "People" }, yo: { P: "Alufa", C: "Ijo" } };
  function renderLines(lines, lg) {
    const out = [];
    for (const raw of lines) {
      if (raw.startsWith("~")) out.push(el("p", { class: "r-rubric", text: raw.slice(1) }));
      else if (raw.startsWith("R|")) out.push(el("p", { class: "r-ref", text: raw.slice(2) }));
      else if (raw.startsWith("H|")) out.push(el("h4", { class: "r-h", text: raw.slice(2) }));
      else if (/^#\d+\|/.test(raw)) { const [n, t] = raw.slice(1).split("|"); out.push(el("p", { class: "r-verse" }, el("b", { text: n }), el("span", { text: t }))); }
      else if (/^[PC]\|/.test(raw)) {
        const who = raw[0];
        out.push(el("p", { class: `r-line${who === "C" ? " is-people" : ""}` }, el("span", { class: "r-who", text: WHO[lg][who] }), el("span", { text: raw.slice(2) })));
      } else out.push(el("p", { class: "r-p", text: raw }));
    }
    return out;
  }
  function renderHymnBody(h, lg) {
    if (h.pending) return [el("div", { class: "r-note", html: icon("music") }, h.pending[lg])];
    const t = h.text[lg];
    const out = [];
    t.verses.forEach((v, i) => {
      out.push(el("div", { class: "stanza" }, el("span", { class: "stanza-n", text: String(i + 1) }), el("div", { class: "stanza-lines" }, ...v.map(l => el("p", { text: l })))));
      if (i === 0 && t.refrain) out.push(el("div", { class: "refrain" }, el("small", { text: lg === "yo" ? "Egbe · ko leyin ese kookan" : "Chorus · sing after each verse" }), ...t.refrain.map(l => el("p", { text: l }))));
    });
    return out;
  }
  // Renders content in the chosen language, or side by side for "Both"
  function bilingual(fn) {
    const langs = lang === "both" ? ["en", "yo"] : [lang];
    return el("div", { class: `lang-cols${lang === "both" ? " is-both" : ""}` },
      langs.map(lg => el("div", { class: "lang-col", lang: lg === "yo" ? "yo" : "en" },
        lang === "both" ? el("h3", { text: lg === "yo" ? "Yorùbá" : "English" }) : null,
        ...fn(lg))));
  }
  const hymnById = id => M.hymns.find(h => h.id === id);

  /* ---------- Service ---------- */
  const SERVICE_SEQ = M.order;
  const KIND_ICON = { hymn: "music", reading: "service", prayer: "pray", sermon: "mic", thanks: "heart", notice: "bell" };
  function renderService() {
    const wrap = $("#serviceParts");
    M.servicePlan.forEach(part => {
      const list = el("ol", { class: "rows" });
      part.items.forEach(n => {
        const item = M.order.find(o => o.n === n);
        const hymn = item.hymn ? hymnById(item.hymn) : null;
        const b = el("button", { class: `row${item.kind === "hymn" ? " is-hymn" : ""}`, type: "button" },
          el("span", { class: "row-num", text: String(n) }),
          el("span", {},
            el("span", { class: "row-t", text: item.en }),
            el("span", { class: "row-yo", text: item.yo }),
            hymn ? el("span", { class: "row-detail", text: hymn.en + (item.also ? ` and ${hymnById(item.also).en}` : "") }) : null),
          el("span", { html: icon("caret-right") }));
        b.addEventListener("click", () => openService(SERVICE_SEQ.indexOf(item)));
        list.append(el("li", {}, b));
      });
      wrap.append(el("section", { class: "part" },
        el("div", { class: "part-head" }, el("h2", { text: part.label.en }), el("span", { text: part.label.yo })),
        list));
    });

    $("#officiating").append(...M.officiating.map(o => el("div", {}, el("dt", { text: o.name }), o.role ? el("dd", { text: o.role }) : null)));
    $("#needsIntro").textContent = M.churchNeeds.intro;
    $("#needsList").append(...M.churchNeeds.items.map(t => el("li", { text: t })));
  }
  function openService(i) {
    Reader.open({
      seq: SERVICE_SEQ, index: i, crumb: "Order of Service", bilingual: true,
      label: it => it.kind === "hymn" ? `${it.en}: ${hymnById(it.hymn).en}` : it.en,
      render(it) {
        const hymn = it.hymn ? hymnById(it.hymn) : null;
        const also = it.also ? hymnById(it.also) : null;
        const content = [];
        if (it.text) content.push(bilingual(lg => renderLines(it.text[lg], lg)));
        else if (hymn) {
          content.push(bilingual(lg => renderHymnBody(hymn, lg)));
          if (also) content.push(el("div", { class: "also" }, el("h3", { class: "reader-title", text: also.en }), el("p", { class: "reader-sub", text: also.yo }), bilingual(lg => renderHymnBody(also, lg))));
        } else content.push(bilingual(lg => [el("div", { class: "r-note", html: icon(KIND_ICON[it.kind] || "dove") }, it.note ? it.note[lg] : "")]));
        return {
          kicker: `${it.n} · ${M.servicePlan.find(p => p.items.includes(it.n)).label.en}`,
          title: hymn ? hymn.en : it.en,
          sub: hymn ? `${hymn.yo}${hymn.number ? `, hymn ${hymn.number}` : ""}` : it.yo,
          content
        };
      }
    });
  }

  /* ---------- Hymns ---------- */
  const HYMN_SEQ = [...M.hymns].sort((a, b) => a.order - b.order);
  function renderHymnList() {
    const list = $("#hymnList");
    list.replaceChildren();
    HYMN_SEQ.forEach((h, i) => {
      const first = h.pending ? "" : h.text[lang === "yo" ? "yo" : "en"].verses[0][0];
      const b = el("button", { class: "row", type: "button" },
        el("span", { class: "row-num", text: String(h.order) }),
        el("span", {},
          el("span", { class: "row-t", text: lang === "yo" ? h.yo : h.en }),
          el("span", { class: "row-yo", text: lang === "yo" ? h.en : h.yo }),
          el("span", { class: "row-first", text: first ? `“${first}”` : "Words in your printed programme" })),
        el("span", { html: icon("caret-right") }));
      b.addEventListener("click", () => openHymn(i));
      list.append(b);
    });
  }
  function openHymn(i) {
    Reader.open({
      seq: HYMN_SEQ, index: i, crumb: "Hymns", bilingual: true,
      label: h => h.en,
      render: h => ({
        kicker: `Order of service · item ${h.order}${h.number ? ` · Hymn ${h.number}` : ""}`,
        title: lang === "yo" ? h.yo : h.en,
        sub: lang === "yo" ? h.en : h.yo,
        content: [bilingual(lg => renderHymnBody(h, lg))]
      })
    });
  }

  /* ---------- Life story ---------- */
  function openLife() {
    Reader.open({
      seq: [M.biography], index: 0, crumb: "His Life", bilingual: false, label: () => "Life story",
      render: chapters => ({
        kicker: `${M.person.born} - ${M.person.died}`,
        title: `The Life of ${M.person.fullName}`,
        sub: "Biography",
        content: chapters.map(c => el("section", { class: "chapter" },
          el("h3", { text: c.h }),
          c.img ? el("img", { src: c.img, alt: "", loading: "lazy" }) : null,
          ...c.p.map(t => el("p", { class: "r-p", text: t }))))
      })
    });
  }

  /* ---------- Tributes ---------- */
  const CATS = [["all", "All"], ["family", "Family"], ["friends", "Friends"], ["church", "Church"], ["community", "Community"]];
  let cat = "all", query = "";
  const filtered = () => TRIBUTES.filter(t => (cat === "all" || t.category === cat) && (!query || t.name.toLowerCase().includes(query)));
  function renderFilters() {
    const box = $("#tributeFilters");
    box.replaceChildren(...CATS.map(([k, label]) => {
      const n = k === "all" ? TRIBUTES.length : TRIBUTES.filter(t => t.category === k).length;
      if (!n) return null;
      const b = el("button", { class: "chip", type: "button", role: "tab", "aria-selected": String(cat === k) }, label, el("span", { text: String(n) }));
      b.addEventListener("click", () => { cat = k; shown = PAGE; renderFilters(); renderTributes(); });
      return b;
    }).filter(Boolean));
  }
  // Short cards, a few at a time, so the page stays light to scan
  const PAGE = 6;
  let shown = PAGE;
  function renderTributes() {
    const grid = $("#tributeGrid");
    const list = filtered();
    grid.replaceChildren();
    $("#tributeMore") && $("#tributeMore").remove();
    if (!list.length) { grid.append(el("p", { class: "no-results", text: "No tributes match that name." })); return; }
    list.slice(0, shown).forEach((t, i) => {
      const meta = [t.relation, t.role].filter(Boolean).join(", ");
      const b = el("button", { class: "tcard", type: "button" },
        el("span", { class: "tcard-top" },
          el("span", {}, el("span", { class: "tcard-name", text: t.name }), meta ? el("span", { class: "tcard-meta", text: meta }) : null),
          el("span", { class: "tcard-go", html: icon("arrow") })),
        el("span", { class: "tcard-excerpt", text: firstSentence(t.body.join(" ")) }));
      b.addEventListener("click", () => openTribute(list, i));
      grid.append(b);
    });
    const left = list.length - shown;
    if (left > 0) {
      const more = el("button", { class: "btn btn-ghost tribute-more", id: "tributeMore", type: "button" },
        `Show ${Math.min(PAGE, left)} more`, el("span", { class: "count", text: `${left} left` }));
      more.addEventListener("click", () => { shown += PAGE; renderTributes(); });
      grid.after(more);
    }
  }
  function openTribute(list, i) {
    Reader.open({
      seq: list, index: i, crumb: "Tributes", bilingual: false,
      label: t => t.name,
      render: t => ({
        kicker: t.relation || ({ family: "Family", friends: "Friend", church: "Church", community: "Community" }[t.category]),
        title: t.title || `From ${t.name}`,
        sub: "",
        content: [
          el("div", { class: "t-author" }, el("span", { class: "avatar", text: initials(t.name), "aria-hidden": "true" }),
            el("div", {}, el("b", { text: t.name }), (t.role || t.relation) ? el("span", { text: [t.relation, t.role].filter(Boolean).join(" · ") }) : null)),
          ...t.body.map(p => el("p", { class: "r-p", text: p }))
        ]
      })
    });
  }

  /* ---------- Reader (full-screen, previous / next) ---------- */
  const Reader = (() => {
    let cfg = null;
    const box = () => $("#reader");
    function draw() {
      if (!cfg) return;
      const item = cfg.seq[cfg.index];
      const r = cfg.render(item);
      $("#readerCrumb").textContent = cfg.crumb;
      $("#readerProgress").textContent = cfg.seq.length > 1 ? `${cfg.index + 1} / ${cfg.seq.length}` : "";
      $("#readerProgress").hidden = cfg.seq.length < 2;
      $("#readerKicker").textContent = r.kicker || "";
      $("#readerTitle").textContent = r.title;
      $("#readerSub").textContent = r.sub || "";
      $("#readerSub").hidden = !r.sub;
      $("#readerLang").hidden = !cfg.bilingual;
      $("#readerContent").replaceChildren(...r.content);
      const prev = cfg.seq[cfg.index - 1], next = cfg.seq[cfg.index + 1];
      $("#readerPrev").disabled = !prev; $("#readerNext").disabled = !next;
      $("#readerPrevT").textContent = prev ? cfg.label(prev) : "—";
      $("#readerNextT").textContent = next ? cfg.label(next) : "—";
      $(".reader-nav").hidden = cfg.seq.length < 2;
      $("#readerScroll").scrollTop = 0;
    }
    function open(c) {
      cfg = c;
      if (box().hidden) { Modal.open(box()); history.pushState({ reader: true }, ""); }
      draw();
      setTimeout(() => $("#readerTitle").focus && $(".reader-back").focus({ preventScroll: true }), 80);
    }
    function close(fromHistory) {
      if (box().hidden) return;
      Modal.close(box());
      cfg = null;
      if (!fromHistory && history.state && history.state.reader) history.back();
    }
    function step(d) { if (!cfg) return; const i = cfg.index + d; if (i >= 0 && i < cfg.seq.length) { cfg.index = i; draw(); } }
    function init() {
      $("#readerPrev").addEventListener("click", () => step(-1));
      $("#readerNext").addEventListener("click", () => step(1));
      $(".reader-back").addEventListener("click", () => close(false));
      window.addEventListener("popstate", () => { if (!box().hidden) close(true); });
      document.addEventListener("keydown", e => {
        if (box().hidden) return;
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      });
    }
    return { open, close, init, refresh: draw, isOpen: () => !box().hidden };
  })();

  /* ---------- Gallery + lightbox ---------- */
  const Lightbox = (() => {
    let idx = 0;
    function show(i) {
      idx = (i + PHOTOS.length) % PHOTOS.length;
      $("#lbImg").src = PHOTOS[idx].src;
      $("#lbImg").alt = PHOTOS[idx].alt;
      $("#lbCaption").textContent = `${idx + 1} of ${PHOTOS.length}`;
    }
    function open(i) { show(i); Modal.open($("#lightbox")); }
    function init() {
      $(".lb-prev").addEventListener("click", () => show(idx - 1));
      $(".lb-next").addEventListener("click", () => show(idx + 1));
      document.addEventListener("keydown", e => {
        if ($("#lightbox").hidden) return;
        if (e.key === "ArrowLeft") show(idx - 1);
        if (e.key === "ArrowRight") show(idx + 1);
      });
      let x0 = null;
      const fig = $(".lb-figure");
      fig.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
      fig.addEventListener("touchend", e => {
        if (x0 == null) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 45) show(idx + (dx < 0 ? 1 : -1));
        x0 = null;
      });
      $("#lightbox").addEventListener("click", e => { if (e.target.id === "lightbox") Modal.close(e.currentTarget); });
    }
    return { open, init };
  })();
  function renderGallery() {
    const g = $("#gallery");
    PHOTOS.forEach((p, i) => {
      const b = el("button", { type: "button", "aria-label": `Open photo ${i + 1}` }, el("img", { src: p.thumb, alt: p.alt, loading: "lazy", decoding: "async" }));
      b.addEventListener("click", () => Lightbox.open(i));
      g.append(b);
    });
  }

  /* ---------- Modals ---------- */
  const Modal = (() => {
    const stack = [];
    function open(node) {
      stack.push({ node, focus: document.activeElement });
      node.hidden = false;
      document.body.classList.add("modal-open");
      const f = node.querySelector("input, textarea, [data-close], button");
      setTimeout(() => f && f.focus({ preventScroll: true }), 60);
    }
    function close(node) {
      node.hidden = true;
      const i = stack.findIndex(s => s.node === node);
      const entry = i >= 0 ? stack.splice(i, 1)[0] : null;
      if (!$$(".modal").some(m => !m.hidden)) document.body.classList.remove("modal-open");
      if (entry && entry.focus && entry.focus.focus) entry.focus.focus({ preventScroll: true });
    }
    function init() {
      $$(".modal").forEach(m => $$("[data-close]", m).forEach(c => {
        if (m.id !== "reader") c.addEventListener("click", () => close(m));
      }));
      document.addEventListener("keydown", e => {
        if (e.key !== "Escape") return;
        const top = [...stack].reverse().find(s => !s.node.hidden && s.node.id !== "welcome");
        if (!top) return;
        if (top.node.id === "reader") Reader.close(false); else close(top.node);
      });
    }
    return { open, close, init };
  })();

  /* ---------- Hymn player ---------- */
  const Hymn = (() => {
    const audio = () => $("#hymnAudio");
    let fade = null;
    function fadeTo(vol, ms, done) {
      const a = audio(); clearInterval(fade);
      const steps = 20, start = a.volume, d = (vol - start) / steps; let i = 0;
      fade = setInterval(() => { i++; a.volume = Math.min(1, Math.max(0, start + d * i)); if (i >= steps) { clearInterval(fade); done && done(); } }, ms / steps);
    }
    function render() {
      const a = audio(), p = $("#hymnPill"), playing = !a.paused, started = a.dataset.started === "1";
      p.classList.toggle("is-playing", playing);
      p.classList.toggle("is-muted", started && !playing);
      p.setAttribute("aria-pressed", String(playing));
      p.setAttribute("aria-label", `${playing ? "Mute" : "Play"} hymn: ${M.backgroundHymn.title}`);
      $("#hymnState").textContent = playing ? "Mute hymn" : "Play hymn";
      $(".hymn-title", p).textContent = M.backgroundHymn.title;
    }
    function play() {
      const a = audio();
      if (!a.getAttribute("src")) a.src = M.backgroundHymn.src;
      a.dataset.started = "1"; a.volume = 0;
      const pr = a.play();
      if (pr && pr.catch) pr.catch(() => { App.toast("The hymn couldn't start. Please tap the hymn button again."); render(); });
      fadeTo(0.6, 1200);
      if ("mediaSession" in navigator) navigator.mediaSession.metadata = new MediaMetadata({ title: M.backgroundHymn.title, artist: `In memory of ${M.person.fullName}` });
    }
    function mute() { fadeTo(0, 400, () => { audio().pause(); render(); }); }
    function init() {
      const a = audio();
      ["play", "pause", "playing"].forEach(ev => a.addEventListener(ev, render));
      a.addEventListener("error", () => { if (a.dataset.started === "1") App.toast("Sorry, the hymn recording could not be loaded."); a.dataset.started = "0"; render(); });
      $("#hymnPill").addEventListener("click", () => (audio().paused ? play() : mute()));
      render();
    }
    return { init, play };
  })();
  function initWelcome() {
    const w = $("#welcome");
    if (store.get("welcomed", sessionStorage)) return;
    Modal.open(w);
    const leave = () => {
      store.set("welcomed", "1", sessionStorage);
      w.classList.add("is-leaving");
      setTimeout(() => { w.classList.remove("is-leaving"); Modal.close(w); }, 320);
    };
    $("#welcomePlay").addEventListener("click", () => { Hymn.play(); leave(); });
    $("#welcomeSilent").addEventListener("click", leave);
    setTimeout(() => $("#welcomePlay").focus({ preventScroll: true }), 120);
  }

  /* ---------- Routing ---------- */
  function route() {
    const tab = TABS.includes(location.hash.slice(1)) ? location.hash.slice(1) : "home";
    $$("[data-panel]").forEach(p => { p.hidden = p.dataset.panel !== tab; });
    $$(".tab").forEach(t => t.dataset.go === tab ? t.setAttribute("aria-current", "page") : t.removeAttribute("aria-current"));
    window.scrollTo({ top: 0, behavior: "auto" });
  }


  /* ---------- Light / dark theme ---------- */
  function initTheme() {
    const btn = $('#themeBtn');
    const meta = document.querySelector('meta[name=theme-color]');
    const apply = t => {
      document.documentElement.dataset.theme = t;
      const dark = t === 'dark';
      btn.innerHTML = icon(dark ? 'sun' : 'moon');
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      if (meta) meta.setAttribute('content', dark ? '#120707' : '#FBF6EF');
    };
    apply(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    btn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      store.set('theme', next);
      apply(next);
    });
  }

  /* ---------- Text size + share ---------- */
  function initTextSize() {
    const btn = $("#textSizeBtn");
    let size = Number(store.get("textSize") || 0);
    const apply = () => { document.documentElement.dataset.size = String(size); btn.dataset.active = String(size > 0); };
    apply();
    btn.addEventListener("click", () => { size = (size + 1) % 3; store.set("textSize", String(size)); apply(); App.toast(["Normal text size", "Larger text", "Largest text"][size]); });
  }
  function initShare() {
    $("#shareBtn").addEventListener("click", async () => {
      const url = location.href.split("#")[0];
      const data = { title: document.title, text: `In loving memory of ${M.person.fullName}`, url };
      if (navigator.share) { try { await navigator.share(data); } catch (e) { /* cancelled */ } return; }
      try { await navigator.clipboard.writeText(url); App.toast("Link copied. Paste it to share."); }
      catch (e) { window.open(`https://wa.me/?text=${encodeURIComponent(data.text + " " + url)}`, "_blank", "noopener"); }
    });
  }

  /* ---------- Public helpers for tributes.js ---------- */
  let toastTimer = null;
  window.App = {
    el, initials, icon, Modal,
    toast(msg) { const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 3400); },
    openTributeForm() { if (Reader.isOpen()) Reader.close(false); Modal.open($("#tributeSheet")); },
    closeTributeForm() { Modal.close($("#tributeSheet")); }
  };

  /* ---------- Start ---------- */
  function start() {
    bindText();
    renderLangBars();
    renderEvent();
    renderHome();
    renderService();
    renderHymnList();
    renderFilters();
    renderTributes();
    renderGallery();
    ["Family", "Friend", "Church", "Community", "Colleague", "Other"].forEach((r, i) => {
      $("#relationOptions").append(el("label", {}, el("input", { type: "radio", name: "relation", value: r, checked: i === 0 }), el("span", { text: r })));
    });
    Modal.init(); Reader.init(); Lightbox.init(); Hymn.init();
    initTheme(); initTextSize(); initShare(); initReveal();

    $("#tributeSearch").addEventListener("input", e => { query = e.target.value.trim().toLowerCase(); shown = PAGE; renderTributes(); });
    $$("[data-action='write-tribute']").forEach(b => b.addEventListener("click", () => App.openTributeForm()));
    $$("[data-action='open-life']").forEach(b => b.addEventListener("click", openLife));
    window.addEventListener("hashchange", route);
    route();
    initWelcome();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
