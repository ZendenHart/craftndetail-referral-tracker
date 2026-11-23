# CraftNDetail Retailer Referral Tracker

A responsive, dependency-free classroom web app for the CraftNDetail clothing alterations, repair, and custom clothing venture in **MGMT 3400 Entrepreneurship**.

This app supports **Priority 2: figure out who our customers will be**. It helps the group organize potential retailer referral sources, record customer introductions after agreement to contact, and compare which introductions become completed paid work. It is a way to explore a future customer discovery pilot, not evidence that customer demand has been verified.

**All initial retailers and customers are fictional.** Demo labels appear in records, partner selectors, and CSV exports. No real customer information is included. The four retailers and eight referrals demonstrate all six statuses.

## Location and files

The surrounding workspace already contained an unrelated Bakersfield project. This app starts fresh inside `craftndetail/` so the existing files remain untouched. Treat this folder as the app's project root.

| File | Purpose |
| --- | --- |
| `index.html` | Accessible application shell, four views, and labeled dialogs |
| `styles.css` | Responsive layouts, visual styling, focus indicators, and reduced motion support |
| `core.js` | Validation, demo records, exact-cent money parsing, metrics, filtering, and CSV generation |
| `app.js` | Record management, local storage, forms, routing, and downloads |
| `favicon.svg` | Original CraftNDetail browser icon |
| `.nojekyll` | Tells GitHub Pages to serve these files as a static app |
| `.gitignore` | Keeps CSV exports, logs, and system files out of Git commits |
| `serve.cjs` | Optional Node.js local server; no packages to install |
| `tests/core.test.cjs` | Automated tests for the data rules |
| `preview.jpg` | Screenshot of the verified desktop dashboard |

## Run locally

The quickest option is to double-click **`index.html`** in this folder. Use a current Chrome, Edge, Firefox, or Safari browser with JavaScript enabled. No installation, account, build step, external font, or API key is required.

For more predictable browser storage, use the included local server if Node.js is installed:

```powershell
# From the surrounding workspace:
cd craftndetail
node serve.cjs
```

Open **http://127.0.0.1:4173**. Stop the server with Ctrl+C. If the port is busy, in PowerShell run `$env:PORT = '4174'` before starting the server and use that port in the URL.

If you cloned the standalone GitHub repository, the app files are already at its root: open a terminal in that repository and run `node serve.cjs` directly, without `cd craftndetail`.

Browser storage for `file://` pages varies by browser. The app displays a warning and uses session-only memory if storage is unavailable. The local server is recommended for presenting. Keep using the same URL, browser profile, and port to see your saved records. A `file://` page, localhost address, different port, and published site each have separate browser storage.

## What you can do

- **Overview:** four live totals, an explanation of the formulas, leading partners sorted by completed paid jobs, and the five most recently referred customers.
- **Customer referrals:** add, edit, and delete records; search customer names, contacts, services, and retailer names; combine retailer and status filters; clear filters; export every referral to CSV.
- **Retailer partners:** add, edit, and delete retailers, their type, and their total recorded cost; compare referrals, completed paid jobs, revenue, cost, and cost per paid job.
- **About this prototype:** read the assignment context and privacy limitations, add or remove demo records, or explicitly reset all local records.

The statuses are **New lead**, **Contacted**, **Quote provided**, **Work in progress**, **Paid work completed**, and **Did not convert**. Service requested is free text with optional suggestions. Customer contact information is optional; customer aliases are welcome. All currency is USD.

Each referral requires the checkbox confirming the customer agreed to be contacted. Enter contact information only after that agreement. The checkbox is a classroom workflow reminder, **not verified legal consent**. For this prototype, use fictional details and aliases.

You must create a retailer before saving a referral. The referral dialog also lets you add a new retailer while keeping the unfinished referral form.

## Metrics and deliberate choices

| Metric | Calculation |
| --- | --- |
| Total referrals | All referral records |
| Completed paid jobs | Records with status exactly `Paid work completed` |
| Revenue | Sum of paid amounts on completed paid jobs only |
| Partner cost per paid job | That retailer's recorded cost ÷ their completed paid jobs |
| Overall cost per paid job | All recorded retailer costs ÷ all completed paid jobs |

