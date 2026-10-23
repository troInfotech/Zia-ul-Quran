# Jamia Chishtia Razvia Zia-ul-Quran — Website

Bilingual (Urdu / English) static website for **Jamia Chishtia Razvia Zia-ul-Quran, Rahwali, Gujranwala, Pakistan**. Urdu is the default language and switches the page to right-to-left; English is available with one click (the choice is remembered).

## Pages

| File | Content |
|------|---------|
| `index.html` | Home: hero, programs, about preview, latest news, admissions call-to-action |
| `about.html` | Mission, values, founder and leadership, facilities |
| `programs.html` | Hifz, Dars-e-Nizami, B.A.-level education, computer and AI education, student life, admissions |
| `news.html` | News and events |
| `contact.html` | Address, phone, social links, map |

## Structure

```
index.html, about.html, programs.html, news.html, contact.html
css/styles.css      Theme and layout (RTL-aware)
js/translations.js  ALL site text in Urdu (ur) and English (en)
js/main.js          Shared header/footer, language switch, mobile menu, contact links
assets/images/      Images
```

## Editing content

- **Text:** edit `js/translations.js`. Each page element has a `data-translate="key"`; change the `ur` and `en` values for that key.
- **Phones, Facebook, YouTube, map location (latitude,longitude):** edit the `SITE` object at the top of `js/main.js`.
- **Default language:** `DEFAULT_LANG` in `js/main.js` (and the matching `'ur'` fallback in each page's `<head>` script).
- **Colours:** CSS variables at the top of `css/styles.css`.

## Information to verify

The content was compiled from public sources (Daily Dunya, Nawa-i-Waqt, Facebook/YouTube pages and online directories). Please confirm before publishing:

- Address and phone number (taken from an online directory listing)
- Programs, admission details, fees and hostel availability
- Mission and values text (written generically)
- Leadership names and titles

## Running locally

```powershell
npx --yes http-server -p 8080
```

Then open http://localhost:8080.

## Deployment

Deployed as a static site (GitHub Pages: Settings > Pages > deploy from `main` / root). To use a custom domain, add a `CNAME` file containing the domain.
