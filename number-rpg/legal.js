(function () {
  'use strict';

  var source = window.NUMBER_RPG_LEGAL;
  if (!source) return;

  var root = document.documentElement;
  var body = document.body;
  var pageKey = body.getAttribute('data-page') || 'privacy';
  var picker = document.getElementById('locale-picker');
  var contentRoot = document.getElementById('legal-content');
  var reviewComment = '<!-- OWNER-REVIEW -->';

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function richText(value) {
    var escaped = escapeHtml(value);
    return escaped
      .replace(/admin@dappgo\.com/g, '<a href="mailto:admin@dappgo.com">admin@dappgo.com</a>')
      .replace(/data\.dappgo\.com/g, '<a href="https://data.dappgo.com">data.dappgo.com</a>');
  }

  function localeFromBrowser() {
    var value = (navigator.language || 'en').replace('_', '-').toLowerCase();
    if (value.indexOf('zh-tw') === 0 || value.indexOf('zh-hant') === 0 || value.indexOf('zh-hk') === 0) return 'zh-TW';
    if (value.indexOf('zh') === 0) return 'zh-CN';
    if (value.indexOf('pt') === 0) return 'pt-BR';
    var short = value.split('-')[0];
    return source.localeOrder.indexOf(short) >= 0 ? short : 'en';
  }

  function validLocale(value) {
    return source.localeOrder.indexOf(value) >= 0 ? value : null;
  }

  function selectedLocale() {
    var query = new URLSearchParams(window.location.search).get('lang');
    if (validLocale(query)) return query;
    try {
      var saved = validLocale(localStorage.getItem('number-rpg-locale'));
      if (saved) return saved;
    } catch (_) {}
    return localeFromBrowser();
  }

  function languageLabel(locale) {
    return source.localeNames[locale] || locale;
  }

  function updateQuery(locale) {
    var url = new URL(window.location.href);
    url.searchParams.set('lang', locale);
    window.history.replaceState({}, '', url.pathname + '?' + url.searchParams.toString() + url.hash);
  }

  function render(locale, persist) {
    var page = source.pages[locale] && source.pages[locale][pageKey];
    if (!page) {
      locale = 'en';
      page = source.pages.en[pageKey];
    }
    root.lang = locale === 'zh-TW' ? 'zh-Hant' : locale === 'zh-CN' ? 'zh-Hans' : locale;
    root.dataset.lang = locale;
    var title = 'Number RPG · ' + page.title + ' | DappGo';
    document.title = title;
    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', page.summary);
    document.querySelector('.legal-kicker .kicker-text').textContent = page.kicker;
    document.querySelector('.number-rpg-product').textContent = page.product;
    document.querySelector('.legal-hero h1').textContent = page.title;
    document.querySelector('.updated').textContent = page.effective;
    var html = reviewComment + '<p class="legal-callout">' + richText(page.summary) + '</p>';
    page.sections.forEach(function (section) {
      html += reviewComment + '<section class="legal-section' + (section.placeholder ? ' legal-placeholder' : '') + '">';
      html += reviewComment + '<h2>' + richText(section.heading) + '</h2>';
      section.paragraphs.forEach(function (paragraph) {
        html += reviewComment + '<p' + (section.placeholder ? ' class="legal-callout legal-placeholder"' : '') + '>' + richText(paragraph) + '</p>';
      });
      if (section.bullets && section.bullets.length) {
        html += reviewComment + '<ul>';
        section.bullets.forEach(function (bullet) {
          html += reviewComment + '<li>' + richText(bullet) + '</li>';
        });
        html += '</ul>';
      }
      html += '</section>';
    });
    contentRoot.innerHTML = html;
    if (picker) picker.value = locale;
    if (persist !== false) {
      try { localStorage.setItem('number-rpg-locale', locale); } catch (_) {}
      updateQuery(locale);
    }
  }

  function initializePicker() {
    if (!picker) return;
    source.localeOrder.forEach(function (locale) {
      var option = document.createElement('option');
      option.value = locale;
      option.textContent = languageLabel(locale);
      picker.appendChild(option);
    });
    picker.addEventListener('change', function () { render(picker.value); });
  }

  function initializeTheme() {
    var themeButton = document.getElementById('theme-toggle');
    var storedTheme = 'light';
    try { storedTheme = localStorage.getItem('dappgo-theme') || 'light'; } catch (_) {}
    root.dataset.theme = storedTheme === 'dark' ? 'dark' : 'light';
    function syncTheme() {
      var dark = root.dataset.theme === 'dark';
      if (themeButton) themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
      var themeMeta = document.querySelector('meta[name="theme-color"]');
      if (themeMeta) themeMeta.setAttribute('content', dark ? '#15191f' : '#f6f7f9');
    }
    if (themeButton) themeButton.addEventListener('click', function () {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('dappgo-theme', root.dataset.theme); } catch (_) {}
      syncTheme();
    });
    syncTheme();
  }

  function initializeMenu() {
    var menuButton = document.getElementById('menu-toggle');
    var mainNav = document.getElementById('main-nav');
    if (!menuButton || !mainNav) return;
    menuButton.addEventListener('click', function () {
      var open = body.classList.toggle('menu-open');
      mainNav.classList.toggle('is-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    mainNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        body.classList.remove('menu-open');
        mainNav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
      }
    });
  }

  initializePicker();
  initializeTheme();
  initializeMenu();
  render(selectedLocale(), false);
})();
