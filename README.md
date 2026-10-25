# Upal Patil — Black Clover / Manga Editorial Portfolio

React + Vite portfolio with a manga-editorial visual direction: ink-black surfaces, parchment, muted clover green, oxblood accents, condensed typography, sharper borders, and asymmetric composition.

## Run locally
1. Install Node.js LTS.
2. Open this folder in VS Code.
3. Run `npm install`.
4. Run `npm run dev` and open the local URL printed by Vite.
5. Run `npm run build` to check the production build.

## Design and media
- The hero uses a locally bundled original grimoire illustration so the main visual does not depend on an external image host.
- The opening sequence animates a three-leaf, four-leaf, and five-leaf seal with individual leaf-drawing effects, a progress indicator, a skip control, reduced-motion support, and a session-based once-per-tab display.
- Stage 01 adds a focused Dither Veil to the hero grimoire: desktop pointer movement uncovers the color artwork while touch devices receive the full artwork without a hover dependency.
- Mission cards include expandable dossiers with the build role, challenge, outcome, and concrete proof of the implementation. The remaining React Bits candidates are intentionally not enabled yet so each effect can be evaluated independently.
- Crunchyroll's official Black Clover series page and a Pinterest search moodboard are linked as references.
- The grimoire illustration is an original generated portfolio asset. Black Clover references and linked anime media belong to their respective rights holders. For a public production site, only use third-party media you have permission to embed or distribute.
- Layout and styling are original and do not reproduce Crunchyroll's or Pinterest's website UI.

## Profile photo
Use **UPLOAD PHOTO** in the profile section. The image is resized in the browser and saved to localStorage when available. It stays on this browser/device; it is not uploaded to a server. Choose an image under 8 MB.

## Projects
- Campus Connect — uses the supplied genuine login-screen screenshot.
- Pet Store — uses the supplied project logo.
- Stayora — uses a supplied project screenshot.
- Noira — uses a supplied hero image.

Review technology tags against each repository before publishing. The contact area links to GitHub; add a preferred public email if desired.

## Grimoire intro
The loader plays on the first visit in a browser tab. To replay it during development, open DevTools and run `sessionStorage.removeItem('upal-grimoire-intro-seen')`, then refresh. Visitors can also skip the intro. The reveal is intentionally short and has a reduced-motion path.
