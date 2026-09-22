**Public repository:** [https://github.com/kat200021/lincoln-webpage-redesign](https://github.com/kat200021/lincoln-webpage-redesign)

---

## How to download the code from GitHub

You do not need a GitHub account to download this project. The repository is public.

### Option A — Download as a ZIP

1. Open this link in your browser:  
   [https://github.com/kat200021/lincoln-webpage-redesign](https://github.com/kat200021/lincoln-webpage-redesign)

2. On the repository page, click the green code button near the top right.

3. In the dropdown menu, click **Download ZIP**.

4. Find the downloaded file on your computer (usually in your **Downloads** folder). It will be named something like:  
   `lincoln-webpage-redesign-main.zip`

5. Unzip the file:
   - **Mac:** Double-click the ZIP file. A folder will appear next to it.
   - **Windows:** Right-click the ZIP → **Extract All…** → choose a location → **Extract**.

6. Open the unzipped folder. You should see files such as `index.html`, `styles.css`, `script.js`, and folders like `assets/`, `services/`, `team/`, and `patients/`.

That folder is the full website project.

### Option B — Clone with Git 

If you have Git installed and prefer version control:

```bash
git clone https://github.com/kat200021/lincoln-webpage-redesign.git
cd lincoln-webpage-redesign
```

To pull later updates:

```bash
git pull origin main
```

---

## What’s included

| Path | Purpose |
|------|---------|
| `index.html` | Homepage |
| `header.html` / `footer.html` | Shared header and footer (injected into pages) |
| `include.js` | Loads the shared header/footer into each page |
| `styles.css` | Site-wide styles |
| `script.js` | Menu, hero carousel, video lightbox, back-to-top, etc. |
| `assets/` | Logo images (`Logo.png`, `Logo-light.png`) |
| `contact.html` | Contact / location page |
| `services/` | Condition and service pages |
| `team/` | Physicians and practice pages |
| `patients/` | Patient info, insurance, online payment |
| `.nojekyll` | Helps GitHub Pages serve the site correctly if published there |

---

## Notes for review and WordPress handoff

- Doctor photos and some community logos are **placeholders** and should be replaced with final assets.
- Interior pages that use `#site-header` / `#site-footer` depend on `include.js` and a local (or hosted) web server.

---
