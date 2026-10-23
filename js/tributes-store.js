/* ==========================================================
   Tribute storage, shared by the main site and admin page.
   Uses Firebase Firestore when js/firebase-config.js is filled
   in; otherwise falls back to this device's local storage.
   ========================================================== */
const FB_VERSION = "10.12.2";
const memorialId = window.MEMORIAL_ID || "memorial";
const LOCAL_KEY = `tributes:${memorialId}`;

export const LIMITS = { name: 80, relation: 40, message: 3000 };

function readLocal() {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]"); } catch (e) { return []; }
}
function writeLocal(list) {
  try { localStorage.setItem(LOCAL_KEY, JSON.stringify(list)); } catch (e) { /* storage blocked */ }
}

function localStore() {
  const listeners = new Set();
  const emit = () => {
    const list = readLocal().sort((a, b) => b.createdAt - a.createdAt);
    listeners.forEach(cb => cb(list));
  };
  window.addEventListener("storage", e => { if (e.key === LOCAL_KEY) emit(); });
  return {
    mode: "local",
    subscribe(cb) { listeners.add(cb); emit(); return () => listeners.delete(cb); },
    async add(t) {
      const item = { ...t, id: "local-" + Date.now().toString(36), createdAt: Date.now() };
      writeLocal([item, ...readLocal()]);
      emit();
      return item.id;
    },
    async remove(id) { writeLocal(readLocal().filter(t => t.id !== id)); emit(); },
    auth: null
  };
}

async function firebaseStore(config) {
  const base = `https://www.gstatic.com/firebasejs/${FB_VERSION}`;
  const [{ initializeApp }, fs] = await Promise.all([
    import(`${base}/firebase-app.js`),
    import(`${base}/firebase-firestore.js`)
  ]);
  const app = initializeApp(config);
  const db = fs.getFirestore(app);
  const col = fs.collection(db, "memorials", memorialId, "tributes");

  return {
    mode: "firebase",
    app,
    subscribe(cb, onError) {
      const q = fs.query(col, fs.orderBy("createdAt", "desc"), fs.limit(500));
      return fs.onSnapshot(q, snap => {
        cb(snap.docs.map(d => {
          const data = d.data({ serverTimestamps: "estimate" });
          return { id: d.id, ...data, createdAt: data.createdAt ? data.createdAt.toMillis() : Date.now(), pending: d.metadata.hasPendingWrites };
        }));
      }, err => onError && onError(err));
    },
    async add(t) {
      const ref = await fs.addDoc(col, { ...t, createdAt: fs.serverTimestamp() });
      return ref.id;
    },
    async remove(id) { await fs.deleteDoc(fs.doc(col, id)); },
    async auth() {
      const a = await import(`${base}/firebase-auth.js`);
      return { ...a, instance: a.getAuth(app) };
    }
  };
}

let storePromise = null;
export function getStore() {
  if (!storePromise) {
    const cfg = window.FIREBASE_CONFIG;
    storePromise = cfg && cfg.projectId
      ? firebaseStore(cfg).catch(err => { console.error("Firebase failed, using local mode", err); return localStore(); })
      : Promise.resolve(localStore());
  }
  return storePromise;
}

export function formatDate(ms) {
  try {
    return new Date(ms).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
  } catch (e) { return ""; }
}
