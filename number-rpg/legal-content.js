const localeOrder = [
  "en",
  "zh-TW",
  "zh-CN",
  "ja",
  "ko",
  "es",
  "fr",
  "de",
  "pt-BR",
  "th",
  "vi",
  "id"
];

const localeNames = {
  "en": "English",
  "zh-TW": "繁體中文",
  "zh-CN": "简体中文",
  "ja": "日本語",
  "ko": "한국어",
  "es": "Español",
  "fr": "Français",
  "de": "Deutsch",
  "pt-BR": "Português (Brasil)",
  "th": "ไทย",
  "vi": "Tiếng Việt",
  "id": "Bahasa Indonesia"
};

const section = (heading, paragraphs, bullets) => ({
  heading,
  paragraphs,
  ...(bullets ? { bullets } : {})
});

const deletionTools = {
  "en": {
    heading: "Delete on the web",
    intro: "Use the app for immediate deletion, or use these browser options when the app is not installed.",
    googleHeading: "Self-service with Google",
    googleCopy: "Sign in with Google to confirm the account display name, then type DELETE to continue.",
    accountLabel: "Signed in as",
    confirmLabel: "Type DELETE to confirm",
    confirmHint: "This takes effect immediately.",
    confirmButton: "Delete my account",
    requestHeading: "Request help with another account",
    requestCopy: "For Apple, Facebook, or guest accounts, send a request with your account ID and contact email. We will complete it within 30 days after verification.",
    accountIdLabel: "Account ID",
    accountIdHint: "Find it in Settings → Account.",
    emailLabel: "Contact email",
    reasonLabel: "Reason (optional)",
    submitButton: "Submit deletion request",
    timeline: "In-app and Google web self-service deletion take effect immediately. Email and web-form requests are completed within 30 days after verification.",
    storeNote: "Apple and Google may retain purchase records in their store accounts. DappGo may retain only limited records required by law or legitimate security, accounting, fraud, or dispute needs.",
    signedOut: "Google sign-in is ready when the browser library loads.",
    success: "Your account deletion took effect immediately.",
    requestSuccess: "Your request was sent. We will complete it within 30 days after verification.",
    error: "We could not complete this request. Please try again or use the email option.",
    rateLimit: "Too many requests. Please wait and try again later."
  },
  "zh-TW": {
    heading: "在網頁上刪除", intro: "App 未安裝時，可在瀏覽器使用以下選項；在 App 內刪除會立即生效。", googleHeading: "使用 Google 自助刪除", googleCopy: "使用 Google 登入確認帳戶顯示名稱，然後輸入 DELETE 繼續。", accountLabel: "登入帳戶", confirmLabel: "輸入 DELETE 確認", confirmHint: "會立即生效。", confirmButton: "刪除我的帳戶", requestHeading: "請求協助刪除其他帳戶", requestCopy: "Apple、Facebook 或訪客帳戶請提供帳戶 ID 與聯絡電子郵件。我們會在驗證後 30 天內完成。", accountIdLabel: "帳戶 ID", accountIdHint: "可在設定 → 帳戶中找到。", emailLabel: "聯絡電子郵件", reasonLabel: "原因（選填）", submitButton: "提交刪除請求", timeline: "App 內及 Google 網頁自助刪除會立即生效。電子郵件及網頁表單請求會在驗證後 30 天內完成。", storeNote: "Apple 和 Google 可能在商店帳戶中保留購買記錄。DappGo 只會因法律或合理的安全、會計、防詐欺或爭議需要保留有限記錄。", signedOut: "瀏覽器程式庫載入後即可使用 Google 登入。", success: "您的帳戶已立即刪除。", requestSuccess: "已送出請求。我們會在驗證後 30 天內完成。", error: "無法完成請求。請重試或使用電子郵件選項。", rateLimit: "請求過多，請稍候再試。"
  },
  "zh-CN": {
    heading: "在网页上删除", intro: "App 未安装时，可在浏览器使用以下选项；在 App 内删除会立即生效。", googleHeading: "使用 Google 自助删除", googleCopy: "使用 Google 登录确认账户显示名称，然后输入 DELETE 继续。", accountLabel: "登录账户", confirmLabel: "输入 DELETE 确认", confirmHint: "会立即生效。", confirmButton: "删除我的账户", requestHeading: "请求帮助删除其他账户", requestCopy: "Apple、Facebook 或游客账户请提供账户 ID 和联系邮箱。我们会在验证后 30 天内完成。", accountIdLabel: "账户 ID", accountIdHint: "可在设置 → 账户中找到。", emailLabel: "联系邮箱", reasonLabel: "原因（可选）", submitButton: "提交删除请求", timeline: "App 内和 Google 网页自助删除会立即生效。电子邮件和网页表单请求会在验证后 30 天内完成。", storeNote: "Apple 和 Google 可能在商店账户中保留购买记录。DappGo 只会因法律或合理的安全、会计、防欺诈或争议需要保留有限记录。", signedOut: "浏览器库加载后即可使用 Google 登录。", success: "您的账户已立即删除。", requestSuccess: "请求已发送。我们会在验证后 30 天内完成。", error: "无法完成请求。请重试或使用电子邮件选项。", rateLimit: "请求过多，请稍后再试。"
  },
  "ja": {
    heading: "ウェブで削除", intro: "アプリを使ってすぐに削除するか、アプリがない場合はブラウザの以下の方法を使ってください。", googleHeading: "Google でセルフサービス", googleCopy: "Google でサインインして表示名を確認し、DELETE と入力して続行します。", accountLabel: "サインイン中", confirmLabel: "確認のため DELETE と入力", confirmHint: "直ちに反映されます。", confirmButton: "アカウントを削除", requestHeading: "別のアカウントの削除を依頼", requestCopy: "Apple、Facebook、ゲストアカウントはアカウント ID と連絡先メールを送ってください。本人確認後 30 日以内に完了します。", accountIdLabel: "アカウント ID", accountIdHint: "設定 → アカウントで確認できます。", emailLabel: "連絡先メール", reasonLabel: "理由（任意）", submitButton: "削除依頼を送信", timeline: "アプリ内と Google ウェブのセルフサービス削除は直ちに反映されます。メールとフォームの依頼は本人確認後 30 日以内に完了します。", storeNote: "Apple と Google はストアアカウントに購入記録を保持することがあります。DappGo は法律または合理的な安全、会計、不正、紛争上の必要性がある場合に限り、限定的な記録を保持します。", signedOut: "ブラウザライブラリが読み込まれると Google サインインを使えます。", success: "アカウントの削除が直ちに反映されました。", requestSuccess: "依頼を送信しました。本人確認後 30 日以内に完了します。", error: "依頼を完了できませんでした。再試行するかメールを利用してください。", rateLimit: "依頼が多すぎます。しばらく待って再試行してください。"
  },
  "ko": {
    heading: "웹에서 삭제", intro: "앱에서 즉시 삭제하거나 앱이 설치되지 않은 경우 브라우저 옵션을 사용하세요.", googleHeading: "Google 셀프서비스", googleCopy: "Google로 로그인해 계정 표시 이름을 확인한 뒤 DELETE를 입력하여 계속합니다.", accountLabel: "로그인 계정", confirmLabel: "확인을 위해 DELETE 입력", confirmHint: "즉시 적용됩니다.", confirmButton: "내 계정 삭제", requestHeading: "다른 계정 삭제 도움 요청", requestCopy: "Apple, Facebook 또는 게스트 계정은 계정 ID와 연락처 이메일을 보내세요. 확인 후 30일 이내에 완료합니다.", accountIdLabel: "계정 ID", accountIdHint: "설정 → 계정에서 확인할 수 있습니다.", emailLabel: "연락처 이메일", reasonLabel: "사유(선택 사항)", submitButton: "삭제 요청 제출", timeline: "앱 내 및 Google 웹 셀프서비스 삭제는 즉시 적용됩니다. 이메일 및 웹 양식 요청은 확인 후 30일 이내에 완료합니다.", storeNote: "Apple과 Google은 스토어 계정에 구매 기록을 보관할 수 있습니다. DappGo는 법률 또는 합리적인 보안·회계·사기·분쟁 필요에 한해 제한된 기록을 보관할 수 있습니다.", signedOut: "브라우저 라이브러리가 로드되면 Google 로그인을 사용할 수 있습니다.", success: "계정 삭제가 즉시 적용되었습니다.", requestSuccess: "요청을 보냈습니다. 확인 후 30일 이내에 완료합니다.", error: "요청을 완료할 수 없습니다. 다시 시도하거나 이메일 옵션을 이용하세요.", rateLimit: "요청이 너무 많습니다. 잠시 후 다시 시도하세요."
  },
  "es": {
    heading: "Eliminar en la web", intro: "Use la app para eliminar de inmediato o estas opciones del navegador cuando no esté instalada.", googleHeading: "Autoservicio con Google", googleCopy: "Inicie sesión con Google para confirmar el nombre de la cuenta y escriba DELETE para continuar.", accountLabel: "Sesión iniciada como", confirmLabel: "Escriba DELETE para confirmar", confirmHint: "Tiene efecto inmediato.", confirmButton: "Eliminar mi cuenta", requestHeading: "Pedir ayuda con otra cuenta", requestCopy: "Para cuentas de Apple, Facebook o invitado, envíe el ID de cuenta y el correo de contacto. Completaremos la solicitud en 30 días tras verificarla.", accountIdLabel: "ID de cuenta", accountIdHint: "Lo encontrará en Ajustes → Cuenta.", emailLabel: "Correo de contacto", reasonLabel: "Motivo (opcional)", submitButton: "Enviar solicitud de eliminación", timeline: "La eliminación en la app y el autoservicio web de Google son inmediatos. Las solicitudes por correo o formulario se completan en 30 días tras verificar.", storeNote: "Apple y Google pueden conservar registros de compra en sus cuentas de tienda. DappGo solo puede conservar registros limitados por ley o por necesidades razonables de seguridad, contabilidad, fraude o disputas.", signedOut: "El inicio de sesión de Google estará disponible cuando cargue la biblioteca del navegador.", success: "La eliminación de su cuenta se realizó de inmediato.", requestSuccess: "Solicitud enviada. La completaremos en 30 días tras verificarla.", error: "No pudimos completar la solicitud. Vuelva a intentarlo o use el correo electrónico.", rateLimit: "Demasiadas solicitudes. Espere y vuelva a intentarlo."
  },
  "fr": {
    heading: "Supprimer sur le web", intro: "Utilisez l’app pour une suppression immédiate ou ces options du navigateur si elle n’est pas installée.", googleHeading: "Autoservice avec Google", googleCopy: "Connectez-vous avec Google pour confirmer le nom du compte, puis saisissez DELETE pour continuer.", accountLabel: "Connecté en tant que", confirmLabel: "Saisissez DELETE pour confirmer", confirmHint: "Prend effet immédiatement.", confirmButton: "Supprimer mon compte", requestHeading: "Demander de l’aide pour un autre compte", requestCopy: "Pour Apple, Facebook ou un compte invité, envoyez l’ID du compte et l’e-mail de contact. Nous terminerons sous 30 jours après vérification.", accountIdLabel: "ID du compte", accountIdHint: "À trouver dans Réglages → Compte.", emailLabel: "E-mail de contact", reasonLabel: "Motif (facultatif)", submitButton: "Envoyer la demande de suppression", timeline: "La suppression dans l’app et l’autoservice web Google sont immédiats. Les demandes par e-mail ou formulaire sont terminées sous 30 jours après vérification.", storeNote: "Apple et Google peuvent conserver les achats dans leurs comptes de boutique. DappGo ne garde que les dossiers limités nécessaires à la loi ou à des besoins raisonnables de sécurité, comptabilité, fraude ou litige.", signedOut: "La connexion Google sera disponible lorsque la bibliothèque du navigateur sera chargée.", success: "La suppression de votre compte a pris effet immédiatement.", requestSuccess: "Demande envoyée. Nous la terminerons sous 30 jours après vérification.", error: "Impossible de terminer la demande. Réessayez ou utilisez l’e-mail.", rateLimit: "Trop de demandes. Attendez puis réessayez."
  },
  "de": {
    heading: "Im Web löschen", intro: "Nutzen Sie die App für eine sofortige Löschung oder die Browseroptionen, wenn sie nicht installiert ist.", googleHeading: "Selbstservice mit Google", googleCopy: "Melden Sie sich mit Google an, bestätigen Sie den Kontonamen und geben Sie DELETE ein.", accountLabel: "Angemeldet als", confirmLabel: "DELETE zur Bestätigung eingeben", confirmHint: "Wirkt sofort.", confirmButton: "Mein Konto löschen", requestHeading: "Hilfe für ein anderes Konto anfordern", requestCopy: "Für Apple-, Facebook- oder Gastkonten senden Sie Konto-ID und Kontakt-E-Mail. Wir erledigen es nach Prüfung innerhalb von 30 Tagen.", accountIdLabel: "Konto-ID", accountIdHint: "Zu finden unter Einstellungen → Konto.", emailLabel: "Kontakt-E-Mail", reasonLabel: "Grund (optional)", submitButton: "Löschanfrage senden", timeline: "Die Löschung in der App und der Google-Web-Selbstservice wirken sofort. E-Mail- und Formularanfragen werden nach Prüfung innerhalb von 30 Tagen erledigt.", storeNote: "Apple und Google können Käufe in ihren Store-Konten behalten. DappGo bewahrt nur begrenzte Aufzeichnungen auf, die gesetzlich oder für angemessene Sicherheits-, Buchhaltungs-, Betrugs- oder Streitgründe nötig sind.", signedOut: "Google-Anmeldung ist verfügbar, sobald die Browserbibliothek geladen ist.", success: "Ihr Konto wurde sofort gelöscht.", requestSuccess: "Anfrage gesendet. Wir erledigen sie nach Prüfung innerhalb von 30 Tagen.", error: "Die Anfrage konnte nicht abgeschlossen werden. Versuchen Sie es erneut oder nutzen Sie E-Mail.", rateLimit: "Zu viele Anfragen. Warten Sie und versuchen Sie es erneut."
  },
  "pt-BR": {
    heading: "Excluir na web", intro: "Use o app para exclusão imediata ou estas opções do navegador quando ele não estiver instalado.", googleHeading: "Autosserviço com Google", googleCopy: "Faça login com o Google para confirmar o nome da conta e digite DELETE para continuar.", accountLabel: "Conectado como", confirmLabel: "Digite DELETE para confirmar", confirmHint: "Tem efeito imediato.", confirmButton: "Excluir minha conta", requestHeading: "Pedir ajuda com outra conta", requestCopy: "Para contas Apple, Facebook ou de convidado, envie o ID da conta e o e-mail de contato. Concluiremos em até 30 dias após a verificação.", accountIdLabel: "ID da conta", accountIdHint: "Encontre em Configurações → Conta.", emailLabel: "E-mail de contato", reasonLabel: "Motivo (opcional)", submitButton: "Enviar pedido de exclusão", timeline: "A exclusão no app e o autosserviço web do Google são imediatos. Pedidos por e-mail ou formulário são concluídos em até 30 dias após a verificação.", storeNote: "Apple e Google podem manter registros de compra nas contas de loja. A DappGo só mantém registros limitados exigidos por lei ou por necessidades razoáveis de segurança, contabilidade, fraude ou disputa.", signedOut: "O login do Google estará disponível quando a biblioteca do navegador carregar.", success: "A exclusão da sua conta foi efetivada imediatamente.", requestSuccess: "Pedido enviado. Concluiremos em até 30 dias após a verificação.", error: "Não foi possível concluir o pedido. Tente novamente ou use o e-mail.", rateLimit: "Muitos pedidos. Aguarde e tente novamente."
  },
  "th": {
    heading: "ลบบนเว็บ", intro: "ใช้แอปเพื่อลบทันที หรือใช้ตัวเลือกเบราว์เซอร์เมื่อไม่ได้ติดตั้งแอป", googleHeading: "ลบด้วยตนเองผ่าน Google", googleCopy: "เข้าสู่ระบบ Google เพื่อยืนยันชื่อบัญชี แล้วพิมพ์ DELETE เพื่อดำเนินการต่อ", accountLabel: "เข้าสู่ระบบในชื่อ", confirmLabel: "พิมพ์ DELETE เพื่อยืนยัน", confirmHint: "มีผลทันที", confirmButton: "ลบบัญชีของฉัน", requestHeading: "ขอความช่วยเหลือเกี่ยวกับบัญชีอื่น", requestCopy: "สำหรับบัญชี Apple, Facebook หรือผู้เยี่ยมชม ส่ง ID บัญชีและอีเมลติดต่อ เราจะเสร็จภายใน 30 วันหลังยืนยัน", accountIdLabel: "ID บัญชี", accountIdHint: "ดูได้ที่การตั้งค่า → บัญชี", emailLabel: "อีเมลติดต่อ", reasonLabel: "เหตุผล (ไม่บังคับ)", submitButton: "ส่งคำขอลบบัญชี", timeline: "การลบในแอปและการลบด้วยตนเองผ่านเว็บ Google มีผลทันที คำขอทางอีเมลหรือแบบฟอร์มเสร็จภายใน 30 วันหลังยืนยัน", storeNote: "Apple และ Google อาจเก็บบันทึกการซื้อในบัญชีร้านค้า DappGo อาจเก็บบันทึกจำกัดเฉพาะที่กฎหมายหรือความจำเป็นด้านความปลอดภัย บัญชี การฉ้อโกง หรือข้อพิพาทกำหนด", signedOut: "การเข้าสู่ระบบ Google พร้อมใช้เมื่อไลบรารีเบราว์เซอร์โหลดแล้ว", success: "การลบบัญชีของคุณมีผลทันที", requestSuccess: "ส่งคำขอแล้ว เราจะดำเนินการภายใน 30 วันหลังยืนยัน", error: "ดำเนินการคำขอไม่สำเร็จ โปรดลองอีกครั้งหรือใช้อีเมล", rateLimit: "มีคำขอมากเกินไป โปรดรอสักครู่แล้วลองใหม่"
  },
  "vi": {
    heading: "Xóa trên web", intro: "Dùng ứng dụng để xóa ngay hoặc dùng lựa chọn trình duyệt khi chưa cài ứng dụng.", googleHeading: "Tự phục vụ bằng Google", googleCopy: "Đăng nhập Google để xác nhận tên tài khoản, sau đó nhập DELETE để tiếp tục.", accountLabel: "Đã đăng nhập là", confirmLabel: "Nhập DELETE để xác nhận", confirmHint: "Có hiệu lực ngay.", confirmButton: "Xóa tài khoản của tôi", requestHeading: "Yêu cầu trợ giúp với tài khoản khác", requestCopy: "Với tài khoản Apple, Facebook hoặc khách, gửi ID tài khoản và email liên hệ. Chúng tôi hoàn tất trong 30 ngày sau khi xác minh.", accountIdLabel: "ID tài khoản", accountIdHint: "Tìm trong Cài đặt → Tài khoản.", emailLabel: "Email liên hệ", reasonLabel: "Lý do (tùy chọn)", submitButton: "Gửi yêu cầu xóa", timeline: "Xóa trong ứng dụng và tự phục vụ web Google có hiệu lực ngay. Yêu cầu email và biểu mẫu hoàn tất trong 30 ngày sau khi xác minh.", storeNote: "Apple và Google có thể giữ hồ sơ mua hàng trong tài khoản cửa hàng. DappGo chỉ giữ hồ sơ giới hạn do luật hoặc nhu cầu hợp lý về an ninh, kế toán, gian lận hoặc tranh chấp yêu cầu.", signedOut: "Đăng nhập Google sẵn sàng khi thư viện trình duyệt tải xong.", success: "Việc xóa tài khoản của bạn có hiệu lực ngay.", requestSuccess: "Đã gửi yêu cầu. Chúng tôi hoàn tất trong 30 ngày sau khi xác minh.", error: "Không thể hoàn tất yêu cầu. Hãy thử lại hoặc dùng email.", rateLimit: "Quá nhiều yêu cầu. Vui lòng chờ rồi thử lại."
  },
  "id": {
    heading: "Hapus di web", intro: "Gunakan aplikasi untuk penghapusan segera, atau pilihan browser ini ketika aplikasi tidak terpasang.", googleHeading: "Layanan mandiri dengan Google", googleCopy: "Login dengan Google untuk mengonfirmasi nama akun, lalu ketik DELETE untuk melanjutkan.", accountLabel: "Login sebagai", confirmLabel: "Ketik DELETE untuk mengonfirmasi", confirmHint: "Berlaku segera.", confirmButton: "Hapus akun saya", requestHeading: "Minta bantuan untuk akun lain", requestCopy: "Untuk akun Apple, Facebook, atau tamu, kirim ID akun dan email kontak. Kami menyelesaikannya dalam 30 hari setelah verifikasi.", accountIdLabel: "ID akun", accountIdHint: "Temukan di Pengaturan → Akun.", emailLabel: "Email kontak", reasonLabel: "Alasan (opsional)", submitButton: "Kirim permintaan penghapusan", timeline: "Penghapusan dalam aplikasi dan layanan mandiri web Google berlaku segera. Permintaan email dan formulir selesai dalam 30 hari setelah verifikasi.", storeNote: "Apple dan Google dapat menyimpan catatan pembelian di akun toko mereka. DappGo hanya menyimpan catatan terbatas yang diwajibkan hukum atau diperlukan secara wajar untuk keamanan, akuntansi, penipuan, atau sengketa.", signedOut: "Login Google siap digunakan saat pustaka browser dimuat.", success: "Penghapusan akun Anda berlaku segera.", requestSuccess: "Permintaan terkirim. Kami menyelesaikannya dalam 30 hari setelah verifikasi.", error: "Kami tidak dapat menyelesaikan permintaan. Coba lagi atau gunakan email.", rateLimit: "Terlalu banyak permintaan. Tunggu lalu coba lagi."
  }
};

