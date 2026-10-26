# Chaitra — Sticker Club portfolio

A static portfolio built around the approved Sticker Club design: a dotted pastel background, pink highlighted title, surprise sticker, and star trails and click bursts. Each of the six project cards dissolves into 45 sparkles that gather into a five-petal flower. The centre matches the selected card and contains a short project introduction; expandable notes below retain the full description, tools, and supplied source links.

## Preview

Run `python3 -m http.server 8080` in this folder, then visit http://localhost:8080.

There is no build step. GitHub Pages can publish the repository root directly.

## Content

`content.js` preserves the original site’s remaining six projects, two experience entries, seven skill groups, five training programs, eight certificates and two education records. The original resume remains at `Lakshmi_Chaitra_Resume.pdf`. SmartSpend was removed at the owner’s request. No new claims, credential links or dates have been invented. The separate writing-system demonstration was removed at the owner’s request.

Pastel is the default for first visits. The mode switch changes the entire portfolio into a professional dark presentation: professional copy, a centred hero, graphite/green/steel colours, subtle stickers, and project case studies in place of flower reveals. Explicit mode choices use the versioned `chaitra-portfolio-mode-v2` preference; the former dark-default preference is ignored. `mode-init.js` applies the preference before paint. The pink header star badge has been removed in both modes.

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

Local demo revision: both modes call the section “My projects.” The window’s Focus view button expands it into a native modal dialog. Back to playground or Escape restores its exact position. The dialog traps keyboard focus and the background cannot scroll. This revision is pending client review and has not been published.

Ocean Studio demo: `ocean.css` adds professional typography, an ocean background, floating stickers and image-led project cards. Five previews are screenshots captured from the owner’s linked live projects; HUPP-LID uses a labelled conceptual research diagram. Casual hides these previews and retains its original layout.

Final default: first visits open Casual pastel mode. Professional uses the wave ribbon and only moves its background in direct response to cursor movement. The availability sticker reads “open to internships” with no arrow; duplicate availability text is hidden in Professional. `?hero=caustics` remains an optional alternate preview.

Sparkles are enabled in both modes (unless the visitor switches them off or requests reduced motion). Professional uses cyan/sea-blue trails and 30-particle click bursts. The sparkle layer follows the project dialog so effects stay visible in focus view.

Professional background now defaults to Glass Layers, with the decorative orb removed. Casual remains the first-visit default. Background comparisons are available only through explicit `?background=aurora&compare=1` previews; normal visitors see no demo controls. Cyan sparkles and cursor-driven background motion remain enabled.

Mode discovery: the pastel theme is labelled Fun. A header sticker reads “Want a professional vibe?” above the Professional button; Professional shows “Want a fun vibe?” above Fun. Both the sticker and button toggle modes. Fun remains the first-visit default and saved preferences still work.
