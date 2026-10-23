# Memorial Website Template

A mobile-first memorial site that turns a printed burial programme into a website.
Sample content: Niala Virginia Murphy (1943 – 2025).

## What's included
- **Welcome popup** asks visitors whether to play a hymn softly in the background.
- **Hymn bar** at the bottom of every page: one tap to mute or play.
- **Five tabs:** Home · Programme · Hymns · Tributes · Photos (bottom bar on phones, top bar on desktop).
- **Tributes:** visitors post without signing up, and tributes appear for everyone instantly (once Firebase is connected).
- **A+ button** for larger text, and **Share / WhatsApp** buttons.
- **admin.html:** the family signs in and removes unsuitable tributes.

## Make a site for a new family
1. Copy this whole folder.
2. Edit **`js/content.js`**: name, dates, service details, programme, hymns, biography, photos, appreciation.
3. Replace the images in `assets/photos/` and the hymn in `assets/audio/`.
4. In `js/firebase-config.js`, set a new `MEMORIAL_ID` (e.g. `"john-adebayo"`).

## Hymn words
Public-domain hymns (e.g. Amazing Grace, To God Be the Glory) can be typed in full.
For hymns still under copyright (e.g. Great Is Thy Faithfulness, How Great Thou Art), set
`pending: true` or paste the words only if the church has a licence (usually CCLI).

## Connecting tributes (Firebase, free)
Follow the steps at the top of `js/firebase-config.js`, then paste `firestore.rules`
into Firestore → Rules and put the family admin email in it.
Until then the site runs in demo mode: tributes save only on the device that wrote them.

## Running locally
The site uses JavaScript modules, so open it through a local server, not by double-clicking:
`npx serve .` (or VS Code's "Live Server" extension), then open the address it prints.

## Putting it online
Drag this folder onto https://app.netlify.com/drop, or use Firebase Hosting.