const pages = {
  "en": {
    privacy: {
      "kicker": "Number RPG · privacy",
      "title": "Privacy policy",
      "product": "Number RPG by DappGo",
      "effective": "Last updated: 2026-10-30",
      "summary": "Number RPG lets you play as a guest. Sign-in is optional and adds cloud saves, social features, and recovery across devices. This policy explains what data the game uses, why it uses it, and your choices.",
      "sections": [
        {
          "heading": "Who we are",
          "paragraphs": [
            "Number RPG is operated by Yenlung Lai, a sole proprietor doing business as DappGo, in San Gabriel, California, USA. For GDPR and UK GDPR purposes, DappGo is the controller of the personal data described in this policy. Contact admin@dappgo.com with privacy questions, rights requests, or complaints."
          ]
        },
        {
          "heading": "Information we collect",
          "paragraphs": [
            "You can play as a guest. Depending on the features you use, Number RPG may collect or receive the following categories of information."
          ],
          "bullets": [
            "Account and profile information: an account ID, sign-in provider, provider subject ID, display name, country, and selected leader pet. An email address is used only when Apple, Google, or Meta provides one to us.",
            "Game and social information: cloud saves, progress, scores, leaderboards, gameplay events, invite codes, invite activity, friends, gifts, rewards, and related activity.",
            "Purchase information: product, transaction, store, environment, and purchase-time details received through RevenueCat to grant or restore entitlements. Apple or Google handles payment-card and bank details; Number RPG does not receive them through the app.",
            "Device and technical information: a hashed device or installation identifier, session information, app and platform details, language, time zone, and push-notification tokens when notifications are enabled.",
            "Usage and diagnostic information: app interactions, ad impressions and rewarded-ad events, crash details, performance data, remote settings, and consent or permission choices when the corresponding feature is enabled."
          ]
        },
        {
          "heading": "Sources and purposes",
          "paragraphs": [
            "We receive information directly from you, from the sign-in and app-store providers you choose, from your device and the game, and from other players when you use invites, friends, gifts, or leaderboards."
          ],
          "bullets": [
            "Provide the game, create or restore an account, save progress, operate leaderboards and social features, and keep the service secure.",
            "Process purchases, grant virtual items, restore eligible purchases, prevent cheating and abuse, and investigate fraud or account problems.",
            "Send push notifications that you request, such as friend-life, invite, or event notifications, and maintain optional local reminders on your device.",
            "Measure and improve reliability through analytics, crash reports, performance information, and remote settings after the applicable consent state allows collection.",
            "Show ads. Ads are non-personalized until the required consent is recorded; personalized ads are used only when the required consent and device permissions allow them."
          ]
        },
        {
          "heading": "Service providers and sharing",
          "paragraphs": [
            "We share information with the providers needed for the feature you choose. These providers may process information under their own privacy policies and may act as independent controllers for some services."
          ],
          "bullets": [
            "Apple: Apple sign-in and App Store purchase processing.",
            "Google and Firebase: Google sign-in, Google Play purchase processing, Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config, Cloud Messaging, and Google AdMob advertising and consent services.",
            "Meta: Facebook sign-in, including Meta Limited Login on iOS.",
            "RevenueCat: purchase and entitlement processing.",
            "Other players may see the display name, country, leader pet, scores, and friend relationships that you make visible through the game. Number RPG has no chat feature.",
            "We may also disclose information when reasonably necessary to comply with law, protect users or the service, prevent fraud, or respond to a valid legal request."
          ]
        },
        {
          "heading": "Ads, analytics, notifications, and cookies",
          "paragraphs": [
            "Number RPG uses Google AdMob to provide and measure advertising. The Google Mobile Ads SDK may collect your IP address and infer an approximate location, such as your general region, without accessing precise GPS location or requesting location permission. Google may use this information for app and advertising functionality, analytics, third-party advertising, and developer advertising or marketing, subject to applicable consent choices. DappGo does not separately store this SDK-derived location. Google retains advertising and related diagnostic data under its policies and configured controls, including for security, fraud prevention, and legal obligations; retention varies by data and purpose, so we do not promise a fixed deletion period for Google-held data. Manage available advertising choices in the app’s privacy settings or contact admin@dappgo.com about access or deletion. See Google’s advertising disclosure ({{admobDisclosure}}) and retention policy ({{googleRetention}}).",
            "We use Firebase Crashlytics to diagnose crashes and errors, Performance Monitoring to measure startup, rendering, and network performance, and Remote Config to deliver app settings and gameplay configuration. Where applicable consent choices permit, Firebase Analytics measures app use, gameplay progress, purchases, ad performance, and notification interactions. These services can process installation and session identifiers, crash stack traces and error messages, device, operating-system, app and network information, performance measurements, language, timezone, and approximate country or region derived from IP addresses. Crashlytics reports can include your opaque Number RPG account ID and gameplay region or stage. Analytics uses an app-instance identifier; the app does not supply your name, email, or account ID as its Analytics user ID. Firebase Analytics advertising storage, advertising user data, and advertising personalization are configured off. These uses support operation, reliability, configuration, and analytics; they do not authorize Firebase advertising tracking.",
            "When you enable eligible notifications, Firebase Cloud Messaging processes registration and installation identifiers, an Apple push token on iOS, and the app/device context needed for delivery. For account reminders, our service associates your push token with your account, platform, device language, timezone, and notification preferences. Friend-life-request messages can include a friend’s display name and the recipient account identifier. Promotional event messages require their own marketing preference. Season 2 announcements require a separate subscription to the season-2 topic; enabling lives or expedition reminders does not subscribe you to these announcements. Topic subscriptions and notification interactions may be processed to deliver chosen messages and, where Analytics collection is permitted, measure their use. Change notification choices in the app or device settings.",
            "AdMob uses non-personalized ads by default until the required Google consent is recorded. On iOS, personalized advertising also requires App Tracking Transparency authorization; denying it leaves ads non-personalized. You can change available privacy choices in the app and tracking or notification permissions in device settings. The mobile app does not use browser cookies. This website may save language and theme choices in local storage; Google sign-in on the account-deletion page may use cookies or similar technologies under Google’s policies."
          ]
        },
        {
          "heading": "California privacy rights",
          "paragraphs": [
            "If the California Consumer Privacy Act, as amended by the CPRA, applies to you, you may request to know or access the personal information we collect, delete it, correct inaccurate information, and receive a portable copy where required. You may submit a request to admin@dappgo.com. We will verify requests as needed to protect your account and other players.",
            "We do not sell personal information for money. We may share device or advertising identifiers and ad-interaction information with Google AdMob for cross-context behavioral advertising only after the applicable consent choice; California law may treat that as sharing. To opt out, decline or withdraw the relevant advertising choice when available, turn off applicable device tracking permission, or email admin@dappgo.com with the subject “Do Not Sell or Share My Personal Information.”"
          ],
          "bullets": [
            "You may use an authorized agent with written permission. We may ask the agent and you for information needed to verify the request.",
            "We will not discriminate against you for exercising these rights. We generally respond to know, delete, and correct requests within 45 calendar days; if an extension is allowed, we will explain it. Opt-out requests are handled as soon as reasonably possible."
          ]
        },
        {
          "heading": "EEA and UK privacy rights",
          "paragraphs": [
            "If the GDPR or UK GDPR applies, we use these legal bases: contract necessity to provide the game, accounts, saves, social features, and purchases; consent for personalized advertising and consent-gated analytics or similar optional collection; legitimate interests for security, anti-cheat, fraud prevention, service reliability, and support; and legal obligations for records we must keep. You can withdraw consent at any time, and withdrawal does not affect processing that happened before withdrawal.",
            "You may request access, correction, erasure, restriction of processing, data portability, or object to processing based on legitimate interests. Contact admin@dappgo.com first. You may also complain to the data-protection supervisory authority in the EEA country where you live or work, or where you believe an infringement occurred; in the UK, you may complain to the Information Commissioner’s Office."
          ],
          "bullets": [
            "DappGo and the providers named above may process information in the United States and other countries outside the EEA or UK. Where required, we use a lawful transfer mechanism such as an adequacy decision, standard contractual clauses, or another approved safeguard. Contact us for more information about a transfer.",
            "We do not knowingly use Number RPG to make decisions based only on automated processing that produce legal or similarly significant effects."
          ]
        },
        {
          "heading": "Retention and deletion",
          "paragraphs": [
            "We keep account and player data while your account is active. Successful in-app and Google web self-service account deletion takes effect immediately; email or web-form requests are completed within 30 days after verification, subject to limited retention exceptions. Our published retention commitment for Google Analytics and Firebase Analytics data remains 14 months, within the scope of the property’s retention controls described in Google’s documentation ({{analyticsRetention}}); those controls do not cover every aggregate report or separately exported record. Server request logs are retained for 30 days. Apple and Google may retain purchase records in their store accounts.",
            "Firebase retention varies by service. Under Firebase’s published policy ({{firebaseRetention}}), Crashlytics begins removing crash data and associated identifiers after 90 days. Performance Monitoring keeps IP-associated events for 30 days and installation-associated or de-identified performance data for 60 days before removal begins. Cloud Messaging and Remote Config installation identifiers may remain until installation deletion is requested; Firebase states that removal from live and backup systems completes within 180 days after that request. Account deletion does not immediately erase every Firebase record.",
            "Account deletion requests removal of developer-held account, player, and push-registration data, as described on {{deleteAccount}}. The app also attempts to clear the departing account’s notification eligibility, topic subscriptions, and push token. This asynchronous cleanup can fail and does not itself delete the Firebase installation identifier or previously uploaded Analytics, crash, or performance records. Those remain subject to provider retention and deletion processes. Contact admin@dappgo.com about access to or deletion of associated Firebase information, in addition to the in-app and public deletion options. Limited records may be kept for tax, accounting, security, fraud prevention, disputes, or legal obligations, then deleted or anonymized when that reason ends."
          ],
          "bullets": [
            "Provider policies: {{firebaseGoogle}}, {{admob}}, {{apple}}, {{meta}}, and {{revenuecat}}."
          ]
        },
        {
          "heading": "Children",
          "paragraphs": [
            "Number RPG is not directed to children under 13 and is intended for people aged 13 and older. We do not knowingly invite a child under 13 to create an account. If we learn that a child under 13 has provided personal information, a parent or guardian can contact admin@dappgo.com; after verification, we will delete the child’s account and information as required by law. If local law requires a higher age or parental consent, that rule applies."
          ]
        },
        {
          "heading": "Security, changes, and contact",
          "paragraphs": [
            "We use reasonable technical and organizational safeguards for the information we handle, including protected account sessions and verification for deletion requests. No service can guarantee absolute security, so keep your device and sign-in credentials secure.",
            "We may update this policy when the game, providers, or legal requirements change. The date at the top identifies the current version. Contact admin@dappgo.com with privacy questions, rights requests, or concerns."
          ]
        }
      ]
    },
    terms: {
      kicker: "Number RPG · terms", title: "Terms of service", product: "Number RPG by DappGo", effective: "Effective date: 2026-10-27",
      summary: "These terms explain the rules for using Number RPG, including guest play, optional accounts, virtual items, purchases, fair play, account termination, and your legal rights.",
      sections: [
        section("1. Acceptance and age", ["By installing, accessing, or using Number RPG, you agree to these Terms of Service and the Number RPG Privacy Policy. Number RPG is intended for people aged 13 and older. Do not use it if you are under the applicable minimum age or cannot legally agree to these Terms. If you do not agree, do not use the game."]),
        section("2. License and service", ["Number RPG is operated by Yenlung Lai, a sole proprietor doing business as DappGo, in San Gabriel, California, USA. DappGo grants you a limited, personal, non-exclusive, non-transferable, and revocable license to use the game for personal, non-commercial entertainment. You receive no ownership of the game, its code, artwork, names, or other content. For iOS, the {{appleEula}} also applies where applicable."]),
        section("3. Accounts and security", ["You may play as a guest. Optional Apple, Google, or Facebook sign-in supports cloud saves, social features, leaderboards, and purchase restoration. Keep your device, sign-in credentials, and recovery information secure. Do not share an account, impersonate another player, or provide information that is knowingly false."]),
        section("4. Virtual items and purchases", ["The game may offer virtual currency, lives, accessories, upgrades, or other digital entitlements. They have no cash value, are licensed for use only in the game, and may not be sold, transferred, or redeemed outside the game. Consumable items are used when granted or consumed in the game; non-consumable entitlements may be restored when the store supports restoration. Availability and balances may change when the service or game rules change.", "Purchases are made through Apple App Store or Google Play billing. Refunds, cancellations, and payment disputes must be requested from the store that processed the transaction, subject to that store’s rules. RevenueCat helps us record and restore purchase entitlements. Deleting a Number RPG account deletes game data; eligible store purchases may remain restorable through the store account."]),
        section("5. Fair play and acceptable use", ["Do not cheat, exploit bugs, automate play, manipulate scores or rewards, abuse invite or gift systems, impersonate another player, interfere with the game or service, or use the game to harm another person. Do not submit content or display names that are unlawful, abusive, hateful, sexually exploitative, or infringe another person’s rights."]),
        section("6. Enforcement and termination", ["DappGo may limit, suspend, or terminate access when it reasonably believes an account or device is cheating, abusive, fraudulent, unsafe, or in breach of these Terms. We may also change, pause, or discontinue parts of the service. You may delete your account from Settings → Account → Delete account or use the instructions on the account-deletion page. Termination does not remove rights or obligations that should continue by their nature."]),
        section("7. Disclaimers and limits", ["To the fullest extent permitted by law, the game is provided as available and without promises that it will be uninterrupted, error-free, secure, or permanently preserve every item or save. DappGo is not responsible for failures caused by your device, network, app store, third-party provider, or events outside reasonable control. To the extent permitted by law, DappGo will not be liable for indirect, incidental, special, consequential, or lost-profit damages, and DappGo’s total liability for direct damages will not exceed the greater of the amount you paid to DappGo in the previous 12 months or 100 US dollars. Nothing in these Terms excludes liability for fraud, willful misconduct, death or personal injury where it cannot be excluded, or consumer rights that cannot legally be limited."]),
        section("8. Indemnity", ["To the extent permitted by law, you agree to reimburse DappGo for third-party claims, losses, and reasonable costs that result from your unlawful use of the game, your breach of these Terms, or content you submit. This section does not require you to reimburse DappGo for its own misconduct and does not limit mandatory consumer rights."]),
        section("9. Disputes and governing law", ["If you have a dispute, please contact admin@dappgo.com first so we can try to resolve it. These Terms do not require arbitration and do not waive your right to bring a claim in a court that has jurisdiction. Nothing prevents you from using a small-claims court or another forum that consumer law makes available.", "These Terms are governed by the laws of the State of California, USA, without regard to conflict-of-laws rules. Subject to the consumer-rights carve-out above, the state or federal courts located in Los Angeles County, California are the exclusive venue for disputes that may be brought there. This does not limit mandatory consumer rights in the country where you live."]),
        section("10. Changes and contact", ["We may update these Terms when the game, providers, or legal requirements change. The effective date at the top identifies the current version. If a change is material, we will provide notice through the game or another reasonable channel when required. Questions about these Terms can be sent to admin@dappgo.com."])
      ]
    },
    deleteAccount: {
      kicker: "Number RPG · account deletion", title: "Delete your account", product: "Number RPG by DappGo", effective: "Instructions effective: 2026-10-27",
      summary: "You can delete a Number RPG account in the app, use Google self-service on this page, or request help by web form or email. Number RPG is operated by Yenlung Lai, a sole proprietor doing business as DappGo, San Gabriel, California, USA.",
      sections: [
        section("Delete in the app", ["Open Number RPG and go to Settings → Account → Delete account. Read the confirmation, confirm the deletion, and keep the app online until it reports success. In-app deletion takes effect immediately. If an Apple identity is linked, the app may require Apple re-authorization before deletion can finish."]),
        section("Delete on the web", ["If the account is linked to Google, use the Google self-service control below. Sign in with Google, confirm the displayed account, type DELETE, and submit. A successful web deletion takes effect immediately."]),
        section("Request deletion by web form or email", ["For Apple, Facebook, or guest accounts, use the form below or email admin@dappgo.com. Include the account ID from Settings → Account and the contact email linked to the account when available. We will verify the request and complete it within 30 days. Do not send a password, provider access token, or Apple private key."]),
        section("What we remove and what may remain", ["A successful deletion removes the Number RPG account and player data, including provider identities, display name, country, leader pet, device and session records, cloud saves, scores, invites, friendships, gifts, rewards, events, activity, fraud records, and push tokens. The app resets local game progress after in-app deletion.", "Apple and Google may keep purchase records in their store accounts, and eligible purchases may remain restorable through those stores. DappGo may keep a limited record when necessary for tax, accounting, fraud prevention, security, disputes, or another legal obligation. We delete or anonymize that limited information when the reason for keeping it ends."]),
        section("Timing and help", ["In-app and Google web self-service deletion take effect immediately. Web-form and email requests are completed within 30 days after verification. Contact admin@dappgo.com if the in-app flow fails, you cannot access the account, or you need help with a request."])
      ],
      tools: deletionTools.en
    }
  },
  "zh-TW": {
    privacy: {
      "kicker": "Number RPG · 隱私",
      "title": "隱私權政策",
      "product": "DappGo 的 Number RPG",
      "effective": "最後更新：2026-10-30",
      "summary": "Number RPG 可讓您以訪客身分遊玩。登入是選擇性的，可啟用雲端存檔、社交功能及跨裝置恢復。本政策說明遊戲使用哪些資料、使用原因，以及您的選擇。",
      "sections": [
        {
          "heading": "我們是誰",
          "paragraphs": [
            "Number RPG 由 Yenlung Lai 經營；Yenlung Lai 是在美國加州 San Gabriel 以 DappGo 名義營業的獨資經營者。就 GDPR 及英國 GDPR 而言，DappGo 是本政策所述個人資料的控制者。如有隱私問題、權利請求或申訴，請寄信至 admin@dappgo.com。"
          ]
        },
        {
          "heading": "我們收集的資料",
          "paragraphs": [
            "您可以以訪客身分遊玩。依您使用的功能，Number RPG 可能收集或接收以下類別的資料。"
          ],
          "bullets": [
            "帳戶與個人資料：帳戶 ID、登入提供者、提供者主體 ID、顯示名稱、國家/地區及選定的領隊寵物。只有在 Apple、Google 或 Meta 提供電子郵件時，我們才會使用該電子郵件。",
            "遊戲與社交資料：雲端存檔、進度、分數、排行榜、遊戲事件、邀請碼、邀請活動、好友、禮物、獎勵及相關活動。",
            "購買資料：透過 RevenueCat 接收的商品、交易、商店、環境及購買時間資料，用於發放或恢復權益。付款卡或銀行資料由 Apple 或 Google 處理，Number RPG 不會透過 App 接收。",
            "裝置與技術資料：經雜湊處理的裝置或安裝識別碼、工作階段資料、App 與平台資訊、語言、時區，以及啟用通知時的推播通知權杖。",
            "使用與診斷資料：App 互動、廣告曝光及獎勵廣告事件、錯誤資料、效能資料、遠端設定，以及啟用相應功能時的同意或權限選擇。"
          ]
        },
        {
          "heading": "資料來源與用途",
          "paragraphs": [
            "我們直接從您取得資料，也從您選擇的登入與商店提供者、您的裝置與遊戲，以及您使用邀請、好友、禮物或排行榜時的其他玩家取得資料。"
          ],
          "bullets": [
            "提供遊戲、建立或恢復帳戶、保存進度、運作排行榜與社交功能，並維護服務安全。",
            "處理購買、發放虛擬物品、恢復符合條件的購買、防止作弊與濫用，並調查詐欺或帳戶問題。",
            "傳送您要求的推播通知，例如好友生命、邀請或活動通知，並在您的裝置上維持選擇性的本機提醒。",
            "在適用的同意狀態允許收集後，透過分析、錯誤報告、效能資料及遠端設定衡量並改善可靠性。",
            "顯示廣告。廣告在記錄必要同意前會是非個人化廣告；只有在必要同意及裝置權限允許時才會使用個人化廣告。"
          ]
        },
        {
          "heading": "服務提供者與分享",
          "paragraphs": [
            "我們會與您選擇的功能所需的提供者分享資料。這些提供者可能依自己的隱私政策處理資料；對部分服務而言，他們可能是獨立的資料控制者。"
          ],
          "bullets": [
            "Apple：Apple 登入及 App Store 購買處理。",
            "Google 與 Firebase：Google 登入、Google Play 購買處理、Firebase Analytics、Crashlytics、Performance Monitoring、Remote Config、Cloud Messaging，以及 Google AdMob 廣告與同意服務。",
            "Meta：Facebook 登入，包括 iOS 上的 Meta Limited Login。",
            "RevenueCat：使用購買與交易資料處理購買及權益。",
            "其他玩家可能看到您透過遊戲公開的顯示名稱、國家/地區、領隊寵物、分數及好友關係。Number RPG 沒有聊天功能。"
          ]
        },
        {
          "heading": "廣告、分析、通知與 Cookie",
          "paragraphs": [
            "Number RPG 使用 Google AdMob 提供廣告並衡量成效。Google Mobile Ads SDK 可能收集 IP 位址，推估您所在的大致地區，但不會存取精確 GPS 位置或要求位置權限。依適用的同意選擇，Google 可能將這些資料用於 App 與廣告功能、分析、第三方廣告，以及開發者廣告或行銷。DappGo 不會另行保存 SDK 推估的位置。Google 依其政策與設定的保存控制保留廣告及相關診斷資料，包括安全、防詐欺與法律所需的資料；期限依資料類型及用途而異，我們不承諾 Google 持有資料的固定刪除期限。您可在 App 隱私設定調整可用的廣告選項，或聯絡 admin@dappgo.com 請求存取或刪除。詳見 Google 廣告資料揭露（{{admobDisclosure}}）及保存政策（{{googleRetention}}）。",
            "我們使用 Firebase Crashlytics 診斷當機與錯誤、Performance Monitoring 衡量啟動、畫面繪製及網路效能，並以 Remote Config 傳送 App 設定與遊戲配置。在適用的同意選擇允許時，Firebase Analytics 會衡量 App 使用、遊戲進度、購買、廣告成效及通知互動。這些服務可能處理安裝與工作階段識別碼、當機堆疊與錯誤訊息、裝置、作業系統、App 與網路資訊、效能數據、語言、時區，以及從 IP 位址推估的國家或地區。Crashlytics 報告可能包含不直接顯示身分的 Number RPG 帳戶 ID 及遊戲區域或關卡。Analytics 使用 App 執行個體識別碼；App 不會將姓名、電子郵件或帳戶 ID 設為 Analytics 使用者 ID。我們關閉 Firebase Analytics 的廣告儲存空間、廣告使用者資料及廣告個人化。這些用途支援營運、可靠性、配置及分析，不代表授權 Firebase 進行廣告追蹤。",
            "啟用適用的通知後，Firebase Cloud Messaging 會處理註冊與安裝識別碼、iOS 上的 Apple 推播權杖，以及傳送通知所需的 App 與裝置資訊。帳戶提醒會將推播權杖與帳戶、平台、裝置語言、時區及通知偏好一併保存。好友生命請求通知可能包含好友顯示名稱及收件者帳戶識別碼。活動促銷通知需要另外開啟行銷偏好；第 2 季公告則需要另行訂閱 season-2 主題，開啟生命或遠征提醒不會自動訂閱。我們可能處理主題訂閱及通知互動，以傳送您選擇的訊息，並在允許 Analytics 收集時衡量使用情形。您可在 App 或裝置設定變更通知選擇。",
            "AdMob 在記錄必要的 Google 同意前預設提供非個人化廣告；iOS 個人化廣告還需要 App Tracking Transparency 授權，拒絕後仍使用非個人化廣告。您可在 App 調整可用的隱私選項，並在裝置設定管理追蹤及通知權限。手機 App 不使用瀏覽器 Cookie；網站可能以本機儲存保存語言及主題，帳戶刪除頁面的 Google 登入可能依 Google 政策使用 Cookie 或類似技術。"
          ]
        },
        {
          "heading": "加州隱私權",
          "paragraphs": [
            "若 CCPA（經 CPRA 修訂）適用，您可以要求知道、存取、刪除或更正個人資料，並在法律要求時取得可攜式副本，請寄信至 admin@dappgo.com。我們不會為了金錢出售個人資料；只有在適用同意後，可能將裝置或廣告識別碼及廣告互動資料分享給 Google AdMob 用於跨情境行為廣告。若要退出，拒絕或撤回廣告選擇、關閉裝置追蹤權限，或以主旨「Do Not Sell or Share My Personal Information」寄信。",
            "您可使用書面授權的代理人；我們會驗證請求且不會歧視行使權利的人。知悉、刪除及更正請求通常在 45 個日曆日內回覆，退出請求會儘快處理。"
          ]
        },
        {
          "heading": "歐洲經濟區與英國的隱私權",
          "paragraphs": [
            "若 GDPR 或英國 GDPR 適用，法律依據包括：提供遊戲、帳戶、存檔、社交功能與購買所必要的契約；個人化廣告及選擇性收集所需的同意；安全、防作弊、防詐欺、服務可靠性及支援所需的正當利益；以及保存必要紀錄的法律義務。您可撤回同意。您也可要求存取、更正、刪除、限制處理、資料可攜性或反對正當利益處理，並向所在國監管機關或英國 Information Commissioner’s Office 申訴。",
            "DappGo 和提供者可能在美國及 EEA/英國以外處理資料；必要時使用適足性決定、標準契約條款或其他核准保障措施。"
          ]
        },
        {
          "heading": "保存與刪除",
          "paragraphs": [
            "帳戶啟用期間，我們保留帳戶及玩家資料。成功的 App 內及 Google 網頁自助刪除會立即生效；電子郵件或表單請求在驗證後 30 天內完成，少數必要的保留例外除外。Google Analytics 與 Firebase Analytics 資料仍適用已公布的 14 個月保存承諾，其範圍依資源的保存控制及 Google 說明（{{analyticsRetention}}）而定，並不涵蓋所有彙總報表或另行匯出的記錄。伺服器請求記錄保留 30 天；Apple 與 Google 可能在商店帳戶保留購買記錄。",
            "Firebase 依服務採用不同保存期限。依 Firebase 公布的政策（{{firebaseRetention}}），Crashlytics 在 90 天後開始移除當機資料及相關識別碼；Performance Monitoring 與 IP 相關的事件保留 30 天，與安裝相關或去識別化的效能資料保留 60 天後開始移除。Cloud Messaging 與 Remote Config 的安裝識別碼可能保留至提出安裝刪除請求；Firebase 表示會在該請求後 180 天內完成正式及備份系統的移除。刪除帳戶不會立即清除所有 Firebase 記錄。",
            "刪除帳戶會要求移除開發者持有的帳戶、玩家及推播註冊資料，詳見{{deleteAccount}}。App 也會嘗試清除離開帳戶的通知資格、主題訂閱及推播權杖；這是非同步處理，可能失敗，也不會因此刪除 Firebase 安裝識別碼或先前上傳的 Analytics、當機及效能記錄。這些資料仍依提供者的保存與刪除流程處理。除了 App 內及公開的刪除選項，您也可聯絡 admin@dappgo.com 請求存取或刪除相關 Firebase 資料。因稅務、會計、安全、防詐欺、爭議或法律義務所需的有限記錄，會在保留理由結束後刪除或匿名化。"
          ]
        },
        {
          "heading": "兒童、安全、變更與聯絡",
          "paragraphs": [
            "Number RPG 不以 13 歲以下兒童為對象，若得知兒童提供資料，家長可聯絡 admin@dappgo.com；驗證後我們會依法刪除。若當地要求更高年齡或家長同意，適用當地規定。我們採取合理安全措施但不能保證絕對安全。政策可能因遊戲、提供者或法律變更而更新，頂部日期代表目前版本。"
          ]
        }
      ]
    },
    terms: { kicker: "Number RPG · 條款", title: "服務條款", product: "DappGo 的 Number RPG", effective: "生效日期：2026-10-27", summary: "本條款說明使用 Number RPG 的規則，包括訪客遊玩、選擇性帳戶、虛擬物品、購買、公平遊戲、帳戶終止及您的法律權利。", sections: [
      section("1. 接受條款與年齡", ["安裝、存取或使用 Number RPG 即表示您同意本服務條款及隱私權政策。遊戲供年滿 13 歲者使用；未達最低年齡或無法合法同意時請勿使用。"]),
      section("2. 授權與服務", ["Number RPG 由 Yenlung Lai 以 DappGo 名義在 San Gabriel 經營。DappGo 授予個人、非商業、有限、非專屬、不可轉讓且可撤銷的遊戲使用授權，不轉讓遊戲、程式碼、藝術、名稱或內容所有權。iOS 適用 Apple 的 {{appleEula}}。"]),
      section("3. 帳戶與安全", ["可作為訪客遊玩；Apple、Google 或 Facebook 登入可支援雲端存檔、社交功能、排行榜及購買恢復。請保護裝置與登入資料，不得分享帳戶、冒充他人或故意提供虛假資料。"]),
      section("4. 虛擬物品與購買", ["虛擬貨幣、生命、配件、升級及其他權益沒有現金價值，只能在遊戲內使用，不得在遊戲外出售、轉讓或兌換。消耗品會被使用；商店支援時非消耗性權益可恢復。購買透過 Apple App Store 或 Google Play，退款依商店規則處理；RevenueCat 協助記錄與恢復權益，刪除帳戶後商店購買可能仍可恢復。"]),
      section("5. 公平遊戲與可接受使用", ["不得作弊、利用錯誤、自動化、操縱分數或獎勵、濫用邀請或禮物、冒充玩家、干擾服務或傷害他人，也不得提交違法、辱罵、仇恨、性剝削或侵權內容。"]),
      section("6. 執行與終止", ["我們可因作弊、濫用、詐欺、不安全或違反條款而限制、暫停或終止存取，也可變更或停止服務。可在設定 → 帳戶 → 刪除帳戶刪除；依性質應繼續的權利義務仍然有效。"]),
      section("7. 免責與限制", ["在法律允許範圍內，遊戲按現狀提供，不保證不中斷、無錯誤、安全或永久保存。DappGo 不對裝置、網路、商店、第三方或不可控事件造成的故障負責，也不對間接或特殊損害負責；直接損害責任不超過前 12 個月付款或 100 美元較高者。本條款不限制法律不得限制的責任或消費者權利。"]),
      section("8. 賠償與爭議", ["在法律允許範圍內，您須就違法使用、違反條款或提交內容造成的第三方請求和合理費用補償 DappGo，但不包括 DappGo 自身不當行為。爭議請先聯絡 admin@dappgo.com；本條款不要求仲裁。"]),
      section("9. 準據法與管轄", ["本條款適用加州法律。除消費者強制權利外，爭議專屬於加州 Los Angeles County 的州或聯邦法院；不限制您居住地的強制性消費者權利。"]),
      section("10. 變更與聯絡", ["我們可能因遊戲、提供者或法律變更更新條款；重大變更會在法律要求時通知。生效日期代表目前版本，問題請寄至 admin@dappgo.com。"])
    ] },
    deleteAccount: { kicker: "Number RPG · 刪除帳戶", title: "刪除您的帳戶", product: "DappGo 的 Number RPG", effective: "說明生效日期：2026-10-27", summary: "您可以在 App 內刪除帳戶，使用本頁的 Google 自助服務，或透過網頁表單或電子郵件請求協助。", sections: [
      section("在 App 內刪除", ["開啟 Number RPG，前往設定 → 帳戶 → 刪除帳戶，確認並保持 App 在線直到成功。App 內刪除立即生效；Apple 身分可能需要重新授權。"]),
      section("在網頁上刪除", ["Google 帳戶可使用下方自助服務登入、確認帳戶、輸入 DELETE 並送出，成功後立即生效。"]),
      section("透過表單或電子郵件要求刪除", ["Apple、Facebook 或訪客帳戶請使用表單或寄信至 admin@dappgo.com，提供設定 → 帳戶的帳戶 ID 和聯絡電子郵件（如有）。驗證後 30 天內完成，請勿寄送密碼、權杖或 Apple 私密金鑰。"]),
      section("我們會移除及保留的資料", ["我們會移除帳戶、提供者身分、名稱、國家、領隊寵物、裝置、工作階段、存檔、分數、邀請、好友、禮物、獎勵、事件、活動、詐欺記錄及推播權杖；App 內刪除也會重設本機進度。Apple 和 Google 可能保留購買記錄，DappGo 可能因法律、會計、安全、防詐欺或爭議需要保留有限記錄，理由結束後刪除或匿名化。"]),
      section("時間與協助", ["App 內及 Google 網頁自助刪除立即生效；表單及電子郵件請求在驗證後 30 天內完成。流程失敗或需要協助請聯絡 admin@dappgo.com。"])
    ] }
  },
  "zh-CN": {
    privacy: {
      "kicker": "Number RPG · 隐私",
      "title": "隐私政策",
      "product": "DappGo 的 Number RPG",
      "effective": "最后更新：2026-10-30",
      "summary": "Number RPG 支持以游客身份游玩。登录是可选的，可启用云端存档、社交功能和跨设备恢复。本政策说明游戏使用哪些数据、使用原因以及您的选择。",
      "sections": [
        {
          "heading": "我们是谁",
          "paragraphs": [
            "Number RPG 由 Yenlung Lai 运营；Yenlung Lai 是在美国加利福尼亚州 San Gabriel 以 DappGo 名义经营的独资经营者。就 GDPR 和英国 GDPR 而言，DappGo 是本政策所述个人数据的控制者。如有隐私问题、权利请求或投诉，请发送邮件至 admin@dappgo.com。"
          ]
        },
        {
          "heading": "我们收集的信息",
          "paragraphs": [
            "您可以以游客身份游玩。根据您使用的功能，Number RPG 可能收集或接收以下类别的信息。"
          ],
          "bullets": [
            "账户和资料：账户 ID、登录提供商、提供商主体 ID、显示名称、国家/地区和选定的领队宠物。只有在 Apple、Google 或 Meta 提供电子邮件时，我们才会使用该邮箱。",
            "游戏和社交：云端存档、进度、分数、排行榜、游戏事件、邀请码、邀请活动、好友、礼物、奖励及相关活动。",
            "购买：通过 RevenueCat 接收商品、交易、商店、环境和购买时间，用于发放或恢复权益。付款卡和银行信息由 Apple 或 Google 处理，Number RPG 不会通过 App 接收。",
            "设备和技术：经过哈希处理的设备或安装标识符、会话、App 和平台、语言、时区，以及启用通知时的推送令牌。",
            "使用和诊断：App 互动、广告展示、奖励广告事件、崩溃、性能、远程设置及同意或权限选择。"
          ]
        },
        {
          "heading": "数据来源和用途",
          "paragraphs": [
            "我们直接从您、您选择的登录和商店提供商、您的设备和游戏中获取信息；当您使用邀请、好友、礼物或排行榜时，也会从其他玩家获得信息。"
          ],
          "bullets": [
            "提供游戏、创建或恢复账户、保存进度、运行排行榜和社交功能，并保护服务安全。",
            "处理购买、发放虚拟物品、恢复符合条件的购买、防止作弊和滥用，并调查欺诈或账户问题。",
            "发送您请求的推送通知和可选的本地提醒。",
            "在适用的同意状态允许后，通过分析、崩溃报告、性能数据和远程设置改善可靠性。",
            "展示广告；必要同意前为非个性化广告，必要同意和设备权限允许时才使用个性化广告。"
          ]
        },
        {
          "heading": "服务提供商和共享",
          "paragraphs": [
            "我们会与功能所需的提供商共享信息，他们可能按自己的政策处理，并在部分服务中作为独立控制者。Apple 处理 Apple 登录和 App Store 购买；Google/Firebase 处理 Google 登录、Google Play、Firebase Analytics、Crashlytics、Performance Monitoring、Remote Config、Cloud Messaging 及 Google AdMob；Meta 处理 Facebook 登录；RevenueCat 处理购买和权益。其他玩家可看到您公开的名称、国家/地区、领队宠物、分数和好友关系；Number RPG 没有聊天。法律、安全、防欺诈或有效法律请求需要时，我们也可能披露信息。"
          ]
        },
        {
          "heading": "广告、分析、通知和 Cookie",
          "paragraphs": [
            "Number RPG 使用 Google AdMob 提供广告并衡量效果。Google Mobile Ads SDK 可能收集 IP 地址，据此推测大致地区，但不会访问精确 GPS 位置或请求位置权限。根据适用的同意选择，Google 可能将这些信息用于应用及广告功能、分析、第三方广告以及开发者广告或营销。DappGo 不会单独保存 SDK 推测的位置。Google 按照其政策及配置的保留设置保存广告和相关诊断数据，包括安全、防欺诈及法律所需的数据；期限因数据类型和用途而异，我们不承诺 Google 所持数据的固定删除期限。您可在应用隐私设置中调整可用的广告选项，或联系 admin@dappgo.com 请求访问或删除。参见 Google 广告数据披露（{{admobDisclosure}}）和保留政策（{{googleRetention}}）。",
            "我们使用 Firebase Crashlytics 诊断崩溃与错误，使用 Performance Monitoring 衡量启动、画面渲染和网络性能，并通过 Remote Config 下发应用设置和游戏配置。在适用的同意选择允许时，Firebase Analytics 会衡量应用使用、游戏进度、购买、广告效果和通知互动。这些服务可能处理安装及会话标识符、崩溃堆栈和错误消息、设备、操作系统、应用及网络信息、性能数据、语言、时区，以及根据 IP 地址推测的国家或地区。Crashlytics 报告可能包含不直接显示身份的 Number RPG 账户 ID 以及游戏区域或关卡。Analytics 使用应用实例标识符；应用不会将姓名、邮箱或账户 ID 作为 Analytics 用户 ID。我们已关闭 Firebase Analytics 的广告存储、广告用户数据和广告个性化。这些用途支持运行、可靠性、配置和分析，并不授权 Firebase 进行广告跟踪。",
            "启用适用通知后，Firebase Cloud Messaging 会处理注册及安装标识符、iOS 上的 Apple 推送令牌，以及投递所需的应用和设备信息。账户提醒会将推送令牌与账户、平台、设备语言、时区及通知偏好一起保存。好友生命请求通知可能包含好友显示名称和接收者账户标识符。活动推广通知需要单独开启营销偏好；第 2 季公告需要另外订阅 season-2 主题，开启生命或远征提醒不会自动订阅。我们可能处理主题订阅和通知互动，以投递您选择的消息，并在允许 Analytics 收集时衡量使用情况。您可在应用或设备设置中更改通知选择。",
            "AdMob 在记录必要的 Google 同意前默认使用非个性化广告；iOS 个性化广告还需 App Tracking Transparency 授权，拒绝后仍使用非个性化广告。您可在应用中调整可用的隐私选项，并在设备设置中管理跟踪及通知权限。手机应用不使用浏览器 Cookie；网站可能用本地存储保存语言和主题，账户删除页的 Google 登录可能按 Google 政策使用 Cookie 或类似技术。"
          ]
        },
        {
          "heading": "加州隐私权",
          "paragraphs": [
            "如 CCPA（经 CPRA 修订）适用，您可请求了解、访问、删除、更正个人信息，并在法律要求时获得可携带副本，联系 admin@dappgo.com 即可。我们不为金钱出售个人信息；在适用同意后，可能向 Google AdMob 分享设备或广告标识符和广告互动信息用于跨情境行为广告，这可能属于加州法律所说的共享。请拒绝或撤回广告选择、关闭设备跟踪，或以主题“Do Not Sell or Share My Personal Information”发邮件。您可使用书面授权的代理人，我们不会歧视行使权利的人；了解、删除和更正请求通常在 45 个日历日内回复。"
          ]
        },
        {
          "heading": "欧洲经济区和英国的隐私权",
          "paragraphs": [
            "如 GDPR 或英国 GDPR 适用，法律依据包括：提供游戏、账户、存档、社交功能和购买所必要的合同；个性化广告和可选收集所需的同意；安全、防作弊、防欺诈、可靠性和支持所需的合法利益；以及必要记录的法律义务。您可撤回同意，并请求访问、更正、删除、限制、可携带性或反对合法利益处理，也可向所在国监管机构或英国 Information Commissioner’s Office 投诉。DappGo 和提供商可能在美国等境外处理信息；必要时使用适足性决定、标准合同条款或其他批准保障措施。"
          ]
        },
        {
          "heading": "保存和删除",
          "paragraphs": [
            "账户处于活跃状态期间，我们保留账户和玩家数据。成功的应用内及 Google 网页自助删除会立即生效；邮件或表单请求在验证后 30 天内完成，少数必要保留情况除外。Google Analytics 和 Firebase Analytics 数据仍适用已公布的 14 个月保留承诺，范围取决于资源的保留设置和 Google 说明（{{analyticsRetention}}），并不涵盖所有汇总报告或单独导出的记录。服务器请求日志保留 30 天；Apple 和 Google 可能在商店账户中保留购买记录。",
            "Firebase 各服务的保留期限不同。根据 Firebase 公布的政策（{{firebaseRetention}}），Crashlytics 在 90 天后开始移除崩溃数据及关联标识符；Performance Monitoring 与 IP 关联的事件保留 30 天，与安装关联或去标识化的性能数据保留 60 天后开始移除。Cloud Messaging 和 Remote Config 的安装标识符可能保留至收到安装删除请求；Firebase 表示会在该请求后 180 天内完成正式及备份系统中的移除。删除账户不会立即清除所有 Firebase 记录。",
            "删除账户会请求移除开发者持有的账户、玩家及推送注册数据，详见{{deleteAccount}}。应用还会尝试清除退出账户的通知资格、主题订阅和推送令牌；这属于异步清理，可能失败，也不会直接删除 Firebase 安装标识符或此前上传的 Analytics、崩溃及性能记录。这些数据仍遵循提供商的保留和删除流程。除应用内及公开删除选项外，您可联系 admin@dappgo.com 请求访问或删除相关 Firebase 信息。因税务、会计、安全、防欺诈、争议或法律义务需要保留的少量记录，会在保留理由结束后删除或匿名化。"
          ]
        },
        {
          "heading": "儿童、安全、变更和联系",
          "paragraphs": [
            "Number RPG 不面向 13 岁以下儿童；如果得知儿童提供信息，家长可联系 admin@dappgo.com，验证后我们会依法删除。当地要求更高年龄或家长同意时适用当地规则。我们采取合理安全措施但不能保证绝对安全。政策会随游戏、提供商或法律变化而更新，顶部日期代表当前版本。"
          ]
        }
      ]
    },
    terms: { kicker: "Number RPG · 条款", title: "服务条款", product: "DappGo 的 Number RPG", effective: "生效日期：2026-10-27", summary: "本条款说明使用 Number RPG 的规则，包括游客游玩、可选账户、虚拟物品、购买、公平游戏、账户终止和您的法律权利。", sections: [
      section("1. 接受条款和年龄", ["安装、访问或使用 Number RPG 即表示您同意本服务条款和隐私政策。游戏面向 13 岁及以上；未达到适用最低年龄或不能合法同意时请勿使用。"]),
      section("2. 授权和服务", ["Number RPG 由 Yenlung Lai 以 DappGo 名义在 San Gabriel 运营。DappGo 授予个人、非商业、有限、非独占、不可转让且可撤销的使用授权，不转让游戏、代码、艺术、名称或内容所有权。iOS 适用 Apple 的 {{appleEula}}。"]),
      section("3. 账户和安全", ["可作为游客游玩；Apple、Google 或 Facebook 登录支持云端存档、社交功能、排行榜和购买恢复。请保护设备和登录信息，不得分享账户、冒充他人或故意提供虚假信息。"]),
      section("4. 虚拟物品和购买", ["虚拟货币、生命、配件、升级和其他权益没有现金价值，只能在游戏内使用，不得出售、转让或兑换。消耗品会被使用，非消耗权益在商店支持时可恢复。购买通过 Apple App Store 或 Google Play，退款依商店规则；RevenueCat 协助记录和恢复权益，删除账户后商店购买可能仍可恢复。"]),
      section("5. 公平游戏和可接受使用", ["不得作弊、利用漏洞、自动化游玩、操纵分数或奖励、滥用邀请或礼物、冒充玩家、干扰服务或伤害他人，也不得提交违法、辱骂、仇恨、性剥削或侵权内容。"]),
      section("6. 执行和终止", ["我们可因作弊、滥用、欺诈、不安全或违反条款而限制、暂停或终止访问，也可变更或停止服务。可从设置 → 账户 → 删除账户中删除；依性质应继续的权利和义务仍有效。"]),
      section("7. 免责声明和限制", ["在法律允许范围内，游戏按现状提供，不保证不中断、无错误、安全或永久保存。DappGo 不对设备、网络、商店、第三方或不可控事件造成的故障负责，也不对间接或特殊损害负责；直接损害责任不超过前 12 个月付款或 100 美元中的较高者。本条款不限制法律不得限制的责任或消费者权利。"]),
      section("8. 赔偿和争议", ["在法律允许范围内，您须就违法使用、违反条款或提交内容造成的第三方请求和合理费用补偿 DappGo，但不包括 DappGo 自身不当行为。争议请先联系 admin@dappgo.com；本条款不要求仲裁。"]),
      section("9. 适用法律和管辖", ["本条款适用加利福尼亚州法律。除强制性消费者权利外，争议专属位于加州 Los Angeles County 的州或联邦法院；不限制您居住地的强制性消费者权利。"]),
      section("10. 变更和联系", ["我们可能随游戏、提供商或法律变化更新条款；重大变化会在法律要求时通知。生效日期代表当前版本，问题请发送至 admin@dappgo.com。"])
    ] },
    deleteAccount: { kicker: "Number RPG · 删除账户", title: "删除您的账户", product: "DappGo 的 Number RPG", effective: "说明生效日期：2026-10-27", summary: "您可以在 App 内删除账户，使用本页的 Google 自助服务，或通过网页表单或电子邮件请求帮助。", sections: [
      section("在 App 内删除", ["打开 Number RPG，前往设置 → 账户 → 删除账户，确认并保持 App 在线直到成功。App 内删除立即生效；Apple 身份可能需要重新授权。"]),
      section("在网页上删除", ["Google 账户可使用下方自助服务登录、确认账户、输入 DELETE 并提交，成功后立即生效。"]),
      section("通过表单或电子邮件请求删除", ["Apple、Facebook 或游客账户请使用表单或发送邮件至 admin@dappgo.com，提供设置 → 账户中的账户 ID 和联系邮箱（如有）。验证后 30 天内完成，请勿发送密码、令牌或 Apple 私钥。"]),
      section("我们会移除和保留的数据", ["我们会移除账户、提供商身份、名称、国家、领队宠物、设备、会话、存档、分数、邀请、好友、礼物、奖励、事件、活动、欺诈记录和推送令牌；App 内删除也会重置本地进度。Apple 和 Google 可能保留购买记录；DappGo 可能因法律、会计、安全、防欺诈或争议需要保留有限记录，理由结束后删除或匿名化。"]),
      section("时间和帮助", ["App 内和 Google 网页自助删除立即生效；表单和电子邮件请求在验证后 30 天内完成。流程失败或需要帮助请联系 admin@dappgo.com。"])
    ] }
  },
  "ja": {
    privacy: {
      "kicker": "Number RPG · プライバシー",
      "title": "プライバシーポリシー",
      "product": "DappGo の Number RPG",
      "effective": "最終更新日：2026-10-30",
      "summary": "Number RPG はゲストとして遊べます。サインインは任意で、クラウドセーブ、ソーシャル機能、端末間の復元が利用できます。本ポリシーでは、ゲームが使うデータ、利用目的、選択肢を説明します。",
      "sections": [
        {
          "heading": "運営者",
          "paragraphs": [
            "Number RPG は、米国カリフォルニア州サンガブリエルで DappGo として事業を行う個人事業主 Yenlung Lai が運営します。GDPR と英国 GDPR では DappGo が本ポリシーの個人データの管理者です。質問、権利請求、苦情は admin@dappgo.com へ。"
          ]
        },
        {
          "heading": "収集する情報",
          "paragraphs": [
            "ゲストとして遊べます。機能に応じ、アカウント ID、プロバイダーと subject ID、表示名、国、リーダーペット、クラウドセーブ、進行、スコア、ランキング、招待・友達・ギフト・報酬、購入・取引情報、ハッシュ化した端末識別子、セッション、言語、タイムゾーン、通知トークン、広告・分析・クラッシュ・性能情報、同意や権限の選択を収集または受け取ります。メールは Apple、Google、Meta が提供した場合だけ使います。カード情報は受け取りません。"
          ]
        },
        {
          "heading": "情報源と利用目的",
          "paragraphs": [
            "情報源はあなた、選択したログイン・ストア提供者、端末、ゲーム、他のプレイヤーです。ゲーム、アカウント、セーブ、ランキング、ソーシャル機能を提供し、安全確保、購入と権利の処理、不正防止、希望した通知、分析・クラッシュ・性能改善、広告表示に使います。広告は必要な同意と端末権限がない限り非パーソナライズです。"
          ]
        },
        {
          "heading": "提供者と共有",
          "paragraphs": [
            "Apple は Apple サインインと App Store、Google/Firebase は Google サインイン、Google Play、Analytics、Crashlytics、Performance Monitoring、Remote Config、Cloud Messaging、AdMob、Meta は Facebook サインイン、RevenueCat は購入と権利を扱います。提供者は自分のポリシーで処理し、独立した管理者となる場合があります。ゲームで公開した名前、国、ペット、スコア、友達関係は他のプレイヤーに見える場合があります。法令、安全、詐欺防止、適法な要求のためにも開示することがあります。"
          ]
        },
        {
          "heading": "広告、分析、通知、Cookie",
          "paragraphs": [
            "Number RPG は Google AdMob を使って広告を配信し、効果を測定します。Google Mobile Ads SDK は IP アドレスからおおよその地域を推定することがありますが、正確な GPS 位置を取得したり位置情報の許可を求めたりはしません。Google は適用される同意の選択に従い、アプリや広告の機能、分析、第三者広告、開発者の広告・マーケティングにこの情報を利用する場合があります。DappGo は SDK が推定した位置を別途保存しません。Google は自社の方針と保存設定に基づき、セキュリティ、不正防止、法的義務などのために広告・診断データを保持します。期間はデータと目的によって異なり、Google が保有する情報の一律の削除期限はお約束しません。広告の選択はアプリのプライバシー設定で変更できます。開示・削除のご相談は admin@dappgo.com へお送りください。広告データの説明（{{admobDisclosure}}）と保存方針（{{googleRetention}}）もご覧ください。",
            "Firebase Crashlytics はクラッシュやエラーの診断に、Performance Monitoring は起動・描画・通信の性能測定に、Remote Config はアプリ設定やゲーム構成の配信に使います。適用される同意の選択が許す場合、Firebase Analytics はアプリの利用、進行状況、購入、広告効果、通知への反応を測定します。これらのサービスは、インストール・セッション識別子、クラッシュのスタックトレースやエラー、端末・OS・アプリ・ネットワーク情報、性能測定値、言語、タイムゾーン、IP アドレスから推定した国や地域を処理する場合があります。Crashlytics の報告には、個人を直接示さない Number RPG アカウント ID とゲーム内の地域・ステージが含まれることがあります。Analytics はアプリインスタンス識別子を使い、アプリは氏名、メール、アカウント ID を Analytics ユーザー ID として渡しません。Firebase Analytics の広告用ストレージ、広告ユーザーデータ、広告のパーソナライズは無効にしています。これらは運用、信頼性、設定、分析のための利用であり、Firebase による広告追跡を許可するものではありません。",
            "対象の通知を有効にすると、Firebase Cloud Messaging は登録・インストール識別子、iOS の Apple プッシュトークン、配信に必要なアプリ・端末情報を処理します。アカウントのリマインダー用に、当社はプッシュトークンをアカウント、プラットフォーム、端末の言語、タイムゾーン、通知設定と関連付けて保存します。フレンドのライフリクエスト通知には、フレンドの表示名と受信者のアカウント識別子が含まれる場合があります。イベントの宣伝通知は専用のマーケティング設定が必要です。シーズン 2 の告知には season-2 トピックへの別途登録が必要で、ライフや遠征のリマインダーを有効にしても登録されません。トピック登録や通知への反応は選択した通知の配信に使われ、Analytics の収集が許可されている場合には利用状況の測定にも使われます。通知はアプリまたは端末設定で変更できます。",
            "AdMob は必要な Google の同意が記録されるまで非パーソナライズ広告を標準とします。iOS のパーソナライズ広告には App Tracking Transparency の許可も必要で、拒否した場合は非パーソナライズ広告となります。利用可能なプライバシー設定はアプリで、追跡・通知の許可は端末で変更できます。モバイルアプリはブラウザ Cookie を使いません。サイトは言語とテーマをローカルストレージに保存する場合があり、アカウント削除ページの Google ログインは Google の方針に従って Cookie 等を使う場合があります。"
          ]
        },
        {
          "heading": "カリフォルニア州の権利",
          "paragraphs": [
            "CCPA/CPRA が適用される場合、個人情報の知る・アクセス、削除、訂正、可搬性を請求できます。個人情報を金銭のために販売しませんが、同意後に AdMob と広告識別子や広告操作情報を共有することがあり、州法上の共有となる場合があります。広告選択を拒否または撤回し、端末追跡をオフにするか、件名 “Do Not Sell or Share My Personal Information” で admin@dappgo.com に連絡してください。認定代理人を使え、差別はしません。知る・削除・訂正には通常 45 暦日以内に回答します。"
          ]
        },
        {
          "heading": "EEA と英国の権利",
          "paragraphs": [
            "GDPR/英国 GDPR の法的根拠は、ゲーム・アカウント・購入の契約、広告と任意収集の同意、安全・不正防止・信頼性・支援の正当な利益、必要記録の法的義務です。アクセス、訂正、消去、制限、移植、異議を請求でき、同意を撤回できます。まず admin@dappgo.com に連絡し、監督機関または英国 ICO に申立てできます。米国など域外で処理する場合、必要に応じ適足性、標準契約条項等を使います。"
          ]
        },
        {
          "heading": "保存と削除",
          "paragraphs": [
            "アカウントの利用中はアカウントとプレイヤーのデータを保持します。アプリ内または Google のウェブ自助操作による削除は成功時に直ちに反映され、メール・フォームでの依頼は確認後 30 日以内に完了します。ただし必要な限定的保持は除きます。Google Analytics・Firebase Analytics のデータには、公表済みの 14 か月の保存方針を引き続き適用します。その範囲はプロパティの保存設定と Google の説明（{{analyticsRetention}}）に従い、すべての集計レポートや別途エクスポートした記録を対象とするものではありません。サーバーのリクエストログは 30 日間保持します。Apple と Google はストアアカウントに購入記録を保持する場合があります。",
            "Firebase の保存期間はサービスごとに異なります。公開方針（{{firebaseRetention}}）によると、Crashlytics は 90 日後からクラッシュデータと関連識別子の削除を開始します。Performance Monitoring は IP に関連するイベントを 30 日、インストールに関連する、または非識別化された性能データを 60 日保持した後、削除を開始します。Cloud Messaging と Remote Config のインストール識別子は、インストール削除が依頼されるまで残ることがあります。Firebase は依頼後 180 日以内に稼働・バックアップシステムからの削除を完了するとしています。アカウント削除ですべての Firebase 記録が直ちに消えるわけではありません。",
            "アカウント削除では、開発者が保持するアカウント、プレイヤー、プッシュ登録データの削除を依頼します。詳しくは{{deleteAccount}}をご覧ください。アプリは退出するアカウントの通知対象状態、トピック登録、プッシュトークンの解除も試みますが、非同期処理のため失敗することがあります。この処理自体は Firebase インストール識別子や、送信済みの Analytics・クラッシュ・性能記録を削除しません。これらには提供者の保存・削除手順が適用されます。アプリ内・公開ページの削除方法に加え、関連する Firebase 情報の開示・削除は admin@dappgo.com にご相談ください。税務、会計、セキュリティ、不正防止、紛争、法的義務に必要な限定的記録は、その理由がなくなった時点で削除または匿名化します。"
          ]
        },
        {
          "heading": "子ども、安全、変更、連絡",
          "paragraphs": [
            "Number RPG は 13 歳未満を対象としません。知った場合は保護者が admin@dappgo.com に連絡でき、確認後に法律に従い削除します。現地の高い年齢規則を守ってください。合理的な安全対策を行いますが絶対の安全は保証できません。変更時は更新し、発効日が現行版を示します。"
          ]
        }
      ]
    },
    terms: { kicker: "Number RPG · 利用規約", title: "利用規約", product: "DappGo の Number RPG", effective: "発効日：2026-10-27", summary: "本規約は、ゲストプレイ、任意のアカウント、バーチャルアイテム、購入、公正なプレイ、アカウント終了、法的権利を含む Number RPG の利用ルールを説明します。", sections: [
      section("1. 同意と年齢", ["Number RPG を使うと本規約とプライバシーポリシーに同意します。13 歳以上を対象とし、最低年齢未満または合法的に同意できない場合は使用しないでください。"]),
      section("2. ライセンスとサービス", ["Yenlung Lai が DappGo として運営します。個人的・非商業的な娯楽のための限定、非独占、譲渡不可、取消可能なライセンスを付与し、ゲーム、コード、アート、名称、コンテンツの所有権は移しません。iOS では Apple の {{appleEula}} も適用されます。"]),
      section("3. アカウントと安全", ["ゲストで遊べます。Apple、Google、Facebook の任意ログインはクラウドセーブ、ソーシャル、ランキング、購入復元に対応します。端末と認証情報を守り、アカウント共有、なりすまし、故意の虚偽情報を禁止します。"]),
      section("4. アイテムと購入", ["仮想通貨、ライフ、アクセサリー、アップグレード等は現金価値がなく、ゲーム内だけで使用できます。消耗品は使うと消費され、非消耗権利はストアが対応すれば復元できます。購入は Apple/Google のストア規則に従い、RevenueCat が権利の記録・復元を補助します。アカウント削除後もストア購入が復元できる場合があります。"]),
      section("5. 公正なプレイ", ["チート、バグ悪用、自動化、スコア操作、招待・ギフト悪用、なりすまし、サービス妨害、他人への危害、違法・虐待的・憎悪的・性的搾取的・権利侵害の内容や表示名を禁止します。"]),
      section("6. 対応と終了", ["チート、悪用、詐欺、安全問題、規約違反があると合理的に判断した場合、利用を制限・停止・終了できます。サービス変更もできます。設定 → アカウント → 削除で削除でき、性質上続く権利義務は残ります。"]),
      section("7. 免責と制限", ["法律の範囲でゲームは利用可能な状態で提供され、継続、無誤、安全性、永久保存を保証しません。装置、ネットワーク、ストア、第三者、不可抗力による故障に責任を負わず、間接等の損害を負いません。直接損害の総責任は過去 12 か月の支払額または 100 米ドルの高い方を上限とします。法的に除外できない責任や消費者権利を制限しません。"]),
      section("8. 補償と紛争", ["法律の範囲で、違法利用、規約違反、送信内容による第三者請求等を補償しますが、DappGo 自身の不正行為を補償させず、強行消費者権利を制限しません。紛争はまず admin@dappgo.com に連絡し、本規約は仲裁を義務付けません。"]),
      section("9. 準拠法と裁判地", ["カリフォルニア州法に準拠し、消費者の強制権利を除き、カリフォルニア州ロサンゼルス郡の州または連邦裁判所を裁判地とします。居住国の強制権利を制限しません。"]),
      section("10. 変更と連絡先", ["ゲーム、提供者、法律の変更時に更新し、重要な変更は必要に応じ通知します。発効日が現行版を示します。質問は admin@dappgo.com へ。"])
    ] },
    deleteAccount: { kicker: "Number RPG · アカウント削除", title: "アカウントを削除する", product: "DappGo の Number RPG", effective: "手順の発効日：2026-10-27", summary: "アカウントはアプリ内、Google セルフサービス、ウェブフォームまたはメールで削除できます。", sections: [
      section("アプリ内で削除", ["設定 → アカウント → アカウント削除で確認し、成功までオンラインにします。直ちに反映され、Apple ID は再認証が必要な場合があります。"]),
      section("ウェブで削除", ["Google 連携アカウントは、下の Google でログインし、表示を確認して DELETE を送信します。成功すれば直ちに反映されます。"]),
      section("フォームまたはメールで依頼", ["Apple、Facebook、ゲストはフォームまたは admin@dappgo.com を使い、設定 → アカウントの ID とメール（あれば）を提示します。確認後 30 日以内に完了します。秘密情報を送らないでください。"]),
      section("削除・保留データ", ["アカウント、提供者 ID、プロフィール、装置、セッション、保存、スコア、招待、友達、報酬、ギフト、イベント、活動、不正記録、プッシュトークンを削除し、ローカル進行をリセットします。Apple/Google の購入記録や、法律・会計・安全・不正・紛争に必要な限定記録は残る場合があります。理由が終われば削除または匿名化します。"]),
      section("時間と支援", ["アプリと Google ウェブ削除は直ちに、フォーム・メールは確認後 30 日以内です。問題は admin@dappgo.com へ。"])
    ] }
  },
  "ko": {
    privacy: {
      "kicker": "Number RPG · 개인정보 보호",
      "title": "개인정보 처리방침",
      "product": "DappGo의 Number RPG",
      "effective": "최종 업데이트: 2026-10-30",
      "summary": "Number RPG는 게스트로 플레이할 수 있습니다. 로그인은 선택 사항이며 클라우드 저장, 소셜 기능, 기기 간 복구를 제공합니다. 이 방침은 사용 데이터와 목적, 선택을 설명합니다.",
      "sections": [
        {
          "heading": "운영 주체",
          "paragraphs": [
            "Number RPG는 미국 캘리포니아주 San Gabriel에서 DappGo라는 이름으로 사업하는 개인사업자 Yenlung Lai가 운영합니다. GDPR 및 영국 GDPR에서 DappGo는 이 방침의 개인정보 컨트롤러입니다. 문의와 권리 요청은 admin@dappgo.com으로 보내 주세요."
          ]
        },
        {
          "heading": "수집하는 정보",
          "paragraphs": [
            "게스트로 플레이할 수 있습니다. 계정 ID, 로그인 제공자와 subject ID, 표시 이름, 국가, 대표 펫, 클라우드 저장·진행·점수·순위·초대·친구·선물·보상, RevenueCat 구매·거래, 해시된 기기 ID, 세션, 언어·시간대, 푸시 토큰, 광고·분석·충돌·성능 정보와 동의·권한 선택을 기능에 따라 수집하거나 받습니다. 이메일은 제공자가 줄 때만 사용하고 결제 카드 정보는 받지 않습니다."
          ]
        },
        {
          "heading": "출처와 목적",
          "paragraphs": [
            "정보는 이용자, 선택한 로그인·스토어 제공자, 기기·게임, 초대·친구·선물·순위표의 다른 플레이어에게서 옵니다. 게임·계정·저장·소셜 기능 제공, 보안·부정 방지, 구매·권한 처리, 요청한 알림, 선택적 분석과 안정성 개선, 광고 표시를 위해 사용합니다. 필요한 동의 전 광고는 개인화되지 않습니다."
          ]
        },
        {
          "heading": "제공자와 공유",
          "paragraphs": [
            "Apple은 Apple 로그인과 App Store, Google/Firebase는 Google 로그인·Play·Analytics·Crashlytics·Performance Monitoring·Remote Config·Cloud Messaging·AdMob, Meta는 Facebook 로그인, RevenueCat은 구매와 권한을 처리합니다. 각자 정책에 따라 처리하며 독립 컨트롤러일 수 있습니다. 게임에서 공개한 이름·국가·펫·점수·친구 관계는 다른 플레이어에게 보일 수 있고 채팅은 없습니다. 법률·안전·사기 방지·유효한 요청에도 공개할 수 있습니다."
          ]
        },
        {
          "heading": "광고, 분석, 알림 및 쿠키",
          "paragraphs": [
            "Number RPG는 Google AdMob으로 광고를 제공하고 성과를 측정합니다. Google Mobile Ads SDK는 IP 주소를 수집하여 대략적인 지역을 추정할 수 있지만 정확한 GPS 위치에 접근하거나 위치 권한을 요청하지 않습니다. Google은 적용되는 동의 선택에 따라 이 정보를 앱과 광고 기능, 분석, 제3자 광고, 개발자의 광고 또는 마케팅에 사용할 수 있습니다. DappGo는 SDK가 추정한 위치를 별도로 저장하지 않습니다. Google은 보안, 사기 방지, 법적 의무 등을 위해 자체 정책 및 설정된 보관 기준에 따라 광고와 관련 진단 데이터를 보관합니다. 기간은 데이터 유형과 목적에 따라 달라지므로 Google 보유 데이터에 고정된 삭제 기한을 약속하지 않습니다. 앱의 개인정보 설정에서 제공되는 광고 선택을 변경하거나 admin@dappgo.com으로 열람·삭제를 요청할 수 있습니다. 광고 데이터 안내({{admobDisclosure}})와 보관 정책({{googleRetention}})을 참고하세요.",
            "Firebase Crashlytics는 충돌과 오류 진단에, Performance Monitoring은 시작·화면 렌더링·네트워크 성능 측정에, Remote Config는 앱 설정과 게임 구성 전달에 사용합니다. 적용되는 동의 선택이 허용하는 경우 Firebase Analytics로 앱 사용, 게임 진행, 구매, 광고 성과와 알림 상호작용을 측정합니다. 이 서비스들은 설치 및 세션 식별자, 충돌 스택과 오류 메시지, 기기·운영체제·앱·네트워크 정보, 성능 측정값, 언어, 시간대, IP 주소에서 추정한 국가나 지역을 처리할 수 있습니다. Crashlytics 보고서에는 신원을 직접 드러내지 않는 Number RPG 계정 ID와 게임 지역·스테이지가 포함될 수 있습니다. Analytics는 앱 인스턴스 식별자를 사용하며, 앱은 이름·이메일·계정 ID를 Analytics 사용자 ID로 제공하지 않습니다. Firebase Analytics의 광고 저장소, 광고 사용자 데이터 및 광고 개인 최적화는 꺼져 있습니다. 이러한 이용은 운영, 안정성, 구성 및 분석을 지원하며 Firebase 광고 추적을 허용하지 않습니다.",
            "해당 알림을 켜면 Firebase Cloud Messaging이 등록·설치 식별자, iOS의 Apple 푸시 토큰, 전달에 필요한 앱·기기 정보를 처리합니다. 계정 알림을 위해 서비스는 푸시 토큰을 계정, 플랫폼, 기기 언어, 시간대 및 알림 환경설정과 연결해 저장합니다. 친구의 생명 요청 알림에는 친구 표시 이름과 수신 계정 식별자가 포함될 수 있습니다. 이벤트 홍보 알림은 별도의 마케팅 설정이 필요합니다. 시즌 2 공지는 season-2 주제를 따로 구독해야 하며, 생명이나 원정 알림을 켜도 구독되지 않습니다. 주제 구독과 알림 상호작용은 선택한 메시지 전달에 쓰이며 Analytics 수집이 허용된 경우 이용 측정에도 쓰일 수 있습니다. 앱이나 기기 설정에서 알림을 변경할 수 있습니다.",
            "AdMob은 필요한 Google 동의가 기록될 때까지 기본적으로 비개인화 광고를 제공합니다. iOS의 개인화 광고는 App Tracking Transparency 승인도 필요하며, 거부하면 비개인화 광고가 유지됩니다. 앱에서 제공되는 개인정보 선택을, 기기 설정에서 추적·알림 권한을 변경할 수 있습니다. 모바일 앱은 브라우저 쿠키를 사용하지 않습니다. 웹사이트는 로컬 저장소에 언어와 테마를 저장할 수 있고, 계정 삭제 페이지의 Google 로그인은 Google 정책에 따라 쿠키나 유사 기술을 사용할 수 있습니다."
          ]
        },
        {
          "heading": "캘리포니아 권리",
          "paragraphs": [
            "CCPA/CPRA가 적용되면 열람·알기, 삭제, 정정, 이동 가능한 사본을 요청할 수 있습니다. admin@dappgo.com으로 연락하세요. 개인정보를 돈 받고 판매하지 않지만, 동의 후 AdMob과 광고 식별자·상호작용을 공유할 수 있어 법상 공유일 수 있습니다. 광고 선택을 거부·철회하거나 추적을 끄고, 제목 “Do Not Sell or Share My Personal Information”으로 이메일을 보내세요. 서면 권한의 대리인을 사용할 수 있고 차별하지 않으며, 요청은 일반적으로 45일 내 답합니다."
          ]
        },
        {
          "heading": "EEA 및 영국 권리",
          "paragraphs": [
            "GDPR/영국 GDPR의 근거는 게임·계정·구매의 계약, 개인화 광고와 선택 수집의 동의, 보안·부정·사기 방지·지원의 정당한 이익, 필요한 기록의 법적 의무입니다. 액세스·정정·삭제·제한·이동·이의를 요청하고 동의를 철회할 수 있으며, 감독기관 또는 영국 ICO에 신고할 수 있습니다. 미국 등 국외 처리에는 필요 시 적정성, 표준계약조항 등 합법적 보호조치를 사용합니다."
          ]
        },
        {
          "heading": "보관 및 삭제",
          "paragraphs": [
            "계정이 활성화된 동안 계정과 플레이어 데이터를 보관합니다. 앱 내 및 Google 웹 셀프서비스 삭제는 성공 시 즉시 적용되며, 이메일·양식 요청은 확인 후 30일 이내에 완료합니다. 필요한 제한적 보관 예외는 적용됩니다. Google Analytics와 Firebase Analytics 데이터에는 기존에 공지한 14개월 보관 약속이 계속 적용됩니다. 범위는 속성의 보관 설정과 Google 안내({{analyticsRetention}})에 따르며 모든 집계 보고서나 별도로 내보낸 기록까지 포함하지는 않습니다. 서버 요청 로그는 30일간 보관합니다. Apple과 Google은 스토어 계정에 구매 기록을 보관할 수 있습니다.",
            "Firebase의 보관 기간은 서비스마다 다릅니다. 공개 정책({{firebaseRetention}})에 따르면 Crashlytics는 90일 후 충돌 데이터와 관련 식별자 삭제를 시작합니다. Performance Monitoring은 IP 관련 이벤트를 30일, 설치 관련 또는 비식별 성능 데이터를 60일 보관한 뒤 삭제를 시작합니다. Cloud Messaging과 Remote Config의 설치 식별자는 설치 삭제 요청 전까지 남을 수 있습니다. Firebase는 요청 후 180일 이내에 운영 및 백업 시스템에서 삭제를 완료한다고 설명합니다. 계정을 삭제해도 모든 Firebase 기록이 즉시 지워지지는 않습니다.",
            "계정 삭제 시 개발자가 보유한 계정·플레이어·푸시 등록 데이터의 삭제를 요청합니다. 자세한 내용은 {{deleteAccount}}를 참고하세요. 앱은 탈퇴 계정의 알림 자격, 주제 구독, 푸시 토큰도 정리하려 시도하지만 비동기 작업이므로 실패할 수 있습니다. 이 작업 자체가 Firebase 설치 식별자나 이미 업로드된 Analytics·충돌·성능 기록을 삭제하지는 않습니다. 해당 기록에는 제공자의 보관 및 삭제 절차가 적용됩니다. 앱 내·공개 삭제 방법 외에 관련 Firebase 정보 열람이나 삭제는 admin@dappgo.com으로 요청할 수 있습니다. 세금, 회계, 보안, 사기 방지, 분쟁 또는 법적 의무에 필요한 제한적 기록은 그 사유가 끝나면 삭제하거나 익명화합니다."
          ]
        },
        {
          "heading": "아동, 보안, 변경 및 연락처",
          "paragraphs": [
            "13세 미만 아동 대상이 아니며 알게 되면 보호자가 admin@dappgo.com으로 연락할 수 있고 확인 후 법에 따라 삭제합니다. 현지의 더 높은 연령 규칙을 따르세요. 합리적 보호조치를 적용하지만 절대 보안을 보장하지 않습니다. 변경 시 업데이트하며 상단 날짜가 현재 버전입니다."
          ]
        }
      ]
    },
    terms: { kicker: "Number RPG · 약관", title: "서비스 약관", product: "DappGo의 Number RPG", effective: "시행일: 2026-10-27", summary: "이 약관은 게스트 플레이, 선택적 계정, 가상 아이템, 구매, 공정한 플레이, 계정 종료 및 법적 권리를 설명합니다.", sections: [
      section("1. 동의 및 연령", ["Number RPG를 사용하면 약관과 개인정보 처리방침에 동의합니다. 13세 이상 대상이며 적용 최소 연령 미만이거나 합법적으로 동의할 수 없으면 사용하지 마세요."]),
      section("2. 라이선스와 서비스", ["Yenlung Lai가 DappGo로 운영합니다. 개인적·비상업적 오락을 위한 제한적·비독점적·양도 불가·철회 가능한 라이선스를 주며 게임, 코드, 아트, 이름, 콘텐츠 소유권은 주지 않습니다. iOS에는 Apple의 {{appleEula}}가 적용됩니다."]),
      section("3. 계정과 보안", ["게스트로 플레이할 수 있고 Apple·Google·Facebook 로그인은 저장·소셜·순위·구매 복구를 지원합니다. 기기와 자격 증명을 보호하고 계정 공유, 사칭, 고의적 허위정보를 금지합니다."]),
      section("4. 가상 아이템과 구매", ["가상 화폐·생명·액세서리·업그레이드는 현금 가치가 없고 게임 안에서만 사용합니다. 소모품은 사용 시 소모되고 비소모 권리는 스토어가 지원하면 복구됩니다. 구매·환불은 Apple/Google 규칙을 따르고 RevenueCat이 권한 복구를 돕습니다. 계정 삭제 후에도 스토어 구매는 복구될 수 있습니다."]),
      section("5. 공정한 플레이와 허용된 사용", ["치팅, 버그 악용, 자동화, 점수·보상 조작, 초대·선물 악용, 사칭, 서비스 방해, 타인 피해, 불법·모욕·혐오·성착취·권리침해 콘텐츠를 금지합니다."]),
      section("6. 조치와 종료", ["치팅·악용·사기·안전 문제·약관 위반이면 접근을 제한·정지·종료할 수 있고 서비스도 바꿀 수 있습니다. 설정 → 계정 → 계정 삭제에서 삭제하며 성격상 계속되는 권리·의무는 남습니다."]),
      section("7. 면책과 제한", ["법이 허용하는 범위에서 게임은 현 상태로 제공되며 중단·무오류·보안·영구 보존을 보장하지 않습니다. 간접 등 손해에 책임지지 않으며 직접 손해 책임은 지난 12개월 지급액 또는 100달러 중 큰 금액을 넘지 않습니다. 법적으로 배제할 수 없는 책임과 소비자 권리는 제한하지 않습니다."]),
      section("8. 배상과 분쟁", ["불법 사용, 약관 위반, 제출 콘텐츠로 인한 제3자 청구와 합리적 비용을 법이 허용하는 범위에서 배상합니다. 먼저 admin@dappgo.com으로 연락하며 중재를 요구하지 않습니다."]),
      section("9. 준거법과 관할", ["캘리포니아주 법률을 적용하고, 강행 소비자 권리를 제외한 분쟁은 캘리포니아 Los Angeles County의 주 또는 연방 법원을 관할로 합니다."]),
      section("10. 변경과 연락처", ["게임·제공자·법률이 바뀌면 약관을 업데이트하고 중요한 변경은 필요한 경우 알립니다. 현재 버전은 상단 날짜로 확인하며 질문은 admin@dappgo.com으로 보내세요."])
    ] },
    deleteAccount: { kicker: "Number RPG · 계정 삭제", title: "계정 삭제", product: "DappGo의 Number RPG", effective: "안내 시행일: 2026-10-27", summary: "앱, 이 페이지의 Google 셀프서비스, 웹 양식 또는 이메일로 계정을 삭제할 수 있습니다.", sections: [
      section("앱에서 삭제", ["설정 → 계정 → 계정 삭제에서 확인하고 성공할 때까지 온라인으로 유지하세요. 즉시 적용되며 Apple은 재인증이 필요할 수 있습니다."]),
      section("웹에서 삭제", ["Google 계정은 아래에서 로그인하고 표시를 확인한 뒤 DELETE를 제출하세요. 성공하면 즉시 적용됩니다."]),
      section("양식 또는 이메일 요청", ["Apple·Facebook·게스트 계정은 양식 또는 admin@dappgo.com을 사용하고 계정 ID와 이메일을 제출하세요. 확인 후 30일 내 완료하며 비밀번호·토큰·Apple 키를 보내지 마세요."]),
      section("삭제 및 보관 데이터", ["계정·제공자 ID·프로필·기기·세션·저장·점수·초대·친구·보상·선물·이벤트·활동·사기 기록·푸시 토큰을 삭제하고 로컬 진행을 초기화합니다. Apple/Google 구매 기록과 법률·회계·보안·사기·분쟁에 필요한 제한 기록은 남을 수 있으며 이유가 끝나면 삭제·익명화합니다."]),
      section("시간과 도움", ["앱 및 Google 웹 삭제는 즉시, 양식·이메일은 확인 후 30일 내입니다. 문제가 있으면 admin@dappgo.com으로 연락하세요."])
    ] }
  },
  "es": {
    privacy: {
      "kicker": "Number RPG · privacidad",
      "title": "Política de privacidad",
      "product": "Number RPG de DappGo",
      "effective": "Última actualización: 2026-10-30",
      "summary": "Number RPG permite jugar como invitado. Iniciar sesión es opcional y añade partidas guardadas en la nube, funciones sociales y recuperación entre dispositivos. Esta política explica los datos, finalidades y opciones.",
      "sections": [
        {
          "heading": "Quiénes somos",
          "paragraphs": [
            "Number RPG está operado por Yenlung Lai, empresario individual que trabaja como DappGo en San Gabriel, California, Estados Unidos. Para el GDPR y el GDPR del Reino Unido, DappGo es el responsable de los datos personales descritos aquí. Preguntas, solicitudes de derechos y reclamaciones: admin@dappgo.com."
          ]
        },
        {
          "heading": "Información que recopilamos",
          "paragraphs": [
            "Puede jugar como invitado. Podemos recibir ID de cuenta, proveedor y subject ID, nombre, país y mascota líder; partidas, progreso, puntuaciones, rankings, invitaciones, amigos, regalos y recompensas; datos de compras de RevenueCat; identificadores de dispositivo con hash, sesiones, idioma, zona horaria, tokens push; datos de anuncios, analítica, errores, rendimiento y elecciones de consentimiento. El correo solo se usa cuando lo proporciona Apple, Google o Meta; no recibimos datos de tarjetas."
          ]
        },
        {
          "heading": "Fuentes y finalidades",
          "paragraphs": [
            "La información procede de usted, de los proveedores de inicio de sesión y tiendas, del dispositivo y juego y de otros jugadores. La usamos para ofrecer el juego, cuentas, guardados, rankings y funciones sociales; procesar compras; prevenir trampas, abusos y fraude; enviar notificaciones solicitadas; mejorar fiabilidad después del consentimiento aplicable; y mostrar anuncios no personalizados hasta que haya consentimiento y permisos para personalizarlos."
          ]
        },
        {
          "heading": "Proveedores y uso compartido",
          "paragraphs": [
            "Apple gestiona Apple y App Store; Google/Firebase, Google Play, Analytics, Crashlytics, Performance Monitoring, Remote Config, Cloud Messaging y AdMob; Meta, Facebook; RevenueCat, compras y derechos. Cada proveedor puede aplicar su política y actuar como responsable independiente. Otros jugadores pueden ver el nombre, país, mascota, puntuación y amistad que haga visibles; no hay chat. Podemos revelar datos para cumplir la ley, proteger el servicio o prevenir fraude."
          ]
        },
        {
          "heading": "Anuncios, analítica, notificaciones y cookies",
          "paragraphs": [
            "Number RPG utiliza Google AdMob para ofrecer anuncios y medir sus resultados. El SDK de Google Mobile Ads puede recoger tu dirección IP e inferir una ubicación aproximada, como tu región, sin acceder al GPS preciso ni solicitar permiso de ubicación. Según las opciones de consentimiento aplicables, Google puede usar estos datos para funciones de la app y de publicidad, analítica, publicidad de terceros y publicidad o marketing del desarrollador. DappGo no almacena por separado esa ubicación inferida. Google conserva los datos publicitarios y de diagnóstico según sus políticas y controles configurados, también por seguridad, prevención del fraude y obligaciones legales. Los plazos varían según el dato y su finalidad; no prometemos un plazo fijo de eliminación para los datos de Google. Puedes cambiar las opciones publicitarias disponibles en los ajustes de privacidad o escribir a admin@dappgo.com para solicitar acceso o eliminación. Consulta la información publicitaria ({{admobDisclosure}}) y la política de conservación ({{googleRetention}}).",
            "Usamos Firebase Crashlytics para diagnosticar fallos y errores, Performance Monitoring para medir el inicio, el renderizado y la red, y Remote Config para distribuir ajustes de la app y configuración del juego. Cuando lo permiten tus opciones de consentimiento aplicables, Firebase Analytics mide el uso, el progreso, las compras, los anuncios y las interacciones con notificaciones. Estos servicios pueden tratar identificadores de instalación y sesión, trazas de fallos y mensajes de error, información del dispositivo, sistema operativo, app y red, métricas de rendimiento, idioma, zona horaria y país o región aproximados a partir de la IP. Los informes de Crashlytics pueden incluir tu ID opaco de cuenta de Number RPG y la región o fase del juego. Analytics usa un identificador de instancia de la app; no le facilitamos tu nombre, correo ni ID de cuenta como ID de usuario. El almacenamiento publicitario, los datos de usuario publicitarios y la personalización de anuncios de Firebase Analytics están desactivados. Estos usos sirven para operar, mejorar la fiabilidad, configurar y analizar la app; no autorizan el seguimiento publicitario de Firebase.",
            "Al activar notificaciones compatibles, Firebase Cloud Messaging trata identificadores de registro e instalación, un token push de Apple en iOS y el contexto necesario de la app y el dispositivo. Para los recordatorios de cuenta, nuestro servicio guarda el token asociado a tu cuenta, plataforma, idioma del dispositivo, zona horaria y preferencias. Las solicitudes de vidas de amigos pueden incluir el nombre del amigo y el identificador de la cuenta destinataria. Los mensajes promocionales de eventos requieren una preferencia de marketing propia; los anuncios de la temporada 2 requieren una suscripción independiente al tema season-2. Activar recordatorios de vidas o expediciones no te suscribe a esos anuncios. Las suscripciones y las interacciones pueden tratarse para entregar los mensajes elegidos y, si Analytics está permitido, medir su uso. Puedes cambiar las notificaciones en la app o el dispositivo.",
            "AdMob muestra anuncios no personalizados por defecto hasta registrar el consentimiento necesario de Google. En iOS, la personalización también exige autorización de App Tracking Transparency; si la deniegas, los anuncios siguen siendo no personalizados. Puedes cambiar las opciones de privacidad disponibles en la app y los permisos de seguimiento y notificaciones en el dispositivo. La app móvil no usa cookies del navegador. Esta web puede guardar idioma y tema en almacenamiento local; el acceso con Google de la página de eliminación puede usar cookies o tecnologías similares según las políticas de Google."
          ]
        },
        {
          "heading": "Derechos de California",
          "paragraphs": [
            "Si se aplica CCPA/CPRA, puede conocer, acceder, eliminar, corregir y obtener una copia portátil cuando corresponda: admin@dappgo.com. No vendemos datos por dinero, pero tras el consentimiento podemos compartir identificadores y datos de anuncios con AdMob para publicidad conductual entre contextos, que puede ser «sharing». Rechace o retire la elección, desactive el seguimiento o escriba con el asunto “Do Not Sell or Share My Personal Information”. Puede usar agente autorizado, no discriminamos y respondemos normalmente en 45 días."
          ]
        },
        {
          "heading": "Derechos del EEE y Reino Unido",
          "paragraphs": [
            "Las bases GDPR son contrato para el servicio, consentimiento para anuncios personalizados y recogida opcional, intereses legítimos para seguridad, antitrampas, fraude, fiabilidad y soporte, y obligación legal para registros. Puede acceder, corregir, borrar, limitar, portar u oponerse, retirar consentimiento y reclamar ante la autoridad de su país o la ICO. Puede haber tratamiento en EE. UU. y otros países; usamos garantías legales como adecuación o cláusulas contractuales cuando se exige."
          ]
        },
        {
          "heading": "Conservación y eliminación",
          "paragraphs": [
            "Conservamos los datos de cuenta y jugador mientras la cuenta esté activa. La eliminación completada en la app o mediante autoservicio web de Google tiene efecto inmediato; las solicitudes por correo o formulario se completan en 30 días tras verificarlas, con las excepciones limitadas de conservación. Mantenemos el compromiso publicado de 14 meses para Google Analytics y Firebase Analytics, dentro del alcance de los controles de la propiedad explicados por Google ({{analyticsRetention}}); estos no abarcan todos los informes agregados ni los registros exportados por separado. Los registros de solicitudes del servidor se conservan 30 días. Apple y Google pueden conservar las compras en sus cuentas de tienda.",
            "Firebase tiene plazos distintos por servicio. Según su política publicada ({{firebaseRetention}}), Crashlytics empieza a eliminar los fallos y sus identificadores a los 90 días. Performance Monitoring conserva eventos asociados a IP durante 30 días y datos de rendimiento vinculados a la instalación o desidentificados durante 60 días antes de iniciar la eliminación. Los identificadores de instalación de Cloud Messaging y Remote Config pueden permanecer hasta que se solicite eliminar la instalación; Firebase indica que completa la eliminación de sistemas activos y copias de seguridad en 180 días desde esa solicitud. Eliminar una cuenta no borra inmediatamente todos los registros de Firebase.",
            "Eliminar la cuenta solicita retirar los datos de cuenta, jugador y registro push que conserva el desarrollador, según {{deleteAccount}}. La app también intenta retirar la habilitación de notificaciones, las suscripciones a temas y el token de la cuenta que se elimina. Esta limpieza asíncrona puede fallar y no elimina por sí misma el identificador de instalación de Firebase ni los registros de Analytics, fallos o rendimiento ya enviados. Se siguen aplicando los procesos de conservación y eliminación del proveedor. Además de las opciones de la app y la web, escribe a admin@dappgo.com para acceder a información de Firebase asociada o pedir su eliminación. Podemos conservar registros limitados por impuestos, contabilidad, seguridad, fraude, disputas u obligaciones legales, y eliminarlos o anonimizarlos cuando termine ese motivo."
          ]
        },
        {
          "heading": "Menores, seguridad, cambios y contacto",
          "paragraphs": [
            "Number RPG no se dirige a menores de 13 años. Si lo sabemos, un padre o tutor puede contactar y, tras verificar, eliminaremos los datos conforme a la ley; las reglas locales de edad mayor también aplican. Usamos medidas razonables pero no garantizamos seguridad absoluta. Actualizaremos la política cuando cambien el juego, proveedores o ley; la fecha superior es la versión vigente."
          ]
        }
      ]
    },
    terms: { kicker: "Number RPG · términos", title: "Términos de servicio", product: "Number RPG de DappGo", effective: "Fecha de entrada en vigor: 2026-10-27", summary: "Estas condiciones explican el juego invitado, cuentas opcionales, objetos virtuales, compras, juego limpio, terminación y derechos legales.", sections: [
      section("1. Aceptación y edad", ["Al usar Number RPG acepta estos términos y la política de privacidad. Está destinado a personas de 13 años o más; no lo use si es menor de la edad mínima o no puede consentir legalmente."]),
      section("2. Licencia y servicio", ["Yenlung Lai opera Number RPG como DappGo. Concede una licencia personal, limitada, no exclusiva, intransferible y revocable para uso no comercial; no transfiere propiedad del juego, código, arte, nombres o contenido. En iOS también se aplica la {{appleEula}} de Apple."]),
      section("3. Cuentas y seguridad", ["Puede jugar como invitado; Apple, Google o Facebook permiten guardados, funciones sociales, rankings y restauración. Proteja credenciales y no comparta cuentas, suplante ni proporcione datos falsos."]),
      section("4. Objetos virtuales y compras", ["Los objetos virtuales no tienen valor en efectivo y solo se usan en el juego; los consumibles se gastan y los no consumibles pueden restaurarse si la tienda lo admite. Compras, reembolsos y cancelaciones siguen Apple/Google; RevenueCat ayuda a restaurar derechos. Las compras pueden seguir restaurándose tras borrar la cuenta."]),
      section("5. Juego limpio y uso aceptable", ["Prohibimos trampas, bugs, automatización, manipular puntuaciones o recompensas, abusar de invitaciones o regalos, suplantar, interferir, dañar a otros y enviar contenido ilegal, abusivo, de odio, sexualmente explotador o infractor."]),
      section("6. Medidas y terminación", ["Podemos limitar, suspender o terminar por trampas, abuso, fraude, inseguridad o incumplimiento y cambiar partes del servicio. Puede borrar desde Ajustes → Cuenta → Eliminar cuenta; sobreviven los derechos y deberes que deban continuar."]),
      section("7. Exenciones y límites", ["En la medida legal, el juego se ofrece según disponibilidad sin garantizar continuidad, ausencia de errores, seguridad o conservación permanente. No respondemos por fallos del dispositivo, red, tienda, terceros o eventos fuera de control, ni por daños indirectos; la responsabilidad directa total se limita al mayor de lo pagado en 12 meses o 100 USD. No se limitan responsabilidades irrenunciables ni derechos del consumidor."]),
      section("8. Indemnización y controversias", ["En la medida legal, indemnizará por reclamaciones de terceros derivadas de uso ilegal, incumplimiento o contenido enviado, pero no por conducta indebida de DappGo. Contacte primero con admin@dappgo.com; no hay arbitraje obligatorio."]),
      section("9. Ley aplicable y jurisdicción", ["Rige la ley de California. Salvo derechos obligatorios del consumidor, el foro exclusivo es el tribunal estatal o federal de Los Ángeles, California, sin limitar los derechos imperativos de su país."]),
      section("10. Cambios y contacto", ["Podemos actualizar los términos cuando cambien el juego, proveedores o ley y avisar cambios importantes cuando se exija. La fecha superior es la versión vigente. Contacto: admin@dappgo.com."])
    ] },
    deleteAccount: { kicker: "Number RPG · eliminación de cuenta", title: "Eliminar su cuenta", product: "Number RPG de DappGo", effective: "Instrucciones vigentes: 2026-10-27", summary: "Puede eliminar la cuenta en la app, con el autoservicio de Google, o por formulario web o correo.", sections: [
      section("Eliminar desde la app", ["Vaya a Ajustes → Cuenta → Eliminar cuenta, confirme y mantenga la app conectada hasta terminar. Es inmediato; Apple puede pedir reautorización."]),
      section("Eliminar en la web", ["Con una cuenta Google vinculada, inicie sesión abajo, confirme, escriba DELETE y envíe. Es inmediato."]),
      section("Solicitar por formulario o correo", ["Para Apple, Facebook o invitado, use el formulario o admin@dappgo.com con ID de cuenta y correo vinculado. Verificaremos y completaremos en 30 días. No envíe contraseñas ni claves."]),
      section("Datos que eliminamos y conservamos", ["Eliminamos cuenta, identidades, perfil, dispositivos, sesiones, guardados, puntuaciones, invitaciones, amigos, regalos, recompensas, eventos, actividad, fraude y tokens push; la app reinicia el progreso local. Apple/Google pueden conservar compras y DappGo puede conservar registros limitados por ley, contabilidad, seguridad, fraude o disputas; después se eliminan o anonimizan."]),
      section("Plazos y ayuda", ["App y Google web son inmediatos; formularios y correos se completan en 30 días tras verificar. Contacte admin@dappgo.com si necesita ayuda."])
    ] }
  },
  "fr": {
    privacy: {
      "kicker": "Number RPG · confidentialité",
      "title": "Politique de confidentialité",
      "product": "Number RPG de DappGo",
      "effective": "Dernière mise à jour : 2026-10-30",
      "summary": "Number RPG permet de jouer comme invité. La connexion est facultative et ajoute la sauvegarde cloud, les fonctions sociales et la récupération entre appareils. Cette politique explique les données, les finalités et vos choix.",
      "sections": [
        {
          "heading": "Qui sommes-nous ?",
          "paragraphs": [
            "Number RPG est exploité par Yenlung Lai, entrepreneur individuel exerçant sous le nom DappGo à San Gabriel, Californie, États-Unis. Pour le RGPD et le RGPD britannique, DappGo est le responsable des données personnelles décrites ici. Questions, demandes de droits et réclamations : admin@dappgo.com."
          ]
        },
        {
          "heading": "Informations collectées",
          "paragraphs": [
            "Vous pouvez jouer comme invité. Nous pouvons recevoir ID de compte, fournisseur et subject ID, nom, pays, animal leader, sauvegardes, progression, scores, classements, invitations, amis, cadeaux, récompenses, achats RevenueCat, identifiant d’appareil haché, sessions, langue, fuseau, jetons push, données publicitaires, analytiques, d’erreur, de performance et choix de consentement. L’e-mail vient seulement d’Apple, Google ou Meta ; nous ne recevons pas les cartes."
          ]
        },
        {
          "heading": "Sources et finalités",
          "paragraphs": [
            "Les sources sont vous, les fournisseurs de connexion et de boutique, l’appareil et le jeu, ainsi que les autres joueurs. Nous fournissons jeu, comptes, sauvegardes, classements et fonctions sociales, traitons les achats, prévenons triche et fraude, envoyons les notifications demandées, améliorons la fiabilité après consentement et affichons des publicités non personnalisées jusqu’au consentement et aux autorisations nécessaires."
          ]
        },
        {
          "heading": "Prestataires et partage",
          "paragraphs": [
            "Apple traite Apple et App Store ; Google/Firebase traite Google, Play, Analytics, Crashlytics, Performance Monitoring, Remote Config, Cloud Messaging et AdMob ; Meta traite Facebook ; RevenueCat traite achats et droits. Chaque prestataire peut appliquer sa politique et être responsable indépendant. Les autres joueurs peuvent voir les éléments rendus visibles dans le jeu ; il n’y a pas de chat. Nous pouvons divulguer pour la loi, la sécurité ou la fraude."
          ]
        },
        {
          "heading": "Publicités, analyse, notifications et cookies",
          "paragraphs": [
            "Number RPG utilise Google AdMob pour diffuser des publicités et en mesurer les résultats. Le SDK Google Mobile Ads peut recueillir votre adresse IP et en déduire une localisation approximative, comme votre région, sans accéder à une position GPS précise ni demander une autorisation de localisation. Selon les choix de consentement applicables, Google peut utiliser ces données pour les fonctions de l’app et de publicité, l’analyse, la publicité de tiers et la publicité ou le marketing du développeur. DappGo ne conserve pas séparément cette localisation déduite. Google conserve les données publicitaires et de diagnostic selon ses politiques et réglages, notamment pour la sécurité, la lutte contre la fraude et les obligations légales. La durée varie selon les données et leur finalité ; nous ne promettons pas de délai fixe de suppression des données détenues par Google. Modifiez les choix publicitaires disponibles dans les réglages de confidentialité ou contactez admin@dappgo.com pour un accès ou une suppression. Voir les informations publicitaires ({{admobDisclosure}}) et la politique de conservation ({{googleRetention}}).",
            "Nous utilisons Firebase Crashlytics pour diagnostiquer les plantages et erreurs, Performance Monitoring pour mesurer le démarrage, le rendu et le réseau, et Remote Config pour transmettre les réglages de l’app et du jeu. Lorsque vos choix de consentement applicables le permettent, Firebase Analytics mesure l’utilisation, la progression, les achats, les performances publicitaires et les interactions avec les notifications. Ces services peuvent traiter des identifiants d’installation et de session, traces de plantage et messages d’erreur, informations sur l’appareil, le système, l’app et le réseau, mesures de performance, langue, fuseau horaire et pays ou région déduits de l’IP. Les rapports Crashlytics peuvent contenir votre identifiant opaque de compte Number RPG et la région ou le niveau du jeu. Analytics utilise un identifiant d’instance de l’app ; nous ne lui transmettons pas votre nom, adresse e-mail ou identifiant de compte comme identifiant utilisateur. Le stockage publicitaire, les données utilisateur publicitaires et la personnalisation des annonces de Firebase Analytics sont désactivés. Ces usages servent au fonctionnement, à la fiabilité, à la configuration et à l’analyse ; ils n’autorisent pas le suivi publicitaire par Firebase.",
            "Si vous activez des notifications compatibles, Firebase Cloud Messaging traite des identifiants d’inscription et d’installation, un jeton push Apple sur iOS et le contexte de l’app et de l’appareil nécessaire à l’envoi. Pour les rappels du compte, notre service conserve le jeton associé au compte, à la plateforme, à la langue de l’appareil, au fuseau et aux préférences de notification. Les demandes de vies entre amis peuvent inclure le nom affiché de l’ami et l’identifiant du compte destinataire. Les promotions d’événements nécessitent leur propre préférence marketing. Les annonces de la saison 2 demandent un abonnement distinct au sujet season-2 ; les rappels de vies ou d’expédition ne vous y abonnent pas. Les abonnements et interactions peuvent être traités pour envoyer les messages choisis et, lorsque la collecte Analytics est autorisée, mesurer leur utilisation. Modifiez vos choix dans l’app ou les réglages de l’appareil.",
            "AdMob diffuse par défaut des annonces non personnalisées tant que le consentement Google requis n’est pas enregistré. Sur iOS, la personnalisation nécessite aussi l’autorisation App Tracking Transparency ; un refus maintient des annonces non personnalisées. Gérez les choix de confidentialité disponibles dans l’app et les autorisations de suivi et de notification sur l’appareil. L’app mobile n’utilise pas de cookies de navigateur. Le site peut enregistrer la langue et le thème en stockage local ; la connexion Google de la page de suppression peut utiliser des cookies ou des technologies similaires selon les politiques de Google."
          ]
        },
        {
          "heading": "Droits californiens",
          "paragraphs": [
            "Si CCPA/CPRA s’applique, demandez accès, connaissance, suppression, correction et portabilité à admin@dappgo.com. Nous ne vendons pas les données contre de l’argent, mais pouvons partager après consentement des identifiants et données publicitaires avec AdMob pour la publicité comportementale entre contextes, possiblement un « sharing ». Refusez ou retirez le choix publicitaire, désactivez le suivi ou écrivez avec l’objet “Do Not Sell or Share My Personal Information”. Vous pouvez mandater un agent, nous ne discriminons pas et répondons normalement sous 45 jours."
          ]
        },
        {
          "heading": "Droits EEE et Royaume-Uni",
          "paragraphs": [
            "Les bases RGPD sont contrat pour le service, consentement pour publicité personnalisée et collecte facultative, intérêts légitimes pour sécurité, anti-triche, fraude, fiabilité et assistance, obligation légale pour les registres. Vous pouvez demander accès, rectification, effacement, limitation, portabilité, opposition et retrait du consentement, puis saisir l’autorité de votre pays ou l’ICO. Des traitements peuvent avoir lieu aux États-Unis et ailleurs avec des garanties légales telles que décision d’adéquation ou clauses types."
          ]
        },
        {
          "heading": "Conservation et suppression",
          "paragraphs": [
            "Nous gardons les données de compte et de joueur tant que le compte est actif. Une suppression réussie dans l’app ou par le libre-service web Google prend effet immédiatement ; les demandes par e-mail ou formulaire sont traitées sous 30 jours après vérification, sous réserve d’exceptions limitées de conservation. Notre engagement publié de 14 mois pour Google Analytics et Firebase Analytics reste applicable, dans le périmètre des réglages de la propriété décrit par Google ({{analyticsRetention}}) ; ces contrôles ne couvrent pas tous les rapports agrégés ni les données exportées séparément. Les journaux de requêtes du serveur sont gardés 30 jours. Apple et Google peuvent conserver les achats dans leurs comptes de boutique.",
            "La durée Firebase dépend du service. Selon sa politique publiée ({{firebaseRetention}}), Crashlytics commence à supprimer les données de plantage et les identifiants associés après 90 jours. Performance Monitoring garde les événements associés à l’IP 30 jours et les données liées à l’installation ou désidentifiées 60 jours avant de commencer leur suppression. Les identifiants d’installation de Cloud Messaging et Remote Config peuvent rester jusqu’à une demande de suppression de l’installation ; Firebase indique achever leur retrait des systèmes actifs et des sauvegardes sous 180 jours après cette demande. Supprimer le compte n’efface pas immédiatement tous les enregistrements Firebase.",
            "La suppression du compte demande le retrait des données de compte, de joueur et d’inscription push détenues par le développeur, selon {{deleteAccount}}. L’app tente aussi de retirer l’éligibilité aux notifications, les abonnements aux sujets et le jeton push du compte supprimé. Ce nettoyage asynchrone peut échouer et ne supprime pas à lui seul l’identifiant d’installation Firebase ni les données Analytics, de plantage ou de performance déjà envoyées. Les procédures du fournisseur continuent de s’appliquer. En complément des options dans l’app et sur le site, contactez admin@dappgo.com pour accéder aux informations Firebase associées ou en demander la suppression. Des données limitées peuvent rester pour la fiscalité, la comptabilité, la sécurité, la fraude, les litiges ou des obligations légales, puis être supprimées ou anonymisées à la fin de ce besoin."
          ]
        },
        {
          "heading": "Enfants, sécurité, modifications et contact",
          "paragraphs": [
            "Number RPG ne vise pas les moins de 13 ans. Si nous le savons, un parent peut contacter admin@dappgo.com et nous supprimerons après vérification selon la loi ; les règles locales plus strictes s’appliquent. Nous protégeons raisonnablement les données sans garantir une sécurité absolue. Nous mettons à jour en cas de changement ; la date en tête est la version actuelle."
          ]
        }
      ]
    },
    terms: { kicker: "Number RPG · conditions", title: "Conditions d’utilisation", product: "Number RPG de DappGo", effective: "Date d’entrée en vigueur : 2026-10-27", summary: "Ces conditions expliquent le jeu invité, les comptes facultatifs, objets virtuels, achats, fair-play, fin de compte et droits légaux.", sections: [
      section("1. Acceptation et âge", ["L’utilisation de Number RPG vaut acceptation des conditions et de la politique de confidentialité. Le jeu vise les 13 ans et plus ; n’utilisez pas si vous êtes trop jeune ou ne pouvez pas consentir légalement."]),
      section("2. Licence et service", ["Yenlung Lai exploite le jeu sous DappGo. Licence personnelle, limitée, non exclusive, non transférable et révocable pour usage non commercial ; aucune propriété du jeu, code, art, noms ou contenu. Sur iOS, le {{appleEula}} d’Apple s’applique aussi."]),
      section("3. Comptes et sécurité", ["Le jeu invité est possible ; Apple, Google ou Facebook permettent sauvegardes, social, classements et restauration. Protégez vos identifiants et ne partagez pas, n’usurpez pas et ne fournissez pas sciemment de fausses informations."]),
      section("4. Objets virtuels et achats", ["Les objets virtuels n’ont pas de valeur monétaire et servent uniquement au jeu ; les consommables sont dépensés et les droits non consommables peuvent être restaurés si la boutique le permet. Achats et remboursements suivent Apple/Google ; RevenueCat aide à restaurer les droits. Les achats peuvent rester restaurables après suppression."]),
      section("5. Fair-play et usage acceptable", ["Triche, bugs, automatisation, manipulation de scores ou récompenses, abus d’invitations ou cadeaux, usurpation, interférence, nuisance et contenu illégal, abusif, haineux, d’exploitation sexuelle ou contrefaisant sont interdits."]),
      section("6. Mesures et résiliation", ["Nous pouvons limiter, suspendre ou résilier pour triche, abus, fraude, danger ou violation, et changer le service. Supprimez depuis Réglages → Compte → Supprimer le compte ; les droits et obligations survivants restent en vigueur."]),
      section("7. Garanties et limites", ["Dans la mesure légale, le jeu est fourni tel quel sans garantie de continuité, absence d’erreur, sécurité ou conservation permanente. Pas de responsabilité pour appareil, réseau, boutique, tiers ou événement hors contrôle, ni pour dommages indirects ; responsabilité directe plafonnée au plus élevé des paiements des 12 derniers mois ou 100 USD. Les responsabilités impératives et droits du consommateur restent intacts."]),
      section("8. Indemnisation et litiges", ["Dans la mesure légale, vous indemnisez DappGo pour les réclamations de tiers dues à un usage illégal, une violation ou votre contenu, hors faute de DappGo. Contactez d’abord admin@dappgo.com ; aucun arbitrage obligatoire."]),
      section("9. Droit et juridiction", ["Droit de Californie. Sous réserve des droits impératifs du consommateur, tribunaux d’État ou fédéraux du comté de Los Angeles comme for exclusif, sans limiter les droits de votre pays."]),
      section("10. Modifications et contact", ["Nous pouvons mettre à jour selon le jeu, les prestataires ou la loi et notifier les changements importants si nécessaire. La date en tête est la version actuelle. Contact : admin@dappgo.com."])
    ] },
    deleteAccount: { kicker: "Number RPG · suppression du compte", title: "Supprimer votre compte", product: "Number RPG de DappGo", effective: "Instructions en vigueur : 2026-10-27", summary: "Supprimez dans l’app, avec l’autoservice Google, ou par formulaire web et e-mail.", sections: [
      section("Supprimer dans l’app", ["Réglages → Compte → Supprimer le compte, confirmez et restez en ligne jusqu’à la réussite. Effet immédiat ; Apple peut demander une nouvelle autorisation."]),
      section("Supprimer sur le web", ["Pour un compte Google, connectez-vous ci-dessous, confirmez, saisissez DELETE et envoyez. Effet immédiat."]),
      section("Demander par formulaire ou e-mail", ["Pour Apple, Facebook ou invité, utilisez le formulaire ou admin@dappgo.com avec l’ID du compte et l’e-mail lié. Après vérification, sous 30 jours. N’envoyez pas de secrets."]),
      section("Données supprimées et conservées", ["Nous retirons compte, identités, profil, appareils, sessions, sauvegardes, scores, invitations, amis, cadeaux, récompenses, événements, activité, fraude et jetons push ; l’app réinitialise le progrès local. Apple/Google peuvent garder les achats et DappGo des dossiers limités nécessaires à la loi, comptabilité, sécurité, fraude ou litiges ; suppression ou anonymisation ensuite."]),
      section("Délai et aide", ["App et Google web : immédiat ; formulaire et e-mail : sous 30 jours après vérification. Contactez admin@dappgo.com en cas de problème."])
    ] }
  },
  "de": {
    privacy: {
      "kicker": "Number RPG · Datenschutz",
      "title": "Datenschutzerklärung",
      "product": "Number RPG von DappGo",
      "effective": "Zuletzt aktualisiert: 2026-10-30",
      "summary": "Number RPG kann als Gast gespielt werden. Die Anmeldung ist freiwillig und ermöglicht Cloud-Spielstände, soziale Funktionen und Wiederherstellung auf mehreren Geräten. Diese Erklärung beschreibt Daten, Zwecke und Wahlmöglichkeiten.",
      "sections": [
        {
          "heading": "Wer wir sind",
          "paragraphs": [
            "Number RPG wird von Yenlung Lai betrieben, einem Einzelunternehmer, der in San Gabriel, Kalifornien, USA, unter DappGo tätig ist. Für DSGVO und britische DSGVO ist DappGo Verantwortlicher der beschriebenen Daten. Fragen, Rechteanträge und Beschwerden: admin@dappgo.com."
          ]
        },
        {
          "heading": "Welche Daten wir erfassen",
          "paragraphs": [
            "Als Gast ist Spielen möglich. Je nach Funktion erfassen oder erhalten wir Konto-ID, Anbieter und Subject-ID, Anzeigename, Land, Haustier, Cloud-Spielstände, Fortschritt, Punkte, Ranglisten, Einladungen, Freunde, Geschenke, Belohnungen, RevenueCat-Käufe, gehashte Gerätekennung, Sitzungen, Sprache, Zeitzone, Push-Token sowie Werbe-, Analyse-, Fehler-, Leistungs- und Einwilligungsdaten. E-Mail nur bei Bereitstellung durch Apple, Google oder Meta; keine Kartendaten."
          ]
        },
        {
          "heading": "Quellen und Zwecke",
          "paragraphs": [
            "Quellen sind Sie, gewählte Login- und Store-Anbieter, Gerät und Spiel sowie andere Spieler. Wir liefern Spiel, Konto, Speicher, Ranglisten und Social-Funktionen, verarbeiten Käufe, verhindern Betrug, senden gewünschte Benachrichtigungen, verbessern nach Einwilligung die Zuverlässigkeit und zeigen bis zur nötigen Einwilligung nicht personalisierte Werbung."
          ]
        },
        {
          "heading": "Dienstleister und Weitergabe",
          "paragraphs": [
            "Apple verarbeitet Apple und App Store; Google/Firebase Google, Play, Analytics, Crashlytics, Performance Monitoring, Remote Config, Cloud Messaging und AdMob; Meta Facebook; RevenueCat Käufe und Rechte. Anbieter haben eigene Richtlinien und können eigenständige Verantwortliche sein. Andere Spieler sehen veröffentlichte Angaben; es gibt keinen Chat. Offenlegung ist für Gesetz, Sicherheit und Betrugsprävention möglich."
          ]
        },
        {
          "heading": "Werbung, Analysen, Benachrichtigungen und Cookies",
          "paragraphs": [
            "Number RPG nutzt Google AdMob, um Werbung auszuliefern und ihre Wirkung zu messen. Das Google Mobile Ads SDK kann Ihre IP-Adresse erfassen und daraus eine ungefähre Region ableiten, ohne genaue GPS-Daten abzurufen oder eine Standortberechtigung anzufordern. Je nach geltender Einwilligung kann Google diese Daten für App- und Werbefunktionen, Analysen, Drittwerbung sowie Werbung oder Marketing des Entwicklers nutzen. DappGo speichert den vom SDK abgeleiteten Standort nicht gesondert. Google bewahrt Werbe- und zugehörige Diagnosedaten nach seinen Richtlinien und konfigurierten Einstellungen auf, auch für Sicherheit, Betrugsprävention und rechtliche Pflichten. Die Fristen hängen von Daten und Zweck ab; für Daten bei Google versprechen wir keine feste Löschfrist. Verfügbare Werbeoptionen finden Sie in den Datenschutzeinstellungen der App. Für Auskunft oder Löschung schreiben Sie an admin@dappgo.com. Siehe Googles Werbedatenhinweise ({{admobDisclosure}}) und Aufbewahrungsrichtlinie ({{googleRetention}}).",
            "Wir nutzen Firebase Crashlytics zur Diagnose von Abstürzen und Fehlern, Performance Monitoring zur Messung von Start-, Darstellungs- und Netzwerkleistung sowie Remote Config für App-Einstellungen und Spielkonfiguration. Soweit Ihre geltenden Einwilligungsentscheidungen es erlauben, misst Firebase Analytics die App-Nutzung, Spielfortschritte, Käufe, Werbeleistung und Benachrichtigungsinteraktionen. Diese Dienste können Installations- und Sitzungskennungen, Absturz-Stacktraces und Fehlermeldungen, Geräte-, Betriebssystem-, App- und Netzwerkinformationen, Leistungsmessungen, Sprache, Zeitzone und aus IP-Adressen abgeleitete Länder oder Regionen verarbeiten. Crashlytics-Berichte können Ihre technische Number-RPG-Kontokennung und Spielregion oder Stufe enthalten. Analytics verwendet eine App-Instanzkennung; die App übermittelt weder Namen noch E-Mail oder Kontokennung als Analytics-Nutzer-ID. Werbespeicherung, Werbenutzerdaten und personalisierte Werbung in Firebase Analytics sind deaktiviert. Diese Nutzung dient Betrieb, Zuverlässigkeit, Konfiguration und Analyse und erlaubt kein Firebase-Werbetracking.",
            "Wenn Sie entsprechende Benachrichtigungen aktivieren, verarbeitet Firebase Cloud Messaging Registrierungs- und Installationskennungen, unter iOS ein Apple-Push-Token und den für die Zustellung nötigen App- und Gerätekontext. Für Kontoerinnerungen speichert unser Dienst das Push-Token zusammen mit Konto, Plattform, Gerätesprache, Zeitzone und Benachrichtigungseinstellungen. Lebensanfragen von Freunden können deren Anzeigenamen und die Kontokennung des Empfängers enthalten. Werbliche Ereignisnachrichten erfordern eine eigene Marketingeinstellung. Ankündigungen zu Saison 2 benötigen ein gesondertes Abonnement des Themas season-2; Erinnerungen an Leben oder Expeditionen melden Sie dafür nicht an. Themenabonnements und Interaktionen können zur Zustellung gewählter Nachrichten und bei erlaubter Analytics-Erfassung zur Nutzungsmessung verarbeitet werden. Änderungen sind in der App oder den Geräteeinstellungen möglich.",
            "AdMob zeigt standardmäßig nicht personalisierte Werbung, bis die erforderliche Google-Einwilligung vorliegt. Unter iOS setzt Personalisierung zusätzlich die App-Tracking-Transparency-Freigabe voraus; bei Ablehnung bleibt Werbung nicht personalisiert. Verfügbare Datenschutzoptionen ändern Sie in der App, Tracking- und Benachrichtigungsrechte am Gerät. Die mobile App nutzt keine Browser-Cookies. Diese Website kann Sprache und Darstellung lokal speichern; die Google-Anmeldung auf der Löschseite kann nach Googles Richtlinien Cookies oder ähnliche Technik verwenden."
          ]
        },
        {
          "heading": "Datenschutzrechte in Kalifornien",
          "paragraphs": [
            "Bei CCPA/CPRA können Sie Auskunft, Zugang, Löschung, Berichtigung und Portabilität über admin@dappgo.com verlangen. Wir verkaufen Daten nicht gegen Geld, können aber nach Einwilligung Geräte-/Werbekennungen und Anzeigeninteraktionen für kontextübergreifende Werbung mit AdMob teilen, möglicherweise „sharing“. Werbeauswahl ablehnen/zurückziehen, Tracking deaktivieren oder mit Betreff “Do Not Sell or Share My Personal Information” schreiben. Bevollmächtigte sind möglich, keine Diskriminierung; Antwort grundsätzlich binnen 45 Tagen."
          ]
        },
        {
          "heading": "Datenschutzrechte im EWR und Vereinigten Königreich",
          "paragraphs": [
            "Rechtsgrundlagen sind Vertrag für den Dienst, Einwilligung für personalisierte Werbung und optionale Erfassung, berechtigte Interessen für Sicherheit, Anti-Cheat, Betrug, Zuverlässigkeit und Support sowie gesetzliche Pflicht für erforderliche Aufzeichnungen. Sie können Zugang, Korrektur, Löschung, Einschränkung, Übertragbarkeit, Widerspruch und Widerruf verlangen und sich bei Aufsicht oder ICO beschweren. Verarbeitung kann in den USA und anderen Ländern erfolgen; erforderlichenfalls nutzen wir Angemessenheit, Standardvertragsklauseln oder andere Garantien."
          ]
        },
        {
          "heading": "Aufbewahrung und Löschung",
          "paragraphs": [
            "Wir bewahren Konto- und Spielerdaten während der aktiven Kontonutzung auf. Erfolgreiche Löschung in der App oder per Google-Web-Selbstbedienung wirkt sofort; E-Mail- und Formularanfragen bearbeiten wir innerhalb von 30 Tagen nach Prüfung, vorbehaltlich begrenzter Aufbewahrungsausnahmen. Die veröffentlichte Zusage von 14 Monaten für Google-Analytics- und Firebase-Analytics-Daten gilt weiterhin im Umfang der Aufbewahrungseinstellungen der Property gemäß Google-Dokumentation ({{analyticsRetention}}); diese erfassen nicht sämtliche aggregierten Berichte oder separat exportierten Daten. Server-Anfrageprotokolle bleiben 30 Tage gespeichert. Apple und Google können Kaufbelege in ihren Store-Konten aufbewahren.",
            "Firebase hat dienstabhängige Fristen. Laut veröffentlichter Richtlinie ({{firebaseRetention}}) beginnt Crashlytics nach 90 Tagen mit dem Entfernen von Absturzdaten und zugehörigen Kennungen. Performance Monitoring bewahrt IP-bezogene Ereignisse 30 Tage und installationsbezogene oder deidentifizierte Leistungsdaten 60 Tage auf, bevor die Entfernung beginnt. Installationskennungen von Cloud Messaging und Remote Config können bis zur beantragten Installationslöschung verbleiben. Firebase gibt an, die Entfernung aus aktiven Systemen und Sicherungen innerhalb von 180 Tagen nach dieser Anfrage abzuschließen. Eine Kontolöschung entfernt nicht sofort jeden Firebase-Datensatz.",
            "Die Kontolöschung beantragt das Entfernen der beim Entwickler gespeicherten Konto-, Spieler- und Push-Registrierungsdaten gemäß {{deleteAccount}}. Die App versucht außerdem, Benachrichtigungsberechtigung, Themenabonnements und Push-Token des ausscheidenden Kontos zu bereinigen. Diese asynchrone Bereinigung kann fehlschlagen und löscht selbst weder die Firebase-Installationskennung noch bereits hochgeladene Analytics-, Absturz- oder Leistungsdaten. Dafür gelten die Verfahren des Anbieters. Zusätzlich zu den Löschwegen in der App und im Web erreichen Sie uns unter admin@dappgo.com für Auskunft oder Löschanfragen zu zugehörigen Firebase-Daten. Begrenzte Aufzeichnungen können für Steuern, Buchhaltung, Sicherheit, Betrugsprävention, Streitfälle oder rechtliche Pflichten verbleiben und werden nach Wegfall des Grundes gelöscht oder anonymisiert."
          ]
        },
        {
          "heading": "Kinder, Sicherheit, Änderungen und Kontakt",
          "paragraphs": [
            "Number RPG richtet sich nicht an unter 13-Jährige. Eltern können bei Kenntnis admin@dappgo.com kontaktieren; nach Prüfung löschen wir nach Gesetz. Höhere lokale Altersregeln gelten. Wir schützen angemessen, garantieren aber keine absolute Sicherheit. Bei Änderungen aktualisieren wir; das Datum oben ist die aktuelle Fassung."
          ]
        }
      ]
    },
    terms: { kicker: "Number RPG · Bedingungen", title: "Nutzungsbedingungen", product: "Number RPG von DappGo", effective: "Gültig ab: 2026-10-27", summary: "Diese Bedingungen erklären Gastspiel, freiwillige Konten, virtuelle Gegenstände, Käufe, Fair Play, Beendigung und Rechte.", sections: [
      section("1. Zustimmung und Alter", ["Die Nutzung bedeutet Zustimmung zu Bedingungen und Datenschutzerklärung. Für 13 Jahre und älter; unter der Mindestaltergrenze oder ohne rechtliche Zustimmung nicht verwenden."]),
      section("2. Lizenz und Dienst", ["Yenlung Lai betreibt das Spiel als DappGo. Persönliche, begrenzte, nicht ausschließliche, nicht übertragbare, widerrufliche Lizenz für nicht kommerzielle Nutzung; keine Eigentumsübertragung. Für iOS gilt zusätzlich Apples {{appleEula}}."]),
      section("3. Konten und Sicherheit", ["Gastspiel möglich; Apple, Google oder Facebook unterstützen Speicher, Social, Ranglisten und Wiederherstellung. Schützen Sie Zugangsdaten und teilen Sie keine Konten, täuschen Sie keine Identität vor und machen Sie keine bewusst falschen Angaben."]),
      section("4. Virtuelle Gegenstände und Käufe", ["Virtuelle Währung, Leben, Zubehör und Upgrades haben keinen Geldwert und dienen nur dem Spiel; Verbrauchsgegenstände werden verbraucht, nicht verbrauchbare Rechte können bei Store-Unterstützung wiederhergestellt werden. Käufe und Erstattungen folgen Apple/Google; RevenueCat unterstützt Rechte. Käufe können nach Kontolöschung wiederherstellbar bleiben."]),
      section("5. Fair Play und zulässige Nutzung", ["Cheaten, Bugs, Automatisierung, Manipulation, Missbrauch von Einladungen/Geschenken, Identitätsvortäuschung, Störung, Schädigung und rechtswidrige, beleidigende, hasserfüllte, sexuell ausbeuterische oder rechtsverletzende Inhalte sind verboten."]),
      section("6. Maßnahmen und Beendigung", ["Bei Cheating, Missbrauch, Betrug, Unsicherheit oder Verstoß können wir Zugriff beschränken, sperren oder beenden und Dienste ändern. Löschen unter Einstellungen → Konto → Konto löschen; fortbestehende Rechte und Pflichten bleiben."]),
      section("7. Haftungsausschlüsse und Grenzen", ["Gesetzlich zulässig wird der Dienst verfügbar und ohne Garantie für Kontinuität, Fehlerfreiheit, Sicherheit oder dauerhafte Speicherung bereitgestellt. Keine Haftung für Gerät, Netz, Store, Dritte oder nicht kontrollierbare Ereignisse und keine für indirekte Schäden; direkte Haftung höchstens Zahlungen der letzten 12 Monate oder 100 USD, höherer Betrag. Unabdingbare Haftung und Verbraucherrechte bleiben."]),
      section("8. Freistellung und Streitigkeiten", ["Sie stellen DappGo im gesetzlichen Umfang für Drittansprüche wegen rechtswidriger Nutzung, Verstoß oder Inhalten frei, nicht für eigenes Fehlverhalten von DappGo. Erst admin@dappgo.com kontaktieren; kein verpflichtendes Schiedsverfahren."]),
      section("9. Recht und Gerichtsstand", ["Kalifornisches Recht; vorbehaltlich zwingender Verbraucherrechte sind staatliche oder Bundesgerichte in Los Angeles County, Kalifornien, ausschließlicher Gerichtsstand."]),
      section("10. Änderungen und Kontakt", ["Wir können bei Änderungen von Spiel, Anbieter oder Recht aktualisieren und wichtige Änderungen erforderlichenfalls mitteilen. Das Datum oben ist aktuell. Kontakt: admin@dappgo.com."])
    ] },
    deleteAccount: { kicker: "Number RPG · Kontolöschung", title: "Konto löschen", product: "Number RPG von DappGo", effective: "Anleitung gültig ab: 2026-10-27", summary: "Löschen Sie in der App, mit Google-Selbstservice oder über Webformular und E-Mail.", sections: [
      section("In der App löschen", ["Einstellungen → Konto → Konto löschen, bestätigen und bis zum Erfolg online bleiben. Sofort; Apple kann eine erneute Autorisierung verlangen."]),
      section("Im Web löschen", ["Mit Google verknüpftes Konto unten anmelden, bestätigen, DELETE eingeben und senden. Sofort wirksam."]),
      section("Per Formular oder E-Mail anfordern", ["Für Apple, Facebook oder Gast Formular oder admin@dappgo.com mit Konto-ID und E-Mail nutzen. Nach Prüfung binnen 30 Tagen; keine Passwörter oder Schlüssel senden."]),
      section("Gelöschte und verbleibende Daten", ["Konto, Identitäten, Profil, Geräte, Sitzungen, Speicherstände, Punkte, Einladungen, Freunde, Geschenke, Belohnungen, Ereignisse, Aktivitäten, Betrugsdaten und Push-Token werden entfernt; lokaler Fortschritt wird zurückgesetzt. Apple/Google können Käufe, DappGo begrenzte gesetzliche, buchhalterische, Sicherheits-, Betrugs- oder Streitdaten behalten; danach löschen/anonymisieren wir."]),
      section("Dauer und Hilfe", ["App und Google Web sofort; Formular und E-Mail binnen 30 Tagen nach Prüfung. Hilfe: admin@dappgo.com."])
    ] }
  },
  "pt-BR": {
    privacy: {
      "kicker": "Number RPG · privacidade",
      "title": "Política de privacidade",
      "product": "Number RPG da DappGo",
      "effective": "Última atualização: 2026-10-30",
      "summary": "Number RPG permite jogar como convidado. O login é opcional e adiciona salvamento na nuvem, recursos sociais e recuperação entre dispositivos. Esta política explica dados, finalidades e escolhas.",
      "sections": [
        {
          "heading": "Quem somos",
          "paragraphs": [
            "Number RPG é operado por Yenlung Lai, empresário individual que atua como DappGo em San Gabriel, Califórnia, EUA. Para o GDPR e o GDPR do Reino Unido, a DappGo é a controladora dos dados descritos. Perguntas, direitos e reclamações: admin@dappgo.com."
          ]
        },
        {
          "heading": "Informações coletadas",
          "paragraphs": [
            "Como convidado, podemos receber ID, provedor e subject ID, nome, país, mascote líder, salvamentos, progresso, pontos, rankings, convites, amigos, presentes, recompensas, compras da RevenueCat, identificador de dispositivo com hash, sessões, idioma, fuso, token push, dados de anúncios, análise, falhas, desempenho e consentimento. E-mail somente se fornecido por Apple, Google ou Meta; não recebemos dados de cartão."
          ]
        },
        {
          "heading": "Fontes e finalidades",
          "paragraphs": [
            "As fontes são você, provedores de login e loja, dispositivo, jogo e outros jogadores. Usamos para fornecer jogo, conta, salvamento, rankings e social; processar compras; prevenir trapaça, abuso e fraude; enviar notificações solicitadas; melhorar confiabilidade após consentimento; e mostrar anúncios não personalizados até consentimento e permissões necessárias."
          ]
        },
        {
          "heading": "Prestadores e compartilhamento",
          "paragraphs": [
            "Apple cuida de Apple e App Store; Google/Firebase de Google, Play, Analytics, Crashlytics, Performance Monitoring, Remote Config, Cloud Messaging e AdMob; Meta de Facebook; RevenueCat de compras e direitos. Prestadores têm políticas próprias e podem ser controladores independentes. Outros jogadores veem dados que você tornar públicos; não há chat. Podemos divulgar por lei, segurança e prevenção de fraude."
          ]
        },
        {
          "heading": "Anúncios, análises, notificações e cookies",
          "paragraphs": [
            "O Number RPG usa o Google AdMob para exibir anúncios e medir seus resultados. O SDK do Google Mobile Ads pode coletar seu endereço IP e inferir uma localização aproximada, como sua região, sem acessar o GPS preciso nem pedir permissão de localização. Conforme as escolhas de consentimento aplicáveis, o Google pode usar esses dados para funções do app e de publicidade, análises, anúncios de terceiros e publicidade ou marketing do desenvolvedor. A DappGo não armazena separadamente essa localização inferida. O Google mantém dados publicitários e de diagnóstico conforme suas políticas e controles configurados, inclusive por segurança, prevenção de fraude e obrigações legais. O prazo varia por tipo de dado e finalidade; não prometemos um período fixo de exclusão para dados mantidos pelo Google. Altere as opções publicitárias disponíveis nas configurações de privacidade ou contate admin@dappgo.com para acesso ou exclusão. Consulte a divulgação de dados publicitários ({{admobDisclosure}}) e a política de retenção ({{googleRetention}}).",
            "Usamos o Firebase Crashlytics para diagnosticar falhas e erros, o Performance Monitoring para medir inicialização, renderização e rede, e o Remote Config para distribuir ajustes do app e configurações do jogo. Quando suas escolhas de consentimento aplicáveis permitem, o Firebase Analytics mede uso, progresso, compras, desempenho dos anúncios e interações com notificações. Esses serviços podem tratar identificadores de instalação e sessão, rastreamentos de falha e mensagens de erro, informações do dispositivo, sistema, app e rede, métricas de desempenho, idioma, fuso horário e país ou região aproximados derivados do IP. Relatórios do Crashlytics podem incluir seu ID opaco de conta do Number RPG e a região ou fase do jogo. O Analytics usa um identificador de instância do app; não fornecemos nome, e-mail ou ID da conta como ID de usuário do Analytics. O armazenamento de publicidade, os dados de usuário para publicidade e a personalização de anúncios do Firebase Analytics estão desativados. Esses usos servem à operação, confiabilidade, configuração e análise, sem autorizar rastreamento publicitário pelo Firebase.",
            "Ao ativar notificações compatíveis, o Firebase Cloud Messaging trata identificadores de registro e instalação, um token push da Apple no iOS e o contexto do app e dispositivo necessário à entrega. Para lembretes da conta, nosso serviço armazena o token associado à conta, plataforma, idioma do dispositivo, fuso horário e preferências. Pedidos de vidas de amigos podem incluir o nome do amigo e o identificador da conta destinatária. Promoções de eventos exigem uma preferência própria de marketing; anúncios da temporada 2 exigem inscrição separada no tópico season-2. Ativar lembretes de vidas ou expedições não faz essa inscrição. Inscrições e interações podem ser tratadas para entregar as mensagens escolhidas e, quando a coleta do Analytics é permitida, medir seu uso. Altere as escolhas no app ou no dispositivo.",
            "O AdMob exibe anúncios não personalizados por padrão até registrar o consentimento necessário do Google. No iOS, a personalização também exige autorização do App Tracking Transparency; se recusada, os anúncios continuam não personalizados. Gerencie as opções de privacidade disponíveis no app e as permissões de rastreamento e notificações no dispositivo. O app móvel não usa cookies de navegador. O site pode salvar idioma e tema no armazenamento local; o login do Google na página de exclusão pode usar cookies ou tecnologias semelhantes conforme as políticas do Google."
          ]
        },
        {
          "heading": "Direitos na Califórnia",
          "paragraphs": [
            "Se CCPA/CPRA se aplicar, peça acesso, conhecimento, exclusão, correção e portabilidade a admin@dappgo.com. Não vendemos dados por dinheiro, mas após consentimento podemos compartilhar identificadores e dados de anúncios com AdMob para publicidade comportamental entre contextos, possivelmente “sharing”. Recuse ou retire a escolha, desative rastreamento ou escreva com o assunto “Do Not Sell or Share My Personal Information”. Pode usar agente autorizado, não discriminamos e respondemos normalmente em 45 dias."
          ]
        },
        {
          "heading": "Direitos no EEE e Reino Unido",
          "paragraphs": [
            "Bases GDPR: contrato para o serviço, consentimento para publicidade personalizada e coleta opcional, interesses legítimos para segurança, antitrapaça, fraude, confiabilidade e suporte, obrigação legal para registros. Pode pedir acesso, correção, exclusão, limitação, portabilidade, oposição e retirar consentimento; também reclamar à autoridade local ou ICO. Pode haver tratamento nos EUA e outros países com garantias legais quando necessárias."
          ]
        },
        {
          "heading": "Retenção e exclusão",
          "paragraphs": [
            "Mantemos os dados da conta e do jogador enquanto a conta estiver ativa. A exclusão concluída no app ou pelo autoatendimento web do Google tem efeito imediato; pedidos por e-mail ou formulário são concluídos em até 30 dias após verificação, com exceções limitadas de retenção. Continua valendo o compromisso publicado de 14 meses para dados do Google Analytics e Firebase Analytics, no alcance dos controles da propriedade descritos pelo Google ({{analyticsRetention}}); eles não abrangem todos os relatórios agregados nem registros exportados separadamente. Logs de solicitações do servidor são mantidos por 30 dias. Apple e Google podem manter compras nas contas das lojas.",
            "O prazo do Firebase varia por serviço. Conforme a política publicada ({{firebaseRetention}}), o Crashlytics começa a remover dados de falhas e identificadores associados após 90 dias. O Performance Monitoring mantém eventos associados ao IP por 30 dias e dados de desempenho vinculados à instalação ou desidentificados por 60 dias antes de iniciar a remoção. Identificadores de instalação do Cloud Messaging e Remote Config podem permanecer até um pedido de exclusão da instalação; o Firebase informa concluir a remoção de sistemas ativos e backups em até 180 dias após esse pedido. Excluir a conta não apaga imediatamente todos os registros do Firebase.",
            "A exclusão da conta solicita a remoção dos dados de conta, jogador e registro push mantidos pelo desenvolvedor, conforme {{deleteAccount}}. O app também tenta limpar a elegibilidade para notificações, inscrições em tópicos e o token da conta que está saindo. Essa limpeza assíncrona pode falhar e não exclui por si só o identificador de instalação do Firebase nem registros de Analytics, falhas ou desempenho já enviados. Eles seguem os processos de retenção e exclusão do provedor. Além das opções no app e na web, contate admin@dappgo.com para acessar ou solicitar a exclusão de informações Firebase associadas. Registros limitados podem ser mantidos por impostos, contabilidade, segurança, fraude, disputas ou obrigações legais e depois excluídos ou anonimizados quando o motivo terminar."
          ]
        },
        {
          "heading": "Crianças, segurança, alterações e contato",
          "paragraphs": [
            "Number RPG não é dirigido a menores de 13. Responsáveis podem contatar admin@dappgo.com e, após verificação, excluiremos conforme a lei; regras locais mais rígidas se aplicam. Usamos salvaguardas razoáveis sem garantir segurança absoluta. Atualizamos quando necessário; a data acima é a versão atual."
          ]
        }
      ]
    },
    terms: { kicker: "Number RPG · termos", title: "Termos de serviço", product: "Number RPG da DappGo", effective: "Data de vigência: 2026-10-27", summary: "Estes termos explicam jogo convidado, contas, itens virtuais, compras, jogo justo, encerramento e direitos.", sections: [
      section("1. Aceitação e idade", ["Usar o Number RPG significa aceitar estes termos e a política de privacidade. Destina-se a pessoas de 13 anos ou mais; não use abaixo da idade mínima ou sem capacidade legal de consentir."]),
      section("2. Licença e serviço", ["Yenlung Lai opera como DappGo. Concede licença pessoal, limitada, não exclusiva, intransferível e revogável para uso não comercial; não transfere propriedade do jogo, código, arte, nomes ou conteúdo. No iOS aplica-se também a {{appleEula}} da Apple."]),
      section("3. Contas e segurança", ["Pode jogar como convidado; Apple, Google e Facebook permitem salvamento, social, rankings e restauração. Proteja credenciais e não compartilhe conta, imite outro jogador ou forneça informação falsa."]),
      section("4. Itens virtuais e compras", ["Itens virtuais não têm valor em dinheiro e só servem no jogo; consumíveis são gastos e direitos não consumíveis podem ser restaurados se a loja permitir. Compras e reembolsos seguem Apple/Google; RevenueCat ajuda a restaurar direitos. Compras podem continuar restauráveis após excluir a conta."]),
      section("5. Jogo justo e uso aceitável", ["São proibidos trapaça, bugs, automação, manipulação de pontuação ou recompensa, abuso de convite ou presente, impersonação, interferência, dano e conteúdo ilegal, abusivo, de ódio, sexualmente explorador ou infrator."]),
      section("6. Medidas e encerramento", ["Podemos limitar, suspender ou encerrar por trapaça, abuso, fraude, insegurança ou violação e mudar o serviço. Exclua em Configurações → Conta → Excluir conta; direitos e deveres que devam sobreviver continuam."]),
      section("7. Isenções e limites", ["Na medida legal, o jogo é fornecido conforme disponível sem garantia de continuidade, ausência de erros, segurança ou preservação permanente. Não respondemos por dispositivo, rede, loja, terceiros ou eventos fora de controle nem por danos indiretos; danos diretos limitados ao maior entre pagamentos dos 12 meses ou 100 USD. Não limitamos responsabilidade irrenunciável nem direitos do consumidor."]),
      section("8. Indenização e disputas", ["Na medida legal, você indeniza por reclamações de terceiros causadas por uso ilegal, violação ou conteúdo, não por conduta da DappGo. Contate admin@dappgo.com primeiro; não há arbitragem obrigatória."]),
      section("9. Lei e foro", ["Aplica-se a lei da Califórnia; salvo direitos obrigatórios, o foro exclusivo é o tribunal estadual ou federal de Los Angeles County. Não limitamos direitos obrigatórios do seu país."]),
      section("10. Alterações e contato", ["Podemos atualizar por mudanças no jogo, prestadores ou lei e avisar mudanças importantes quando necessário. A data acima é a versão atual. Contato: admin@dappgo.com."])
    ] },
    deleteAccount: { kicker: "Number RPG · exclusão da conta", title: "Excluir sua conta", product: "Number RPG da DappGo", effective: "Instruções vigentes: 2026-10-27", summary: "Exclua no app, com o autosserviço Google, por formulário web ou e-mail.", sections: [
      section("Excluir no app", ["Vá a Configurações → Conta → Excluir conta, confirme e fique online até concluir. É imediato; Apple pode exigir nova autorização."]),
      section("Excluir na web", ["Com conta Google vinculada, faça login abaixo, confirme, digite DELETE e envie. É imediato."]),
      section("Pedir por formulário ou e-mail", ["Para Apple, Facebook ou convidado, use formulário ou admin@dappgo.com com ID e e-mail. Após verificar, concluiremos em 30 dias. Não envie segredos."]),
      section("Dados removidos e mantidos", ["Removemos conta, identidades, perfil, dispositivos, sessões, salvamentos, pontos, convites, amigos, presentes, recompensas, eventos, atividades, fraude e tokens push; o app reinicia o progresso local. Apple/Google podem manter compras e a DappGo registros limitados necessários à lei, contabilidade, segurança, fraude ou disputas; depois excluímos ou anonimizamos."]),
      section("Prazo e ajuda", ["App e Google web: imediato; formulário e e-mail: até 30 dias após verificar. Ajuda: admin@dappgo.com."])
    ] }
  },
  "th": {
    privacy: {
      "kicker": "Number RPG · ความเป็นส่วนตัว",
      "title": "นโยบายความเป็นส่วนตัว",
      "product": "Number RPG โดย DappGo",
      "effective": "อัปเดตล่าสุด: 2026-10-30",
      "summary": "Number RPG ให้คุณเล่นเป็นผู้เยี่ยมชมได้ การเข้าสู่ระบบเป็นทางเลือกและช่วยบันทึกบนคลาวด์ ฟีเจอร์โซเชียล และการกู้คืนข้ามอุปกรณ์ นโยบายนี้อธิบายข้อมูล วัตถุประสงค์ และตัวเลือกของคุณ",
      "sections": [
        {
          "heading": "เราเป็นใคร",
          "paragraphs": [
            "Number RPG ดำเนินงานโดย Yenlung Lai เจ้าของกิจการรายบุคคลที่ทำธุรกิจในชื่อ DappGo ใน San Gabriel รัฐแคลิฟอร์เนีย สหรัฐอเมริกา สำหรับ GDPR และ UK GDPR DappGo เป็นผู้ควบคุมข้อมูลตามนโยบายนี้ ติดต่อ admin@dappgo.com สำหรับคำถาม คำขอใช้สิทธิ หรือข้อร้องเรียน"
          ]
        },
        {
          "heading": "ข้อมูลที่เราเก็บ",
          "paragraphs": [
            "ขึ้นอยู่กับฟีเจอร์ เราอาจได้รับ ID บัญชี ผู้ให้บริการและ subject ID ชื่อ ประเทศ สัตว์เลี้ยงผู้นำ การบันทึก ความคืบหน้า คะแนน กระดานผู้นำ คำเชิญ เพื่อน ของขวัญ รางวัล ข้อมูลซื้อจาก RevenueCat ตัวระบุอุปกรณ์ที่แฮช เซสชัน ภาษา เขตเวลา โทเค็นพุช ข้อมูลโฆษณา การวิเคราะห์ ข้อขัดข้อง ประสิทธิภาพ และตัวเลือกความยินยอม อีเมลใช้เมื่อ Apple, Google หรือ Meta ให้มา และเราไม่รับข้อมูลบัตร"
          ]
        },
        {
          "heading": "แหล่งที่มาและวัตถุประสงค์",
          "paragraphs": [
            "ข้อมูลมาจากคุณ ผู้ให้บริการเข้าสู่ระบบและร้านค้า อุปกรณ์ เกม และผู้เล่นอื่น เราใช้เพื่อให้บริการเกมและบัญชี บันทึกข้อมูล กระดานผู้นำและโซเชียล ป้องกันโกงและฉ้อโกง ดำเนินการซื้อ ส่งการแจ้งเตือนที่ขอ ปรับปรุงความเสถียรหลังความยินยอม และแสดงโฆษณาที่ไม่ปรับตามบุคคลจนกว่าจะได้รับความยินยอมและสิทธิ์ที่จำเป็น"
          ]
        },
        {
          "heading": "ผู้ให้บริการและการแบ่งปัน",
          "paragraphs": [
            "Apple ดูแล Apple และ App Store; Google/Firebase ดูแล Google, Play, Analytics, Crashlytics, Performance Monitoring, Remote Config, Cloud Messaging และ AdMob; Meta ดูแล Facebook; RevenueCat ดูแลการซื้อและสิทธิ์ ผู้ให้บริการใช้แนวทางของตนเองและอาจเป็นผู้ควบคุมอิสระ ผู้เล่นอื่นอาจเห็นข้อมูลที่คุณเปิดเผย และไม่มีแชต เราอาจเปิดเผยเพื่อกฎหมาย ความปลอดภัย หรือป้องกันการฉ้อโกง"
          ]
        },
        {
          "heading": "โฆษณา การวิเคราะห์ การแจ้งเตือน และคุกกี้",
          "paragraphs": [
            "Number RPG ใช้ Google AdMob เพื่อแสดงโฆษณาและวัดผล Google Mobile Ads SDK อาจเก็บที่อยู่ IP และใช้ประมาณพื้นที่ที่คุณอยู่ เช่น ภูมิภาค โดยไม่เข้าถึงตำแหน่ง GPS ที่แม่นยำหรือขอสิทธิ์เข้าถึงตำแหน่ง Google อาจใช้ข้อมูลนี้สำหรับการทำงานของแอปและโฆษณา การวิเคราะห์ โฆษณาของบุคคลที่สาม และโฆษณาหรือการตลาดของผู้พัฒนา ตามตัวเลือกความยินยอมที่ใช้บังคับ DappGo ไม่เก็บตำแหน่งที่ SDK ประมาณขึ้นแยกต่างหาก Google เก็บข้อมูลโฆษณาและการวินิจฉัยตามนโยบายและการตั้งค่าการเก็บรักษา รวมถึงเพื่อความปลอดภัย ป้องกันการฉ้อโกง และปฏิบัติตามกฎหมาย ระยะเวลาแตกต่างกันตามข้อมูลและวัตถุประสงค์ เราจึงไม่รับรองกำหนดลบข้อมูลที่ Google ถือครองแบบตายตัว คุณเปลี่ยนตัวเลือกโฆษณาที่มีได้ในเมนูความเป็นส่วนตัว หรือติดต่อ admin@dappgo.com เพื่อขอเข้าถึงหรือลบข้อมูล ดูคำชี้แจงข้อมูลโฆษณา ({{admobDisclosure}}) และนโยบายการเก็บรักษา ({{googleRetention}})",
            "เราใช้ Firebase Crashlytics เพื่อวินิจฉัยแอปขัดข้องและข้อผิดพลาด ใช้ Performance Monitoring วัดประสิทธิภาพการเริ่มแอป การแสดงผล และเครือข่าย และใช้ Remote Config ส่งการตั้งค่าแอปและเกม เมื่อความยินยอมที่เกี่ยวข้องอนุญาต Firebase Analytics จะวัดการใช้แอป ความคืบหน้า การซื้อ ผลโฆษณา และการโต้ตอบกับการแจ้งเตือน บริการเหล่านี้อาจประมวลผลรหัสการติดตั้งและเซสชัน ลำดับการเรียกใช้ที่ทำให้แอปขัดข้อง ข้อความผิดพลาด ข้อมูลอุปกรณ์ ระบบปฏิบัติการ แอป เครือข่าย ค่าประสิทธิภาพ ภาษา เขตเวลา และประเทศหรือภูมิภาคโดยประมาณจาก IP รายงาน Crashlytics อาจมีรหัสบัญชี Number RPG ที่ไม่บอกตัวตนโดยตรงและพื้นที่หรือด่านในเกม Analytics ใช้รหัสอินสแตนซ์แอป โดยแอปไม่ส่งชื่อ อีเมล หรือรหัสบัญชีเป็นรหัสผู้ใช้ Analytics เราปิดการจัดเก็บข้อมูลโฆษณา ข้อมูลผู้ใช้เพื่อโฆษณา และการปรับโฆษณาเฉพาะบุคคลของ Firebase Analytics การใช้งานเหล่านี้มีไว้เพื่อการทำงาน ความเสถียร การตั้งค่า และการวิเคราะห์ ไม่ได้อนุญาตให้ Firebase ติดตามเพื่อโฆษณา",
            "เมื่อเปิดการแจ้งเตือนที่รองรับ Firebase Cloud Messaging จะประมวลผลรหัสการลงทะเบียนและการติดตั้ง โทเค็นพุชของ Apple บน iOS และข้อมูลแอปหรืออุปกรณ์ที่จำเป็นต่อการส่ง สำหรับการเตือนของบัญชี บริการของเราจะเก็บโทเค็นพุชร่วมกับบัญชี แพลตฟอร์ม ภาษาของอุปกรณ์ เขตเวลา และตัวเลือกการแจ้งเตือน ข้อความขอชีวิตจากเพื่อนอาจมีชื่อแสดงของเพื่อนและรหัสบัญชีผู้รับ การแจ้งเตือนส่งเสริมกิจกรรมต้องเปิดตัวเลือกการตลาดแยกต่างหาก ส่วนประกาศซีซัน 2 ต้องสมัครหัวข้อ season-2 โดยเฉพาะ การเปิดเตือนชีวิตหรือการสำรวจไม่ทำให้สมัครประกาศนี้ การสมัครหัวข้อและการโต้ตอบอาจถูกประมวลผลเพื่อส่งข้อความที่เลือก และวัดการใช้งานเมื่ออนุญาตให้ Analytics เก็บข้อมูล คุณเปลี่ยนตัวเลือกได้ในแอปหรือการตั้งค่าอุปกรณ์",
            "AdMob ใช้โฆษณาที่ไม่ปรับตามบุคคลเป็นค่าเริ่มต้นจนกว่าจะบันทึกความยินยอมของ Google ที่จำเป็น บน iOS การปรับโฆษณาตามบุคคลต้องได้รับอนุญาตจาก App Tracking Transparency ด้วย หากปฏิเสธจะยังใช้โฆษณาที่ไม่ปรับตามบุคคล คุณเปลี่ยนตัวเลือกความเป็นส่วนตัวที่มีในแอป และจัดการสิทธิ์ติดตามหรือแจ้งเตือนในอุปกรณ์ได้ แอปมือถือไม่ใช้คุกกี้เบราว์เซอร์ เว็บไซต์อาจบันทึกภาษาและธีมในที่เก็บข้อมูลภายในเครื่อง ส่วนการเข้าสู่ระบบ Google ในหน้าลบบัญชีอาจใช้คุกกี้หรือเทคโนโลยีคล้ายกันตามนโยบาย Google"
          ]
        },
        {
          "heading": "สิทธิในแคลิฟอร์เนีย",
          "paragraphs": [
            "หาก CCPA/CPRA ใช้บังคับ คุณขอทราบ เข้าถึง ลบ แก้ไข และสำเนาที่โอนได้ผ่าน admin@dappgo.com ได้ เราไม่ขายข้อมูลเพื่อเงิน แต่อาจแบ่งปันตัวระบุและข้อมูลโฆษณากับ AdMob หลังความยินยอมเพื่อโฆษณาข้ามบริบท ซึ่งอาจเป็นการแบ่งปันตามกฎหมาย หากต้องการยกเลิก ให้ถอนตัวเลือกโฆษณา ปิดการติดตาม หรือส่งหัวข้อ “Do Not Sell or Share My Personal Information” คุณใช้ตัวแทนได้ เราไม่เลือกปฏิบัติ และตอบคำขอโดยทั่วไปภายใน 45 วัน"
          ]
        },
        {
          "heading": "สิทธิใน EEA และสหราชอาณาจักร",
          "paragraphs": [
            "ฐานกฎหมายของ GDPR/UK GDPR ได้แก่ สัญญาสำหรับบริการ ความยินยอมสำหรับโฆษณาและการเก็บข้อมูลทางเลือก ประโยชน์โดยชอบด้วยกฎหมายสำหรับความปลอดภัย การป้องกันโกง/ฉ้อโกง ความเสถียรและการสนับสนุน และหน้าที่ตามกฎหมายสำหรับบันทึก คุณขอเข้าถึง แก้ไข ลบ จำกัด โอนย้าย คัดค้าน และถอนความยินยอมได้ รวมถึงร้องเรียนต่อหน่วยงานกำกับหรือ ICO ข้อมูลอาจถูกประมวลผลในสหรัฐฯ และประเทศอื่นโดยใช้มาตรการโอนที่ชอบด้วยกฎหมายเมื่อจำเป็น"
          ]
        },
        {
          "heading": "การเก็บรักษาและลบ",
          "paragraphs": [
            "เราเก็บข้อมูลบัญชีและผู้เล่นระหว่างที่บัญชียังใช้งานอยู่ การลบสำเร็จในแอปหรือผ่านระบบบริการตนเองของ Google บนเว็บมีผลทันที ส่วนคำขอทางอีเมลหรือแบบฟอร์มจะเสร็จภายใน 30 วันหลังยืนยัน โดยมีข้อยกเว้นการเก็บรักษาที่จำกัด ข้อผูกพันที่ประกาศไว้สำหรับ Google Analytics และ Firebase Analytics ยังคงเป็น 14 เดือน ตามขอบเขตการตั้งค่าการเก็บรักษาของพร็อพเพอร์ตี้ในเอกสาร Google ({{analyticsRetention}}) ซึ่งไม่ครอบคลุมรายงานรวมทุกแบบหรือข้อมูลที่ส่งออกแยกต่างหาก บันทึกคำขอเซิร์ฟเวอร์เก็บ 30 วัน Apple และ Google อาจเก็บประวัติการซื้อในบัญชีร้านค้า",
            "Firebase มีระยะเวลาเก็บข้อมูลต่างกันตามบริการ ตามนโยบายที่เผยแพร่ ({{firebaseRetention}}) Crashlytics เริ่มลบข้อมูลขัดข้องและรหัสที่เกี่ยวข้องหลัง 90 วัน Performance Monitoring เก็บเหตุการณ์ที่เชื่อมโยงกับ IP 30 วัน และข้อมูลประสิทธิภาพที่เชื่อมโยงกับการติดตั้งหรือไม่ระบุตัวตน 60 วันก่อนเริ่มลบ รหัสการติดตั้งของ Cloud Messaging และ Remote Config อาจอยู่จนกว่าจะมีคำขอลบการติดตั้ง Firebase ระบุว่าจะลบจากระบบที่ใช้งานและระบบสำรองเสร็จภายใน 180 วันหลังคำขอนั้น การลบบัญชีจึงไม่ได้ลบข้อมูล Firebase ทั้งหมดทันที",
            "การลบบัญชีเป็นการขอให้ลบข้อมูลบัญชี ผู้เล่น และการลงทะเบียนพุชที่ผู้พัฒนาเก็บไว้ ตาม{{deleteAccount}} แอปยังพยายามล้างสถานะรับแจ้งเตือน การสมัครหัวข้อ และโทเค็นพุชของบัญชีที่ออก การล้างแบบไม่พร้อมกันนี้อาจล้มเหลว และไม่ได้ลบรหัสการติดตั้ง Firebase หรือข้อมูล Analytics ขัดข้อง หรือประสิทธิภาพที่ส่งไปแล้ว ข้อมูลเหล่านี้ยังขึ้นกับกระบวนการเก็บและลบของผู้ให้บริการ นอกจากตัวเลือกในแอปและหน้าเว็บ คุณติดต่อ admin@dappgo.com เพื่อขอเข้าถึงหรือลบข้อมูล Firebase ที่เกี่ยวข้องได้ เราอาจเก็บบันทึกจำกัดเพื่อภาษี บัญชี ความปลอดภัย ป้องกันฉ้อโกง ข้อพิพาท หรือหน้าที่ตามกฎหมาย แล้วลบหรือทำให้ไม่ระบุตัวตนเมื่อหมดเหตุจำเป็น"
          ]
        },
        {
          "heading": "เด็ก ความปลอดภัย การเปลี่ยนแปลง และติดต่อ",
          "paragraphs": [
            "ไม่มุ่งเป้าเด็กต่ำกว่า 13 ปี หากทราบให้ผู้ปกครองติดต่อ admin@dappgo.com และเราจะลบตามกฎหมาย กฎอายุที่สูงกว่าในท้องถิ่นใช้บังคับ เรามาตรการสมเหตุสมผลแต่ไม่รับประกันความปลอดภัยสมบูรณ์ อัปเดตนโยบายเมื่อเกม ผู้ให้บริการ หรือกฎหมายเปลี่ยน โดยวันที่ด้านบนคือฉบับปัจจุบัน"
          ]
        }
      ]
    },
    terms: { kicker: "Number RPG · ข้อกำหนด", title: "ข้อกำหนดการให้บริการ", product: "Number RPG โดย DappGo", effective: "วันที่มีผล: 2026-10-27", summary: "ข้อกำหนดนี้อธิบายการเล่นแบบผู้เยี่ยมชม บัญชี ไอเท็มเสมือน การซื้อ การเล่นยุติธรรม การยุติบัญชี และสิทธิของคุณ", sections: [
      section("1. การยอมรับและอายุ", ["การใช้ Number RPG คือการยอมรับข้อกำหนดและนโยบายความเป็นส่วนตัว เกมมีไว้สำหรับผู้มีอายุ 13 ปีขึ้นไป และห้ามใช้หากอายุต่ำกว่าเกณฑ์หรือยอมรับไม่ได้ตามกฎหมาย"]),
      section("2. ใบอนุญาตและบริการ", ["Yenlung Lai ดำเนินงานในชื่อ DappGo ให้ใบอนุญาตส่วนบุคคล จำกัด ไม่ผูกขาด โอนต่อไม่ได้ และเพิกถอนได้เพื่อความบันเทิงที่ไม่ใช่เชิงพาณิชย์ ไม่โอนกรรมสิทธิ์เกม โค้ด ศิลป์ ชื่อ หรือเนื้อหา สำหรับ iOS ใช้ {{appleEula}} ของ Apple ด้วย"]),
      section("3. บัญชีและความปลอดภัย", ["เล่นเป็นผู้เยี่ยมชมได้ การเข้าสู่ระบบ Apple, Google หรือ Facebook รองรับการบันทึก โซเชียล กระดานผู้นำ และกู้คืนการซื้อ รักษาข้อมูลให้ปลอดภัย ห้ามแชร์หรือแอบอ้าง"]),
      section("4. ไอเท็มเสมือนและการซื้อ", ["ไอเท็มเสมือนไม่มีมูลค่าเงินและใช้ในเกมเท่านั้น ของสิ้นเปลืองถูกใช้แล้วหมด สิทธิ์อื่นกู้คืนได้หากร้านรองรับ การซื้อและคืนเงินเป็นไปตาม Apple/Google และ RevenueCat ช่วยเรื่องสิทธิ์ การซื้ออาจกู้คืนได้หลังลบบัญชี"]),
      section("5. การเล่นยุติธรรม", ["ห้ามโกง ใช้บั๊ก อัตโนมัติ บิดเบือนคะแนนหรือรางวัล ใช้คำเชิญ/ของขวัญผิด แอบอ้าง รบกวน ทำร้ายผู้อื่น หรือส่งเนื้อหาผิดกฎหมาย หยาบคาย เกลียดชัง ล่วงละเมิดทางเพศ หรือละเมิดสิทธิ"]),
      section("6. การบังคับใช้และยุติ", ["เราจำกัด ระงับ หรือยุติได้เมื่อมีโกง ใช้ผิด ฉ้อโกง ไม่ปลอดภัย หรือฝ่าฝืน และเปลี่ยนบริการได้ ลบได้ที่การตั้งค่า → บัญชี → ลบบัญชี สิทธิและหน้าที่ที่ควรอยู่ต่อยังคงอยู่"]),
      section("7. ข้อปฏิเสธและข้อจำกัด", ["เท่าที่กฎหมายอนุญาต เกมให้บริการตามที่มี ไม่รับประกันความต่อเนื่อง ข้อผิดพลาด ความปลอดภัย หรือการเก็บถาวร ไม่รับผิดความเสียหายทางอ้อม และจำกัดความเสียหายโดยตรงที่จำนวนเงิน 12 เดือนหรือ 100 ดอลลาร์ที่สูงกว่า ไม่จำกัดความรับผิดที่กฎหมายห้ามตัดหรือสิทธิผู้บริโภค"]),
      section("8. ชดใช้และข้อพิพาท", ["เท่าที่กฎหมายอนุญาต คุณชดใช้คำเรียกร้องจากการใช้ผิดกฎหมาย ฝ่าฝืน หรือเนื้อหา แต่ไม่ใช่การผิดของ DappGo ติดต่อ admin@dappgo.com ก่อน และไม่มีอนุญาโตตุลาการบังคับ"]),
      section("9. กฎหมายและเขตอำนาจ", ["ใช้กฎหมายแคลิฟอร์เนีย และศาลรัฐหรือรัฐบาลกลางใน Los Angeles County เป็นศาลเฉพาะภายใต้สิทธิผู้บริโภคที่บังคับใช้"]),
      section("10. การเปลี่ยนแปลงและติดต่อ", ["อาจปรับปรุงเมื่อเกม ผู้ให้บริการ หรือกฎหมายเปลี่ยน และแจ้งการเปลี่ยนแปลงสำคัญเมื่อจำเป็น วันที่ด้านบนคือฉบับปัจจุบัน ติดต่อ admin@dappgo.com"])
    ] },
    deleteAccount: { kicker: "Number RPG · การลบบัญชี", title: "ลบบัญชีของคุณ", product: "Number RPG โดย DappGo", effective: "คำแนะนำมีผล: 2026-10-27", summary: "ลบบัญชีในแอป ใช้ Google ด้วยตนเอง หรือขอผ่านแบบฟอร์มและอีเมล", sections: [
      section("ลบในแอป", ["ไปที่การตั้งค่า → บัญชี → ลบบัญชี ยืนยันและออนไลน์จนสำเร็จ มีผลทันที และ Apple อาจขออนุญาตใหม่"]),
      section("ลบบนเว็บ", ["บัญชี Google ใช้บริการด้านล่าง เข้าสู่ระบบ ยืนยัน พิมพ์ DELETE และส่ง มีผลทันที"]),
      section("ขอผ่านแบบฟอร์มหรืออีเมล", ["บัญชี Apple, Facebook หรือผู้เยี่ยมชมใช้แบบฟอร์มหรือ admin@dappgo.com พร้อม ID และอีเมล ยืนยันแล้วเสร็จภายใน 30 วัน อย่าส่งความลับ"]),
      section("ข้อมูลที่ลบและอาจคงอยู่", ["ลบบัญชี ตัวตน โปรไฟล์ อุปกรณ์ เซสชัน การบันทึก คะแนน คำเชิญ เพื่อน ของขวัญ รางวัล เหตุการณ์ กิจกรรม การฉ้อโกง และโทเค็นพุช พร้อมรีเซ็ตความคืบหน้าในเครื่อง Apple/Google อาจเก็บการซื้อ และ DappGo อาจเก็บบันทึกจำกัดตามกฎหมาย บัญชี ความปลอดภัย ฉ้อโกง หรือข้อพิพาท แล้วลบ/ทำให้ไม่ระบุตัวตน"]),
      section("เวลาและช่วยเหลือ", ["แอปและเว็บ Google ทันที แบบฟอร์มและอีเมลภายใน 30 วันหลังยืนยัน ติดต่อ admin@dappgo.com"])
    ] }
  },
  "vi": {
    privacy: {
      "kicker": "Number RPG · quyền riêng tư",
      "title": "Chính sách quyền riêng tư",
      "product": "Number RPG của DappGo",
      "effective": "Cập nhật lần cuối: 2026-10-30",
      "summary": "Number RPG cho phép chơi với tư cách khách. Đăng nhập là tùy chọn và thêm lưu đám mây, tính năng xã hội và khôi phục giữa thiết bị. Chính sách này giải thích dữ liệu, mục đích và lựa chọn.",
      "sections": [
        {
          "heading": "Chúng tôi là ai",
          "paragraphs": [
            "Number RPG do Yenlung Lai vận hành, là chủ doanh nghiệp cá nhân kinh doanh dưới tên DappGo tại San Gabriel, California, Hoa Kỳ. Theo GDPR và UK GDPR, DappGo là bên kiểm soát dữ liệu được mô tả. Câu hỏi, yêu cầu quyền và khiếu nại: admin@dappgo.com."
          ]
        },
        {
          "heading": "Thông tin thu thập",
          "paragraphs": [
            "Tùy tính năng, chúng tôi có thể nhận ID tài khoản, nhà cung cấp và subject ID, tên, quốc gia, thú cưng dẫn đầu, lưu đám mây, tiến trình, điểm, bảng xếp hạng, lời mời, bạn bè, quà, thưởng, mua hàng RevenueCat, mã thiết bị đã băm, phiên, ngôn ngữ, múi giờ, token đẩy, dữ liệu quảng cáo, phân tích, lỗi, hiệu năng và đồng ý. Email chỉ khi Apple, Google hoặc Meta cung cấp; không nhận dữ liệu thẻ."
          ]
        },
        {
          "heading": "Nguồn và mục đích",
          "paragraphs": [
            "Nguồn là bạn, nhà cung cấp đăng nhập/cửa hàng, thiết bị, trò chơi và người chơi khác. Dùng để cung cấp trò chơi, tài khoản, lưu, bảng xếp hạng và xã hội; xử lý mua hàng; chống gian lận; gửi thông báo yêu cầu; cải thiện độ tin cậy sau đồng ý; và hiển thị quảng cáo không cá nhân hóa trước khi có đồng ý và quyền cần thiết."
          ]
        },
        {
          "heading": "Nhà cung cấp và chia sẻ",
          "paragraphs": [
            "Apple xử lý Apple và App Store; Google/Firebase xử lý Google, Play, Analytics, Crashlytics, Performance Monitoring, Remote Config, Cloud Messaging và AdMob; Meta xử lý Facebook; RevenueCat xử lý mua và quyền. Nhà cung cấp có chính sách riêng và có thể là bên kiểm soát độc lập. Người chơi khác thấy thông tin bạn công khai; không có chat. Có thể tiết lộ vì luật, an ninh và phòng gian lận."
          ]
        },
        {
          "heading": "Quảng cáo, phân tích, thông báo và cookie",
          "paragraphs": [
            "Number RPG dùng Google AdMob để hiển thị và đo hiệu quả quảng cáo. SDK Google Mobile Ads có thể thu thập địa chỉ IP và suy ra vị trí gần đúng như khu vực của bạn, không truy cập GPS chính xác hay xin quyền vị trí. Tùy lựa chọn đồng ý áp dụng, Google có thể dùng thông tin này cho chức năng ứng dụng và quảng cáo, phân tích, quảng cáo bên thứ ba, cùng quảng cáo hoặc tiếp thị của nhà phát triển. DappGo không lưu riêng vị trí do SDK suy ra. Google lưu dữ liệu quảng cáo và chẩn đoán theo chính sách và chế độ đã cấu hình, kể cả vì an ninh, chống gian lận và nghĩa vụ pháp lý. Thời hạn tùy loại dữ liệu và mục đích; chúng tôi không cam kết thời hạn xóa cố định cho dữ liệu Google nắm giữ. Bạn có thể đổi các lựa chọn quảng cáo hiện có trong cài đặt quyền riêng tư hoặc liên hệ admin@dappgo.com để yêu cầu truy cập hay xóa. Xem thông tin công bố về quảng cáo ({{admobDisclosure}}) và chính sách lưu giữ ({{googleRetention}}).",
            "Chúng tôi dùng Firebase Crashlytics để chẩn đoán sự cố và lỗi, Performance Monitoring để đo hiệu năng khởi động, hiển thị và mạng, và Remote Config để gửi cài đặt ứng dụng cùng cấu hình trò chơi. Khi lựa chọn đồng ý áp dụng cho phép, Firebase Analytics đo việc sử dụng, tiến độ, mua hàng, hiệu quả quảng cáo và tương tác thông báo. Các dịch vụ này có thể xử lý mã cài đặt và phiên, dấu vết ngăn xếp sự cố và thông báo lỗi, thông tin thiết bị, hệ điều hành, ứng dụng và mạng, số đo hiệu năng, ngôn ngữ, múi giờ, quốc gia hoặc khu vực suy ra từ IP. Báo cáo Crashlytics có thể chứa ID tài khoản Number RPG không trực tiếp thể hiện danh tính cùng vùng hoặc màn chơi. Analytics dùng mã định danh cho từng bản cài đặt ứng dụng; ứng dụng không cung cấp tên, email hay ID tài khoản làm ID người dùng Analytics. Chúng tôi tắt lưu trữ quảng cáo, dữ liệu người dùng quảng cáo và cá nhân hóa quảng cáo trong Firebase Analytics. Các mục đích này hỗ trợ vận hành, độ ổn định, cấu hình và phân tích, không cho phép Firebase theo dõi quảng cáo.",
            "Khi bạn bật thông báo phù hợp, Firebase Cloud Messaging xử lý mã đăng ký và cài đặt, token đẩy Apple trên iOS và bối cảnh ứng dụng, thiết bị cần để gửi tin. Với lời nhắc tài khoản, dịch vụ lưu token gắn với tài khoản, nền tảng, ngôn ngữ thiết bị, múi giờ và tùy chọn thông báo. Thông báo xin mạng từ bạn bè có thể chứa tên hiển thị của bạn bè và mã tài khoản người nhận. Tin quảng bá sự kiện cần tùy chọn tiếp thị riêng; thông báo mùa 2 cần đăng ký riêng chủ đề season-2. Bật nhắc mạng hoặc thám hiểm không đăng ký bạn vào chủ đề này. Đăng ký chủ đề và tương tác có thể được xử lý để gửi tin đã chọn và đo việc sử dụng khi được phép thu thập Analytics. Bạn có thể đổi lựa chọn trong ứng dụng hoặc cài đặt thiết bị.",
            "AdMob mặc định hiển thị quảng cáo không cá nhân hóa cho đến khi ghi nhận sự đồng ý Google cần thiết. Trên iOS, quảng cáo cá nhân hóa còn cần quyền App Tracking Transparency; nếu từ chối, quảng cáo vẫn không cá nhân hóa. Bạn có thể đổi các lựa chọn quyền riêng tư hiện có trong ứng dụng và quyền theo dõi, thông báo trên thiết bị. Ứng dụng di động không dùng cookie trình duyệt. Trang web có thể lưu ngôn ngữ và giao diện trong bộ nhớ cục bộ; đăng nhập Google trên trang xóa tài khoản có thể dùng cookie hoặc công nghệ tương tự theo chính sách Google."
          ]
        },
        {
          "heading": "Quyền tại California",
          "paragraphs": [
            "Nếu CCPA/CPRA áp dụng, yêu cầu biết, truy cập, xóa, sửa và bản sao chuyển được tại admin@dappgo.com. Không bán dữ liệu lấy tiền, nhưng sau đồng ý có thể chia sẻ mã nhận dạng và dữ liệu quảng cáo với AdMob cho quảng cáo hành vi xuyên ngữ cảnh, có thể là sharing. Từ chối hoặc rút lựa chọn, tắt theo dõi hoặc gửi chủ đề “Do Not Sell or Share My Personal Information”. Có thể dùng đại lý, không phân biệt đối xử và thường trả lời trong 45 ngày."
          ]
        },
        {
          "heading": "Quyền tại EEA và Vương quốc Anh",
          "paragraphs": [
            "Cơ sở GDPR/UK GDPR gồm hợp đồng cho dịch vụ, đồng ý cho quảng cáo và thu thập tùy chọn, lợi ích hợp pháp cho an ninh, chống gian lận, độ tin cậy và hỗ trợ, nghĩa vụ pháp lý cho hồ sơ. Bạn có quyền truy cập, sửa, xóa, hạn chế, chuyển, phản đối, rút đồng ý và khiếu nại với cơ quan giám sát hoặc ICO. Có thể xử lý tại Hoa Kỳ và nơi khác với biện pháp chuyển hợp pháp khi cần."
          ]
        },
        {
          "heading": "Lưu giữ và xóa",
          "paragraphs": [
            "Chúng tôi lưu dữ liệu tài khoản và người chơi khi tài khoản hoạt động. Xóa thành công trong ứng dụng hoặc qua trang tự phục vụ Google có hiệu lực ngay; yêu cầu qua email hoặc biểu mẫu được hoàn tất trong 30 ngày sau xác minh, trừ các ngoại lệ lưu giữ hạn chế. Cam kết đã công bố về thời hạn 14 tháng cho Google Analytics và Firebase Analytics vẫn áp dụng trong phạm vi chế độ lưu giữ của thuộc tính theo tài liệu Google ({{analyticsRetention}}); chế độ này không bao gồm mọi báo cáo tổng hợp hoặc bản ghi xuất riêng. Nhật ký yêu cầu máy chủ được lưu 30 ngày. Apple và Google có thể giữ lịch sử mua trong tài khoản cửa hàng.",
            "Thời hạn Firebase khác nhau theo dịch vụ. Theo chính sách công bố ({{firebaseRetention}}), Crashlytics bắt đầu xóa dữ liệu sự cố và mã liên quan sau 90 ngày. Performance Monitoring giữ sự kiện gắn IP trong 30 ngày và dữ liệu hiệu năng gắn cài đặt hoặc đã khử định danh trong 60 ngày trước khi bắt đầu xóa. Mã cài đặt Cloud Messaging và Remote Config có thể còn đến khi có yêu cầu xóa cài đặt; Firebase cho biết hoàn tất xóa khỏi hệ thống đang hoạt động và bản sao lưu trong 180 ngày sau yêu cầu đó. Xóa tài khoản không xóa ngay mọi bản ghi Firebase.",
            "Xóa tài khoản yêu cầu loại bỏ dữ liệu tài khoản, người chơi và đăng ký đẩy do nhà phát triển giữ, theo {{deleteAccount}}. Ứng dụng cũng cố gắng bỏ điều kiện nhận thông báo, đăng ký chủ đề và token đẩy của tài khoản rời đi. Việc dọn dẹp bất đồng bộ có thể thất bại và tự nó không xóa mã cài đặt Firebase hay bản ghi Analytics, sự cố và hiệu năng đã tải lên. Những dữ liệu này tiếp tục tuân theo quy trình của nhà cung cấp. Ngoài các lựa chọn trong ứng dụng và trên web, hãy liên hệ admin@dappgo.com để truy cập hoặc yêu cầu xóa thông tin Firebase liên quan. Một số bản ghi hạn chế có thể được giữ vì thuế, kế toán, an ninh, chống gian lận, tranh chấp hoặc nghĩa vụ pháp lý, rồi xóa hay ẩn danh khi hết lý do."
          ]
        },
        {
          "heading": "Trẻ em, bảo mật, thay đổi và liên hệ",
          "paragraphs": [
            "Không hướng tới trẻ dưới 13; phụ huynh có thể liên hệ admin@dappgo.com và chúng tôi xóa theo luật sau xác minh. Quy tắc tuổi cao hơn tại địa phương áp dụng. Có biện pháp hợp lý nhưng không đảm bảo an toàn tuyệt đối. Cập nhật khi cần; ngày đầu trang là phiên bản hiện tại."
          ]
        }
      ]
    },
    terms: { kicker: "Number RPG · điều khoản", title: "Điều khoản dịch vụ", product: "Number RPG của DappGo", effective: "Ngày có hiệu lực: 2026-10-27", summary: "Điều khoản giải thích chơi khách, tài khoản, vật phẩm ảo, mua hàng, chơi công bằng, chấm dứt và quyền pháp lý.", sections: [
      section("1. Chấp nhận và độ tuổi", ["Dùng Number RPG nghĩa là đồng ý điều khoản và chính sách riêng tư. Dành cho người từ 13 tuổi; không dùng khi dưới tuổi tối thiểu hoặc không thể đồng ý hợp pháp."]),
      section("2. Giấy phép và dịch vụ", ["Yenlung Lai vận hành dưới tên DappGo. Cấp giấy phép cá nhân, giới hạn, không độc quyền, không chuyển nhượng và có thể thu hồi cho mục đích phi thương mại; không chuyển quyền sở hữu game, mã, nghệ thuật, tên hay nội dung. iOS áp dụng {{appleEula}} của Apple."]),
      section("3. Tài khoản và bảo mật", ["Có thể chơi khách; Apple, Google, Facebook hỗ trợ lưu, xã hội, bảng xếp hạng và khôi phục mua. Bảo vệ thông tin và không chia sẻ, mạo danh hay cố ý cung cấp sai."]),
      section("4. Vật phẩm ảo và mua hàng", ["Vật phẩm ảo không có giá trị tiền, chỉ dùng trong game; vật phẩm tiêu hao bị dùng hết và quyền không tiêu hao có thể khôi phục nếu cửa hàng hỗ trợ. Mua và hoàn tiền theo Apple/Google; RevenueCat hỗ trợ quyền. Mua có thể khôi phục sau xóa tài khoản."]),
      section("5. Chơi công bằng và sử dụng được phép", ["Cấm gian lận, khai thác lỗi, tự động, thao túng điểm/thưởng, lạm dụng lời mời/quà, mạo danh, can thiệp, gây hại và nội dung bất hợp pháp, lạm dụng, thù ghét, bóc lột tình dục hoặc xâm phạm quyền."]),
      section("6. Thực thi và chấm dứt", ["Có thể hạn chế, đình chỉ hoặc chấm dứt vì gian lận, lạm dụng, lừa đảo, không an toàn hoặc vi phạm; có thể đổi dịch vụ. Xóa tại Cài đặt → Tài khoản → Xóa tài khoản; quyền/nghĩa vụ cần tiếp tục vẫn còn."]),
      section("7. Tuyên bố miễn trừ và giới hạn", ["Trong phạm vi luật cho phép, game không bảo đảm liên tục, không lỗi, an toàn hoặc lưu vĩnh viễn. Không chịu trách nhiệm lỗi do thiết bị, mạng, cửa hàng, bên thứ ba hoặc sự kiện ngoài kiểm soát, hay thiệt hại gián tiếp; trách nhiệm trực tiếp tối đa là khoản trả 12 tháng hoặc 100 USD, số cao hơn. Không giới hạn trách nhiệm không thể loại trừ và quyền người tiêu dùng."]),
      section("8. Bồi thường và tranh chấp", ["Trong phạm vi luật cho phép, bạn bồi thường khiếu nại bên thứ ba do dùng trái luật, vi phạm hoặc nội dung, không do lỗi DappGo. Liên hệ admin@dappgo.com trước; không bắt buộc trọng tài."]),
      section("9. Luật và nơi xét xử", ["Áp dụng luật California; trừ quyền người tiêu dùng bắt buộc, tòa bang hoặc liên bang ở Los Angeles County là nơi xét xử độc quyền."]),
      section("10. Thay đổi và liên hệ", ["Có thể cập nhật theo thay đổi của game, nhà cung cấp hoặc luật và báo thay đổi quan trọng khi cần. Ngày đầu trang là bản hiện tại. Liên hệ admin@dappgo.com."])
    ] },
    deleteAccount: { kicker: "Number RPG · xóa tài khoản", title: "Xóa tài khoản của bạn", product: "Number RPG của DappGo", effective: "Hướng dẫn có hiệu lực: 2026-10-27", summary: "Xóa trong ứng dụng, tự phục vụ Google, biểu mẫu web hoặc email.", sections: [
      section("Xóa trong ứng dụng", ["Vào Cài đặt → Tài khoản → Xóa tài khoản, xác nhận và giữ trực tuyến đến khi xong. Có hiệu lực ngay; Apple có thể yêu cầu xác thực lại."]),
      section("Xóa trên web", ["Tài khoản Google đăng nhập, xác nhận, nhập DELETE và gửi ở dưới. Có hiệu lực ngay."]),
      section("Yêu cầu qua biểu mẫu hoặc email", ["Tài khoản Apple, Facebook hoặc khách dùng biểu mẫu hoặc admin@dappgo.com với ID và email. Sau xác minh hoàn thành trong 30 ngày; không gửi bí mật."]),
      section("Dữ liệu xóa và còn lại", ["Xóa tài khoản, danh tính, hồ sơ, thiết bị, phiên, lưu, điểm, lời mời, bạn bè, quà, thưởng, sự kiện, hoạt động, gian lận và token đẩy; đặt lại tiến trình cục bộ. Apple/Google có thể giữ mua hàng và DappGo hồ sơ giới hạn cần cho luật, kế toán, an ninh, gian lận hoặc tranh chấp; sau đó xóa/ẩn danh."]),
      section("Thời gian và hỗ trợ", ["App và web Google ngay; form/email trong 30 ngày sau xác minh. Liên hệ admin@dappgo.com nếu cần."])
    ] }
  },
  "id": {
    privacy: {
      "kicker": "Number RPG · privasi",
      "title": "Kebijakan privasi",
      "product": "Number RPG oleh DappGo",
      "effective": "Terakhir diperbarui: 2026-10-30",
      "summary": "Number RPG dapat dimainkan sebagai tamu. Login opsional menambahkan penyimpanan cloud, fitur sosial, dan pemulihan antarperangkat. Kebijakan ini menjelaskan data, tujuan, dan pilihan Anda.",
      "sections": [
        {
          "heading": "Siapa kami",
          "paragraphs": [
            "Number RPG dioperasikan oleh Yenlung Lai, pemilik usaha perseorangan yang menjalankan bisnis sebagai DappGo di San Gabriel, California, Amerika Serikat. Untuk GDPR dan UK GDPR, DappGo adalah pengendali data yang dijelaskan. Pertanyaan, permintaan hak, dan keluhan: admin@dappgo.com."
          ]
        },
        {
          "heading": "Informasi yang dikumpulkan",
          "paragraphs": [
            "Kami dapat menerima ID akun, penyedia dan subject ID, nama, negara, hewan pemimpin, penyimpanan, kemajuan, skor, peringkat, undangan, teman, hadiah, imbalan, pembelian RevenueCat, pengenal perangkat yang di-hash, sesi, bahasa, zona waktu, token push, data iklan, analitik, kerusakan, kinerja, dan persetujuan. Email hanya dari Apple, Google, atau Meta; data kartu tidak kami terima."
          ]
        },
        {
          "heading": "Sumber dan tujuan",
          "paragraphs": [
            "Sumbernya adalah Anda, penyedia login/toko, perangkat, game, dan pemain lain. Kami menggunakannya untuk menyediakan game, akun, penyimpanan, peringkat dan sosial; memproses pembelian; mencegah kecurangan dan penipuan; mengirim notifikasi; memperbaiki keandalan setelah persetujuan; serta menayangkan iklan tidak dipersonalisasi sebelum persetujuan dan izin yang diperlukan."
          ]
        },
        {
          "heading": "Penyedia dan pembagian",
          "paragraphs": [
            "Apple menangani Apple dan App Store; Google/Firebase menangani Google, Play, Analytics, Crashlytics, Performance Monitoring, Remote Config, Cloud Messaging, dan AdMob; Meta menangani Facebook; RevenueCat menangani pembelian dan hak. Mereka memiliki kebijakan sendiri dan dapat menjadi pengendali independen. Pemain lain melihat data yang Anda tampilkan; tidak ada chat. Kami dapat mengungkap untuk hukum, keamanan, atau pencegahan penipuan."
          ]
        },
        {
          "heading": "Iklan, analitik, notifikasi, dan cookie",
          "paragraphs": [
            "Number RPG memakai Google AdMob untuk menayangkan dan mengukur iklan. SDK Google Mobile Ads dapat mengumpulkan alamat IP dan memperkirakan lokasi umum seperti wilayah Anda, tanpa mengakses GPS presisi atau meminta izin lokasi. Sesuai pilihan persetujuan yang berlaku, Google dapat memakai informasi ini untuk fungsi aplikasi dan iklan, analitik, iklan pihak ketiga, serta iklan atau pemasaran pengembang. DappGo tidak menyimpan lokasi hasil perkiraan SDK secara terpisah. Google menyimpan data iklan dan diagnostik sesuai kebijakan dan kontrol yang dikonfigurasi, termasuk demi keamanan, pencegahan penipuan, dan kewajiban hukum. Jangka waktunya bergantung pada data dan tujuan; kami tidak menjanjikan batas penghapusan tetap untuk data milik Google. Ubah pilihan iklan yang tersedia di pengaturan privasi aplikasi atau hubungi admin@dappgo.com untuk akses atau penghapusan. Lihat pengungkapan data iklan ({{admobDisclosure}}) dan kebijakan penyimpanan ({{googleRetention}}).",
            "Kami memakai Firebase Crashlytics untuk mendiagnosis crash dan kesalahan, Performance Monitoring untuk mengukur kinerja awal aplikasi, rendering dan jaringan, serta Remote Config untuk mengirim pengaturan aplikasi dan konfigurasi permainan. Jika pilihan persetujuan yang berlaku mengizinkan, Firebase Analytics mengukur penggunaan, kemajuan, pembelian, kinerja iklan, dan interaksi notifikasi. Layanan ini dapat memproses pengenal instalasi dan sesi, stack trace crash dan pesan kesalahan, informasi perangkat, sistem operasi, aplikasi dan jaringan, pengukuran kinerja, bahasa, zona waktu, serta negara atau wilayah perkiraan dari IP. Laporan Crashlytics dapat memuat ID akun Number RPG yang tidak langsung mengungkap identitas serta wilayah atau tahap permainan. Analytics memakai pengenal instance aplikasi; aplikasi tidak memberikan nama, email, atau ID akun sebagai ID pengguna Analytics. Penyimpanan iklan, data pengguna iklan, dan personalisasi iklan Firebase Analytics dinonaktifkan. Penggunaan ini mendukung operasi, keandalan, konfigurasi dan analitik, bukan izin pelacakan iklan Firebase.",
            "Saat Anda mengaktifkan notifikasi yang sesuai, Firebase Cloud Messaging memproses pengenal pendaftaran dan instalasi, token push Apple di iOS, serta konteks aplikasi dan perangkat yang diperlukan untuk pengiriman. Untuk pengingat akun, layanan kami menyimpan token yang dikaitkan dengan akun, platform, bahasa perangkat, zona waktu dan preferensi notifikasi. Pesan permintaan nyawa teman dapat memuat nama tampilan teman dan pengenal akun penerima. Promosi acara memerlukan preferensi pemasaran tersendiri; pengumuman Musim 2 memerlukan langganan terpisah ke topik season-2. Mengaktifkan pengingat nyawa atau ekspedisi tidak membuat Anda berlangganan pengumuman ini. Langganan dan interaksi dapat diproses untuk mengirim pesan pilihan dan, jika pengumpulan Analytics diizinkan, mengukur penggunaannya. Ubah pilihan di aplikasi atau pengaturan perangkat.",
            "AdMob secara default menampilkan iklan nonpersonalisasi sampai persetujuan Google yang diperlukan tercatat. Di iOS, personalisasi juga memerlukan izin App Tracking Transparency; jika ditolak, iklan tetap nonpersonalisasi. Anda dapat mengubah pilihan privasi yang tersedia di aplikasi dan izin pelacakan atau notifikasi di perangkat. Aplikasi seluler tidak memakai cookie browser. Situs dapat menyimpan bahasa dan tema di penyimpanan lokal; login Google pada halaman penghapusan akun dapat memakai cookie atau teknologi serupa menurut kebijakan Google."
          ]
        },
        {
          "heading": "Hak California",
          "paragraphs": [
            "Jika CCPA/CPRA berlaku, minta akses, mengetahui, menghapus, memperbaiki, atau salinan portabel melalui admin@dappgo.com. Kami tidak menjual data demi uang, tetapi setelah persetujuan dapat membagikan pengenal dan data iklan dengan AdMob untuk iklan perilaku lintas konteks, yang mungkin merupakan sharing. Tolak atau tarik pilihan iklan, matikan pelacakan, atau kirim subjek “Do Not Sell or Share My Personal Information”. Agen resmi dapat digunakan, tidak ada diskriminasi, dan jawaban biasanya dalam 45 hari."
          ]
        },
        {
          "heading": "Hak EEA dan Inggris",
          "paragraphs": [
            "Dasar GDPR/UK GDPR adalah kontrak untuk layanan, persetujuan untuk iklan dan pengumpulan opsional, kepentingan sah untuk keamanan, anti-kecurangan, pencegahan penipuan, keandalan dan dukungan, serta kewajiban hukum untuk catatan. Anda dapat mengakses, memperbaiki, menghapus, membatasi, memindahkan, menolak, menarik persetujuan, dan mengadu ke otoritas atau ICO. Pemrosesan dapat terjadi di AS dan negara lain dengan perlindungan transfer yang sah bila diperlukan."
          ]
        },
        {
          "heading": "Penyimpanan dan penghapusan",
          "paragraphs": [
            "Kami menyimpan data akun dan pemain selama akun aktif. Penghapusan yang berhasil di aplikasi atau layanan mandiri web Google langsung berlaku; permintaan email atau formulir selesai dalam 30 hari setelah verifikasi, dengan pengecualian penyimpanan terbatas. Komitmen terbit kami selama 14 bulan untuk data Google Analytics dan Firebase Analytics tetap berlaku dalam cakupan kontrol properti sesuai dokumentasi Google ({{analyticsRetention}}); kontrol ini tidak mencakup semua laporan agregat atau catatan yang diekspor terpisah. Log permintaan server disimpan 30 hari. Apple dan Google dapat menyimpan pembelian di akun toko.",
            "Masa penyimpanan Firebase berbeda menurut layanan. Menurut kebijakan terbitnya ({{firebaseRetention}}), Crashlytics mulai menghapus data crash dan pengenal terkait setelah 90 hari. Performance Monitoring menyimpan peristiwa terkait IP selama 30 hari serta data kinerja terkait instalasi atau yang telah dihilangkan pengenalnya selama 60 hari sebelum penghapusan dimulai. Pengenal instalasi Cloud Messaging dan Remote Config dapat tetap ada sampai penghapusan instalasi diminta; Firebase menyatakan penghapusan dari sistem aktif dan cadangan selesai dalam 180 hari setelah permintaan itu. Menghapus akun tidak langsung menghapus semua catatan Firebase.",
            "Penghapusan akun meminta penghapusan data akun, pemain dan pendaftaran push yang disimpan pengembang, sesuai {{deleteAccount}}. Aplikasi juga berupaya membersihkan kelayakan notifikasi, langganan topik dan token push akun yang keluar. Pembersihan asinkron ini dapat gagal dan tidak dengan sendirinya menghapus pengenal instalasi Firebase atau catatan Analytics, crash, dan kinerja yang sudah diunggah. Data tersebut tetap mengikuti proses penyimpanan dan penghapusan penyedia. Selain pilihan dalam aplikasi dan web, hubungi admin@dappgo.com untuk mengakses atau meminta penghapusan informasi Firebase terkait. Catatan terbatas dapat disimpan demi pajak, akuntansi, keamanan, pencegahan penipuan, sengketa atau hukum, lalu dihapus atau dianonimkan saat alasannya berakhir."
          ]
        },
        {
          "heading": "Anak-anak, keamanan, perubahan, dan kontak",
          "paragraphs": [
            "Number RPG tidak ditujukan bagi anak di bawah 13 tahun. Orang tua dapat menghubungi admin@dappgo.com dan kami menghapus setelah verifikasi sesuai hukum; aturan usia lokal yang lebih tinggi berlaku. Kami memakai perlindungan wajar tanpa menjamin keamanan mutlak. Kebijakan diperbarui saat perlu; tanggal di atas adalah versi kini."
          ]
        }
      ]
    },
    terms: { kicker: "Number RPG · ketentuan", title: "Ketentuan layanan", product: "Number RPG oleh DappGo", effective: "Tanggal berlaku: 2026-10-27", summary: "Ketentuan ini menjelaskan bermain sebagai tamu, akun, item virtual, pembelian, permainan adil, penghentian, dan hak Anda.", sections: [
      section("1. Penerimaan dan usia", ["Menggunakan Number RPG berarti menyetujui ketentuan dan kebijakan privasi. Ditujukan untuk usia 13 tahun ke atas; jangan gunakan di bawah usia minimum atau tanpa persetujuan hukum."]),
      section("2. Lisensi dan layanan", ["Yenlung Lai menjalankan bisnis sebagai DappGo. Lisensi pribadi, terbatas, non-eksklusif, tidak dapat dialihkan, dan dapat dicabut untuk penggunaan nonkomersial; tidak ada pengalihan kepemilikan game, kode, seni, nama, atau konten. Di iOS berlaku {{appleEula}} Apple."]),
      section("3. Akun dan keamanan", ["Anda dapat bermain sebagai tamu; login Apple, Google, atau Facebook mendukung penyimpanan, sosial, peringkat, dan pemulihan pembelian. Lindungi kredensial dan jangan berbagi akun, menyamar, atau sengaja memberi informasi palsu."]),
      section("4. Item virtual dan pembelian", ["Item virtual tidak bernilai tunai dan hanya digunakan dalam game; item konsumsi habis dan hak nonkonsumsi dapat dipulihkan jika toko mendukung. Pembelian dan pengembalian mengikuti Apple/Google; RevenueCat membantu hak. Pembelian dapat dipulihkan setelah akun dihapus."]),
      section("5. Permainan adil dan penggunaan yang dapat diterima", ["Dilarang curang, mengeksploitasi bug, otomatisasi, memanipulasi skor/imbalan, menyalahgunakan undangan/hadiah, menyamar, mengganggu, merugikan, atau mengirim konten ilegal, kasar, penuh kebencian, eksploitatif, atau melanggar hak."]),
      section("6. Penegakan dan penghentian", ["Kami dapat membatasi, menangguhkan, atau menghentikan karena kecurangan, penyalahgunaan, penipuan, ketidakamanan, atau pelanggaran dan mengubah layanan. Hapus dari Pengaturan → Akun → Hapus akun; hak dan kewajiban yang harus bertahan tetap berlaku."]),
      section("7. Penyangkalan dan batasan", ["Sejauh hukum mengizinkan, game disediakan apa adanya tanpa jaminan terus berjalan, bebas kesalahan, aman, atau tersimpan permanen. Tidak bertanggung jawab atas perangkat, jaringan, toko, pihak ketiga, peristiwa di luar kendali, atau kerugian tidak langsung; tanggung jawab langsung dibatasi pembayaran 12 bulan atau 100 USD, mana yang lebih tinggi. Hak konsumen dan tanggung jawab yang tidak boleh dikecualikan tetap berlaku."]),
      section("8. Ganti rugi dan sengketa", ["Sejauh hukum mengizinkan, Anda mengganti rugi klaim pihak ketiga akibat penggunaan ilegal, pelanggaran, atau konten, bukan kesalahan DappGo. Hubungi admin@dappgo.com terlebih dahulu; tidak ada arbitrase wajib."]),
      section("9. Hukum dan forum", ["Hukum California berlaku; kecuali hak konsumen wajib, pengadilan negara bagian atau federal di Los Angeles County menjadi forum eksklusif."]),
      section("10. Perubahan dan kontak", ["Kami dapat memperbarui saat game, penyedia, atau hukum berubah dan memberi tahu perubahan penting bila perlu. Tanggal di atas adalah versi kini. Hubungi admin@dappgo.com."])
    ] },
    deleteAccount: { kicker: "Number RPG · penghapusan akun", title: "Hapus akun Anda", product: "Number RPG oleh DappGo", effective: "Petunjuk berlaku: 2026-10-27", summary: "Hapus di aplikasi, dengan layanan mandiri Google, melalui formulir web, atau email.", sections: [
      section("Hapus di aplikasi", ["Buka Pengaturan → Akun → Hapus akun, konfirmasi, dan tetap online sampai selesai. Berlaku segera; Apple mungkin meminta autentikasi ulang."]),
      section("Hapus di web", ["Akun Google login, konfirmasi, ketik DELETE, dan kirim di bawah. Berlaku segera."]),
      section("Minta melalui formulir atau email", ["Akun Apple, Facebook, atau tamu gunakan formulir atau admin@dappgo.com dengan ID dan email. Setelah verifikasi selesai dalam 30 hari; jangan kirim rahasia."]),
      section("Data yang dihapus dan tersisa", ["Kami menghapus akun, identitas, profil, perangkat, sesi, penyimpanan, skor, undangan, teman, hadiah, imbalan, acara, aktivitas, penipuan, dan token push; kemajuan lokal direset. Apple/Google dapat menyimpan pembelian dan DappGo catatan terbatas untuk hukum, akuntansi, keamanan, penipuan, atau sengketa; setelah itu dihapus atau dianonimkan."]),
      section("Waktu dan bantuan", ["Aplikasi dan Google web segera; formulir/email dalam 30 hari setelah verifikasi. Hubungi admin@dappgo.com bila perlu."])
    ] }
  }
};

