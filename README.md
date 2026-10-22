# Chaitra — Sticker Club portfolio

A static portfolio built around the approved Sticker Club design: a dotted pastel background, pink highlighted title, surprise sticker, and star trails and click bursts. Each of the six project cards dissolves into 45 sparkles that gather into a five-petal flower. The centre matches the selected card and contains a short project introduction; expandable notes below retain the full description, tools, and supplied source links.

## Preview

Run `python3 -m http.server 8080` in this folder, then visit http://localhost:8080.

There is no build step. GitHub Pages can publish the repository root directly.

## Content

`content.js` preserves the original site’s remaining six projects, two experience entries, six focused skill groups, five training programs, eight certificates and two education records. The original resume remains at `Lakshmi_Chaitra_Resume.pdf`. SmartSpend was removed at the owner’s request. No new claims, credential links or dates have been invented. The script playground identifies Unicode writing systems; it is not a language identification model.

Dark is the default theme; visitors can switch to pastel paper and their explicit preference is remembered.

`app.js` renders the sections, opens project flowers, toggles full project notes, and handles theme and sparkle preferences. Escape and the back button return to the project cards. All content remains visible if scroll animation is unavailable. Reduced-motion preferences disable decorative motion and sparkles. Star effects clean up after themselves and are capped at 90 simultaneous animations.

The contact form retains the existing email-app fallback. It does not deliver a message automatically. Visitors review and send the prepared message in their own email app. Direct delivery remains optional through the existing Web3Forms configuration.

## Files

- `index.html`: structure and all existing sections
- `content.js`: original portfolio records and configuration
- `styles.css`: original section foundation plus approved Sticker Club design
- `app.js`: interactions and section rendering
- `favicon.svg`: flower mark
- `Lakshmi_Chaitra_Resume.pdf`: original resume
- `.nojekyll`: plain static GitHub Pages publishing
