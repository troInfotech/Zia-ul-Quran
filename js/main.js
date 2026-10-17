// ===== Jamia Chishtia Razvia Zia-ul-Quran website =====
// Shared header/footer, Urdu/English switching (with RTL) and mobile menu.

const SITE = {
  phone: '+923216404172',
  phoneDisplay: '+92 321 6404172',
  phone2: '+923216422960',
  phone2Display: '+92 321 6422960',
  facebook: 'https://www.facebook.com/Jamia-Chishtia-Rizvia-zia-ul-quran-107381108524576',
  youtube: 'https://www.youtube.com/channel/UClzTb1p2D44pKBWaQyL-zZA',
  mapLatLng: '32.2458182,74.1606115'
};

const LANGS = ['ur', 'en'];
const DEFAULT_LANG = 'ur';

function getLang() {
  const saved = localStorage.getItem('language');
  return LANGS.includes(saved) ? saved : DEFAULT_LANG;
}

function t(key, lang) {
  return (translations[lang] && translations[lang][key]) || translations.en[key] || '';
}

function applyLanguage(lang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === 'ur' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-translate]').forEach(el => {
    const text = t(el.dataset.translate, lang);
    if (text) el.innerHTML = text;
  });

  const titleKey = document.body.dataset.title;
  if (titleKey) document.title = t(titleKey, lang);
}

function headerHTML() {
  const links = [
    ['index.html', 'home', 'navHome'],
    ['about.html', 'about', 'navAbout'],
    ['programs.html', 'programs', 'navPrograms'],
    ['news.html', 'news', 'navNews'],
    ['contact.html', 'contact', 'navContact']
  ];
  const page = document.body.dataset.page;
  const items = links.map(([href, id, key]) =>
    `<li><a href="${href}" class="${id === page ? 'active' : ''}" data-translate="${key}"></a></li>`).join('');

  return `
  <nav class="navbar">
    <div class="container nav-container">
      <a href="index.html" class="nav-brand">
        <img src="assets/images/jamia-logo.png" alt="" class="nav-logo">
        <span data-translate="instName"></span>
      </a>
      <ul class="nav-menu" id="navMenu">
        ${items}
        <li><a href="programs.html#admissions" class="nav-cta" data-translate="navAdmissions"></a></li>
      </ul>
      <div class="nav-right">
        <button id="lang-toggle" class="lang-toggle" type="button" aria-label="Change language"></button>
        <button class="nav-toggle" id="navToggle" type="button" aria-label="Menu"><i class="fas fa-bars"></i></button>
      </div>
    </div>
  </nav>`;
}

function footerHTML() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <img src="assets/images/jamia-logo.png" alt="" class="footer-logo">
          <h3 data-translate="instName"></h3>
          <p data-translate="footerAbout"></p>
          <div class="footer-social">
            <a href="${SITE.facebook}" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="${SITE.youtube}" target="_blank" rel="noopener" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
        <div>
          <h4 data-translate="quickLinks"></h4>
          <ul>
            <li><a href="index.html" data-translate="navHome"></a></li>
            <li><a href="about.html" data-translate="navAbout"></a></li>
            <li><a href="programs.html" data-translate="navPrograms"></a></li>
            <li><a href="news.html" data-translate="navNews"></a></li>
            <li><a href="contact.html" data-translate="navContact"></a></li>
          </ul>
        </div>
        <div>
          <h4 data-translate="contactFooter"></h4>
          <ul>
            <li><i class="fas fa-map-marker-alt"></i><span data-translate="instLocation"></span></li>
            <li><i class="fas fa-phone"></i><a href="tel:${SITE.phone}"><bdi dir="ltr">${SITE.phoneDisplay}</bdi></a></li>
            <li><i class="fas fa-phone"></i><a href="tel:${SITE.phone2}"><bdi dir="ltr">${SITE.phone2Display}</bdi></a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; ${new Date().getFullYear()} <span data-translate="instName"></span>. <span data-translate="copyright"></span>
      </div>
    </div>
  </footer>`;
}

function fillSiteLinks() {
  document.querySelectorAll('[data-site-link]').forEach(el => {
    const key = el.dataset.siteLink;
    if (key === 'phone') el.href = 'tel:' + SITE.phone;
    else if (key === 'phone2') el.href = 'tel:' + SITE.phone2;
    else if (SITE[key]) el.href = SITE[key];
  });
  const map = document.getElementById('mapFrame');
  if (map) map.src = 'https://maps.google.com/maps?q=' + SITE.mapLatLng + '&z=16&output=embed';
  const dir = document.getElementById('directionsLink');
  if (dir) dir.href = 'https://www.google.com/maps/dir/?api=1&destination=' + SITE.mapLatLng;
}

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if (header) header.innerHTML = headerHTML();
  if (footer) footer.innerHTML = footerHTML();
  fillSiteLinks();

  const toggleBtn = document.getElementById('lang-toggle');
  const update = lang => {
    applyLanguage(lang);
    if (toggleBtn) toggleBtn.textContent = t('langToggle', lang);
  };
  update(getLang());

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const next = getLang() === 'ur' ? 'en' : 'ur';
      localStorage.setItem('language', next);
      update(next);
    });
  }

  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
    navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('open')));
  }

  document.documentElement.classList.remove('js-pending');
});