// The store pages are translated above; keep a safe English fallback if a future
// locale is added before its copy is complete.
for (const locale of localeOrder) {
  if (!pages[locale]) pages[locale] = pages.en;
  if (!pages[locale].deleteAccount.tools) pages[locale].deleteAccount.tools = deletionTools[locale] || deletionTools.en;
}

// Shared navigation and store-page copy use the legal pages’ locale picker.
const ui = {
  "en": {
    "privacy": "Privacy",
    "terms": "Terms",
    "support": "Support",
    "deleteAccount": "Delete account",
    "language": "Language",
    "skip": "Skip to content",
    "navigation": "Main navigation",
    "footerNavigation": "Number RPG links",
    "contact": "Contact",
    "darkTheme": "Switch to dark theme",
    "lightTheme": "Switch to light theme",
    "openMenu": "Open navigation",
    "closeMenu": "Close navigation",
    "android": "Get it on Google Play",
    "ios": "Download on the App Store",
    "product": "Number RPG by DappGo"
  },
  "zh-TW": {
    "privacy": "隱私權",
    "terms": "服務條款",
    "support": "支援",
    "deleteAccount": "刪除帳戶",
    "language": "語言",
    "skip": "跳至主要內容",
    "navigation": "主要導覽",
    "footerNavigation": "Number RPG 相關連結",
    "contact": "聯絡我們",
    "darkTheme": "切換深色主題",
    "lightTheme": "切換淺色主題",
    "openMenu": "開啟導覽",
    "closeMenu": "關閉導覽",
    "android": "前往 Google Play 下載",
    "ios": "前往 App Store 下載",
    "product": "DappGo 的 Number RPG"
  },
  "zh-CN": {
    "privacy": "隐私政策",
    "terms": "服务条款",
    "support": "支持",
    "deleteAccount": "删除账户",
    "language": "语言",
    "skip": "跳至主要内容",
    "navigation": "主导航",
    "footerNavigation": "Number RPG 相关链接",
    "contact": "联系我们",
    "darkTheme": "切换深色主题",
    "lightTheme": "切换浅色主题",
    "openMenu": "打开导航",
    "closeMenu": "关闭导航",
    "android": "前往 Google Play 下载",
    "ios": "前往 App Store 下载",
    "product": "DappGo 的 Number RPG"
  },
  "ja": {
    "privacy": "プライバシー",
    "terms": "利用規約",
    "support": "サポート",
    "deleteAccount": "アカウント削除",
    "language": "言語",
    "skip": "本文へ移動",
    "navigation": "メインナビゲーション",
    "footerNavigation": "Number RPG 関連リンク",
    "contact": "お問い合わせ",
    "darkTheme": "ダークテーマに切り替え",
    "lightTheme": "ライトテーマに切り替え",
    "openMenu": "メニューを開く",
    "closeMenu": "メニューを閉じる",
    "android": "Google Play で入手",
    "ios": "App Store でダウンロード",
    "product": "DappGo の Number RPG"
  },
  "ko": {
    "privacy": "개인정보",
    "terms": "이용약관",
    "support": "지원",
    "deleteAccount": "계정 삭제",
    "language": "언어",
    "skip": "본문으로 이동",
    "navigation": "주요 탐색",
    "footerNavigation": "Number RPG 링크",
    "contact": "문의",
    "darkTheme": "어두운 테마로 전환",
    "lightTheme": "밝은 테마로 전환",
    "openMenu": "메뉴 열기",
    "closeMenu": "메뉴 닫기",
    "android": "Google Play에서 다운로드",
    "ios": "App Store에서 다운로드",
    "product": "DappGo의 Number RPG"
  },
  "es": {
    "privacy": "Privacidad",
    "terms": "Condiciones",
    "support": "Ayuda",
    "deleteAccount": "Eliminar cuenta",
    "language": "Idioma",
    "skip": "Ir al contenido",
    "navigation": "Navegación principal",
    "footerNavigation": "Enlaces de Number RPG",
    "contact": "Contacto",
    "darkTheme": "Cambiar al tema oscuro",
    "lightTheme": "Cambiar al tema claro",
    "openMenu": "Abrir menú",
    "closeMenu": "Cerrar menú",
    "android": "Consíguelo en Google Play",
    "ios": "Descárgalo en el App Store",
    "product": "Number RPG de DappGo"
  },
  "fr": {
    "privacy": "Confidentialité",
    "terms": "Conditions",
    "support": "Assistance",
    "deleteAccount": "Supprimer le compte",
    "language": "Langue",
    "skip": "Aller au contenu",
    "navigation": "Navigation principale",
    "footerNavigation": "Liens Number RPG",
    "contact": "Contact",
    "darkTheme": "Passer au thème sombre",
    "lightTheme": "Passer au thème clair",
    "openMenu": "Ouvrir le menu",
    "closeMenu": "Fermer le menu",
    "android": "Disponible sur Google Play",
    "ios": "Télécharger dans l’App Store",
    "product": "Number RPG par DappGo"
  },
  "de": {
    "privacy": "Datenschutz",
    "terms": "Bedingungen",
    "support": "Hilfe",
    "deleteAccount": "Konto löschen",
    "language": "Sprache",
    "skip": "Zum Inhalt",
    "navigation": "Hauptnavigation",
    "footerNavigation": "Number-RPG-Links",
    "contact": "Kontakt",
    "darkTheme": "Zum dunklen Design wechseln",
    "lightTheme": "Zum hellen Design wechseln",
    "openMenu": "Menü öffnen",
    "closeMenu": "Menü schließen",
    "android": "Jetzt bei Google Play",
    "ios": "Im App Store laden",
    "product": "Number RPG von DappGo"
  },
  "pt-BR": {
    "privacy": "Privacidade",
    "terms": "Termos",
    "support": "Suporte",
    "deleteAccount": "Excluir conta",
    "language": "Idioma",
    "skip": "Ir para o conteúdo",
    "navigation": "Navegação principal",
    "footerNavigation": "Links do Number RPG",
    "contact": "Contato",
    "darkTheme": "Mudar para tema escuro",
    "lightTheme": "Mudar para tema claro",
    "openMenu": "Abrir menu",
    "closeMenu": "Fechar menu",
    "android": "Disponível no Google Play",
    "ios": "Baixar na App Store",
    "product": "Number RPG da DappGo"
  },
  "th": {
    "privacy": "ความเป็นส่วนตัว",
    "terms": "ข้อกำหนด",
    "support": "ช่วยเหลือ",
    "deleteAccount": "ลบบัญชี",
    "language": "ภาษา",
    "skip": "ข้ามไปยังเนื้อหา",
    "navigation": "เมนูหลัก",
    "footerNavigation": "ลิงก์ Number RPG",
    "contact": "ติดต่อ",
    "darkTheme": "เปลี่ยนเป็นธีมมืด",
    "lightTheme": "เปลี่ยนเป็นธีมสว่าง",
    "openMenu": "เปิดเมนู",
    "closeMenu": "ปิดเมนู",
    "android": "ดาวน์โหลดจาก Google Play",
    "ios": "ดาวน์โหลดจาก App Store",
    "product": "Number RPG โดย DappGo"
  },
  "vi": {
    "privacy": "Quyền riêng tư",
    "terms": "Điều khoản",
    "support": "Hỗ trợ",
    "deleteAccount": "Xóa tài khoản",
    "language": "Ngôn ngữ",
    "skip": "Đến nội dung",
    "navigation": "Điều hướng chính",
    "footerNavigation": "Liên kết Number RPG",
    "contact": "Liên hệ",
    "darkTheme": "Chuyển giao diện tối",
    "lightTheme": "Chuyển giao diện sáng",
    "openMenu": "Mở menu",
    "closeMenu": "Đóng menu",
    "android": "Tải trên Google Play",
    "ios": "Tải trên App Store",
    "product": "Number RPG của DappGo"
  },
  "id": {
    "privacy": "Privasi",
    "terms": "Ketentuan",
    "support": "Bantuan",
    "deleteAccount": "Hapus akun",
    "language": "Bahasa",
    "skip": "Lewati ke konten",
    "navigation": "Navigasi utama",
    "footerNavigation": "Tautan Number RPG",
    "contact": "Kontak",
    "darkTheme": "Ganti ke tema gelap",
    "lightTheme": "Ganti ke tema terang",
    "openMenu": "Buka menu",
    "closeMenu": "Tutup menu",
    "android": "Dapatkan di Google Play",
    "ios": "Unduh di App Store",
    "product": "Number RPG oleh DappGo"
  }
};

