(function () {
  'use strict';

  var source = window.NUMBER_RPG_LEGAL;
  if (!source) return;

  var root = document.documentElement;
  var body = document.body;
  var pageKey = body.getAttribute('data-page') || 'privacy';
  var picker = document.getElementById('locale-picker');
  var contentRoot = document.getElementById('legal-content');
  var deletionState = {
    googleIdToken: '',
    displayName: '',
    googleReady: false,
    googleAttempts: 0,
    formsReady: false,
  };

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
    var providerLinks = {
      firebaseGoogle: '<a href="https://firebase.google.com/support/privacy">Firebase / Google</a>',
      firebaseRetention: '<a href="https://firebase.google.com/support/privacy">Firebase</a>',
      analyticsRetention: '<a href="https://support.google.com/analytics/answer/7667196">Google Analytics</a>',
      admobDisclosure: '<a href="https://developers.google.com/admob/ios/privacy/data-disclosure">Google AdMob</a>',
      googleRetention: '<a href="https://policies.google.com/technologies/retention">Google</a>',
      admob: '<a href="https://policies.google.com/technologies/partner-sites">AdMob</a>',
      apple: '<a href="https://www.apple.com/legal/privacy/">Apple</a>',
      meta: '<a href="https://www.facebook.com/privacy/policy/">Meta</a>',
      revenuecat: '<a href="https://www.revenuecat.com/privacy/">RevenueCat</a>',
      appleEula: '<a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Apple Standard EULA</a>',
    };
    var locale = root.dataset.lang || 'en';
    var labels = uiCopy(locale);
    ['privacy', 'terms', 'support', 'deleteAccount'].forEach(function (key) {
      var path = key === 'deleteAccount' ? 'delete-account' : key;
      providerLinks[key] = '<a href="/number-rpg/' + path + '/?lang=' + locale + '">' + escapeHtml(labels[key]) + '</a>';
    });
    Object.keys(providerLinks).forEach(function (key) {
      escaped = escaped.replace(new RegExp('\\{\\{' + key + '\\}\\}', 'g'), providerLinks[key]);
    });
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

  function setText(id, value) {
    var element = document.getElementById(id);
    if (element && value !== undefined) element.textContent = value;
  }

  function uiCopy(locale) {
    return source.ui[locale] || source.ui.en;
  }

  function renderSharedCopy(locale) {
    var labels = uiCopy(locale);
    document.querySelectorAll('[data-ui]').forEach(function (element) {
      var value = labels[element.getAttribute('data-ui')];
      if (value) element.textContent = value;
    });
    document.querySelectorAll('[data-nav]').forEach(function (link) {
      var key = link.getAttribute('data-nav');
      link.textContent = key === 'home' ? 'Number RPG' : labels[key];
    });
    // Keep locale selection when following a link, including without local storage.
    document.querySelectorAll('a[href^="/number-rpg/"]').forEach(function (link) {
      var url = new URL(link.getAttribute('href'), window.location.origin);
      url.searchParams.set('lang', locale);
      link.setAttribute('href', url.pathname + url.search + url.hash);
    });
    if (picker) picker.setAttribute('aria-label', labels.language);
    var nav = document.getElementById('main-nav');
    if (nav) nav.setAttribute('aria-label', labels.navigation);
    var footerNav = document.querySelector('.site-footer nav');
    if (footerNav) footerNav.setAttribute('aria-label', labels.footerNavigation);
    var theme = document.getElementById('theme-toggle');
    if (theme) theme.setAttribute('aria-label', root.dataset.theme === 'dark' ? labels.lightTheme : labels.darkTheme);
    var menu = document.getElementById('menu-toggle');
    if (menu) menu.setAttribute('aria-label', body.classList.contains('menu-open') ? labels.closeMenu : labels.openMenu);
  }

  function renderHome(page, locale) {
    if (pageKey !== 'home') return;
    document.querySelectorAll('[data-home]').forEach(function (element) {
      var value = page[element.getAttribute('data-home')];
      if (value) element.textContent = value;
    });
    var stores = window.NRPG_STORES || {};
    document.querySelectorAll('[data-store]').forEach(function (link) {
      var platform = link.getAttribute('data-store');
      var value = stores[platform];
      var url;
      try { url = new URL(value); } catch (_) {}
      var available = !!(url && url.protocol === 'https:');
      link.hidden = !available;
      link.textContent = uiCopy(locale)[platform];
      if (available) link.setAttribute('href', url.href);
      else link.removeAttribute('href');
    });
  }

  function deletionTools(locale) {
    var page = source.pages[locale] && source.pages[locale].deleteAccount;
    return (page && page.tools) || (source.pages.en && source.pages.en.deleteAccount.tools) || {};
  }

  function renderDeletionCopy(locale) {
    if (pageKey !== 'deleteAccount') return;
    var tools = deletionTools(locale);
    setText('delete-tools-title', tools.heading);
    setText('delete-tools-intro', tools.intro);
    setText('google-flow-title', tools.googleHeading);
    setText('google-flow-copy', tools.googleCopy);
    setText('google-account-label', tools.accountLabel);
    setText('google-confirmation-label', tools.confirmLabel);
    setText('google-confirmation-hint', tools.confirmHint);
    setText('google-confirmation-submit', tools.confirmButton);
    setText('request-flow-title', tools.requestHeading);
    setText('request-flow-copy', tools.requestCopy);
    setText('request-account-id-label', tools.accountIdLabel);
    setText('request-account-id-hint', tools.accountIdHint);
    setText('request-email-label', tools.emailLabel);
    setText('request-reason-label', tools.reasonLabel);
    setText('request-submit', tools.submitButton);
    setText('deletion-timeline', tools.timeline);
    setText('deletion-store-note', tools.storeNote);
    var googleStatus = document.getElementById('google-status');
    if (googleStatus && !deletionState.googleIdToken) googleStatus.textContent = tools.signedOut || '';
    if (deletionState.displayName) {
      setText('google-account-name', deletionState.displayName);
      var account = document.getElementById('google-account');
      if (account) account.hidden = false;
    }
  }

  function decodeGoogleCredential(token) {
    try {
      var encoded = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      while (encoded.length % 4) encoded += '=';
      var binary = window.atob(encoded);
      var bytes = '';
      for (var i = 0; i < binary.length; i += 1) bytes += String.fromCharCode(binary.charCodeAt(i));
      return JSON.parse(decodeURIComponent(escape(bytes)));
    } catch (_) {
      return {};
    }
  }

  function apiError(response, tools) {
    if (response.status === 429) return tools.rateLimit;
    return tools.error;
  }

  function handleGoogleCredential(response) {
    if (!response || !response.credential) return;
    var payload = decodeGoogleCredential(response.credential);
    deletionState.googleIdToken = response.credential;
    deletionState.displayName = payload.name || payload.email || 'Google account';
    var account = document.getElementById('google-account');
    var confirmation = document.getElementById('google-confirmation');
    var input = document.getElementById('google-confirmation-input');
    var submit = document.getElementById('google-confirmation-submit');
    if (account) account.hidden = false;
    setText('google-account-name', deletionState.displayName);
    if (confirmation) confirmation.hidden = false;
    if (input) {
      input.value = '';
      input.focus();
    }
    if (submit) submit.disabled = true;
    var status = document.getElementById('google-status');
    if (status) status.textContent = '';
  }

  function initializeGoogleSignIn() {
    if (pageKey !== 'deleteAccount' || deletionState.googleReady) return;
    var button = document.getElementById('google-signin-button');
    if (!button) return;
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.initialize({
        client_id: '103266434487-7q07uac5uf4o5hk6voli26nmhp1stmng.apps.googleusercontent.com',
        callback: handleGoogleCredential,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      window.google.accounts.id.renderButton(button, {
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        width: 280,
      });
      deletionState.googleReady = true;
      return;
    }
    deletionState.googleAttempts += 1;
    if (deletionState.googleAttempts < 40) window.setTimeout(initializeGoogleSignIn, 250);
  }

  function initializeDeletionForms() {
    if (pageKey !== 'deleteAccount' || deletionState.formsReady) return;
    var googleForm = document.getElementById('google-confirmation-form');
    var requestForm = document.getElementById('deletion-request-form');
    var googleInput = document.getElementById('google-confirmation-input');
    var googleSubmit = document.getElementById('google-confirmation-submit');
    if (!googleForm || !requestForm || !googleInput || !googleSubmit) return;
    deletionState.formsReady = true;

    googleInput.addEventListener('input', function () {
      googleSubmit.disabled = googleInput.value !== 'DELETE' || !deletionState.googleIdToken;
    });

    googleForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var tools = deletionTools(root.dataset.lang || 'en');
      if (googleInput.value !== 'DELETE' || !deletionState.googleIdToken) return;
      googleSubmit.disabled = true;
      googleSubmit.setAttribute('aria-busy', 'true');
      var status = document.getElementById('google-status');
      if (status) status.textContent = '';
      fetch((source.apiBase || 'https://data.dappgo.com/v1/number-rpg') + '/account/delete-with-provider', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider: 'google', idToken: deletionState.googleIdToken, confirm: 'DELETE' }),
        credentials: 'omit',
      }).then(function (response) {
        if (!response.ok) throw new Error(apiError(response, tools));
        if (status) status.textContent = tools.success;
        deletionState.googleIdToken = '';
        googleInput.value = '';
      }).catch(function (error) {
        if (status) status.textContent = error.message || tools.error;
        googleSubmit.disabled = false;
      }).finally(function () {
        googleSubmit.removeAttribute('aria-busy');
      });
    });

    requestForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var tools = deletionTools(root.dataset.lang || 'en');
      var accountId = document.getElementById('request-account-id').value.trim();
      var email = document.getElementById('request-email').value.trim();
      var reason = document.getElementById('request-reason').value.trim();
      var submit = document.getElementById('request-submit');
      var status = document.getElementById('request-status');
      if (!accountId || !email) return;
      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');
      if (status) status.textContent = '';
      var request = { accountId: accountId, email: email };
      if (reason) request.reason = reason;
      fetch((source.apiBase || 'https://data.dappgo.com/v1/number-rpg') + '/deletion-requests', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        credentials: 'omit',
      }).then(function (response) {
        if (!response.ok) throw new Error(apiError(response, tools));
        if (status) status.textContent = tools.requestSuccess;
        requestForm.reset();
      }).catch(function (error) {
        if (status) status.textContent = error.message || tools.error;
      }).finally(function () {
        submit.disabled = false;
        submit.removeAttribute('aria-busy');
      });
    });
  }

  function render(locale, persist) {
    var page = source.pages[locale] && source.pages[locale][pageKey];
    if (!page) {
      locale = 'en';
      page = source.pages.en[pageKey];
    }
    root.lang = locale === 'zh-TW' ? 'zh-Hant' : locale === 'zh-CN' ? 'zh-Hans' : locale;
    root.dataset.lang = locale;
    var title = pageKey === 'home' ? 'Number RPG | DappGo' : 'Number RPG · ' + page.title + ' | DappGo';
    document.title = title;
    var description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', page.summary);
    var kicker = document.querySelector('.legal-kicker .kicker-text');
    var product = document.querySelector('.number-rpg-product');
    var hero = document.querySelector('.legal-hero h1');
    var updated = document.querySelector('.updated');
    if (kicker) kicker.textContent = page.kicker;
    if (product) product.textContent = page.product;
    if (hero) hero.textContent = page.title;
    if (updated) updated.textContent = page.effective;
    if (contentRoot) {
      var html = '<p class="legal-callout">' + richText(page.summary) + '</p>';
      page.sections.forEach(function (section) {
        html += '<section class="legal-section' + (section.placeholder ? ' legal-placeholder' : '') + '">';
        html += '<h2>' + richText(section.heading) + '</h2>';
        section.paragraphs.forEach(function (paragraph) {
          html += '<p' + (section.placeholder ? ' class="legal-callout legal-placeholder"' : '') + '>' + richText(paragraph) + '</p>';
        });
        if (section.bullets && section.bullets.length) {
          html += '<ul>';
          section.bullets.forEach(function (bullet) {
            html += '<li>' + richText(bullet) + '</li>';
          });
          html += '</ul>';
        }
        html += '</section>';
      });
      contentRoot.innerHTML = html;
    }
    if (picker) picker.value = locale;
    renderSharedCopy(locale);
    renderHome(page, locale);
    renderDeletionCopy(locale);
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
      var labels = uiCopy(root.dataset.lang || 'en');
      if (themeButton) themeButton.setAttribute('aria-label', dark ? labels.lightTheme : labels.darkTheme);
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
      var labels = uiCopy(root.dataset.lang || 'en');
      menuButton.setAttribute('aria-label', open ? labels.closeMenu : labels.openMenu);
    });
    mainNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        body.classList.remove('menu-open');
        mainNav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', uiCopy(root.dataset.lang || 'en').openMenu);
      }
    });
  }

  initializePicker();
  initializeTheme();
  initializeMenu();
  initializeDeletionForms();
  render(selectedLocale(), false);
  initializeGoogleSignIn();
})();
