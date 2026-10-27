# Responsive Internship Board

A beginner-friendly, accessible internship listing interface built with **semantic HTML, responsive CSS, and vanilla JavaScript** — no frameworks or build tools required.

## Preview

Open `index.html` using a local web server (steps below). The supplied internship records are fictional sample data. Application URLs are placeholders and do not represent real vacancies.

## Features

- Responsive layout for mobile, tablet, and desktop
- Internship cards rendered from reusable `internships.json` data
- Keyword search across role, company, domain, location, description, and skills
- Domain dropdown populated from the dataset
- Result count and live status announcements
- Empty-results state with a clear-filters action
- Error state with a retry action if data cannot be loaded
- Semantic landmarks, labels, skip link, visible keyboard focus, and accessible link names
- Reduced-motion support
- No JavaScript or CSS framework

## Project files

```text
responsive-internship-board/
├── index.html
├── styles.css
├── app.js
├── internships.json
├── README.md
└── assets/
    └── screenshots/
```

## Run locally

Because the app loads `internships.json` using `fetch()`, run it with a local web server instead of opening the HTML file directly.

### Option A: VS Code Live Server
1. Extract the project ZIP.
2. Open the project folder in Visual Studio Code.
3. Install the **Live Server** extension if needed.
4. Right-click `index.html` and choose **Open with Live Server**.

### Option B: Python
Open a terminal in the project folder and run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Test checklist

- [ ] Search for `Java` and confirm matching internships appear.
- [ ] Select `Cloud & DevOps` and confirm only that domain appears.
- [ ] Search for a nonsense word such as `xyz-no-match` and confirm the empty state appears.
- [ ] Select **Clear filters** and confirm all cards return.
- [ ] Use Tab and Shift+Tab to navigate the controls and application links.
- [ ] Resize the browser to mobile, tablet, and desktop widths.
- [ ] Stop the local server or temporarily rename `internships.json`, refresh, and confirm the error state appears. Restore the filename and select **Try again**.

## Publish to GitHub

1. Create a **public** repository named `responsive-internship-board` on GitHub.
2. Upload `index.html`, `styles.css`, `app.js`, `internships.json`, `README.md`, and the `assets` folder.
3. Commit the files to the `main` branch.
4. Open the repository's **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then save.
7. Wait for GitHub Pages to finish deploying. The live URL will look like:
   `https://YOUR-GITHUB-USERNAME.github.io/responsive-internship-board/`
8. Replace the placeholder in the submission section below with your actual live URL.

> Keep all five project files at the repository root. GitHub Pages can serve this static site without a framework.

## Add README screenshots

After launching the site, capture at least one desktop screenshot and one mobile-width screenshot. Save them in `assets/screenshots/` as `desktop.png` and `mobile.png`, then add:

```markdown
## Screenshots

### Desktop
![Internship Board desktop view](assets/screenshots/desktop.png)

### Mobile
![Internship Board mobile view](assets/screenshots/mobile.png)
```

## Submission

- **GitHub repository:** `PASTE_YOUR_PUBLIC_REPOSITORY_URL_HERE`
- **Live preview:** `PASTE_YOUR_GITHUB_PAGES_URL_HERE`

Submit the live preview URL or public repository URL, and keep the other link plus screenshots in the README so reviewers can find everything from one project page.

## Accessibility notes

- A skip link helps keyboard users jump to main content.
- Every search and filter control has a visible label.
- `role="status"` and `aria-live="polite"` announce result changes.
- The error state uses `role="alert"`.
- Focus indicators are visible and reduced-motion preferences are respected.

## Data note

All organizations, stipend amounts, and listings in `internships.json` are **fictional demo content**. `example.com` application links are placeholders. Do not treat these records as live internship offers.