The cost per paid job is **“—”** when no paid jobs exist. An entered zero cost displays as $0.00 when there is a paid job. A paid amount of zero is allowed and still counts as a completed paid job. Monetary inputs allow two decimal places and a maximum of $9,999,999.99 per record. Money is stored as integer cents; division is rounded only for display.

Retailer costs are manually entered lifetime totals, **not automatically multiplied by referrals**. Include relevant partnership spending or referral fees in that total. Costs from retailers with no paid jobs still contribute to the overall calculation. There are no reporting date ranges. Dashboard and partner metrics include demo records until you remove them and do not change when you filter the referral list.

**Revenue is not profit.** Labor, materials, taxes, overhead, payment fees, and refunds are not modeled. One record represents one referral and at most one paid job. Changing a paid referral to any other status removes its paid amount from the saved record and from revenue. Moving it to another retailer reattributes its job and revenue to that retailer.

Deleting a retailer **also permanently deletes all linked referrals**. A confirmation shows the affected referral count, completed paid jobs, revenue, and recorded cost. Deleting a single referral also requires confirmation. These actions have no undo.

Demo data loads only when there is no saved app state. Editing a demo record keeps its Demo label. Removing demos deletes demo referrals and unneeded demo retailers, including edited demo records. A demo retailer connected to a user-created referral is retained with its Demo label and recorded cost intact; reassign your own referrals to a different retailer before removing that demo retailer. Adding demos again restores missing examples without overwriting existing records. Resetting local data creates an explicitly empty state, so a reload does not automatically repopulate samples.

## CSV export

Open **Customer referrals → Export CSV**. The download contains **all referral records regardless of active filters**, with customer/alias, optional contact, retailer, service, date, status, paid amount for completed work, workflow confirmation, and separate demo referral/retailer labels. Its filename includes the local export date.

The export uses UTF-8 with a BOM, CRLF row endings, and quoted fields so spreadsheet applications can handle commas, quotes, newlines, and Unicode. Text that could be interpreted as a spreadsheet formula is prefixed with an apostrophe for safer opening. This can change how formula-like names or phone numbers appear in the exported file, without changing saved records.

The CSV is a reporting export, **not a complete restorable backup**: it has no import flow and does not include standalone partner cost records. A CSV may contain contact information you entered. Keep exports out of the public repository and share only fictional class examples.

## Storage and limitations

- Uses local storage under `craftndetail.referrals.v1` in this browser profile on this device. The app does not sync with other users, devices, or browsers.
- No backend, login, collaboration service, analytics, tracking, external assets, or data transmission. Loading a published page retrieves the static app files from its host; entered records stay in the browser. No one is contacted.
- Storage is not encrypted by the app. People with access to this browser profile can see or change the data. Clearing site/browser data can erase records, and private browsing may discard them when closed.
- Unreadable saved data is left untouched, accompanied by a session-only warning. In About, **Reset local data** explicitly replaces the app's saved records with an empty state after confirmation. It affects only this app's storage key.
- Storage write failures display an error and keep the unsaved form open. If storage is unavailable on startup, changes work only in memory and are visibly identified as session-only.
- Other tabs on the same origin receive updates. An update closes open forms to prevent saving against stale data; a save also checks for a changed storage snapshot. This is not a multi-user database or a guarantee against simultaneous writes.
- Native dialogs support keyboard focus containment, Escape to cancel, labeled controls, and focus restoration. Data tables can scroll horizontally using keyboard or touch on smaller screens. No formal accessibility certification or assistive technology audit has been performed.
- The dataset is small and illustrative. There is no outreach, verified demand, real research, scheduling, invoicing, consent verification, profitability analysis, or customer communications system.

## Upload to GitHub and publish with GitHub Pages

The recommended approach is to publish **the contents of this `craftndetail` folder** in a new repository, keeping the unrelated parent project separate.

