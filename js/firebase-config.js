/*
  Firebase settings for saving tributes online.

  Until this is filled in, the site runs in DEMO MODE: tributes are saved
  only on the device that wrote them, so other visitors will not see them.

  To go live (free):
   1. Go to https://console.firebase.google.com and create a project.
   2. Build > Firestore Database > Create database (production mode).
   3. Build > Authentication > Sign-in method > enable Email/Password,
      then Users > Add user (this is the family's admin login).
   4. Project settings > General > Your apps > Web app (</>) > copy the
      firebaseConfig object and paste it below in place of null.
   5. Firestore > Rules: paste in the contents of firestore.rules.
*/
window.FIREBASE_CONFIG = null;
/* Example:
window.FIREBASE_CONFIG = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123"
};
*/

// One Firebase project can hold many memorial sites. Use a unique id per person.
window.MEMORIAL_ID = "niala-virginia-murphy";
