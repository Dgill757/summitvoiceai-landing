# Visual Review Notes — SummitVoiceAI Landing Page

## Desktop and mobile findings

The dark navy, cyan, condensed typography, calculator board, and direct economic framing accurately express the selected **Signal & Steel** direction. The desktop hero establishes credible operational energy, while the mobile page maintains a usable single-column sequence, tappable calculator controls, and a persistent booking CTA.

## Accepted refinement contract

The final design pass will strengthen the signature revenue-signal path across the entire page, not merely within individual panels. It will reduce the number of maximum-scale all-caps claims by adding a more editorial evidence hierarchy; make the brand lock-up more prominent; introduce muted sandstone consistently for risk/leakage; and restyle the pricing and booking moments as an infrastructure decision board rather than a familiar SaaS-tier convention.

The Signal Cyan role remains reserved for live opportunity and primary action. Muted sandstone represents risk and recovery leakage. Cobalt/slate represents infrastructure.

## Functional verification notes

The production build and TypeScript check completed successfully after the final refinement pass. The live page exposes the expected calculator controls, accordion disclosures, audit intake form, email-report handoff, primary audit CTAs, and sticky mobile CTA in its accessibility tree. The initial live calculator values match the documented model: 4 missed calls/day × $9,500 average job × 40% close rate yields $15,200 daily, $76,000 weekly, and $3,952,000 annual illustrative opportunity.

Direct calculator interaction was verified on the live page: changing the average job value from $9,500 to $12,000 immediately updated the daily model to $19,200, weekly model to $96,000, annual model to $4,992,000, 10% scenario to $499,200, one-job annual scenario to $144,000, and related database scenarios. The browser console had no client-side output or errors during this check.

The expandable “How We Calculated This” disclosure was also verified. It displayed the updated daily and annual formulas using the visitor-entered $12,000 job value, maintaining the intended calculation transparency and conservative illustrative framing.

The audit-intake form accepted valid sample values, personalized the calculator report header with the supplied company name, and safely displayed the configured calendar-URL handoff state when no external calendar URL was present. No submission was sent to any third party; the visitor-facing placeholder correctly instructs the site owner to set `VITE_CALENDAR_URL`.