1. On GitHub, create a repository such as `craftndetail-referral-tracker`. A public repository is the straightforward option for GitHub Free. Do not include customer data or CSV exports.
2. In the new repository, choose **Add file → Upload files** and upload the app files **at the repository root**, so `index.html` is at the top level. Include `styles.css`, `core.js`, `app.js`, and `favicon.svg`. README, optional server, and tests can be included; none requires a build. For `.nojekyll`, use **Add file → Create new file** if your file picker hides dotfiles, name it `.nojekyll`, and leave it empty.
3. Commit the uploaded files through GitHub when you are ready. No commits or pushes were made by the app's creation process.
4. Open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, select your branch (usually `main`), choose **/(root)**, and save.
5. After deployment completes, use **Visit site** on that settings page. The project URL is usually `https://YOUR-USERNAME.github.io/craftndetail-referral-tracker/`.
6. Test adding a fictional referral, reloading, and exporting on the published URL. Local records do not transfer to the hosted URL; its first visit starts with its own demo state.

Every app asset uses a relative path, so repository subpaths work. If you deliberately publish the entire existing parent repository from its root instead, this app is at `/REPOSITORY/craftndetail/`; the original parent index remains that site's home page. Do not replace that existing project unless you intend to.

GitHub's official guidance: [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). GitHub Pages is static hosting; it does not create a shared database for the tracker.

## Suggested three-minute classroom demo

1. **Frame the experiment:** “This is our classroom prototype for Priority 2. All starting records are fictional. We want to explore which retailers might refer customers for alterations, repairs, and custom clothing; we have not verified demand.”
2. **Read the sample dashboard:** 8 referrals, 3 completed paid jobs, $200 revenue, and $51.67 referral cost per paid job ($155 ÷ 3). Open the calculation explanation and note that revenue is not profit.
3. **Compare partners:** The fictional boutique has 1 paid job and $45 total cost, so its cost per paid job is $45. The dry cleaner has no completed paid jobs, so its cost per paid job is “—”. Treat these as examples of the calculation, not findings.
4. **Record an introduction:** Add “Class example boutique” with $10 cost, then a referral named “Class sample A,” service “Trouser hemming,” and status “New lead.” Leave contact blank and explain the required agreement reminder. Save.
5. **Follow the outcome:** Edit that new referral to “Paid work completed” with $30. The overview becomes 9 referrals, 4 paid jobs, $230 revenue, and $41.25 cost per job ($165 ÷ 4).
6. **Show reporting and privacy:** Search for the alias, combine filters, export CSV, and explain that the export contains all records. Reload to demonstrate browser persistence. Show About and the sample-removal control. Agree as a group on what a small, consent-based future pilot would need to learn.

## Checks

From the app directory, with Node.js available:

```powershell
node --check core.js
node --check app.js
node --check serve.cjs
node --test tests/core.test.cjs
```

The tests cover paid-only aggregation, overall and per-retailer costs, zero-paid-job cases, cents and invalid money, search and combined filters, demo removal with retained user records, idempotent demo loading, CSV quoting and formula protection, consent validation, dates, duplicate IDs, and orphan referrals.

For UI review, use fictional records: add/edit retailers; attempt a referral without the checkbox; save a new lead; mark it paid; reload; search and filter; export; inspect deletion warnings and cancel; remove and restore demos; test at phone and desktop widths. Check keyboard Tab/Shift+Tab, dialog Escape, and visible focus indicators.

Verification on November 22, 2026: all nine automated tests and JavaScript syntax checks passed. Browser checks in the available Chromium browser covered retailer creation/editing, referral consent blocking, referral creation/editing, paid-status transitions, saved records across reloads, combined search and filters, an actual CSV download, deletion cancellation and linked-record deletion using fictional test records, demo removal without automatic reseeding, demo restoration, and adding a retailer without losing an unfinished referral form. Escape dismissed the dialog. Layout checks at 320, 390, 768, and 1440 CSS pixels found no page-wide horizontal overflow; tables scroll inside their own regions. DOM checks found no duplicate IDs or unlabeled form controls. The final browser console had no warnings or errors. Temporary test records were removed and the original eight demo referrals restored. This was a focused prototype review, not a formal accessibility or cross-browser audit.
