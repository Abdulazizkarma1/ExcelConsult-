# QA and deployment checklist

## Static checks
- JS syntax inspected in V8 after the changes.
- Verify index.html, app.js, styles.css, refinement.css, favicon.svg, robots.txt and sitemap.xml are present.
- Validate complete links, correct form input names and service category population in a browser.

## Browser acceptance tests still required
Check desktop and touch emulation at 320, 360, 375, 390, 430, 768, 1024, 1280 and 1440 pixels:
- No horizontal page overflow.
- Header menu opens, closes with Escape, closes on outside click and restores focus.
- Every service and package CTA selects the correct item in the enquiry form.
- Form rejects blank fields, bad email and malformed optional phone.
- Form clearly says 'not sent' when preparing an enquiry.
- No actual contact link is shown when business contacts are empty.
- WhatsApp URL encoding and mailto fallback work once verified contact details are configured.
- Calculator selections update all milestones and sum to total price.
- Tab order, focus, reduced-motion setting, zoom to 200%.
- Axe or Lighthouse accessibility checks.
- LCP, INP, CLS and browser console/network checks on a deployed preview.

## Deployment
1. Commit a genuine, authorised ExcelConsult brand logo asset and use it for header/footer. Favicon currently uses a neutral monogram fallback.
2. Configure approved business WhatsApp and/or email in app.js; no secrets belong here.
3. Preview branch in Vercel, verify all flows, obtain business approval.
4. Merge PR when checks pass. Verify production URL after deployment; do not claim production is updated until confirmed.

## Scope
Static site has no build command and no npm dependencies. HTML/CSS/JS files are published from repository root.
