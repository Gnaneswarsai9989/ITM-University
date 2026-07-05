# ITM University Website — Setup Guide

A simple, self-contained HTML/CSS/JS website with:
- Home page with a rotating image slider (5 images, easy to replace)
- "Apply Now" button (in header, hero, about, and contact sections) that opens a popup form
- Form fields: Name, Email, Mobile (+country code), State, City, Course, Specialization
- Form submissions are sent to a Google Sheet via Google Apps Script
- Home, About, Highlights, and Contact sections with address/contact details

## Files

```
itm-website/
├── index.html      → main page (structure/content)
├── style.css        → all styling
├── script.js        → slider, modal, form logic
├── Code.gs           → paste into Google Apps Script (stores form data)
├── images/
│   ├── logo.webp     → ITM University logo
│   └── slide1.jpg … slide5.jpg  → placeholder hero images (replace these)
└── README.md          → this file
```

## 1. Replacing the 5 homepage images

Just replace these files with your own photos, **keeping the same file names**:

```
images/slide1.jpg
images/slide2.jpg
images/slide3.jpg
images/slide4.jpg
images/slide5.jpg
```

Recommended size: 1600×900px (landscape) so they fill the hero slider nicely.
If you want to use different file names or add/remove slides, edit the
`<div class="slide" ...>` lines inside `index.html` under
`<section class="hero" id="home">`.

The "About" section image (`images/slide2.jpg` by default) can also be swapped —
edit the `<img>` tag inside the `.about-image` div in `index.html`.

## 2. Connecting the form to Google Sheets

The form needs a Google Apps Script "Web App" URL to send data to. Steps:

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet.
   Name it something like **"ITM Applications"**.
2. In the sheet, click **Extensions → Apps Script**.
3. Delete any placeholder code, then open the `Code.gs` file included in this
   folder, copy all of it, and paste it into the Apps Script editor.
4. Click **Deploy → New deployment**.
   - Click the gear icon next to "Select type" and choose **Web app**.
   - Description: anything (e.g. "ITM form handler").
   - Execute as: **Me**.
   - Who has access: **Anyone**.
5. Click **Deploy**. Google will ask you to authorize permissions — approve it
   (you may need to click "Advanced" → "Go to project (unsafe)" since it's
   your own script).
6. Copy the **Web app URL** shown after deployment. It looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
7. Open `script.js` in this folder and find this line near the top:
   ```js
   const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
   Replace the placeholder text with your copied URL, so it looks like:
   ```js
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```
8. Save the file. Every time someone submits the "Apply Now" form, a new row
   will be added automatically to your Google Sheet with a timestamp.

**Note:** If you ever change the code in Apps Script later, you must create
a **new deployment** (Deploy → Manage deployments → Edit → New version) for
the changes to go live, and update the URL in `script.js` if it changes.

## 3. Editing text content (About, Contact, Address, etc.)

All text lives directly in `index.html`, organized by section:

- `<section id="home">` — hero headline & tagline
- `<section id="about">` — about text
- `<section id="highlights">` — achievement cards
- `<section id="contact">` — address, phone, email, map
- `<footer>` — footer links & address

Just open `index.html` in any text editor and edit the text between the tags.

## 4. Changing the map location

In the Contact section, the embedded Google Map uses this line:
```html
<iframe src="https://www.google.com/maps?q=ITM%20University%20Gwalior&output=embed" ...>
```
Replace `ITM%20University%20Gwalior` with your own address (URL-encoded) to
update the pin.

## 5. Running the website

Just open `index.html` in any web browser — no server or build step needed.
To publish it online, upload the whole folder to any static hosting service
(GitHub Pages, Netlify, Vercel, or your own web server).

## 6. Colors & fonts (optional customization)

All colors and fonts are defined as CSS variables at the top of `style.css`:
```css
:root{
  --crimson:#A61B22;
  --maroon:#5B0E12;
  --gold:#E3AE49;
  ...
}
```
Change these values to adjust the whole site's color scheme in one place.
