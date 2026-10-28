(function () {
  'use strict';

  var copy = {
    en: { locale: 'English', kicker: 'Number RPG · invitation', title: 'A friend saved you a place.', body: 'Open Number RPG to join the adventure. Your invitation code is ready when you are.', code: 'Invitation code', open: 'Open Number RPG', share: 'Copy invite link', copied: 'Invite link copied.', note: 'If the app is not installed, install Number RPG first, then open this link again.' },
    'zh-TW': { locale: '繁體中文', kicker: 'Number RPG · 邀請', title: '朋友邀你一起冒險！', body: '打開 Number RPG 就能加入，邀請碼已經幫你準備好了。', code: '邀請碼', open: '開啟 Number RPG', share: '複製邀請連結', copied: '邀請連結已複製。', note: '如果尚未安裝 App，請先安裝 Number RPG，再重新開啟此連結。' },
    'zh-CN': { locale: '简体中文', kicker: 'Number RPG · 邀请', title: '朋友为你留了一个位置。', body: '打开 Number RPG 加入冒险。你的邀请码已经准备好。', code: '邀请码', open: '打开 Number RPG', share: '复制邀请链接', copied: '邀请链接已复制。', note: '如果尚未安装 App，请先安装 Number RPG，再重新打开此链接。' },
    ja: { locale: '日本語', kicker: 'Number RPG · 招待', title: '友だちが席を用意しました。', body: 'Number RPG を開いて冒険に参加しましょう。招待コードは準備できています。', code: '招待コード', open: 'Number RPG を開く', share: '招待リンクをコピー', copied: '招待リンクをコピーしました。', note: 'アプリが未インストールの場合は、先に Number RPG をインストールしてからリンクを開いてください。' },
    ko: { locale: '한국어', kicker: 'Number RPG · 초대', title: '친구가 자리를 마련했어요.', body: 'Number RPG를 열고 모험에 참여하세요. 초대 코드가 준비되어 있습니다.', code: '초대 코드', open: 'Number RPG 열기', share: '초대 링크 복사', copied: '초대 링크를 복사했습니다.', note: '앱이 설치되어 있지 않다면 먼저 Number RPG를 설치한 뒤 이 링크를 다시 여세요.' },
    es: { locale: 'Español', kicker: 'Number RPG · invitación', title: 'Un amigo te guardó un lugar.', body: 'Abre Number RPG para unirte a la aventura. Tu código de invitación está listo.', code: 'Código de invitación', open: 'Abrir Number RPG', share: 'Copiar enlace', copied: 'Enlace copiado.', note: 'Si no tienes la app, instala Number RPG y vuelve a abrir este enlace.' },
    fr: { locale: 'Français', kicker: 'Number RPG · invitation', title: 'Un ami vous a gardé une place.', body: 'Ouvrez Number RPG pour rejoindre l’aventure. Votre code d’invitation est prêt.', code: 'Code d’invitation', open: 'Ouvrir Number RPG', share: 'Copier le lien', copied: 'Lien copié.', note: 'Si l’app n’est pas installée, installez Number RPG puis rouvrez ce lien.' },
    de: { locale: 'Deutsch', kicker: 'Number RPG · Einladung', title: 'Ein Freund hat einen Platz reserviert.', body: 'Öffnen Sie Number RPG und beginnen Sie das Abenteuer. Ihr Einladungscode ist bereit.', code: 'Einladungscode', open: 'Number RPG öffnen', share: 'Einladungslink kopieren', copied: 'Link kopiert.', note: 'Wenn die App nicht installiert ist, installieren Sie Number RPG und öffnen Sie den Link erneut.' },
    'pt-BR': { locale: 'Português (Brasil)', kicker: 'Number RPG · convite', title: 'Um amigo guardou um lugar para você.', body: 'Abra Number RPG para entrar na aventura. Seu código de convite está pronto.', code: 'Código de convite', open: 'Abrir Number RPG', share: 'Copiar link', copied: 'Link copiado.', note: 'Se o app não estiver instalado, instale Number RPG e abra este link novamente.' },
    th: { locale: 'ไทย', kicker: 'Number RPG · คำเชิญ', title: 'เพื่อนจองที่ไว้ให้คุณแล้ว', body: 'เปิด Number RPG เพื่อเข้าร่วมการผจญภัย รหัสเชิญของคุณพร้อมแล้ว', code: 'รหัสเชิญ', open: 'เปิด Number RPG', share: 'คัดลอกลิงก์เชิญ', copied: 'คัดลอกลิงก์แล้ว', note: 'หากยังไม่ได้ติดตั้งแอป ให้ติดตั้ง Number RPG ก่อนแล้วเปิดลิงก์นี้อีกครั้ง' },
    vi: { locale: 'Tiếng Việt', kicker: 'Number RPG · lời mời', title: 'Bạn bè đã dành một chỗ cho bạn.', body: 'Mở Number RPG để tham gia cuộc phiêu lưu. Mã mời của bạn đã sẵn sàng.', code: 'Mã mời', open: 'Mở Number RPG', share: 'Sao chép liên kết', copied: 'Đã sao chép liên kết.', note: 'Nếu chưa cài ứng dụng, hãy cài Number RPG rồi mở lại liên kết này.' },
    id: { locale: 'Bahasa Indonesia', kicker: 'Number RPG · undangan', title: 'Teman menyisakan tempat untukmu.', body: 'Buka Number RPG untuk ikut berpetualang. Kode undanganmu sudah siap.', code: 'Kode undangan', open: 'Buka Number RPG', share: 'Salin tautan undangan', copied: 'Tautan disalin.', note: 'Jika aplikasi belum terpasang, pasang Number RPG lalu buka tautan ini lagi.' },
  };
  var locales = ['en', 'zh-TW', 'zh-CN', 'ja', 'ko', 'es', 'fr', 'de', 'pt-BR', 'th', 'vi', 'id'];
  var names = { en: 'English', 'zh-TW': '繁體中文', 'zh-CN': '简体中文', ja: '日本語', ko: '한국어', es: 'Español', fr: 'Français', de: 'Deutsch', 'pt-BR': 'Português (Brasil)', th: 'ไทย', vi: 'Tiếng Việt', id: 'Bahasa Indonesia' };
  var pathParts = window.location.pathname.split('/').filter(Boolean);
  var code = new URLSearchParams(window.location.search).get('code') || (pathParts[0] === 'i' ? pathParts[1] : '');
  code = (code || '').trim();
  var validCode = /^[A-Za-z0-9_-]{6,16}$/.test(code);
  if (!validCode) code = '------';
  var select = document.getElementById('invite-locale');
  var root = document.documentElement;
  var themeButton = document.getElementById('theme-toggle');
  var mainNav = document.getElementById('main-nav');
  var menuButton = document.getElementById('menu-toggle');

  function localeFromBrowser() {
    var value = (navigator.language || 'en').replace('_', '-').toLowerCase();
    if (value.indexOf('zh-tw') === 0 || value.indexOf('zh-hant') === 0 || value.indexOf('zh-hk') === 0) return 'zh-TW';
    if (value.indexOf('zh') === 0) return 'zh-CN';
    if (value.indexOf('pt') === 0) return 'pt-BR';
    var short = value.split('-')[0];
    return locales.indexOf(short) >= 0 ? short : 'en';
  }
  function getLocale() {
    var query = new URLSearchParams(window.location.search).get('lang');
    if (locales.indexOf(query) >= 0) return query;
    try { if (locales.indexOf(localStorage.getItem('number-rpg-locale')) >= 0) return localStorage.getItem('number-rpg-locale'); } catch (_) {}
    return localeFromBrowser();
  }
  function setText(locale) {
    var item = copy[locale] || copy.en;
    root.lang = locale === 'zh-TW' ? 'zh-Hant' : locale === 'zh-CN' ? 'zh-Hans' : locale;
    root.dataset.lang = locale;
    document.title = item.title + ' · Number RPG | DappGo';
    document.getElementById('invite-kicker').textContent = item.kicker;
    document.getElementById('invite-title').textContent = validCode ? item.title : (locale === 'en' ? 'This invitation is unavailable.' : item.title);
    document.getElementById('invite-copy').textContent = validCode ? item.body : (locale === 'en' ? 'The invitation code is missing or invalid.' : item.note);
    document.getElementById('invite-label').textContent = item.code;
    document.getElementById('open-invite').textContent = item.open;
    document.getElementById('copy-invite').textContent = item.share;
    document.getElementById('invite-note').textContent = item.note;
    if (select) select.value = locale;
    try { localStorage.setItem('number-rpg-locale', locale); } catch (_) {}
    var url = new URL(window.location.href);
    url.searchParams.set('lang', locale);
    if (validCode) url.searchParams.set('code', code);
    window.history.replaceState({}, '', url.pathname + '?' + url.searchParams.toString());
  }
  function syncTheme() {
    var dark = root.dataset.theme === 'dark';
    if (themeButton) themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#15191f' : '#f6f7f9');
  }
  try { root.dataset.theme = localStorage.getItem('dappgo-theme') === 'dark' ? 'dark' : 'light'; } catch (_) { root.dataset.theme = 'light'; }
  syncTheme();
  if (themeButton) themeButton.addEventListener('click', function () { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('dappgo-theme', root.dataset.theme); } catch (_) {} syncTheme(); });
  if (menuButton && mainNav) menuButton.addEventListener('click', function () { var open = document.body.classList.toggle('menu-open'); mainNav.classList.toggle('is-open', open); menuButton.setAttribute('aria-expanded', String(open)); });
  if (mainNav && menuButton) mainNav.addEventListener('click', function (event) { if (event.target.closest('a')) { document.body.classList.remove('menu-open'); mainNav.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); } });
  if (select) { locales.forEach(function (locale) { var option = document.createElement('option'); option.value = locale; option.textContent = names[locale]; select.appendChild(option); }); select.addEventListener('change', function () { setText(select.value); }); }
  var deepLink = 'number-rpg://i/' + encodeURIComponent(code);
  document.getElementById('open-invite').setAttribute('href', deepLink);
  document.getElementById('invite-code').textContent = validCode ? code : '—';
  document.getElementById('copy-invite').addEventListener('click', function () { var button = this; var item = copy[select ? select.value : 'en'] || copy.en; var link = validCode ? window.location.origin + '/i/' + encodeURIComponent(code) : window.location.href; function done() { button.textContent = item.copied; setTimeout(function () { button.textContent = item.share; }, 1800); } if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(link).then(done).catch(function () {}); else { var input = document.createElement('input'); input.value = link; document.body.appendChild(input); input.select(); try { document.execCommand('copy'); done(); } catch (_) {} input.remove(); } });
  setText(getLocale());
})();