const storePages = {
  "en": {
    "support": {
      "kicker": "Number RPG · Support",
      "title": "Support",
      "product": "Number RPG by DappGo",
      "summary": "Need help with Number RPG? Find answers below or email admin@dappgo.com.",
      "sections": [
        {
          "heading": "Contact us",
          "paragraphs": [
            "Email admin@dappgo.com and describe what happened. Response times vary with the issue and request volume."
          ]
        },
        {
          "heading": "What to include",
          "paragraphs": [],
          "bullets": [
            "Your device model and operating-system version.",
            "Your Number RPG app version.",
            "Your player ID, shown in Settings, and the steps that led to the issue. Screenshots can help; leave out passwords, payment details, and other sensitive information."
          ]
        },
        {
          "heading": "Guest progress and signing in",
          "paragraphs": [
            "Guest progress stays on that device unless you sign in. Sign in to use account-based cloud saves and recovery across devices."
          ]
        },
        {
          "heading": "Restore purchases",
          "paragraphs": [
            "Open Settings → Other → Restore purchases. Use the same Apple App Store or Google Play account used for the purchase. If an eligible purchase is still missing, email us with the details above."
          ]
        },
        {
          "heading": "Notifications",
          "paragraphs": [
            "Check the notification switches in the app and the permission in your device settings. Lives and expedition reminders, marketing messages, and Season 2 announcements have separate choices; enabling reminders does not subscribe you to Season 2."
          ]
        },
        {
          "heading": "Delete your account",
          "paragraphs": [
            "For in-app deletion, web options, and what happens to your data, visit {{deleteAccount}}."
          ]
        },
        {
          "heading": "Privacy options",
          "paragraphs": [
            "Review the available choices in the app’s privacy settings. Device settings also control tracking and notifications. Read {{privacy}} for data use, retention, and access or deletion requests."
          ]
        }
      ]
    },
    "home": {
      "title": "Number RPG",
      "summary": "Explore five lands with twelve stages each. Grow your pets, face bosses, and collect relics. Take on the Endless and Boss towers, and share the adventure with friends.",
      "heading": "Grow your pets. Find your next adventure.",
      "lands": "Lands to explore",
      "stages": "Stages in each land",
      "closingTitle": "Keep growing",
      "closing": "Pets, bosses, relics, and friends — bring them together as you make your way through Number RPG."
    }
  },
  "zh-TW": {
    "support": {
      "kicker": "Number RPG · 遊戲支援",
      "title": "遊戲支援",
      "product": "DappGo 的 Number RPG",
      "summary": "Number RPG 遇到問題了嗎？請參考下方說明，或寄信至 admin@dappgo.com。",
      "sections": [
        {
          "heading": "聯絡我們",
          "paragraphs": [
            "請寄信至 admin@dappgo.com，說明遇到的情況。我們會陸續查看來信；回覆時間會依問題及來信數量而有所不同。"
          ]
        },
        {
          "heading": "請提供哪些資訊",
          "paragraphs": [],
          "bullets": [
            "裝置型號及作業系統版本。",
            "Number RPG 的 App 版本。",
            "設定中顯示的玩家 ID，以及發生問題前的操作步驟。可附上截圖，但請勿提供密碼、付款資料或其他敏感資訊。"
          ]
        },
        {
          "heading": "訪客進度與登入",
          "paragraphs": [
            "訪客進度只保存在目前裝置，除非您登入帳戶。登入後可使用帳戶的雲端存檔及跨裝置恢復功能。"
          ]
        },
        {
          "heading": "恢復購買",
          "paragraphs": [
            "請開啟「設定 → 其他 → 恢復購買」，並使用當初購買時的 Apple App Store 或 Google Play 帳戶。若符合恢復資格的購買仍未出現，請附上上述資訊寄信給我們。"
          ]
        },
        {
          "heading": "通知設定",
          "paragraphs": [
            "請檢查 App 內的通知開關及裝置設定中的通知權限。生命與遠征提醒、行銷訊息及第 2 季公告各有獨立選項；開啟提醒不會自動訂閱第 2 季公告。"
          ]
        },
        {
          "heading": "刪除帳戶",
          "paragraphs": [
            "如需 App 內刪除步驟、網頁選項及資料處理說明，請前往{{deleteAccount}}。"
          ]
        },
        {
          "heading": "隱私選項",
          "paragraphs": [
            "您可在 App 的隱私設定查看可用選項，並在裝置設定管理追蹤及通知。資料使用、保存及存取或刪除請求詳見{{privacy}}。"
          ]
        }
      ]
    },
    "home": {
      "title": "Number RPG",
      "summary": "探索五大國度，每個國度都有十二個關卡。培育寵物、挑戰首領、收集遺物，登上無盡之塔與首領之塔，和好友一起冒險。",
      "heading": "培育寵物，展開下一段冒險。",
      "lands": "可探索的國度",
      "stages": "每個國度的關卡數",
      "closingTitle": "一起成長",
      "closing": "讓寵物、首領、遺物與好友，陪您走過 Number RPG 的冒險旅程。"
    }
  },
  "zh-CN": {
    "support": {
      "kicker": "Number RPG · 游戏支持",
      "title": "游戏支持",
      "product": "DappGo 的 Number RPG",
      "summary": "Number RPG 遇到问题了吗？请查看下方说明，或发送邮件至 admin@dappgo.com。",
      "sections": [
        {
          "heading": "联系我们",
          "paragraphs": [
            "请发送邮件至 admin@dappgo.com，说明遇到的情况。我们会陆续查看邮件；回复时间取决于问题及请求数量。"
          ]
        },
        {
          "heading": "请提供哪些信息",
          "paragraphs": [],
          "bullets": [
            "设备型号和操作系统版本。",
            "Number RPG 的应用版本。",
            "设置中显示的玩家 ID，以及出现问题前的操作步骤。可以附上截图，但请勿发送密码、付款资料或其他敏感信息。"
          ]
        },
        {
          "heading": "游客进度与登录",
          "paragraphs": [
            "除非登录账户，游客进度仅保存在当前设备。登录后可使用账户云存档和跨设备恢复功能。"
          ]
        },
        {
          "heading": "恢复购买",
          "paragraphs": [
            "请打开“设置 → 其他 → 恢复购买”，并使用当初购买时的 Apple App Store 或 Google Play 账户。如果符合恢复条件的购买仍未出现，请附上上述信息联系我们。"
          ]
        },
        {
          "heading": "通知设置",
          "paragraphs": [
            "请检查应用内的通知开关以及设备设置中的通知权限。生命与远征提醒、营销消息及第 2 季公告各有独立选项；开启提醒不会自动订阅第 2 季公告。"
          ]
        },
        {
          "heading": "删除账户",
          "paragraphs": [
            "有关应用内删除步骤、网页选项和数据处理方式，请访问{{deleteAccount}}。"
          ]
        },
        {
          "heading": "隐私选项",
          "paragraphs": [
            "您可在应用的隐私设置中查看可用选项，并在设备设置中管理跟踪和通知。数据使用、保留以及访问或删除请求详见{{privacy}}。"
          ]
        }
      ]
    },
    "home": {
      "title": "Number RPG",
      "summary": "探索五大国度，每个国度都有十二个关卡。培养宠物、挑战首领、收集遗物，登上无尽之塔与首领之塔，和好友一起冒险。",
      "heading": "培养宠物，开启下一段冒险。",
      "lands": "可探索的国度",
      "stages": "每个国度的关卡数",
      "closingTitle": "一起成长",
      "closing": "让宠物、首领、遗物与好友，陪您走过 Number RPG 的冒险旅程。"
    }
  },
  "ja": {
    "support": {
      "kicker": "Number RPG · サポート",
      "title": "サポート",
      "product": "DappGo の Number RPG",
      "summary": "Number RPG でお困りですか？以下の案内をご覧いただくか、admin@dappgo.com までご連絡ください。",
      "sections": [
        {
          "heading": "お問い合わせ",
          "paragraphs": [
            "admin@dappgo.com 宛てに、起きたことをお知らせください。順次確認していますが、返信までの時間は内容やお問い合わせの件数により異なります。"
          ]
        },
        {
          "heading": "お知らせいただきたい情報",
          "paragraphs": [],
          "bullets": [
            "端末の機種と OS のバージョン。",
            "Number RPG アプリのバージョン。",
            "設定に表示されるプレイヤー ID と、問題が起きるまでの操作。画像も参考になりますが、パスワードや決済情報などの機密情報は送らないでください。"
          ]
        },
        {
          "heading": "ゲストの進行状況とログイン",
          "paragraphs": [
            "ゲストの進行状況は、ログインしない限りその端末に保存されます。ログインするとアカウントのクラウドセーブや端末をまたいだ復元を利用できます。"
          ]
        },
        {
          "heading": "購入の復元",
          "paragraphs": [
            "「設定 → その他 → 購入を復元」を開き、購入時と同じ Apple App Store または Google Play アカウントをお使いください。復元対象の購入が反映されない場合は、上記の情報を添えてご連絡ください。"
          ]
        },
        {
          "heading": "通知",
          "paragraphs": [
            "アプリ内の通知スイッチと端末設定の通知許可をご確認ください。ライフ・遠征のリマインダー、マーケティング、シーズン 2 の告知は別々の選択です。リマインダーをオンにしてもシーズン 2 の告知には登録されません。"
          ]
        },
        {
          "heading": "アカウントの削除",
          "paragraphs": [
            "アプリ内の手順、ウェブでの選択肢、データの扱いは{{deleteAccount}}をご覧ください。"
          ]
        },
        {
          "heading": "プライバシー設定",
          "paragraphs": [
            "アプリのプライバシー設定で利用可能な選択肢を確認できます。端末設定では追跡と通知も管理できます。データの利用・保存や開示・削除の依頼は{{privacy}}をご覧ください。"
          ]
        }
      ]
    },
    "home": {
      "title": "Number RPG",
      "summary": "5 つの大地、それぞれ 12 のステージを探索。ペットを育て、ボスに挑み、遺物を集めましょう。無限の塔やボスの塔に挑戦し、フレンドと冒険を楽しめます。",
      "heading": "ペットを育て、次の冒険へ。",
      "lands": "探索する大地",
      "stages": "各大地のステージ",
      "closingTitle": "ともに成長しよう",
      "closing": "ペット、ボス、遺物、そしてフレンド。Number RPG の冒険で、そのつながりを育てましょう。"
    }
  },
  "ko": {
    "support": {
      "kicker": "Number RPG · 게임 지원",
      "title": "게임 지원",
      "product": "DappGo의 Number RPG",
      "summary": "Number RPG 이용에 도움이 필요하신가요? 아래 안내를 확인하거나 admin@dappgo.com으로 문의하세요.",
      "sections": [
        {
          "heading": "문의하기",
          "paragraphs": [
            "admin@dappgo.com으로 상황을 설명해 주세요. 메시지를 순차적으로 확인하며, 답변 시간은 문제 내용과 문의량에 따라 달라집니다."
          ]
        },
        {
          "heading": "함께 보내 주세요",
          "paragraphs": [],
          "bullets": [
            "기기 모델과 운영체제 버전.",
            "Number RPG 앱 버전.",
            "설정에 표시되는 플레이어 ID와 문제가 발생하기까지의 조작 순서. 스크린샷도 도움이 되지만 비밀번호, 결제 정보 등 민감한 정보는 보내지 마세요."
          ]
        },
        {
          "heading": "게스트 진행 상황과 로그인",
          "paragraphs": [
            "로그인하지 않은 게스트의 진행 상황은 해당 기기에만 저장됩니다. 로그인하면 계정 클라우드 저장과 기기 간 복구를 이용할 수 있습니다."
          ]
        },
        {
          "heading": "구매 복원",
          "paragraphs": [
            "설정 → 기타 → 구매 복원을 열고 구매 당시와 같은 Apple App Store 또는 Google Play 계정을 사용하세요. 복원 가능한 구매가 계속 보이지 않으면 위 정보를 첨부해 문의해 주세요."
          ]
        },
        {
          "heading": "알림",
          "paragraphs": [
            "앱의 알림 스위치와 기기 설정의 알림 권한을 확인하세요. 생명·원정 알림, 마케팅 메시지, 시즌 2 공지는 각각 별도 선택입니다. 알림을 켜도 시즌 2 공지를 자동 구독하지 않습니다."
          ]
        },
        {
          "heading": "계정 삭제",
          "paragraphs": [
            "앱 내 삭제 절차, 웹에서의 방법, 데이터 처리에 관한 안내는 {{deleteAccount}}를 확인하세요."
          ]
        },
        {
          "heading": "개인정보 선택",
          "paragraphs": [
            "앱의 개인정보 설정에서 제공되는 선택을 확인하세요. 기기 설정에서도 추적과 알림을 관리할 수 있습니다. 데이터 이용·보관과 열람·삭제 요청은 {{privacy}}를 참고하세요."
          ]
        }
      ]
    },
    "home": {
      "title": "Number RPG",
      "summary": "각각 12개 스테이지로 구성된 다섯 지역을 탐험하세요. 펫을 키우고 보스에 도전하며 유물을 모으세요. 무한의 탑과 보스의 탑을 오르고 친구와 모험을 함께하세요.",
      "heading": "펫을 키우고, 다음 모험으로.",
      "lands": "탐험할 지역",
      "stages": "지역별 스테이지",
      "closingTitle": "함께 성장하세요",
      "closing": "펫, 보스, 유물 그리고 친구들과 함께 Number RPG의 모험을 이어가세요."
    }
  },
  "es": {
    "support": {
      "kicker": "Number RPG · Ayuda",
      "title": "Ayuda",
      "product": "Number RPG de DappGo",
      "summary": "¿Necesitas ayuda con Number RPG? Consulta las respuestas o escribe a admin@dappgo.com.",
      "sections": [
        {
          "heading": "Contacta con nosotros",
          "paragraphs": [
            "Escribe a admin@dappgo.com y cuéntanos qué ocurrió. El tiempo de respuesta depende del problema y del volumen de solicitudes."
          ]
        },
        {
          "heading": "Qué incluir",
          "paragraphs": [],
          "bullets": [
            "Modelo del dispositivo y versión del sistema operativo.",
            "Versión de la app Number RPG.",
            "Tu ID de jugador, disponible en Ajustes, y los pasos previos al problema. Las capturas pueden ayudar; no envíes contraseñas, datos de pago ni información sensible."
          ]
        },
        {
          "heading": "Progreso de invitado e inicio de sesión",
          "paragraphs": [
            "El progreso de invitado queda en ese dispositivo salvo que inicies sesión. Inicia sesión para usar el guardado en la nube de la cuenta y recuperar el progreso entre dispositivos."
          ]
        },
        {
          "heading": "Restaurar compras",
          "paragraphs": [
            "Abre Ajustes → Otros → Restaurar compras. Usa la misma cuenta de Apple App Store o Google Play con la que compraste. Si una compra restaurable sigue sin aparecer, escríbenos con los datos anteriores."
          ]
        },
        {
          "heading": "Notificaciones",
          "paragraphs": [
            "Comprueba los interruptores de la app y el permiso de notificaciones del dispositivo. Los recordatorios de vidas y expediciones, los mensajes de marketing y los anuncios de la temporada 2 se eligen por separado; activar recordatorios no te suscribe a la temporada 2."
          ]
        },
        {
          "heading": "Eliminar tu cuenta",
          "paragraphs": [
            "Consulta {{deleteAccount}} para conocer los pasos en la app, las opciones web y qué ocurre con tus datos."
          ]
        },
        {
          "heading": "Opciones de privacidad",
          "paragraphs": [
            "Revisa las opciones disponibles en los ajustes de privacidad de la app. El dispositivo también controla seguimiento y notificaciones. Consulta {{privacy}} para saber cómo usamos y conservamos datos y cómo solicitar acceso o eliminación."
          ]
        }
      ]
    },
    "home": {
      "title": "Number RPG",
      "summary": "Explora cinco tierras con doce fases cada una. Haz crecer a tus mascotas, enfréntate a jefes y reúne reliquias. Supera las torres Infinita y de Jefes, y comparte la aventura con amigos.",
      "heading": "Haz crecer a tus mascotas. Sigue la aventura.",
      "lands": "Tierras por explorar",
      "stages": "Fases en cada tierra",
      "closingTitle": "Crece en compañía",
      "closing": "Mascotas, jefes, reliquias y amigos: reúne todo en tu aventura por Number RPG."
    }
  },
  "fr": {
    "support": {
      "kicker": "Number RPG · Assistance",
      "title": "Assistance",
      "product": "Number RPG par DappGo",
      "summary": "Besoin d’aide avec Number RPG ? Consultez les réponses ci-dessous ou écrivez à admin@dappgo.com.",
      "sections": [
        {
          "heading": "Nous contacter",
          "paragraphs": [
            "Décrivez ce qui s’est passé à admin@dappgo.com. Le délai de réponse varie selon le problème et le nombre de demandes en cours."
          ]
        },
        {
          "heading": "Informations à fournir",
          "paragraphs": [],
          "bullets": [
            "Modèle de l’appareil et version du système.",
            "Version de l’app Number RPG.",
            "Votre identifiant de joueur, visible dans les réglages, et les étapes menant au problème. Des captures peuvent aider ; excluez mots de passe, données de paiement et autres informations sensibles."
          ]
        },
        {
          "heading": "Progression invité et connexion",
          "paragraphs": [
            "La progression d’un invité reste sur cet appareil tant que vous ne vous connectez pas. Connectez-vous pour utiliser la sauvegarde du compte dans le cloud et la récupération entre appareils."
          ]
        },
        {
          "heading": "Restaurer les achats",
          "paragraphs": [
            "Ouvrez Réglages → Autres → Restaurer les achats. Utilisez le même compte Apple App Store ou Google Play que lors de l’achat. Si un achat éligible manque toujours, écrivez-nous avec les informations ci-dessus."
          ]
        },
        {
          "heading": "Notifications",
          "paragraphs": [
            "Vérifiez les interrupteurs de l’app et l’autorisation dans les réglages de l’appareil. Les rappels de vies et d’expédition, les messages marketing et les annonces de la saison 2 ont des choix distincts ; les rappels ne vous abonnent pas à la saison 2."
          ]
        },
        {
          "heading": "Supprimer votre compte",
          "paragraphs": [
            "Consultez {{deleteAccount}} pour les étapes dans l’app, les possibilités sur le web et le devenir de vos données."
          ]
        },
        {
          "heading": "Choix de confidentialité",
          "paragraphs": [
            "Consultez les options disponibles dans les réglages de confidentialité de l’app. L’appareil contrôle aussi le suivi et les notifications. Voir {{privacy}} pour l’utilisation, la conservation et les demandes d’accès ou de suppression."
          ]
        }
      ]
    },
    "home": {
      "title": "Number RPG",
      "summary": "Explorez cinq contrées de douze niveaux chacune. Faites grandir vos compagnons, affrontez des boss et collectionnez des reliques. Relevez les défis des tours Infinie et des Boss, et partagez l’aventure avec vos amis.",
      "heading": "Faites grandir vos compagnons. Partez à l’aventure.",
      "lands": "Contrées à explorer",
      "stages": "Niveaux par contrée",
      "closingTitle": "Grandissez ensemble",
      "closing": "Compagnons, boss, reliques et amis : réunissez-les au fil de votre aventure dans Number RPG."
    }
  },
  "de": {
    "support": {
      "kicker": "Number RPG · Hilfe",
      "title": "Hilfe",
      "product": "Number RPG von DappGo",
      "summary": "Du brauchst Hilfe mit Number RPG? Hier findest du Antworten. Du kannst auch an admin@dappgo.com schreiben.",
      "sections": [
        {
          "heading": "Kontakt",
          "paragraphs": [
            "Schreibe an admin@dappgo.com und beschreibe, was passiert ist. Die Antwortzeit hängt vom Problem und der Zahl der Anfragen ab."
          ]
        },
        {
          "heading": "Diese Angaben helfen",
          "paragraphs": [],
          "bullets": [
            "Gerätemodell und Version des Betriebssystems.",
            "Version der Number-RPG-App.",
            "Deine Spieler-ID aus den Einstellungen und die Schritte bis zum Problem. Screenshots können helfen; sende keine Passwörter, Zahlungsdaten oder anderen vertraulichen Angaben."
          ]
        },
        {
          "heading": "Gastfortschritt und Anmeldung",
          "paragraphs": [
            "Gastfortschritt bleibt auf diesem Gerät, solange du dich nicht anmeldest. Mit einer Anmeldung kannst du Cloud-Spielstände des Kontos und die Wiederherstellung auf anderen Geräten nutzen."
          ]
        },
        {
          "heading": "Käufe wiederherstellen",
          "paragraphs": [
            "Öffne Einstellungen → Sonstiges → Käufe wiederherstellen. Verwende dasselbe Apple-App-Store- oder Google-Play-Konto wie beim Kauf. Fehlt ein wiederherstellbarer Kauf weiterhin, schreibe uns mit den Angaben oben."
          ]
        },
        {
          "heading": "Benachrichtigungen",
          "paragraphs": [
            "Prüfe die Schalter in der App und die Berechtigung in den Geräteeinstellungen. Erinnerungen an Leben und Expeditionen, Marketingnachrichten und Ankündigungen zu Saison 2 werden getrennt gewählt. Erinnerungen abonnieren keine Saison-2-Ankündigungen."
          ]
        },
        {
          "heading": "Konto löschen",
          "paragraphs": [
            "Unter {{deleteAccount}} findest du die Schritte in der App, Möglichkeiten im Web und Informationen zum Umgang mit deinen Daten."
          ]
        },
        {
          "heading": "Datenschutzoptionen",
          "paragraphs": [
            "Prüfe die verfügbaren Optionen in den Datenschutzeinstellungen der App. Auch das Gerät verwaltet Tracking und Benachrichtigungen. In {{privacy}} stehen Informationen zu Nutzung, Aufbewahrung sowie Auskunfts- und Löschanfragen."
          ]
        }
      ]
    },
    "home": {
      "title": "Number RPG",
      "summary": "Erkunde fünf Länder mit jeweils zwölf Stufen. Lass deine Begleiter wachsen, besiege Bosse und sammle Relikte. Stelle dich dem Endlos- und dem Boss-Turm und erlebe das Abenteuer mit Freunden.",
      "heading": "Lass deine Begleiter wachsen. Zieh weiter.",
      "lands": "Länder zum Erkunden",
      "stages": "Stufen je Land",
      "closingTitle": "Gemeinsam wachsen",
      "closing": "Begleiter, Bosse, Relikte und Freunde begleiten dich auf deinem Weg durch Number RPG."
    }
  },
  "pt-BR": {
    "support": {
      "kicker": "Number RPG · Suporte",
      "title": "Suporte",
      "product": "Number RPG da DappGo",
      "summary": "Precisa de ajuda com o Number RPG? Veja as respostas abaixo ou escreva para admin@dappgo.com.",
      "sections": [
        {
          "heading": "Fale conosco",
          "paragraphs": [
            "Envie um e-mail para admin@dappgo.com contando o que aconteceu. O tempo de resposta varia com o problema e o volume de solicitações."
          ]
        },
        {
          "heading": "O que informar",
          "paragraphs": [],
          "bullets": [
            "Modelo do dispositivo e versão do sistema operacional.",
            "Versão do app Number RPG.",
            "Seu ID de jogador, disponível em Configurações, e os passos até o problema. Capturas podem ajudar; não envie senhas, dados de pagamento ou outras informações sensíveis."
          ]
        },
        {
          "heading": "Progresso de visitante e login",
          "paragraphs": [
            "O progresso de visitante fica nesse dispositivo, a menos que você faça login. Entre para usar o salvamento da conta na nuvem e a recuperação entre dispositivos."
          ]
        },
        {
          "heading": "Restaurar compras",
          "paragraphs": [
            "Abra Configurações → Outros → Restaurar compras. Use a mesma conta da Apple App Store ou Google Play usada na compra. Se uma compra elegível continuar ausente, escreva com as informações acima."
          ]
        },
        {
          "heading": "Notificações",
          "paragraphs": [
            "Confira os interruptores do app e a permissão nas configurações do dispositivo. Lembretes de vidas e expedições, mensagens de marketing e anúncios da temporada 2 têm escolhas separadas; ativar lembretes não inscreve você na temporada 2."
          ]
        },
        {
          "heading": "Excluir sua conta",
          "paragraphs": [
            "Veja {{deleteAccount}} para as etapas no app, opções na web e o que acontece com seus dados."
          ]
        },
        {
          "heading": "Opções de privacidade",
          "paragraphs": [
            "Confira as opções disponíveis nas configurações de privacidade do app. O dispositivo também controla rastreamento e notificações. Leia {{privacy}} sobre uso, retenção e pedidos de acesso ou exclusão."
          ]
        }
      ]
    },
    "home": {
      "title": "Number RPG",
      "summary": "Explore cinco terras com doze fases cada. Faça seus companheiros crescerem, enfrente chefes e reúna relíquias. Desafie as torres Infinita e dos Chefes e compartilhe a aventura com amigos.",
      "heading": "Crie seus companheiros. Viva a próxima aventura.",
      "lands": "Terras para explorar",
      "stages": "Fases em cada terra",
      "closingTitle": "Cresça em companhia",
      "closing": "Companheiros, chefes, relíquias e amigos fazem parte da sua jornada pelo Number RPG."
    }
  },
  "th": {
    "support": {
      "kicker": "Number RPG · ช่วยเหลือ",
      "title": "ช่วยเหลือ",
      "product": "Number RPG โดย DappGo",
      "summary": "ต้องการความช่วยเหลือเกี่ยวกับ Number RPG หรือไม่? ดูคำตอบด้านล่างหรือส่งอีเมลถึง admin@dappgo.com",
      "sections": [
        {
          "heading": "ติดต่อเรา",
          "paragraphs": [
            "ส่งรายละเอียดสิ่งที่เกิดขึ้นไปที่ admin@dappgo.com ระยะเวลาตอบกลับขึ้นอยู่กับลักษณะปัญหาและจำนวนคำขอที่ได้รับ"
          ]
        },
        {
          "heading": "ข้อมูลที่ควรส่ง",
          "paragraphs": [],
          "bullets": [
            "รุ่นอุปกรณ์และเวอร์ชันระบบปฏิบัติการ",
            "เวอร์ชันแอป Number RPG",
            "รหัสผู้เล่นจากหน้าตั้งค่า และขั้นตอนก่อนพบปัญหา ภาพหน้าจออาจช่วยได้ แต่ไม่ควรส่งรหัสผ่าน ข้อมูลชำระเงิน หรือข้อมูลอ่อนไหวอื่น"
          ]
        },
        {
          "heading": "ความคืบหน้าผู้เยี่ยมชมและการเข้าสู่ระบบ",
          "paragraphs": [
            "ความคืบหน้าผู้เยี่ยมชมอยู่บนอุปกรณ์นั้นเท่านั้นจนกว่าจะเข้าสู่ระบบ เข้าสู่ระบบเพื่อใช้บันทึกบนคลาวด์ของบัญชีและกู้คืนข้ามอุปกรณ์"
          ]
        },
        {
          "heading": "กู้คืนการซื้อ",
          "paragraphs": [
            "เปิด ตั้งค่า → อื่น ๆ → กู้คืนการซื้อ โดยใช้บัญชี Apple App Store หรือ Google Play เดียวกับตอนซื้อ หากรายการที่กู้คืนได้ยังไม่ปรากฏ ให้ส่งอีเมลพร้อมข้อมูลข้างต้น"
          ]
        },
        {
          "heading": "การแจ้งเตือน",
          "paragraphs": [
            "ตรวจสวิตช์แจ้งเตือนในแอปและสิทธิ์ในการตั้งค่าอุปกรณ์ การเตือนชีวิตและการสำรวจ ข้อความการตลาด และประกาศซีซัน 2 มีตัวเลือกแยกกัน การเปิดเตือนไม่ได้สมัครประกาศซีซัน 2"
          ]
        },
        {
          "heading": "ลบบัญชี",
          "paragraphs": [
            "ดู{{deleteAccount}}สำหรับขั้นตอนในแอป ตัวเลือกบนเว็บ และผลต่อข้อมูลของคุณ"
          ]
        },
        {
          "heading": "ตัวเลือกความเป็นส่วนตัว",
          "paragraphs": [
            "ตรวจตัวเลือกที่มีในเมนูความเป็นส่วนตัวของแอป การตั้งค่าอุปกรณ์ใช้ควบคุมการติดตามและการแจ้งเตือนได้ด้วย อ่าน{{privacy}}เกี่ยวกับการใช้และเก็บข้อมูล รวมถึงคำขอเข้าถึงหรือลบ"
          ]
        }
      ]
    },
    "home": {
      "title": "Number RPG",
      "summary": "สำรวจห้าดินแดน ดินแดนละสิบสองด่าน เลี้ยงคู่หูให้เติบโต ต่อสู้กับบอส และสะสมวัตถุโบราณ ท้าทายหอคอยไร้สิ้นสุดและหอคอยบอส พร้อมแบ่งปันการผจญภัยกับเพื่อน",
      "heading": "เลี้ยงคู่หูให้เติบโต แล้วออกผจญภัยต่อ",
      "lands": "ดินแดนให้สำรวจ",
      "stages": "ด่านในแต่ละดินแดน",
      "closingTitle": "เติบโตไปด้วยกัน",
      "closing": "พบกับคู่หู บอส วัตถุโบราณ และเพื่อน ๆ ตลอดเส้นทางผจญภัยใน Number RPG"
    }
  },
  "vi": {
    "support": {
      "kicker": "Number RPG · Hỗ trợ",
      "title": "Hỗ trợ",
      "product": "Number RPG của DappGo",
      "summary": "Cần giúp đỡ với Number RPG? Xem hướng dẫn bên dưới hoặc gửi email đến admin@dappgo.com.",
      "sections": [
        {
          "heading": "Liên hệ",
          "paragraphs": [
            "Hãy mô tả sự việc qua admin@dappgo.com. Thời gian phản hồi tùy vấn đề và số lượng yêu cầu đang được xử lý."
          ]
        },
        {
          "heading": "Thông tin cần gửi",
          "paragraphs": [],
          "bullets": [
            "Mẫu thiết bị và phiên bản hệ điều hành.",
            "Phiên bản ứng dụng Number RPG.",
            "ID người chơi trong Cài đặt và các bước dẫn tới vấn đề. Ảnh chụp có thể hữu ích; đừng gửi mật khẩu, thông tin thanh toán hoặc dữ liệu nhạy cảm khác."
          ]
        },
        {
          "heading": "Tiến độ khách và đăng nhập",
          "paragraphs": [
            "Tiến độ khách chỉ nằm trên thiết bị đó nếu chưa đăng nhập. Đăng nhập để dùng lưu đám mây của tài khoản và khôi phục giữa các thiết bị."
          ]
        },
        {
          "heading": "Khôi phục giao dịch mua",
          "paragraphs": [
            "Mở Cài đặt → Khác → Khôi phục giao dịch mua. Dùng cùng tài khoản Apple App Store hoặc Google Play đã mua. Nếu giao dịch đủ điều kiện vẫn thiếu, hãy gửi email kèm thông tin trên."
          ]
        },
        {
          "heading": "Thông báo",
          "paragraphs": [
            "Kiểm tra các nút thông báo trong ứng dụng và quyền trong cài đặt thiết bị. Nhắc mạng và thám hiểm, tin tiếp thị và thông báo mùa 2 có lựa chọn riêng; bật lời nhắc không đăng ký mùa 2."
          ]
        },
        {
          "heading": "Xóa tài khoản",
          "paragraphs": [
            "Xem {{deleteAccount}} để biết các bước trong ứng dụng, tùy chọn trên web và cách xử lý dữ liệu."
          ]
        },
        {
          "heading": "Lựa chọn quyền riêng tư",
          "paragraphs": [
            "Xem các lựa chọn hiện có trong cài đặt quyền riêng tư của ứng dụng. Thiết bị cũng quản lý theo dõi và thông báo. Đọc {{privacy}} về việc sử dụng, lưu giữ và yêu cầu truy cập hoặc xóa dữ liệu."
          ]
        }
      ]
    },
    "home": {
      "title": "Number RPG",
      "summary": "Khám phá năm vùng đất, mỗi vùng mười hai màn. Nuôi thú cưng lớn lên, đối đầu trùm và thu thập di vật. Thử sức ở Tháp Vô Tận, Tháp Trùm và chia sẻ hành trình cùng bạn bè.",
      "heading": "Nuôi thú cưng. Tiếp bước phiêu lưu.",
      "lands": "Vùng đất để khám phá",
      "stages": "Màn chơi mỗi vùng",
      "closingTitle": "Cùng nhau lớn lên",
      "closing": "Thú cưng, trùm, di vật và bạn bè đồng hành trên hành trình Number RPG của bạn."
    }
  },
  "id": {
    "support": {
      "kicker": "Number RPG · Bantuan",
      "title": "Bantuan",
      "product": "Number RPG oleh DappGo",
      "summary": "Perlu bantuan untuk Number RPG? Lihat jawaban berikut atau kirim email ke admin@dappgo.com.",
      "sections": [
        {
          "heading": "Hubungi kami",
          "paragraphs": [
            "Ceritakan masalahnya lewat admin@dappgo.com. Waktu balasan bergantung pada masalah dan jumlah permintaan yang sedang ditangani."
          ]
        },
        {
          "heading": "Informasi yang disertakan",
          "paragraphs": [],
          "bullets": [
            "Model perangkat dan versi sistem operasi.",
            "Versi aplikasi Number RPG.",
            "ID pemain dari Pengaturan dan langkah sebelum masalah terjadi. Tangkapan layar dapat membantu; jangan kirim kata sandi, data pembayaran atau informasi sensitif lainnya."
          ]
        },
        {
          "heading": "Kemajuan tamu dan login",
          "paragraphs": [
            "Kemajuan tamu tetap di perangkat itu kecuali Anda login. Login untuk memakai penyimpanan cloud akun dan pemulihan antarperangkat."
          ]
        },
        {
          "heading": "Pulihkan pembelian",
          "paragraphs": [
            "Buka Pengaturan → Lainnya → Pulihkan pembelian. Gunakan akun Apple App Store atau Google Play yang sama seperti saat membeli. Jika pembelian yang memenuhi syarat masih belum muncul, kirim email dengan informasi di atas."
          ]
        },
        {
          "heading": "Notifikasi",
          "paragraphs": [
            "Periksa sakelar notifikasi di aplikasi dan izin pada pengaturan perangkat. Pengingat nyawa dan ekspedisi, pesan pemasaran, serta pengumuman Musim 2 memiliki pilihan terpisah; mengaktifkan pengingat tidak berlangganan Musim 2."
          ]
        },
        {
          "heading": "Hapus akun",
          "paragraphs": [
            "Lihat {{deleteAccount}} untuk langkah di aplikasi, pilihan web, dan penanganan data Anda."
          ]
        },
        {
          "heading": "Pilihan privasi",
          "paragraphs": [
            "Periksa pilihan yang tersedia di pengaturan privasi aplikasi. Perangkat juga mengatur pelacakan dan notifikasi. Baca {{privacy}} tentang penggunaan, penyimpanan, serta permintaan akses atau penghapusan data."
          ]
        }
      ]
    },
    "home": {
      "title": "Number RPG",
      "summary": "Jelajahi lima wilayah dengan dua belas tahap di masing-masingnya. Besarkan peliharaan, hadapi bos, dan kumpulkan relik. Tantang Menara Tanpa Akhir dan Menara Bos, lalu berbagi petualangan dengan teman.",
      "heading": "Besarkan peliharaanmu. Lanjutkan petualangan.",
      "lands": "Wilayah untuk dijelajahi",
      "stages": "Tahap per wilayah",
      "closingTitle": "Tumbuh bersama",
      "closing": "Peliharaan, bos, relik dan teman menemani perjalananmu di Number RPG."
    }
  }
};

for (const locale of localeOrder) {
  Object.assign(pages[locale], storePages[locale]);
}

const apiBase = "https://data.dappgo.com/v1/number-rpg";
window.NUMBER_RPG_LEGAL = { localeOrder, localeNames, pages, ui, apiBase };
