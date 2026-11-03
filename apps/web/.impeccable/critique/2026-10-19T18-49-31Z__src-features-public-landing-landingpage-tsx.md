---
target: "apps/web: landing institucional JSDP Sonora"
total_score: 15
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Desarrollo\\JSDP\\apps\\web\\src\\features\\public\\landing\\LandingPage.tsx"
target_fingerprint: "sha256:f0a9ceb59ce3f7e8e189be5188c5b1d31c43c91ac30b63ccc8675913c81e1e95"
target_path: "C:\\Desarrollo\\JSDP\\apps\\web\\src\\features\\public\\landing\\LandingPage.tsx"
timestamp: 2026-10-19T18-49-31Z
slug: src-features-public-landing-landingpage-tsx
closed: true
---
# Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 2 | “Próximamente” is explicit, but organigram selection, expansion, and visible detail can contradict one another. |
| 2 | Match System / Real World | 3 | Institutional language is accurate; unexplained “OOAD 27” and abstract icon metaphors add translation cost. |
| 3 | User Control and Freedom | 2 | Users can collapse and close, but selecting an already selected card does not follow the `+ / −` disclosure promise. |
| 4 | Consistency and Standards | 3 | Strong visual consistency; selection and disclosure semantics are inconsistent across breakpoints. |
| 5 | Error Prevention | n/a | No input or destructive task exists on this informational surface. |
| 6 | Recognition Rather Than Recall | 3 | Labels are visible and the scroll narrative is legible; no section menu is required. |
| 7 | Flexibility and Efficiency | n/a | Not material to this landing page. |
| 8 | Aesthetic and Minimalist Design | 2 | Oversized hero imagery, repeated icon language, unavailable-function cards, and the tall footer dilute focus. |
| 9 | Error Recovery | n/a | No error-producing workflow exists. |
| 10 | Help and Documentation | n/a | Not required for this informational landing page. |
| **Total** | | **15/24** | **Acceptable (62.5%)** |

# Design Specificity Verdict

**LLM assessment:** Authored for JSDP Sonora, but not yet unmistakable. The Sonora silhouette, institutional hierarchy, authorized organigram, Patria face, and IMSS palette make the subject specific. However, circular outline icons, the gradient button, reveal-on-scroll, and three generic status cards remain transferable to an unrelated government portal. The strongest product-specific artifact is the organizational structure; the weakest is “Funciones previstas”.

**Deterministic scan:** The Impeccable detector returned `[]` with exit code 0: zero findings and no rule locations. It found no additional issues and produced no false positives.

**Visual overlays:** Browser automation returned `No browser is available`; therefore no reliable fresh screenshots or user-visible overlay could be produced. Source/CSS inspection and a successful Vite build were used as fallback signals.

# Overall Impression

The simplified sticky header and uninterrupted scroll are a clear improvement: removing the left rail, mobile/tablet tabs, and responsive menu reduces chrome without harming a short institutional narrative. The biggest remaining opportunity is to make the content journey feel finished: unavailable functions currently appear before the strongest institutional material, and the footer ends on more unavailable essentials.

# What’s Working

- The single-path scroll removes navigation overhead and gives the hero its full horizontal frame.
- The Sonora network graphic and authorized organizational structure provide credible, product-specific identity.
- Accessibility fundamentals are thoughtful: skip link, visible focus, reduced-motion support, semantic headings, and labeled organigram controls.

# Cognitive Load

Moderate, with three checklist failures: seven values form one equally weighted group; the hero has several simultaneous focal points; and the organigram exposes six selectable roles at once. Grouping, working-memory demand, and progressive disclosure are otherwise sound. Removing section navigation was correct because the page has one natural reading path.

# Emotional Journey

The hero opens with institutional pride, but the next two blocks emphasize missing information and unavailable capabilities. Mission, vision, values, and the named structure restore confidence. The ending loses some of it again through a tall, branding-heavy footer whose Privacy, Terms, and Contact items are all pending. The current peak-end effect finishes on “unfinished institution”.

# Priority Issues

## [P1] Organigram controls mix selection and disclosure

**Why it matters:** `+ / −` implies expand/collapse while cards actually select a separate detail panel. Collapsing desktop can leave details for a hidden child; closing mobile details can leave the card pressed.

**Fix:** Use a selection cue on desktop, reset hidden child selection when collapsing, and implement mobile cards as true disclosures with `aria-expanded` and `aria-controls`.

**Suggested command:** `$impeccable clarify`, then `$impeccable harden`.

## [P1] The page foregrounds absence instead of institutional value

**Why it matters:** Three large pending cards appear before mission, vision, values, and structure, so visitors encounter caveats before substance.

**Fix:** Move the pending-functions block below institutional content or replace it with one quiet roadmap notice.

**Suggested command:** `$impeccable distill`.

## [P2] Hero scale is discontinuous and overpacked

**Why it matters:** Network portraits jump from 150px to 76px at 1180px, and the stacked mobile graphic extends the first screen.

**Fix:** Use fluid `clamp()` sizing, one authoritative mobile rule, and a shorter 240–260px mobile graphic.

**Suggested command:** `$impeccable layout`, then `$impeccable adapt`.

## [P2] Icon reuse still weakens meaning

**Why it matters:** Empatía now has its own icon, but `people`, `training`, and `chart` still represent multiple unrelated concepts; hover on noninteractive portraits suggests clickability.

**Fix:** Reserve icons for stable concepts, remove decorative symbols that add no information, and remove hover affordance from noninteractive imagery.

**Suggested command:** `$impeccable distill`.

## [P2] The final screen is branding-heavy and trust-light

**Why it matters:** The mobile footer reserves 500px while Privacy, Terms, and Contact all end in “Próximamente”.

**Fix:** Make footer height content-driven, reduce repeated identity copy, and consolidate unavailable trust items into one restrained status line.

**Suggested command:** `$impeccable quieter`, then `$impeccable polish`.

# Persona Red Flags

**Jordan (first-timer):** “OOAD 27” appears without explanation. “Conoce la JSDP” leads first to missing-description copy and then three unavailable capabilities, so Jordan learns what is absent before what is useful.

**Riley (stress tester):** A selected child can remain in the detail panel after the tree is collapsed. On mobile, closing detail can leave the same card pressed, so state and presentation diverge.

**Casey (distracted mobile user):** The route remains long: a 300px hero graphic, three pending cards, seven compact values, six dense organigram cards, and a 500px footer.

# Minor Observations

- The favicon uses the master IMSS SVG; its 16px legibility and approved mask/touch variants still require a real-browser check.
- Noninteractive pending articles do not benefit from custom `aria-label` text.
- Overlapping mobile hero media blocks and a commented-out prior image rule should be consolidated to reduce CSS drift.
- Mission and vision copy remain faithful to the supplied institutional source.

# Questions to Consider

- What if the first two screens contained only what is true and useful today?
- Should the organigram become the memorable signature of the page rather than compete with several icon systems?
- Should pending Contact, Privacy, and Terms appear at all before institutional destinations exist?
