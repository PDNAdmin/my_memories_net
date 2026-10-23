/* ==========================================================
   Memorial site: tabs, hymn player, rendering, photo viewer
   All content comes from js/content.js (window.MEMORIAL).
   ========================================================== */
(function () {
  "use strict";

  const M = window.MEMORIAL;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const TABS = ["home", "programme", "hymns", "tributes", "photos"];

  const store = {
    get(k, area = localStorage) { try { return area.getItem(k); } catch (e) { return null; } },
    set(k, v, area = localStorage) { try { area.setItem(k, v); } catch (e) { /* storage blocked */ } }
  };

  // Icons and illustrations come from the SVG sprite in index.html
  const icon = (name, cls = "icon") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const art = (name, cls) => `<svg class="${cls}" aria-hidden="true"><use href="#art-${name}"/></svg>`;

  // Small DOM builder; text is always set with textContent (safe).
  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else if (k === "html") node.innerHTML = v; // only used for our own static icons
      else node.setAttribute(k, v === true ? "" : v);
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      node.append(c.nodeType ? c : document.createTextNode(c));
    }
    return node;
  }
  const svg = markup => { const t = document.createElement("template"); t.innerHTML = markup.trim(); return t.content.firstChild; };

  /* ---------- Simple text bindings ---------- */
  function bindText() {
    const p = M.person;
    const values = {
      fullName: p.fullName,
      firstName: p.firstName,
      lastName: p.lastName,
      born: p.born,
      died: p.died,
      yearRange: p.yearRange,
      headline: p.headline,
      verseText: `“${p.verse.text}”`,
      verseRef: p.verse.ref,
      yearsNumber: (p.yearsLabel.match(/\d+/) || [""])[0],
      hymnTitle: M.backgroundHymn.title
    };
    $$("[data-bind]").forEach(node => {
      const key = node.dataset.bind;
      if (key === "portrait") {
        node.src = p.portrait;
        node.alt = node.classList.contains("brand-photo") ? "" : `Portrait of ${p.fullName}`;
      } else if (key in values) {
        node.textContent = values[key];
      }
    });
    document.title = `In Loving Memory · ${p.fullName}`;
  }

  /* ---------- Home ---------- */
  function renderService() {
    const s = M.service;
    const shareText = `In loving memory of ${M.person.fullName} (${M.person.yearRange}). Order of service, hymns and tributes: ${location.href.split("#")[0]}`;
    const row = (ic, title, sub) => el("div", { class: "service-row" },
      el("span", { class: "ico", html: icon(ic) }),
      el("div", {}, el("strong", { text: title }), sub ? el("span", { text: sub }) : null));

    const actions = el("div", { class: "service-actions" },
      s.mapUrl ? el("a", { class: "btn btn-primary", href: s.mapUrl, target: "_blank", rel: "noopener", html: icon("pin") + "<span>Get directions</span>" }) : null,
      s.livestreamUrl ? el("a", { class: "btn btn-soft", href: s.livestreamUrl, target: "_blank", rel: "noopener", html: icon("live") + "<span>Watch live</span>" }) : null,
      el("a", { class: "btn btn-ghost", href: `https://wa.me/?text=${encodeURIComponent(shareText)}`, target: "_blank", rel: "noopener", html: icon("whatsapp") + "<span>Share on WhatsApp</span>" })
    );

    $("#serviceCard").append(
      el("div", { class: "service-card-head", html: icon("cross") + "<span>Funeral Service</span>" + art("bloom", "head-art") }),
      el("div", { class: "service-card-body" },
        row("calendar", s.date, s.time),
        row("church", s.venue, s.address),
        actions)
    );
  }

  function renderStory() {
    $("#timeline").append(...M.timeline.map(t =>
      el("li", {}, el("strong", { text: t.year }), el("span", { text: t.text }))));

    const bio = $("#bio");
    bio.append(...M.biography.map(t => el("p", { text: t })));
    if (M.biographyClosing) bio.append(el("p", { class: "bio-closing", text: M.biographyClosing }));

    const toggle = $("#bioToggle");
    if (M.biography.length > 2) {
      bio.classList.add("is-collapsed");
      toggle.addEventListener("click", () => {
        const open = bio.classList.toggle("is-collapsed") === false;
        toggle.setAttribute("aria-expanded", String(open));
        toggle.textContent = open ? "Show less" : "Read her full story";
        if (!open) $("#story").scrollIntoView({ block: "start" });
      });
    } else {
      toggle.hidden = true;
    }
  }

  function renderAppreciation() {
    const a = M.appreciation;
    const box = $("#appreciation");
    if (!a) { box.hidden = true; return; }
    box.append(
      a.image ? el("img", { class: "appreciation-img", src: a.image, alt: "" }) : null,
      svg(art("sprig", "appreciation-art l")),
      svg(art("sprig", "appreciation-art r")),
      el("div", { class: "appreciation-body" },
        el("h2", { text: "Appreciation" }),
        svg(art("divider", "divider")),
        ...a.paragraphs.map(t => el("p", { text: t })),
        el("p", { class: "closing", text: a.closing }),
        el("p", { class: "signature", text: a.signature }))
    );
  }

  /* ---------- Programme ---------- */
  const KIND = {
    hymn: { icon: "music", label: "Hymn", go: "See the words" },
    reading: { icon: "book", label: "Scripture", go: "Read the scripture" },
    tribute: { icon: "mic", label: "Tributes", go: "Go to tributes" },
    music: { icon: "film", label: "Music", go: "Open" },
    service: { icon: "cross", label: "Service", go: "Open" }
  };

  function linkHref(link) {
    if (!link) return null;
    const [type, id] = link.split(":");
    if (type === "hymn") return `#hymns/${id}`;
    if (type === "reading") return `#programme/${id}`;
    if (type === "tab") return `#${id}`;
    return null;
  }

  function renderProgramme() {
    const list = $("#programmeList");
    M.programme.forEach((item, i) => {
      const k = KIND[item.kind] || KIND.service;
      const href = linkHref(item.link);
      const body = el("span", { class: "prog-body" },
        el("span", { class: "prog-tag", html: icon(k.icon) + `<span>${k.label}</span>` }),
        el("span", { class: "prog-title", text: item.title }),
        item.detail ? el("span", { class: "prog-detail", text: item.detail }) : null,
        item.who ? el("span", { class: "prog-who", text: item.who }) : null,
        item.people ? el("ul", { class: "prog-people" }, item.people.map(p => el("li", { text: p }))) : null,
        href ? el("span", { class: "prog-go", html: `<span>${k.go}</span>${icon("arrow")}` }) : null
      );
      const card = el(href ? "a" : "div", { class: `prog${item.kind === "hymn" ? " is-hymn" : ""}`, href },
        el("span", { class: "prog-num", text: String(i + 1) }), body);
      list.append(el("li", {}, card));
    });

    const wrap = $("#readings");
    wrap.append(el("div", { class: "section-head" }, el("h2", { class: "section-title", text: "Scripture Readings" })));
    M.readings.forEach(r => {
      wrap.append(el("article", { class: "card reading" },
        svg(art("sprig", "card-art")),
        el("div", { class: "reading-head" },
          el("span", { class: "ico", html: icon("book") }),
          el("div", {}, el("h3", { text: r.ref }), el("p", { class: "version", text: "King James Version" }))),
        ...r.verses.map((v, i) => el("p", { class: "v" }, el("sup", { text: String((r.start || 1) + i) }), v))));
    });
  }

  /* ---------- Hymns ---------- */
  function renderHymns() {
    const chips = $("#hymnChips");
    const list = $("#hymnList");
    let n = 0;
    M.hymns.forEach(h => {
      if (!h.background) n++;
      const label = h.background ? "Background hymn" : `Hymn ${n}`;
      chips.append(el("a", { class: "chip", href: `#hymns/${h.id}`, role: "listitem", "data-chip": h.id },
        h.background ? el("b", { html: icon("music") }) : el("b", { text: String(n) }), h.title));

      const card = el("article", { class: `card hymn${h.background ? " is-background" : ""}`, id: `hymn-${h.id}` });
      card.append(svg(art("sprig", "card-art")));
      const head = el("header", { class: "hymn-head" },
        el("span", { class: "hymn-num", html: icon("music") + `<span>${label}</span>` }),
        el("h2", { text: h.title }),
        h.author ? el("p", { class: "hymn-author", text: `by ${h.author}` }) : null,
        svg(art("divider", "divider")));
      if (h.background || h.audio) {
        const b = el("button", { class: "btn btn-soft hymn-play", type: "button", html: icon("play", "icon icon-fill") + "<span>Play this hymn</span>" });
        b.addEventListener("click", () => Hymn.play(h.audio || M.backgroundHymn.src, h.title));
        head.append(b);
      }
      card.append(head);

      if (h.pending) {
        card.append(el("div", { class: "hymn-pending", html: icon("music") },
          el("strong", { text: "Words coming soon" }),
          el("p", { text: `${h.verseCount || ""} verses${h.hasRefrain ? " with chorus" : ""}. Please follow along in your printed programme.` })));
      } else {
        h.verses.forEach((v, i) => {
          card.append(el("div", { class: "verse" },
            el("span", { class: "verse-n", text: String(i + 1) }),
            ...v.map(line => el("p", { text: line }))));
          if (i === 0 && h.refrain) {
            card.append(el("div", { class: "refrain" },
              el("span", { class: "refrain-label", html: icon("heart") + "<span>Chorus · sing after each verse</span>" }),
              ...h.refrain.map(line => el("p", { text: line }))));
          }
        });
      }
      list.append(card);
    });

    // Highlight the chip for the hymn on screen
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          const id = e.target.id.replace("hymn-", "");
          $$(".chip").forEach(c => c.classList.toggle("is-active", c.dataset.chip === id));
        });
      }, { rootMargin: "-40% 0px -55% 0px" });
      $$(".hymn").forEach(h => io.observe(h));
    }
  }

  /* ---------- Tributes (family + form options) ---------- */
  function initials(name) {
    return name.replace(/^(mr|mrs|ms|miss|dr|rev|pastor)\.?\s+/i, "").split(/\s+/).filter(Boolean).slice(0, 2).map(s => s[0].toUpperCase()).join("") || "♥";
  }

  function renderFamilyTributes() {
    const box = $("#familyTributes");
    if (!M.familyTributes || !M.familyTributes.length) { box.previousElementSibling.hidden = true; return; }
    M.familyTributes.forEach(t => {
      box.append(el("article", { class: "card tribute is-family" },
        el("div", { class: "tribute-head" },
          el("span", { class: "avatar", text: initials(t.name), "aria-hidden": "true" }),
          el("div", {}, el("div", { class: "tribute-name", text: t.name }), el("div", { class: "tribute-meta", text: t.relation }))),
        t.text ? el("p", { class: "tribute-text", text: t.text })
               : el("p", { class: "tribute-placeholder", text: "This tribute will be shared during the service and added here soon." })));
    });
  }

  function renderRelationOptions() {
    const box = $("#relationOptions");
    M.relationOptions.forEach((r, i) => {
      box.append(el("label", {},
        el("input", { type: "radio", name: "relation", value: r, checked: i === 0 }),
        el("span", { text: r })));
    });
  }

  /* ---------- Gallery + lightbox ---------- */
  const Lightbox = (() => {
    let idx = 0;
    const box = () => $("#lightbox");
    function show(i) {
      const g = M.gallery;
      idx = (i + g.length) % g.length;
      $("#lbImg").src = g[idx].src;
      $("#lbImg").alt = g[idx].alt || "";
      $("#lbCaption").textContent = `${g[idx].caption || g[idx].alt || ""}  ·  ${idx + 1} of ${g.length}`;
    }
    function open(i) { show(i); Modal.open(box()); }
    function init() {
      $(".lb-prev").addEventListener("click", () => show(idx - 1));
      $(".lb-next").addEventListener("click", () => show(idx + 1));
      document.addEventListener("keydown", e => {
        if (box().hidden) return;
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
    }
    return { open, init };
  })();

  function renderGallery() {
    const g = $("#gallery");
    M.gallery.forEach((p, i) => {
      const b = el("button", { type: "button", "aria-label": `Open photo ${i + 1}: ${p.alt || ""}` },
        el("img", { src: p.src, alt: p.alt || "", loading: "lazy", decoding: "async" }));
      b.addEventListener("click", () => Lightbox.open(i));
      g.append(b);
    });
  }

  /* ---------- Modals (welcome, tribute sheet, lightbox) ---------- */
  const Modal = (() => {
    let lastFocus = null;
    function open(node) {
      lastFocus = document.activeElement;
      node.hidden = false;
      document.body.classList.add("modal-open");
      const f = node.querySelector("input, textarea, button:not([data-close]), [data-close]");
      setTimeout(() => f && f.focus({ preventScroll: true }), 60);
    }
    function close(node) {
      node.hidden = true;
      if (!$$(".modal").some(m => !m.hidden)) document.body.classList.remove("modal-open");
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
    function init() {
      $$(".modal").forEach(m => {
        $$("[data-close]", m).forEach(c => c.addEventListener("click", () => close(m)));
      });
      $("#lightbox").addEventListener("click", e => { if (e.target.id === "lightbox") close(e.currentTarget); });
      document.addEventListener("keydown", e => {
        if (e.key !== "Escape") return;
        const openM = $$(".modal").reverse().find(m => !m.hidden && m.id !== "welcome");
        if (openM) close(openM);
      });
    }
    return { open, close, init };
  })();

  /* ---------- Hymn player ---------- */
  const Hymn = (() => {
    const audio = () => $("#hymnAudio");
    const pill = () => $("#hymnPill");
    let fadeTimer = null;
    const TARGET = 0.6;

    function fadeTo(vol, ms, done) {
      const a = audio();
      clearInterval(fadeTimer);
      const steps = 20, start = a.volume, delta = (vol - start) / steps;
      let i = 0;
      fadeTimer = setInterval(() => {
        i++;
        a.volume = Math.min(1, Math.max(0, start + delta * i));
        if (i >= steps) { clearInterval(fadeTimer); done && done(); }
      }, ms / steps);
    }

    function render() {
      const a = audio(), p = pill();
      const playing = !a.paused;
      const started = a.dataset.started === "1";
      const title = a.dataset.title || M.backgroundHymn.title;
      p.classList.toggle("is-playing", playing);
      p.classList.toggle("is-muted", started && !playing);
      p.setAttribute("aria-pressed", String(playing));
      p.setAttribute("aria-label", playing ? `Mute hymn: ${title}` : `Play hymn: ${title}`);
      $("#hymnState").textContent = playing ? "Mute hymn" : "Play hymn";
      $(".hymn-title", p).textContent = "♪ " + title;
    }

    function play(src = M.backgroundHymn.src, title = M.backgroundHymn.title) {
      const a = audio();
      const abs = new URL(src, location.href).href;
      if (a.src !== abs) { a.src = src; }
      a.dataset.title = title;
      a.dataset.started = "1";
      a.volume = 0;
      const pr = a.play();
      if (pr && pr.catch) pr.catch(() => { App.toast("The hymn couldn't start. Please tap the hymn button again."); render(); });
      fadeTo(TARGET, 1200);
      store.set("hymn", "on");
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({ title, artist: `In memory of ${M.person.fullName}` });
      }
    }

    function mute() {
      const a = audio();
      store.set("hymn", "off");
      fadeTo(0, 400, () => { a.pause(); render(); });
    }

    function toggle() {
      const a = audio();
      if (a.paused) play(a.getAttribute("src") || undefined, a.dataset.title || undefined);
      else mute();
    }

    function init() {
      const a = audio();
      a.dataset.title = M.backgroundHymn.title;
      ["play", "pause", "playing"].forEach(ev => a.addEventListener(ev, render));
      a.addEventListener("error", () => {
        if (a.dataset.started === "1") App.toast("Sorry, the hymn recording could not be loaded.");
        a.dataset.started = "0";
        render();
      });
      pill().addEventListener("click", toggle);
      render();
    }
    return { init, play, mute, render };
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
    $("#welcomeSilent").addEventListener("click", () => { store.set("hymn", "off"); leave(); });
    setTimeout(() => $("#welcomePlay").focus({ preventScroll: true }), 120);
  }

  /* ---------- Tabs / routing ---------- */
  function route() {
    const [tabRaw, sub] = decodeURIComponent(location.hash.replace(/^#/, "")).split("/");
    const tab = TABS.includes(tabRaw) ? tabRaw : "home";
    $$("[data-panel]").forEach(p => { p.hidden = p.dataset.panel !== tab; });
    $$(".tab").forEach(t => {
      if (t.dataset.go === tab) t.setAttribute("aria-current", "page");
      else t.removeAttribute("aria-current");
    });
    let target = null;
    if (sub && tab === "hymns") target = document.getElementById(`hymn-${sub}`);
    if (sub && tab === "programme") target = document.getElementById(sub);
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }

  /* ---------- Text size + share ---------- */
  function initTextSize() {
    const btn = $("#textSizeBtn");
    let size = Number(store.get("textSize") || 0);
    const apply = () => {
      document.documentElement.dataset.size = String(size);
      btn.dataset.active = String(size > 0);
      btn.setAttribute("aria-label", size < 2 ? "Make text bigger" : "Reset text size");
    };
    apply();
    btn.addEventListener("click", () => {
      size = (size + 1) % 3;
      store.set("textSize", String(size));
      apply();
      App.toast(["Normal text size", "Larger text", "Largest text"][size]);
    });
  }

  function initShare() {
    $("#shareBtn").addEventListener("click", async () => {
      const url = location.href.split("#")[0];
      const data = { title: document.title, text: `In loving memory of ${M.person.fullName}`, url };
      if (navigator.share) {
        try { await navigator.share(data); } catch (e) { /* cancelled */ }
        return;
      }
      try { await navigator.clipboard.writeText(url); App.toast("Link copied. Paste it to share."); }
      catch (e) { window.open(`https://wa.me/?text=${encodeURIComponent(data.text + " " + url)}`, "_blank", "noopener"); }
    });
  }

  /* ---------- Public helpers for tributes.js ---------- */
  let toastTimer = null;
  window.App = {
    el, initials, icon, Modal,
    toast(msg) {
      const t = $("#toast");
      t.textContent = msg;
      t.hidden = false;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => { t.hidden = true; }, 3200);
    },
    openTributeForm() { Modal.open($("#tributeSheet")); },
    closeTributeForm() { Modal.close($("#tributeSheet")); }
  };

  /* ---------- Start ---------- */
  function start() {
    bindText();
    renderService();
    renderStory();
    renderAppreciation();
    renderProgramme();
    renderHymns();
    renderFamilyTributes();
    renderRelationOptions();
    renderGallery();
    Modal.init();
    Lightbox.init();
    Hymn.init();
    initTextSize();
    initShare();

    $$("[data-action='write-tribute']").forEach(b => b.addEventListener("click", () => App.openTributeForm()));
    window.addEventListener("hashchange", route);
    route();
    initWelcome();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
