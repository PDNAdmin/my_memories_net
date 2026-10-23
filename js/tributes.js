/* ==========================================================
   Tributes: form + live list on the main site
   ========================================================== */
import { getStore, formatDate, LIMITS } from "./tributes-store.js";

const { el, initials, toast, icon } = window.App;
const $ = s => document.querySelector(s);

const list = $("#guestTributes");
const count = $("#tributeCount");
const form = $("#tributeForm");
const errorBox = $("#formError");
const submit = $("#tributeSubmit");
const message = form.elements.message;
let lastPostedId = null;

function tributeCard(t, isLocal) {
  const card = el("article", { class: `card tribute${t.id === lastPostedId ? " is-new" : ""}` },
    el("div", { class: "tribute-head" },
      el("span", { class: "avatar", text: initials(t.name || "?"), "aria-hidden": "true" }),
      el("div", {},
        el("div", { class: "tribute-name", text: t.name }),
        el("div", { class: "tribute-meta" },
          [t.relation, formatDate(t.createdAt)].filter(Boolean).join(" · "),
          isLocal ? el("span", { class: "badge-local", text: "Saved on this device" }) : null))),
    el("p", { class: "tribute-text", text: t.message }));
  return card;
}

function render(items, mode) {
  list.replaceChildren();
  count.textContent = items.length ? `(${items.length})` : "";
  if (!items.length) {
    list.append(el("div", { class: "empty", html: icon("heart") },
      el("strong", { text: "Be the first to share a memory" }),
      el("p", { text: "Tap “Write a Tribute” above to add yours." })));
    return;
  }
  list.append(...items.map(t => tributeCard(t, mode === "local")));
}

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.hidden = !msg;
}

message.addEventListener("input", () => { $("#charCount").textContent = String(message.value.length); });

form.addEventListener("submit", async e => {
  e.preventDefault();
  showError("");
  const f = form.elements;
  if (f.website.value) return; // spam trap

  const name = f.name.value.trim().slice(0, LIMITS.name);
  const relation = (form.querySelector("input[name=relation]:checked") || {}).value || "";
  const text = f.message.value.trim().slice(0, LIMITS.message);

  if (name.length < 2) { showError("Please write your name."); f.name.focus(); return; }
  if (text.length < 3) { showError("Please write a few words for your tribute."); f.message.focus(); return; }

  try {
    const last = Number(localStorage.getItem("lastTributeAt") || 0);
    if (Date.now() - last < 20000) { showError("Thank you. Please wait a few seconds before posting another tribute."); return; }
  } catch (err) { /* ignore */ }

  submit.disabled = true;
  submit.lastElementChild.textContent = "Posting…";
  try {
    const store = await getStore();
    lastPostedId = await store.add({ name, relation: relation.slice(0, LIMITS.relation), message: text });
    try { localStorage.setItem("lastTributeAt", String(Date.now())); } catch (err) { /* ignore */ }
    form.reset();
    $("#charCount").textContent = "0";
    window.App.closeTributeForm();
    if (location.hash !== "#tributes") location.hash = "#tributes";
    toast("Thank you. Your tribute has been posted.");
    setTimeout(() => list.firstElementChild && list.firstElementChild.scrollIntoView({ behavior: "smooth", block: "center" }), 350);
  } catch (err) {
    console.error(err);
    showError("Sorry, your tribute could not be posted. Please check your internet connection and try again.");
  } finally {
    submit.disabled = false;
    submit.lastElementChild.textContent = "Post Tribute";
  }
});

getStore().then(store => {
  store.subscribe(items => render(items, store.mode), err => {
    console.error(err);
    list.replaceChildren(el("div", { class: "empty" }, el("p", { text: "Tributes could not be loaded right now. Please refresh the page." })));
  });
});
