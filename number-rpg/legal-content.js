const localeOrder = ['en', 'zh-TW', 'zh-CN', 'ja', 'ko', 'es', 'fr', 'de', 'pt-BR', 'th', 'vi', 'id'];

const localeNames = {
  en: 'English',
  'zh-TW': '繁體中文',
  'zh-CN': '简体中文',
  ja: '日本語',
  ko: '한국어',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  'pt-BR': 'Português (Brasil)',
  th: 'ไทย',
  vi: 'Tiếng Việt',
  id: 'Bahasa Indonesia',
};

const pages = {
  en: {
    privacy: {
      kicker: 'Number RPG · privacy',
      title: 'Privacy policy',
      product: 'Number RPG by DappGo',
      effective: 'Effective date: 2026-10-27',
      summary: 'Number RPG lets you play as a guest. Sign-in is optional; it adds account-backed cloud save and cross-device recovery. This page describes the data used by the current app and API implementation.',
      sections: [
        {
          heading: 'Who we are',
          paragraphs: [
            'Number RPG is operated by DappGo. Questions about this policy or your data can be sent to admin@dappgo.com.',
          ],
        },
        {
          heading: 'Accounts and sign-in',
          paragraphs: [
            'You can play as a guest or optionally continue with Apple, Google, or Facebook. On iOS, Facebook sign-in uses Meta Limited Login. Provider credentials are verified by the Number RPG API; provider access tokens are not stored by the API.',
            'A guest session is associated with a device and can keep progress on that device. Linking a provider preserves the server account and enables account-backed cloud save, leaderboards, purchase restoration, and cross-device recovery.',
          ],
          bullets: [
            'Account ID and profile information such as display name, country, and selected leader pet.',
            'Provider name and provider subject ID for Apple, Google, or Facebook; an email address only when a provider supplies one to us.',
          ],
        },
        {
          heading: 'Data we process',
          paragraphs: ['Depending on the features you use, the app and data.dappgo.com may process the following:'],
          bullets: [
            'Cloud saves, game progress, scores, leaderboard submissions, and gameplay events.',
            'Invite codes, invite activation and anti-fraud records, friends, gifts, rewards, and related activity.',
            'Purchase records received through RevenueCat, including product, transaction, store, environment, and purchase timing fields used to grant or restore entitlements.',
            'A device identifier represented by a server-side hash for account sessions and anti-fraud controls, plus push-notification tokens when notifications are enabled.',
            'Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config, and Cloud Messaging data used by the corresponding features.',
          ],
        },
        {
          heading: 'How we use and share data',
          paragraphs: [
            'DappGo uses this information to provide the game, save and restore progress, operate leaderboards and social features, process purchases, prevent cheating and abuse, secure accounts, send requested notifications, and keep the service working.',
            'The app and API share information with the providers needed for the feature you choose, including Apple, Google, Meta/Facebook, Firebase, Google AdMob, and RevenueCat. Each provider may process data under its own terms and privacy documentation. The current code does not state vendor-specific retention periods; those details require Owner review.',
          ],
        },
        {
          heading: 'Analytics, crash reports, ads, and consent',
          paragraphs: [
            'Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config, and Cloud Messaging are optional integrations. Their collection is gated by the app consent controller; analytics collection is disabled before consent is resolved, and consent changes can revoke collection.',
            'In the EEA, Google User Messaging Platform (UMP) consent controls ad readiness. On iOS, App Tracking Transparency is requested after UMP when required. Google AdMob ads may be shown only after the app has an ad-ready consent state; personalised advertising is used only with the required consent.',
          ],
          bullets: [
            'You can decline or change consent where the app presents the relevant privacy options. You can also control notifications and tracking permissions in your device settings.',
            'The precise categories and retention periods used by Firebase, AdMob, Apple, Google, Meta, and RevenueCat are not fixed in the app source and must be confirmed before publication.',
          ],
        },
        {
          heading: 'Retention and deletion',
          paragraphs: [
            'While an account remains active, the API retains the account and the player-owned records needed for the features above. The cloud-save implementation keeps the ten most recent save versions. Access tokens last 15 minutes; server sessions and rotating refresh tokens are created for 30 days, and expired sessions are removed by the maintenance job.',
            'When account deletion succeeds, the API deletes the player row and its cascaded player-owned data, including identities, devices, sessions, saves, scores, invites, friendships, rewards, gifts, events, activity, purchase records, fraud flags, and push tokens. A completed deletion-request record remains for operational evidence, with the player reference cleared; admin audit rows are anonymised rather than retaining the player snapshot.',
            'The source code does not define a separate retention period for vendor-held telemetry, ad, purchase, notification, or request-log data. Owner review is required to confirm those periods and any legally required exceptions.',
          ],
        },
        {
          heading: 'Children and your rights',
          paragraphs: [
            'Number RPG is not directed to children under 13, and we do not knowingly invite children under 13 to create an account. If you believe a child has provided personal data, contact admin@dappgo.com.',
            'You may ask for access, export, correction, deletion, or information about consent choices by contacting admin@dappgo.com. The API also has an authenticated data-export path. We will verify requests as needed to protect accounts and other players.',
          ],
        },
        {
          heading: 'Changes and contact',
          paragraphs: [
            'We may update this policy when the app, API, vendors, or legal requirements change. The effective date at the top identifies the current version. Contact admin@dappgo.com with privacy questions or requests.',
          ],
        },
      ],
    },
    terms: {
      kicker: 'Number RPG · terms',
      title: 'Terms of service',
      product: 'Number RPG by DappGo',
      effective: 'Effective date: 2026-10-27',
      summary: 'These terms describe the rules for using Number RPG, including guest play, optional accounts, virtual items, purchases, fair play, and account termination.',
      sections: [
        {
          heading: '1. Acceptance',
          paragraphs: ['By installing, accessing, or using Number RPG, you agree to these Terms of Service and the Number RPG Privacy Policy. If you do not agree, do not use the game.'],
        },
        {
          heading: '2. The service and accounts',
          paragraphs: ['Number RPG is a mobile game operated by DappGo. You may play as a guest. Optional Apple, Google, or Facebook sign-in supports cloud save, social features, leaderboards, and purchase restoration. Keep your device, sign-in credentials, and recovery information secure.'],
        },
        {
          heading: '3. Virtual items and purchases',
          paragraphs: ['The game may offer virtual currency, lives, accessories, upgrades, or other digital entitlements. They have no cash value, are licensed for use in the game, and may not be sold, transferred, or redeemed outside the game. Availability and balances may change when the service or game rules change.', 'Purchases are made through Apple App Store or Google Play billing. Refunds, cancellations, and payment disputes must be requested from the store that processed the transaction, subject to that store’s rules. RevenueCat helps us record and restore purchase entitlements. Deleting a Number RPG account deletes game data; eligible store purchases may remain restorable through the store account.'],
        },
        {
          heading: '4. Fair play and acceptable use',
          paragraphs: ['Do not cheat, exploit bugs, automate play, manipulate scores or rewards, abuse invite or gift systems, impersonate another player, interfere with the API or service, or use the game to harm another person. Do not submit content or display names that are unlawful, abusive, hateful, or infringe another person’s rights.'],
        },
        {
          heading: '5. Enforcement and termination',
          paragraphs: ['DappGo may limit, suspend, or terminate access when it reasonably believes an account or device is cheating, abusive, fraudulent, unsafe, or in breach of these Terms. We may also change, pause, or discontinue parts of the service. You may delete your account from Settings → Delete account or use the instructions on the account-deletion page.'],
        },
        {
          heading: '6. Disclaimers and limits',
          paragraphs: ['To the extent permitted by law, the game is provided as available and without promises that it will be uninterrupted, error-free, or permanently preserve every item or save. DappGo is not responsible for failures caused by your device, network, app store, third-party provider, or events outside reasonable control. Nothing in these Terms limits rights that cannot legally be limited.'],
        },
        {
          heading: '7. Governing law and venue',
          paragraphs: ['These Terms are governed by the laws of the State of California, USA, without regard to conflict-of-laws rules. Exclusive venue is in the state or federal courts located in Los Angeles County, California. This does not limit mandatory consumer rights in the country where you live.'],
        },
        {
          heading: '8. Contact',
          paragraphs: ['Questions about these Terms can be sent to admin@dappgo.com.'],
        },
      ],
    },
    deleteAccount: {
      kicker: 'Number RPG · account deletion',
      title: 'Delete your account',
      product: 'Number RPG by DappGo',
      effective: 'Instructions effective: 2026-10-27',
      summary: 'You can request deletion in the app or by email. The in-app flow is the fastest way to delete the Number RPG account and its player-owned data.',
      sections: [
        {
          heading: 'Delete in the app',
          paragraphs: ['Open Number RPG and go to Settings → Delete account. Read the confirmation, confirm the deletion, and keep the app online until it reports success. If an Apple identity is linked, the app/API may require Apple re-authorisation before deletion can finish.'],
        },
        {
          heading: 'Request deletion by email',
          paragraphs: ['Email admin@dappgo.com and ask to delete your Number RPG account. Include enough information for DappGo to identify the account, such as the in-game display name and account ID if available. Do not send a password, provider access token, or Apple private key. We may ask for verification before acting on an email request.'],
        },
        {
          heading: 'What the API deletes',
          paragraphs: ['A successful deletion removes the player account and the player-owned records linked by the API: provider identities, device and session records, cloud saves, scores, invites, friendships, gifts, rewards, events, activity, purchase records, fraud flags, and push tokens. Local game progress is reset by the app. Store purchases are handled by Apple or Google and remain restorable where the store and entitlement allow it.'],
        },
        {
          heading: 'How long it takes',
          paragraphs: ['The current DELETE /me implementation creates a deletion request, performs any required Apple revocation, deletes the player data, marks the request completed, and returns success in the same server operation. There is no code-defined waiting period for a successful in-app request. A network failure or required Apple re-authorisation can prevent completion and requires retrying.', 'The completed deletion-request record keeps its request and completion timestamps while its player reference is cleared. Related admin audit entries are anonymised. The code does not define a separate deadline for a manually verified email request; Owner review is required for that procedure.'],
        },
        {
          heading: 'Need help?',
          paragraphs: ['Contact admin@dappgo.com if the in-app flow fails, you cannot access the account, or you need to ask about an email request.'],
        },
      ],
    },
  },
};

Object.assign(pages, {
  'zh-TW': {
    privacy: {
      kicker: 'Number RPG · 隱私', title: '隱私政策', product: 'DappGo 的 Number RPG', effective: '生效日期：2026-10-27',
      summary: 'Number RPG 可讓您以訪客身分遊玩。登入是選擇性的；登入後可使用帳戶雲端存檔與跨裝置復原。本頁依目前 App 與 API 實作說明資料使用方式。',
      sections: [
        { heading: '我們是誰', paragraphs: ['Number RPG 由 DappGo 營運。若對本政策或您的資料有疑問，請寄信至 admin@dappgo.com。'] },
        { heading: '帳戶與登入', paragraphs: ['您可以訪客身分遊玩，也可以選擇使用 Apple、Google 或 Facebook 登入。iOS 上的 Facebook 登入使用 Meta Limited Login。Number RPG API 會驗證供應商憑證，但不儲存供應商存取權杖。', '訪客工作階段會與裝置關聯，並可在裝置上保留進度。連結供應商後會保留伺服器帳戶，並啟用帳戶雲端存檔、排行榜、購買復原與跨裝置復原。'], bullets: ['帳戶 ID 與顯示名稱、國家／地區、領隊寵物等個人資料。', 'Apple、Google 或 Facebook 的供應商名稱與 subject ID；只有供應商提供時才會有電子郵件地址。'] },
        { heading: '我們處理的資料', paragraphs: ['依您使用的功能，App 與 data.dappgo.com 可能處理：'], bullets: ['雲端存檔、遊戲進度、分數、排行榜提交與遊戲事件。', '邀請碼、邀請啟用與反詐欺紀錄、好友、禮物、獎勵及相關活動。', 'RevenueCat 收到的購買紀錄，例如商品、交易、商店、環境與購買時間，用於發放或復原權益。', '為帳戶工作階段與反詐欺控制而以伺服器雜湊形式處理的裝置識別碼，以及啟用通知時的推播權杖。', 'Firebase Analytics、Crashlytics、Performance Monitoring、Remote Config 與 Cloud Messaging 針對相應功能使用的資料。'] },
        { heading: '資料如何使用與分享', paragraphs: ['DappGo 使用這些資料提供遊戲、儲存與復原進度、營運排行榜和社交功能、處理購買、防止作弊與濫用、保護帳戶、發送您要求的通知並維持服務運作。', 'App 與 API 會向您選用功能所需的供應商分享資料，包括 Apple、Google、Meta／Facebook、Firebase、Google AdMob 與 RevenueCat。各供應商依其條款與隱私文件處理資料。目前程式碼沒有訂定供應商各自的保存期限；這些細節需要 Owner 審核。'] },
        { heading: '分析、錯誤報告、廣告與同意', paragraphs: ['Firebase Analytics、Crashlytics、Performance Monitoring、Remote Config 與 Cloud Messaging 是選用整合。資料收集受 App 同意控制器管理；在同意狀態確認前會停用分析收集，同意變更也可能撤銷收集。', '在 EEA，Google User Messaging Platform（UMP）同意會控制廣告是否可用。在 iOS，必要時會在 UMP 後要求 App Tracking Transparency。Google AdMob 只會在 App 取得可投放廣告的同意狀態後顯示廣告；個人化廣告只會在取得必要同意後使用。'], bullets: ['您可以在 App 顯示相關隱私選項時拒絕或更改同意，也可在裝置設定中控制通知與追蹤權限。', 'Firebase、AdMob、Apple、Google、Meta 與 RevenueCat 使用的精確資料類別與保存期限未固定在 App 原始碼中，發布前必須確認。'] },
        { heading: '保存與刪除', paragraphs: ['帳戶仍啟用時，API 會保存提供上述功能所需的帳戶與玩家資料。雲端存檔實作保留最近十個版本。存取權杖有效 15 分鐘；伺服器工作階段與輪換更新權杖建立時效為 30 天，過期工作階段由維護工作清理。', '帳戶刪除成功後，API 會刪除玩家資料列及其級聯資料，包括身分、裝置、工作階段、存檔、分數、邀請、好友、獎勵、禮物、事件、活動、購買紀錄、反詐欺紀錄與推播權杖。已完成的刪除請求紀錄仍會保留作為營運證據，但玩家參照會清除；管理員稽核資料會匿名化，不會保留玩家快照。', '原始碼沒有為供應商保存的遙測、廣告、購買、通知或請求日誌資料訂定獨立期限。需要 Owner 審核以確認這些期限及法律要求的例外。'] },
        { heading: '兒童與您的權利', paragraphs: ['Number RPG 並非以 13 歲以下兒童為對象，我們也不會明知而邀請 13 歲以下兒童建立帳戶。若您認為兒童提供了個人資料，請聯絡 admin@dappgo.com。', '您可以透過 admin@dappgo.com 要求查閱、匯出、更正、刪除資料，或詢問同意選擇。API 也提供需驗證的資料匯出路徑。為保護帳戶與其他玩家，我們可能需要驗證請求。'] },
        { heading: '變更與聯絡', paragraphs: ['當 App、API、供應商或法律要求變更時，我們可能更新本政策。頁首的生效日期代表目前版本。隱私問題或請求請寄至 admin@dappgo.com。'] },
      ],
    },
    terms: {
      kicker: 'Number RPG · 條款', title: '服務條款', product: 'DappGo 的 Number RPG', effective: '生效日期：2026-10-27',
      summary: '本條款說明使用 Number RPG 的規則，包括訪客遊玩、選擇性帳戶、虛擬物品、購買、公平遊戲與帳戶終止。',
      sections: [
        { heading: '1. 接受條款', paragraphs: ['安裝、存取或使用 Number RPG，即表示您同意本服務條款與 Number RPG 隱私政策。若不同意，請勿使用遊戲。'] },
        { heading: '2. 服務與帳戶', paragraphs: ['Number RPG 是由 DappGo 營運的手機遊戲。您可以訪客身分遊玩。選擇性 Apple、Google 或 Facebook 登入支援雲端存檔、社交功能、排行榜與購買復原。請保護裝置、登入憑證與復原資訊。'] },
        { heading: '3. 虛擬物品與購買', paragraphs: ['遊戲可能提供虛擬貨幣、生命、裝飾、升級或其他數位權益。它們沒有現金價值，只授權在遊戲中使用，不得在遊戲外出售、轉讓或兌換。服務或遊戲規則變更時，可用性與餘額可能改變。', '購買透過 Apple App Store 或 Google Play 計費。退款、取消與付款爭議應向處理交易的商店提出，並受該商店規則約束。RevenueCat 協助記錄及復原購買權益。刪除 Number RPG 帳戶會刪除遊戲資料；符合資格的商店購買可能仍可透過商店帳戶復原。'] },
        { heading: '4. 公平遊戲與可接受使用', paragraphs: ['請勿作弊、利用錯誤、以自動化方式遊玩、操縱分數或獎勵、濫用邀請或禮物系統、冒充他人、干擾 API 或服務，或利用遊戲傷害他人。請勿提交違法、辱罵、仇恨或侵害他人權利的內容或顯示名稱。'] },
        { heading: '5. 執行與終止', paragraphs: ['若 DappGo 合理認為帳戶或裝置有作弊、濫用、詐欺、安全風險或違反本條款，DappGo 可以限制、暫停或終止存取，也可以變更、暫停或停止服務部分功能。您可以從設定 → 刪除帳戶，或依帳戶刪除頁面說明刪除帳戶。'] },
        { heading: '6. 免責與限制', paragraphs: ['在法律允許的範圍內，遊戲按可用狀態提供，不保證不中斷、無錯誤或永久保存每項物品與存檔。DappGo 不對由裝置、網路、應用程式商店、第三方供應商或合理控制範圍外事件造成的故障負責。本條款不限制法律上不能限制的權利。'] },
        { heading: '7. 準據法與管轄', paragraphs: ['本條款受美國加州法律管轄，不適用其法律衝突規則。專屬管轄地為位於加州洛杉磯郡的州法院或聯邦法院。本條款不限制您居住國家法律賦予您的強制性消費者權利。'] },
        { heading: '8. 聯絡', paragraphs: ['條款問題請寄至 admin@dappgo.com。'] },
      ],
    },
    deleteAccount: {
      kicker: 'Number RPG · 刪除帳戶', title: '刪除您的帳戶', product: 'DappGo 的 Number RPG', effective: '說明生效日期：2026-10-27',
      summary: '您可以在 App 內或透過電子郵件要求刪除。App 內流程是刪除 Number RPG 帳戶及玩家資料最快的方式。',
      sections: [
        { heading: '在 App 內刪除', paragraphs: ['開啟 Number RPG，前往設定 → 刪除帳戶。閱讀確認訊息並確認刪除，保持 App 在線直到顯示成功。若已連結 Apple 身分，完成刪除前 App／API 可能要求 Apple 重新授權。'] },
        { heading: '透過電子郵件要求刪除', paragraphs: ['寄信至 admin@dappgo.com，要求刪除您的 Number RPG 帳戶。請提供足以識別帳戶的資訊，例如遊戲內顯示名稱及可取得的帳戶 ID。不要寄送密碼、供應商存取權杖或 Apple 私密金鑰。我們可能在處理郵件請求前要求驗證。'] },
        { heading: 'API 會刪除什麼', paragraphs: ['成功刪除會移除玩家帳戶及 API 連結的玩家資料：供應商身分、裝置與工作階段、雲端存檔、分數、邀請、好友、禮物、獎勵、事件、活動、購買紀錄、反詐欺紀錄與推播權杖。App 會重設本機遊戲進度。Apple 或 Google 處理的商店購買，在商店與權益允許時仍可復原。'] },
        { heading: '需要多久', paragraphs: ['目前 DELETE /me 實作會建立刪除請求、執行必要的 Apple 撤銷、刪除玩家資料、將請求標記完成，並在同一次伺服器操作中回傳成功。成功的 App 內請求沒有程式碼定義的等待期。網路故障或需要 Apple 重新授權時可能無法完成，必須重試。', '已完成的刪除請求會保留請求與完成時間，但清除玩家參照；相關管理員稽核項目會匿名化。程式碼沒有為人工驗證的電子郵件請求定義期限；該流程需要 Owner 審核。'] },
        { heading: '需要協助？', paragraphs: ['若 App 內流程失敗、無法存取帳戶，或想詢問電子郵件請求，請聯絡 admin@dappgo.com。'] },
      ],
    },
  },
  'zh-CN': {
    privacy: {
      kicker: 'Number RPG · 隐私', title: '隐私政策', product: 'DappGo 的 Number RPG', effective: '生效日期：2026-10-27',
      summary: 'Number RPG 支持以访客身份游玩。登录是可选的；登录后可使用账户云端存档和跨设备恢复。本页依据当前 App 与 API 实现说明数据使用方式。',
      sections: [
        { heading: '我们是谁', paragraphs: ['Number RPG 由 DappGo 运营。有关本政策或您的数据，请发送邮件至 admin@dappgo.com。'] },
        { heading: '账户与登录', paragraphs: ['您可以访客身份游玩，也可以选择使用 Apple、Google 或 Facebook 登录。iOS 上的 Facebook 登录使用 Meta Limited Login。Number RPG API 会验证供应商凭证，但不会保存供应商访问令牌。', '访客会话与设备关联，并可在设备上保留进度。关联供应商后会保留服务器账户，并启用账户云端存档、排行榜、购买恢复和跨设备恢复。'], bullets: ['账户 ID 以及显示名称、国家／地区、领队宠物等个人资料。', 'Apple、Google 或 Facebook 的供应商名称和 subject ID；只有供应商提供时才会有电子邮件地址。'] },
        { heading: '我们处理的数据', paragraphs: ['根据您使用的功能，App 与 data.dappgo.com 可能处理：'], bullets: ['云端存档、游戏进度、分数、排行榜提交和游戏事件。', '邀请码、邀请激活和反欺诈记录、好友、礼物、奖励及相关活动。', 'RevenueCat 收到的购买记录，例如商品、交易、商店、环境和购买时间，用于发放或恢复权益。', '用于账户会话和反欺诈控制、以服务器哈希形式处理的设备标识符，以及启用通知时的推送令牌。', 'Firebase Analytics、Crashlytics、Performance Monitoring、Remote Config 和 Cloud Messaging 为相应功能使用的数据。'] },
        { heading: '数据如何使用与分享', paragraphs: ['DappGo 使用这些数据提供游戏、保存和恢复进度、运营排行榜与社交功能、处理购买、防止作弊和滥用、保护账户、发送您请求的通知并维持服务运行。', 'App 与 API 会向您选择的功能所需的供应商分享数据，包括 Apple、Google、Meta／Facebook、Firebase、Google AdMob 和 RevenueCat。各供应商按照自己的条款和隐私文件处理数据。当前代码没有规定供应商各自的保存期限；这些细节需要 Owner 审核。'] },
        { heading: '分析、错误报告、广告与同意', paragraphs: ['Firebase Analytics、Crashlytics、Performance Monitoring、Remote Config 和 Cloud Messaging 是可选集成。数据收集受 App 同意控制器管理；在同意状态确定前会禁用分析收集，同意变化也可以撤销收集。', '在 EEA，Google User Messaging Platform（UMP）同意控制广告是否可用。在 iOS，必要时会在 UMP 后请求 App Tracking Transparency。Google AdMob 只会在 App 获得可投放广告的同意状态后显示广告；个性化广告仅在获得必要同意后使用。'], bullets: ['当 App 提供相关隐私选项时，您可以拒绝或更改同意，也可以在设备设置中控制通知和跟踪权限。', 'Firebase、AdMob、Apple、Google、Meta 与 RevenueCat 的精确数据类别和保存期限并未固定在 App 源码中，发布前必须确认。'] },
        { heading: '保存与删除', paragraphs: ['账户仍处于活动状态时，API 会保存提供上述功能所需的账户和玩家数据。云端存档实现保留最近十个版本。访问令牌有效 15 分钟；服务器会话和轮换刷新令牌创建时效为 30 天，过期会话由维护任务清理。', '账户删除成功后，API 会删除玩家行及其级联数据，包括身份、设备、会话、存档、分数、邀请、好友、奖励、礼物、事件、活动、购买记录、反欺诈记录和推送令牌。已完成的删除请求记录会作为运营证据保留，但会清除玩家引用；管理员审计行会匿名化，不保留玩家快照。', '源代码没有为供应商保存的遥测、广告、购买、通知或请求日志数据规定独立期限。需要 Owner 审核以确认这些期限和法律要求的例外。'] },
        { heading: '儿童与您的权利', paragraphs: ['Number RPG 不面向 13 岁以下儿童，我们也不会明知而邀请 13 岁以下儿童创建账户。如果您认为儿童提供了个人数据，请联系 admin@dappgo.com。', '您可以通过 admin@dappgo.com 请求访问、导出、更正、删除数据，或询问同意选择。API 也提供需认证的数据导出路径。为保护账户和其他玩家，我们可能需要验证请求。'] },
        { heading: '变更与联系', paragraphs: ['当 App、API、供应商或法律要求发生变化时，我们可能更新本政策。页首的生效日期标识当前版本。隐私问题或请求请发送至 admin@dappgo.com。'] },
      ],
    },
    terms: {
      kicker: 'Number RPG · 条款', title: '服务条款', product: 'DappGo 的 Number RPG', effective: '生效日期：2026-10-27',
      summary: '本条款说明使用 Number RPG 的规则，包括访客游玩、可选账户、虚拟物品、购买、公平游戏和账户终止。',
      sections: [
        { heading: '1. 接受条款', paragraphs: ['安装、访问或使用 Number RPG，即表示您同意本服务条款和 Number RPG 隐私政策。如果不同意，请勿使用游戏。'] },
        { heading: '2. 服务与账户', paragraphs: ['Number RPG 是由 DappGo 运营的手机游戏。您可以访客身份游玩。可选的 Apple、Google 或 Facebook 登录支持云端存档、社交功能、排行榜和购买恢复。请保护设备、登录凭证和恢复信息。'] },
        { heading: '3. 虚拟物品与购买', paragraphs: ['游戏可能提供虚拟货币、生命、装饰、升级或其他数字权益。它们没有现金价值，只授权在游戏中使用，不得在游戏外出售、转让或兑换。服务或游戏规则变化时，可用性和余额可能变化。', '购买通过 Apple App Store 或 Google Play 计费。退款、取消和付款争议应向处理交易的商店提出，并受该商店规则约束。RevenueCat 协助记录和恢复购买权益。删除 Number RPG 账户会删除游戏数据；符合条件的商店购买可能仍可通过商店账户恢复。'] },
        { heading: '4. 公平游戏与可接受使用', paragraphs: ['请勿作弊、利用漏洞、自动化游玩、操纵分数或奖励、滥用邀请或礼物系统、冒充他人、干扰 API 或服务，或利用游戏伤害他人。请勿提交违法、辱骂、仇恨或侵犯他人权利的内容或显示名称。'] },
        { heading: '5. 执行与终止', paragraphs: ['如果 DappGo 合理认为账户或设备存在作弊、滥用、欺诈、安全风险或违反本条款，DappGo 可以限制、暂停或终止访问，也可以更改、暂停或停止服务的一部分。您可以从设置 → 删除账户，或按照账户删除页面说明删除账户。'] },
        { heading: '6. 免责声明与限制', paragraphs: ['在法律允许的范围内，游戏按可用状态提供，不保证不中断、无错误或永久保存每项物品和存档。DappGo 不对由设备、网络、应用商店、第三方供应商或合理控制范围外事件造成的故障负责。本条款不限制法律上不能限制的权利。'] },
        { heading: '7. 准据法与管辖', paragraphs: ['本条款受美国加利福尼亚州法律管辖，不适用其法律冲突规则。专属管辖地为位于加利福尼亚州洛杉矶县的州法院或联邦法院。本条款不限制您居住国家法律赋予您的强制性消费者权利。'] },
        { heading: '8. 联系', paragraphs: ['条款问题请发送至 admin@dappgo.com。'] },
      ],
    },
    deleteAccount: {
      kicker: 'Number RPG · 删除账户', title: '删除您的账户', product: 'DappGo 的 Number RPG', effective: '说明生效日期：2026-10-27',
      summary: '您可以在 App 内或通过电子邮件请求删除。App 内流程是删除 Number RPG 账户及玩家数据最快的方式。',
      sections: [
        { heading: '在 App 内删除', paragraphs: ['打开 Number RPG，前往设置 → 删除账户。阅读确认消息并确认删除，保持 App 在线直到显示成功。如果已关联 Apple 身份，完成删除前 App／API 可能要求 Apple 重新授权。'] },
        { heading: '通过电子邮件请求删除', paragraphs: ['发送邮件至 admin@dappgo.com，请求删除您的 Number RPG 账户。请提供足以识别账户的信息，例如游戏内显示名称和可取得的账户 ID。不要发送密码、供应商访问令牌或 Apple 私钥。我们可能在处理邮件请求前要求验证。'] },
        { heading: 'API 会删除什么', paragraphs: ['成功删除会移除玩家账户及 API 关联的玩家数据：供应商身份、设备与会话、云端存档、分数、邀请、好友、礼物、奖励、事件、活动、购买记录、反欺诈记录和推送令牌。App 会重置本地游戏进度。Apple 或 Google 处理的商店购买，在商店和权益允许时仍可恢复。'] },
        { heading: '需要多长时间', paragraphs: ['当前 DELETE /me 实现会创建删除请求、执行必要的 Apple 撤销、删除玩家数据、将请求标记为完成，并在同一次服务器操作中返回成功。成功的 App 内请求没有代码定义的等待期。网络故障或需要 Apple 重新授权时可能无法完成，必须重试。', '已完成的删除请求会保留请求和完成时间，但清除玩家引用；相关管理员审计项会匿名化。代码没有为人工验证的电子邮件请求定义期限；该流程需要 Owner 审核。'] },
        { heading: '需要帮助？', paragraphs: ['如果 App 内流程失败、无法访问账户，或想询问电子邮件请求，请联系 admin@dappgo.com。'] },
      ],
    },
  },
  ja: {
    privacy: {
      kicker: 'Number RPG · プライバシー', title: 'プライバシーポリシー', product: 'DappGo の Number RPG', effective: '発効日：2026-10-27',
      summary: 'Number RPG はゲストとして遊べます。サインインは任意で、アカウントに紐づくクラウドセーブと端末間の復元を利用できます。本ページは現在のアプリと API の実装に基づきます。',
      sections: [
        { heading: '運営者', paragraphs: ['Number RPG は DappGo が運営します。本ポリシーやデータについては admin@dappgo.com までご連絡ください。'] },
        { heading: 'アカウントとサインイン', paragraphs: ['ゲストとして遊ぶことも、Apple、Google、Facebook のいずれかで任意にサインインすることもできます。iOS の Facebook サインインは Meta Limited Login を使用します。Number RPG API はプロバイダーの認証情報を検証しますが、プロバイダーのアクセストークンは保存しません。', 'ゲストセッションは端末に関連付けられ、その端末に進行状況を保持できます。プロバイダーを連携するとサーバーアカウントが維持され、クラウドセーブ、ランキング、購入の復元、端末間の復元が利用できます。'], bullets: ['アカウント ID、表示名、国、リーダーペットなどのプロフィール情報。', 'Apple、Google、Facebook のプロバイダー名と subject ID。メールアドレスはプロバイダーから提供された場合のみ。'] },
        { heading: '処理するデータ', paragraphs: ['利用する機能に応じて、アプリと data.dappgo.com は次のデータを処理することがあります。'], bullets: ['クラウドセーブ、ゲーム進行、スコア、ランキング投稿、ゲームイベント。', '招待コード、招待の有効化と不正防止の記録、フレンド、ギフト、報酬、関連アクティビティ。', '権利の付与や復元に使う RevenueCat 経由の購入記録（商品、取引、ストア、環境、購入時刻など）。', 'アカウントセッションと不正防止のためにサーバー側でハッシュ化した端末識別子、および通知を有効にした場合のプッシュトークン。', '対応する機能に使う Firebase Analytics、Crashlytics、Performance Monitoring、Remote Config、Cloud Messaging のデータ。'] },
        { heading: '利用と共有', paragraphs: ['DappGo はゲームの提供、進行の保存と復元、ランキングとソーシャル機能、購入処理、不正や悪用の防止、アカウントの保護、依頼された通知の送信、サービスの維持にこの情報を使います。', 'アプリと API は、選択された機能に必要な Apple、Google、Meta／Facebook、Firebase、Google AdMob、RevenueCat などのプロバイダーと情報を共有します。各プロバイダーは独自の規約とプライバシー文書に従って処理します。ベンダーごとの保存期間は現在のコードに定められておらず、公開前に Owner の確認が必要です。'] },
        { heading: '分析、クラッシュ、広告、同意', paragraphs: ['Firebase Analytics、Crashlytics、Performance Monitoring、Remote Config、Cloud Messaging は任意の連携です。収集はアプリの同意コントローラーで制御され、同意が確定する前は分析収集を無効にし、同意の変更で収集を取り消せます。', 'EEA では Google User Messaging Platform（UMP）の同意が広告利用可能状態を制御します。iOS では必要な場合、UMP の後に App Tracking Transparency を求めます。Google AdMob は広告利用可能な同意状態になった後にのみ広告を表示し、パーソナライズド広告は必要な同意がある場合にのみ使用します。'], bullets: ['アプリに表示されるプライバシー設定で同意を拒否・変更できます。通知とトラッキングの権限は端末設定でも管理できます。', 'Firebase、AdMob、Apple、Google、Meta、RevenueCat の正確なデータ種別と保存期間はアプリソースに固定されておらず、公開前に確認が必要です。'] },
        { heading: '保存と削除', paragraphs: ['アカウントが有効な間、API は上記機能に必要なアカウントとプレイヤーの記録を保存します。クラウドセーブは最新 10 バージョンを保持します。アクセストークンは 15 分、サーバーセッションとローテーションするリフレッシュトークンは 30 日で作成され、期限切れのセッションはメンテナンス処理で削除されます。', 'アカウント削除が成功すると、API はプレイヤー行と、認証情報、端末、セッション、セーブ、スコア、招待、フレンド、報酬、ギフト、イベント、アクティビティ、購入記録、不正防止記録、プッシュトークンを含む関連データを削除します。完了した削除リクエストは運用証跡として残りますがプレイヤー参照は消去され、管理監査行は匿名化されます。', 'ベンダーが保持するテレメトリ、広告、購入、通知、リクエストログの別個の保存期間はソースコードに定義されていません。期間と法的例外は Owner の確認が必要です。'] },
        { heading: '子どもと権利', paragraphs: ['Number RPG は 13 歳未満の子どもを対象としておらず、故意にアカウント作成を勧めません。子どもが個人データを提供したと思われる場合は admin@dappgo.com までご連絡ください。', 'admin@dappgo.com に連絡して、アクセス、エクスポート、訂正、削除、同意の選択に関する情報を求めることができます。API には認証済みのデータエクスポート経路もあります。'] },
        { heading: '変更と連絡先', paragraphs: ['アプリ、API、プロバイダー、法的要件が変わった場合、このポリシーを更新することがあります。上部の日付が現在の版を示します。プライバシーに関する質問や依頼は admin@dappgo.com までお送りください。'] },
      ],
    },
    terms: {
      kicker: 'Number RPG · 利用規約', title: '利用規約', product: 'DappGo の Number RPG', effective: '発効日：2026-10-27',
      summary: '本規約は、ゲストプレイ、任意アカウント、バーチャルアイテム、購入、公正なプレイ、アカウント終了を含む Number RPG の利用ルールです。',
      sections: [
        { heading: '1. 同意', paragraphs: ['Number RPG をインストール、アクセス、利用することで、本利用規約と Number RPG プライバシーポリシーに同意したものとします。同意しない場合は利用しないでください。'] },
        { heading: '2. サービスとアカウント', paragraphs: ['Number RPG は DappGo が運営するモバイルゲームです。ゲストとして遊べます。任意の Apple、Google、Facebook サインインは、クラウドセーブ、ソーシャル機能、ランキング、購入復元を支えます。端末、認証情報、復元情報を安全に管理してください。'] },
        { heading: '3. バーチャルアイテムと購入', paragraphs: ['ゲームには仮想通貨、ライフ、アクセサリー、アップグレードなどのデジタル権利が含まれることがあります。現金価値はなく、ゲーム内利用のためのライセンスであり、ゲーム外で販売、譲渡、交換できません。', '購入は Apple App Store または Google Play の課金を通じて行います。返金、キャンセル、支払いの問題は取引を処理したストアの規則に従ってストアへ申し立ててください。RevenueCat は購入権利の記録と復元を補助します。アカウント削除でゲームデータは消えますが、対象となるストア購入は復元できる場合があります。'] },
        { heading: '4. 公正なプレイと許可される利用', paragraphs: ['不正行為、バグの悪用、自動化、スコアや報酬の操作、招待・ギフト制度の悪用、他人へのなりすまし、API やサービスへの干渉、他人を害する利用は禁止です。違法、虐待的、ヘイト、他人の権利を侵害するコンテンツや表示名も禁止します。'] },
        { heading: '5. 執行と終了', paragraphs: ['DappGo は、アカウントまたは端末が不正、悪用、詐欺、安全上の問題、規約違反に関係すると合理的に判断した場合、アクセスを制限、停止、終了できます。サービスの一部を変更、停止、終了することもあります。設定 → アカウント削除、または削除ページの手順で削除できます。'] },
        { heading: '6. 免責と制限', paragraphs: ['法律で認められる範囲で、ゲームは利用可能な状態で提供され、常時利用可能、エラーがない、すべてのアイテムやセーブを永久保存することを保証しません。端末、ネットワーク、ストア、第三者プロバイダー、合理的な支配を超える事由による障害について DappGo は責任を負いません。法律上制限できない権利を制限するものではありません。'] },
        { heading: '7. 準拠法と裁判地', paragraphs: ['本規約は、法の抵触に関する規則を除き、米国カリフォルニア州法に準拠します。専属的な裁判地は、カリフォルニア州ロサンゼルス郡に所在する州裁判所または連邦裁判所とします。これは、お住まいの国の法律に基づく強行的な消費者の権利を制限しません。'] },
        { heading: '8. 連絡先', paragraphs: ['本規約については admin@dappgo.com までご連絡ください。'] },
      ],
    },
    deleteAccount: {
      kicker: 'Number RPG · アカウント削除', title: 'アカウントを削除', product: 'DappGo の Number RPG', effective: '手順の発効日：2026-10-27',
      summary: 'アプリ内またはメールで削除を依頼できます。アプリ内の手順が、アカウントとプレイヤーデータを削除する最も速い方法です。',
      sections: [
        { heading: 'アプリ内で削除', paragraphs: ['Number RPG を開き、設定 → アカウント削除へ進みます。確認を読み、削除を確定し、成功が表示されるまでアプリをオンラインにしてください。Apple ID が連携されている場合、Apple の再認証が必要になることがあります。'] },
        { heading: 'メールで削除を依頼', paragraphs: ['admin@dappgo.com に Number RPG アカウントの削除を依頼するメールを送ってください。ゲーム内表示名や、分かる場合はアカウント ID など、アカウントを特定できる情報を含めてください。パスワード、プロバイダーのアクセストークン、Apple の秘密鍵は送らないでください。確認をお願いする場合があります。'] },
        { heading: 'API が削除するもの', paragraphs: ['成功すると、プロバイダーの ID、端末・セッション、クラウドセーブ、スコア、招待、フレンド、ギフト、報酬、イベント、アクティビティ、購入記録、不正防止記録、プッシュトークンなど、API がプレイヤーに紐づけたデータを削除します。アプリは端末上の進行をリセットします。ストア購入は条件により復元できます。'] },
        { heading: '所要時間', paragraphs: ['現在の DELETE /me は削除リクエストを作成し、必要な Apple の撤回を行い、プレイヤーデータを削除し、リクエストを完了として同じサーバー処理で成功を返します。成功するアプリ内依頼にコード上の待機期間はありません。通信障害や Apple 再認証が必要な場合は再試行が必要です。', '完了した削除リクエストは依頼・完了時刻を保持し、プレイヤー参照を消去します。関連する管理監査項目は匿名化されます。メール依頼の手動確認について、コードは別の期限を定めていないため、手順は Owner の確認が必要です。'] },
        { heading: 'サポート', paragraphs: ['アプリ内手順が失敗した場合、アカウントにアクセスできない場合、メール依頼について質問がある場合は admin@dappgo.com へご連絡ください。'] },
      ],
    },
  },
  ko: {
    privacy: {
      kicker: 'Number RPG · 개인정보', title: '개인정보 처리방침', product: 'DappGo의 Number RPG', effective: '시행일: 2026-10-27',
      summary: 'Number RPG는 게스트로 플레이할 수 있습니다. 로그인은 선택 사항이며, 계정 기반 클라우드 저장과 기기 간 복구를 제공합니다. 이 페이지는 현재 앱과 API 구현을 설명합니다.',
      sections: [
        { heading: '운영 주체', paragraphs: ['Number RPG는 DappGo가 운영합니다. 이 방침이나 데이터에 관한 질문은 admin@dappgo.com으로 보내 주세요.'] },
        { heading: '계정과 로그인', paragraphs: ['게스트로 플레이하거나 Apple, Google, Facebook으로 선택적으로 로그인할 수 있습니다. iOS의 Facebook 로그인은 Meta Limited Login을 사용합니다. Number RPG API는 공급자 자격 증명을 검증하지만 공급자 액세스 토큰은 저장하지 않습니다.', '게스트 세션은 기기와 연결되어 기기에 진행 상황을 보관할 수 있습니다. 공급자를 연결하면 서버 계정이 유지되고 클라우드 저장, 순위표, 구매 복원, 기기 간 복구가 가능합니다.'], bullets: ['계정 ID와 표시 이름, 국가, 리더 펫 같은 프로필 정보.', 'Apple, Google 또는 Facebook의 공급자 이름과 subject ID. 이메일 주소는 공급자가 제공한 경우에만 처리됩니다.'] },
        { heading: '처리하는 데이터', paragraphs: ['사용하는 기능에 따라 앱과 data.dappgo.com은 다음 데이터를 처리할 수 있습니다.'], bullets: ['클라우드 저장, 게임 진행, 점수, 순위표 제출, 게임 이벤트.', '초대 코드, 초대 활성화 및 사기 방지 기록, 친구, 선물, 보상과 관련 활동.', '권한 부여 또는 복원에 사용하는 RevenueCat 구매 기록(상품, 거래, 스토어, 환경, 구매 시각 등).', '계정 세션과 사기 방지를 위해 서버에서 해시한 기기 식별자와 알림을 켠 경우의 푸시 토큰.', '해당 기능에 사용하는 Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config, Cloud Messaging 데이터.'] },
        { heading: '이용 및 공유', paragraphs: ['DappGo는 게임 제공, 진행 저장과 복구, 순위표와 소셜 기능 운영, 구매 처리, 부정행위와 남용 방지, 계정 보안, 요청한 알림 전송, 서비스 유지에 이 정보를 사용합니다.', '앱과 API는 선택한 기능에 필요한 Apple, Google, Meta／Facebook, Firebase, Google AdMob, RevenueCat 등의 공급자와 정보를 공유합니다. 각 공급자는 자체 약관과 개인정보 문서에 따라 처리합니다. 공급자별 보관 기간은 현재 코드에 정해져 있지 않아 출시 전에 Owner 확인이 필요합니다.'] },
        { heading: '분석, 충돌 보고, 광고 및 동의', paragraphs: ['Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config, Cloud Messaging은 선택적 연동입니다. 수집은 앱 동의 컨트롤러가 관리하며 동의가 확인되기 전에는 분석 수집을 끄고, 동의 변경으로 수집을 철회할 수 있습니다.', 'EEA에서는 Google User Messaging Platform(UMP) 동의가 광고 준비 상태를 제어합니다. iOS에서는 필요한 경우 UMP 후 App Tracking Transparency를 요청합니다. Google AdMob 광고는 광고 준비 동의 상태 이후에만 표시될 수 있으며 개인 맞춤 광고는 필요한 동의가 있을 때만 사용합니다.'], bullets: ['앱에 표시되는 개인정보 옵션에서 동의를 거부하거나 변경할 수 있고, 기기 설정에서 알림과 추적 권한을 관리할 수 있습니다.', 'Firebase, AdMob, Apple, Google, Meta, RevenueCat의 정확한 데이터 범주와 보관 기간은 앱 소스에 고정되어 있지 않으므로 출시 전에 확인해야 합니다.'] },
        { heading: '보관 및 삭제', paragraphs: ['계정이 활성 상태인 동안 API는 위 기능에 필요한 계정 및 플레이어 기록을 보관합니다. 클라우드 저장은 최신 10개 버전을 유지합니다. 액세스 토큰은 15분, 서버 세션과 교체형 리프레시 토큰은 30일로 생성되며 만료 세션은 유지 관리 작업에서 삭제됩니다.', '계정 삭제가 완료되면 API는 플레이어 행과 연결된 신원, 기기, 세션, 저장, 점수, 초대, 친구, 보상, 선물, 이벤트, 활동, 구매 기록, 사기 방지 기록, 푸시 토큰을 삭제합니다. 완료된 삭제 요청 기록은 운영 증거로 남지만 플레이어 참조는 제거되고 관리자 감사 행은 익명화됩니다.', '공급자가 보관하는 텔레메트리, 광고, 구매, 알림 또는 요청 로그의 별도 보관 기간은 소스 코드에 정의되어 있지 않습니다. 기간과 법적 예외는 Owner 확인이 필요합니다.'] },
        { heading: '아동 및 권리', paragraphs: ['Number RPG는 13세 미만 아동을 대상으로 하지 않으며, 의도적으로 13세 미만의 계정 생성을 유도하지 않습니다. 아동이 개인정보를 제공했다고 생각되면 admin@dappgo.com으로 연락해 주세요.', 'admin@dappgo.com으로 접근, 내보내기, 수정, 삭제 또는 동의 선택에 관한 요청을 할 수 있습니다. API에는 인증된 데이터 내보내기 경로도 있습니다. 계정과 다른 플레이어를 보호하기 위해 요청을 확인할 수 있습니다.'] },
        { heading: '변경 및 연락처', paragraphs: ['앱, API, 공급자 또는 법적 요구가 바뀌면 이 방침을 업데이트할 수 있습니다. 위 날짜가 현재 버전을 나타냅니다. 개인정보 질문이나 요청은 admin@dappgo.com으로 보내 주세요.'] },
      ],
    },
    terms: {
      kicker: 'Number RPG · 약관', title: '서비스 이용약관', product: 'DappGo의 Number RPG', effective: '시행일: 2026-10-27',
      summary: '이 약관은 게스트 플레이, 선택적 계정, 가상 아이템, 구매, 공정한 플레이와 계정 종료를 포함한 Number RPG 이용 규칙입니다.',
      sections: [
        { heading: '1. 약관 동의', paragraphs: ['Number RPG를 설치, 접속 또는 사용하면 이 약관과 Number RPG 개인정보 처리방침에 동의하는 것입니다. 동의하지 않으면 게임을 사용하지 마세요.'] },
        { heading: '2. 서비스와 계정', paragraphs: ['Number RPG는 DappGo가 운영하는 모바일 게임입니다. 게스트로 플레이할 수 있습니다. 선택적 Apple, Google, Facebook 로그인은 클라우드 저장, 소셜 기능, 순위표와 구매 복원을 지원합니다. 기기와 로그인 및 복구 정보를 안전하게 관리하세요.'] },
        { heading: '3. 가상 아이템과 구매', paragraphs: ['게임에는 가상 화폐, 생명, 장식, 업그레이드 또는 기타 디지털 권한이 제공될 수 있습니다. 현금 가치가 없고 게임 안에서만 사용할 수 있으며 게임 밖에서 판매, 이전 또는 교환할 수 없습니다. 서비스나 게임 규칙에 따라 이용 가능성과 잔액이 바뀔 수 있습니다.', '구매는 Apple App Store 또는 Google Play 결제를 통해 이루어집니다. 환불, 취소와 결제 분쟁은 거래를 처리한 스토어의 규칙에 따라 해당 스토어에 요청해야 합니다. RevenueCat은 구매 권한 기록과 복원을 돕습니다. 계정 삭제 시 게임 데이터는 삭제되지만, 해당 스토어 구매는 복원될 수 있습니다.'] },
        { heading: '4. 공정한 플레이와 허용된 사용', paragraphs: ['치팅, 버그 악용, 자동화 플레이, 점수나 보상 조작, 초대나 선물 시스템 악용, 사칭, API나 서비스 방해, 타인에게 해를 끼치는 이용을 하지 마세요. 불법적이거나 모욕적이거나 혐오적이거나 다른 사람의 권리를 침해하는 콘텐츠와 표시 이름도 금지됩니다.'] },
        { heading: '5. 조치와 종료', paragraphs: ['DappGo는 계정이나 기기가 치팅, 남용, 사기, 보안 위험 또는 약관 위반과 관련 있다고 합리적으로 판단하면 이용을 제한, 정지 또는 종료할 수 있습니다. 서비스 일부를 변경, 일시 중지 또는 종료할 수도 있습니다. 설정 → 계정 삭제 또는 계정 삭제 페이지의 안내를 이용하세요.'] },
        { heading: '6. 면책과 제한', paragraphs: ['법이 허용하는 범위에서 게임은 이용 가능한 상태로 제공되며 중단이나 오류가 없거나 모든 아이템과 저장을 영구 보존한다고 보장하지 않습니다. 기기, 네트워크, 스토어, 제3자 공급자 또는 합리적 통제를 벗어난 사건으로 인한 장애에 대해 DappGo는 책임지지 않습니다. 법적으로 제한할 수 없는 권리를 제한하지 않습니다.'] },
        { heading: '7. 준거법과 관할', paragraphs: ['이 약관은 법률 충돌 규칙을 제외하고 미국 캘리포니아주 법률의 적용을 받습니다. 전속 관할은 캘리포니아주 로스앤젤레스 카운티에 있는 주 법원 또는 연방 법원입니다. 이는 귀하가 거주하는 국가의 법률에 따른 강행적 소비자 권리를 제한하지 않습니다.'] },
        { heading: '8. 연락처', paragraphs: ['약관 질문은 admin@dappgo.com으로 보내 주세요.'] },
      ],
    },
    deleteAccount: {
      kicker: 'Number RPG · 계정 삭제', title: '계정 삭제', product: 'DappGo의 Number RPG', effective: '안내 시행일: 2026-10-27',
      summary: '앱 안에서 또는 이메일로 삭제를 요청할 수 있습니다. 앱 내 절차가 계정과 플레이어 데이터를 삭제하는 가장 빠른 방법입니다.',
      sections: [
        { heading: '앱에서 삭제', paragraphs: ['Number RPG를 열고 설정 → 계정 삭제로 이동하세요. 확인 내용을 읽고 삭제를 확인한 뒤 성공 메시지가 표시될 때까지 앱을 온라인 상태로 유지하세요. Apple 신원이 연결된 경우 삭제를 완료하려면 Apple 재인증이 필요할 수 있습니다.'] },
        { heading: '이메일로 요청', paragraphs: ['admin@dappgo.com으로 Number RPG 계정 삭제를 요청하세요. 게임 내 표시 이름과 가능한 경우 계정 ID 등 계정을 식별할 수 있는 정보를 포함하세요. 비밀번호, 공급자 액세스 토큰 또는 Apple 개인 키는 보내지 마세요. 이메일 요청을 처리하기 전에 확인을 요청할 수 있습니다.'] },
        { heading: 'API가 삭제하는 데이터', paragraphs: ['성공하면 공급자 신원, 기기와 세션, 클라우드 저장, 점수, 초대, 친구, 선물, 보상, 이벤트, 활동, 구매 기록, 사기 방지 기록, 푸시 토큰 등 API가 플레이어에 연결한 데이터를 삭제합니다. 앱은 기기의 게임 진행을 재설정합니다. Apple 또는 Google의 스토어 구매는 조건에 따라 복원될 수 있습니다.'] },
        { heading: '처리 시간', paragraphs: ['현재 DELETE /me 구현은 삭제 요청을 만들고, 필요한 Apple 철회를 수행하고, 플레이어 데이터를 삭제하고, 요청을 완료로 표시한 뒤 같은 서버 작업에서 성공을 반환합니다. 성공한 앱 내 요청에는 코드에 정의된 대기 기간이 없습니다. 네트워크 오류나 Apple 재인증이 필요하면 다시 시도해야 합니다.', '완료된 삭제 요청은 요청 및 완료 시각을 보관하지만 플레이어 참조는 제거합니다. 관련 관리자 감사 항목은 익명화됩니다. 수동으로 확인하는 이메일 요청의 별도 기한은 코드에 없으므로 Owner 확인이 필요합니다.'] },
        { heading: '도움이 필요하신가요?', paragraphs: ['앱 내 절차가 실패하거나 계정에 접근할 수 없거나 이메일 요청에 대해 질문이 있으면 admin@dappgo.com으로 연락해 주세요.'] },
      ],
    },
  },
  es: {
    privacy: {
      kicker: 'Number RPG · privacidad', title: 'Política de privacidad', product: 'Number RPG de DappGo', effective: 'Fecha de vigencia: 2026-10-27',
      summary: 'Number RPG permite jugar como invitado. Iniciar sesión es opcional y añade guardado en la nube vinculado a una cuenta y recuperación entre dispositivos. Esta página describe la implementación actual de la app y la API.',
      sections: [
        { heading: 'Quiénes somos', paragraphs: ['Number RPG es operado por DappGo. Las preguntas sobre esta política o sus datos pueden enviarse a admin@dappgo.com.'] },
        { heading: 'Cuentas e inicio de sesión', paragraphs: ['Puede jugar como invitado o iniciar sesión opcionalmente con Apple, Google o Facebook. En iOS, el inicio de sesión de Facebook usa Meta Limited Login. La API de Number RPG verifica las credenciales del proveedor y no almacena tokens de acceso del proveedor.', 'La sesión de invitado se vincula a un dispositivo y puede conservar el progreso en él. Al vincular un proveedor se conserva la cuenta del servidor y se habilitan el guardado en la nube, las clasificaciones, la restauración de compras y la recuperación entre dispositivos.'], bullets: ['ID de cuenta e información del perfil, como nombre visible, país y mascota líder.', 'Nombre y subject ID del proveedor de Apple, Google o Facebook; correo electrónico solo si el proveedor lo facilita.'] },
        { heading: 'Datos que procesamos', paragraphs: ['Según las funciones que utilice, la app y data.dappgo.com pueden procesar:'], bullets: ['Guardados en la nube, progreso, puntuaciones, envíos a clasificaciones y eventos de juego.', 'Códigos de invitación, activación de invitaciones y registros antifraude, amigos, regalos, recompensas y actividad relacionada.', 'Registros de compras recibidos mediante RevenueCat, como producto, transacción, tienda, entorno y momento de compra, para conceder o restaurar derechos.', 'Un identificador de dispositivo representado por un hash del servidor para sesiones y antifraude, además de tokens de notificaciones cuando se activan.', 'Datos de Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config y Cloud Messaging usados por sus funciones.'] },
        { heading: 'Uso y divulgación', paragraphs: ['DappGo usa esta información para prestar el juego, guardar y restaurar el progreso, operar clasificaciones y funciones sociales, procesar compras, evitar trampas y abusos, proteger cuentas, enviar notificaciones solicitadas y mantener el servicio.', 'La app y la API comparten la información necesaria con Apple, Google, Meta/Facebook, Firebase, Google AdMob y RevenueCat. Cada proveedor puede tratar datos según sus propios términos y documentos de privacidad. El código actual no fija los periodos de conservación específicos de los proveedores; deben confirmarse con el Owner.'] },
        { heading: 'Analítica, fallos, anuncios y consentimiento', paragraphs: ['Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config y Cloud Messaging son integraciones opcionales. La recopilación está controlada por el sistema de consentimiento de la app; la analítica se desactiva antes de resolver el consentimiento y un cambio puede revocarla.', 'En el EEE, el consentimiento de Google User Messaging Platform (UMP) controla si los anuncios están listos. En iOS, cuando corresponde, se solicita App Tracking Transparency después de UMP. Google AdMob solo puede mostrar anuncios después de un estado de consentimiento apto; los anuncios personalizados se usan únicamente con el consentimiento requerido.'], bullets: ['Puede rechazar o cambiar el consentimiento cuando la app muestre las opciones de privacidad y controlar notificaciones y seguimiento en los ajustes del dispositivo.', 'Las categorías exactas y los periodos de conservación de Firebase, AdMob, Apple, Google, Meta y RevenueCat no están fijados en el código de la app y deben confirmarse antes de publicar.'] },
        { heading: 'Conservación y eliminación', paragraphs: ['Mientras una cuenta esté activa, la API conserva la cuenta y los registros del jugador necesarios para las funciones anteriores. El guardado en la nube conserva las diez versiones más recientes. Los tokens de acceso duran 15 minutos; las sesiones del servidor y los tokens de actualización rotatorios se crean por 30 días, y el mantenimiento elimina las sesiones vencidas.', 'Cuando la eliminación tiene éxito, la API elimina el jugador y sus datos asociados, incluidos identidades, dispositivos, sesiones, guardados, puntuaciones, invitaciones, amistades, recompensas, regalos, eventos, actividad, compras, registros antifraude y tokens de notificaciones. Se conserva un registro de solicitud completada para la operación, sin la referencia al jugador; las filas de auditoría se anonimizan.', 'El código no define un periodo separado para la telemetría, anuncios, compras, notificaciones o registros de solicitudes conservados por proveedores. Los periodos y excepciones legales requieren revisión del Owner.'] },
        { heading: 'Menores y derechos', paragraphs: ['Number RPG no está dirigido a menores de 13 años y no los invita conscientemente a crear una cuenta. Si cree que un menor proporcionó datos personales, contacte con admin@dappgo.com.', 'Puede solicitar acceso, exportación, corrección, eliminación o información sobre el consentimiento escribiendo a admin@dappgo.com. La API también tiene una ruta autenticada de exportación de datos. Podemos verificar las solicitudes para proteger las cuentas y a otros jugadores.'] },
        { heading: 'Cambios y contacto', paragraphs: ['Podemos actualizar esta política cuando cambien la app, la API, los proveedores o las obligaciones legales. La fecha de arriba identifica la versión vigente. Para preguntas o solicitudes de privacidad, escriba a admin@dappgo.com.'] },
      ],
    },
    terms: {
      kicker: 'Number RPG · términos', title: 'Términos del servicio', product: 'Number RPG de DappGo', effective: 'Fecha de vigencia: 2026-10-27',
      summary: 'Estos términos establecen las reglas para usar Number RPG, incluido el juego como invitado, las cuentas opcionales, los objetos virtuales, las compras, el juego limpio y la terminación.',
      sections: [
        { heading: '1. Aceptación', paragraphs: ['Al instalar, acceder o usar Number RPG, acepta estos Términos del servicio y la Política de privacidad de Number RPG. Si no está de acuerdo, no use el juego.'] },
        { heading: '2. Servicio y cuentas', paragraphs: ['Number RPG es un juego móvil operado por DappGo. Puede jugar como invitado. El inicio de sesión opcional con Apple, Google o Facebook permite guardado en la nube, funciones sociales, clasificaciones y restauración de compras. Mantenga seguros su dispositivo, credenciales e información de recuperación.'] },
        { heading: '3. Objetos virtuales y compras', paragraphs: ['El juego puede ofrecer moneda virtual, vidas, accesorios, mejoras u otros derechos digitales. No tienen valor monetario, se licencian para el juego y no pueden venderse, transferirse ni canjearse fuera de él. La disponibilidad y los saldos pueden cambiar con el servicio o sus reglas.', 'Las compras se realizan mediante Apple App Store o Google Play. Las solicitudes de reembolso, cancelación o disputas de pago deben dirigirse a la tienda que procesó la transacción y seguir sus reglas. RevenueCat ayuda a registrar y restaurar derechos. Al eliminar la cuenta se eliminan los datos del juego; las compras elegibles pueden seguir siendo restaurables mediante la cuenta de la tienda.'] },
        { heading: '4. Juego limpio y uso aceptable', paragraphs: ['No haga trampas, explote errores, automatice el juego, manipule puntuaciones o recompensas, abuse de invitaciones o regalos, suplante a otra persona, interfiera con la API o el servicio, ni use el juego para dañar a alguien. No envíe contenido o nombres visibles ilegales, abusivos, de odio o que infrinjan derechos.'] },
        { heading: '5. Medidas y terminación', paragraphs: ['DappGo puede limitar, suspender o terminar el acceso cuando razonablemente crea que una cuenta o dispositivo participa en trampas, abuso, fraude, riesgos de seguridad o incumplimiento. También puede cambiar, pausar o discontinuar partes del servicio. Puede eliminar la cuenta desde Ajustes → Eliminar cuenta o siguiendo la página de eliminación.'] },
        { heading: '6. Exenciones y límites', paragraphs: ['En la medida permitida por la ley, el juego se proporciona tal como está disponible y sin promesas de funcionamiento ininterrumpido, sin errores o de conservación permanente de cada objeto o guardado. DappGo no responde por fallos causados por su dispositivo, red, tienda, proveedor externo o hechos fuera de un control razonable. Nada limita derechos que legalmente no puedan limitarse.'] },
        { heading: '7. Ley aplicable y jurisdicción', paragraphs: ['Estos Términos se rigen por las leyes del estado de California, Estados Unidos, sin tener en cuenta sus normas sobre conflicto de leyes. La jurisdicción exclusiva corresponde a los tribunales estatales o federales situados en el condado de Los Ángeles, California. Esto no limita los derechos obligatorios de los consumidores del país donde resides.'] },
        { heading: '8. Contacto', paragraphs: ['Las preguntas sobre estos términos pueden enviarse a admin@dappgo.com.'] },
      ],
    },
    deleteAccount: {
      kicker: 'Number RPG · eliminar cuenta', title: 'Eliminar su cuenta', product: 'Number RPG de DappGo', effective: 'Instrucciones vigentes: 2026-10-27',
      summary: 'Puede solicitar la eliminación dentro de la app o por correo electrónico. El flujo dentro de la app es la forma más rápida de eliminar la cuenta y los datos del jugador.',
      sections: [
        { heading: 'Eliminar desde la app', paragraphs: ['Abra Number RPG y vaya a Ajustes → Eliminar cuenta. Lea la confirmación, confirme y mantenga la app conectada hasta que informe de éxito. Si hay una identidad de Apple vinculada, la app o la API pueden requerir una nueva autorización de Apple.'] },
        { heading: 'Solicitar por correo', paragraphs: ['Escriba a admin@dappgo.com para pedir que se elimine su cuenta de Number RPG. Incluya información suficiente para identificarla, como el nombre visible y el ID de cuenta si está disponible. No envíe contraseñas, tokens del proveedor ni claves privadas de Apple. Podemos solicitar verificación.'] },
        { heading: 'Qué elimina la API', paragraphs: ['Una eliminación correcta elimina la cuenta y los datos asociados: identidades, dispositivos y sesiones, guardados en la nube, puntuaciones, invitaciones, amistades, regalos, recompensas, eventos, actividad, compras, registros antifraude y tokens de notificaciones. La app restablece el progreso local. Las compras de Apple o Google pueden seguir siendo restaurables si la tienda y el derecho lo permiten.'] },
        { heading: 'Cuánto tarda', paragraphs: ['La implementación actual de DELETE /me crea la solicitud, realiza la revocación de Apple que corresponda, elimina los datos, marca la solicitud como completada y devuelve éxito en la misma operación del servidor. No hay un periodo de espera definido en el código para una solicitud correcta dentro de la app. Un fallo de red o una nueva autorización de Apple exige reintentar.', 'La solicitud completada conserva las horas de solicitud y finalización, pero elimina la referencia al jugador; las auditorías relacionadas se anonimizan. El código no define un plazo separado para una solicitud por correo verificada manualmente; el procedimiento requiere revisión del Owner.'] },
        { heading: '¿Necesita ayuda?', paragraphs: ['Contacte con admin@dappgo.com si falla el flujo, no puede acceder a la cuenta o necesita preguntar por una solicitud de correo.'] },
      ],
    },
  },
  fr: {
    privacy: {
      kicker: 'Number RPG · confidentialité', title: 'Politique de confidentialité', product: 'Number RPG par DappGo', effective: 'Date d’effet : 2026-10-27',
      summary: 'Number RPG permet de jouer en tant qu’invité. La connexion est facultative et ajoute une sauvegarde cloud liée au compte ainsi que la récupération entre appareils. Cette page décrit l’implémentation actuelle de l’app et de l’API.',
      sections: [
        { heading: 'Qui sommes-nous ?', paragraphs: ['Number RPG est exploité par DappGo. Les questions relatives à cette politique ou à vos données peuvent être envoyées à admin@dappgo.com.'] },
        { heading: 'Comptes et connexion', paragraphs: ['Vous pouvez jouer en invité ou vous connecter facultativement avec Apple, Google ou Facebook. Sur iOS, la connexion Facebook utilise Meta Limited Login. L’API Number RPG vérifie les identifiants du fournisseur et ne conserve pas les jetons d’accès du fournisseur.', 'La session invité est associée à un appareil et peut y conserver la progression. La liaison d’un fournisseur conserve le compte serveur et active la sauvegarde cloud, les classements, la restauration des achats et la récupération entre appareils.'], bullets: ['ID de compte et profil : nom affiché, pays et familier chef, par exemple.', 'Nom du fournisseur et subject ID Apple, Google ou Facebook ; adresse e-mail uniquement si le fournisseur la transmet.'] },
        { heading: 'Données traitées', paragraphs: ['Selon les fonctions utilisées, l’app et data.dappgo.com peuvent traiter :'], bullets: ['Sauvegardes cloud, progression, scores, soumissions aux classements et événements de jeu.', 'Codes d’invitation, activation des invitations et données antifraude, amis, cadeaux, récompenses et activité associée.', 'Données d’achat reçues via RevenueCat, notamment produit, transaction, boutique, environnement et moment de l’achat, pour accorder ou restaurer les droits.', 'Un identifiant d’appareil représenté par un hachage serveur pour les sessions et l’antifraude, ainsi que les jetons push lorsque les notifications sont activées.', 'Données de Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config et Cloud Messaging utilisées par les fonctions correspondantes.'] },
        { heading: 'Utilisation et partage', paragraphs: ['DappGo utilise ces informations pour fournir le jeu, sauvegarder et restaurer la progression, exploiter les classements et fonctions sociales, traiter les achats, empêcher la triche et les abus, sécuriser les comptes, envoyer les notifications demandées et maintenir le service.', 'L’app et l’API partagent les informations nécessaires avec Apple, Google, Meta/Facebook, Firebase, Google AdMob et RevenueCat. Chaque fournisseur peut traiter les données selon ses propres conditions et documents de confidentialité. Le code actuel ne fixe pas les durées de conservation propres aux fournisseurs ; elles doivent être confirmées par l’Owner.'] },
        { heading: 'Analytique, rapports d’erreur, publicités et consentement', paragraphs: ['Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config et Cloud Messaging sont des intégrations facultatives. La collecte est contrôlée par le système de consentement de l’app ; l’analytique est désactivée avant la résolution du consentement et un changement peut révoquer la collecte.', 'Dans l’EEE, le consentement Google User Messaging Platform (UMP) contrôle l’état de préparation des annonces. Sur iOS, App Tracking Transparency est demandé après UMP lorsque nécessaire. Google AdMob peut afficher des annonces seulement après un état de consentement autorisant les annonces ; les annonces personnalisées sont utilisées uniquement avec le consentement requis.'], bullets: ['Vous pouvez refuser ou modifier le consentement dans les options de confidentialité présentées par l’app et gérer les notifications et le suivi dans les réglages de l’appareil.', 'Les catégories exactes et les durées de conservation de Firebase, AdMob, Apple, Google, Meta et RevenueCat ne sont pas fixées dans le code et doivent être confirmées avant publication.'] },
        { heading: 'Conservation et suppression', paragraphs: ['Tant que le compte est actif, l’API conserve le compte et les enregistrements nécessaires aux fonctions ci-dessus. La sauvegarde cloud conserve les dix dernières versions. Les jetons d’accès durent 15 minutes ; les sessions serveur et les jetons de rafraîchissement rotatifs sont créés pour 30 jours et la maintenance supprime les sessions expirées.', 'Lorsque la suppression réussit, l’API supprime le joueur et ses données associées, notamment identités, appareils, sessions, sauvegardes, scores, invitations, amitiés, récompenses, cadeaux, événements, activité, achats, données antifraude et jetons push. La demande de suppression terminée reste comme preuve opérationnelle sans référence au joueur ; les lignes d’audit sont anonymisées.', 'Le code ne définit pas de durée distincte pour les données de télémétrie, de publicité, d’achat, de notification ou de journal de requêtes conservées par les fournisseurs. Les durées et exceptions légales nécessitent la revue de l’Owner.'] },
        { heading: 'Enfants et droits', paragraphs: ['Number RPG ne s’adresse pas aux enfants de moins de 13 ans et ne les invite pas sciemment à créer un compte. Si vous pensez qu’un enfant a fourni des données personnelles, contactez admin@dappgo.com.', 'Vous pouvez demander l’accès, l’exportation, la rectification, la suppression ou des informations sur le consentement en écrivant à admin@dappgo.com. L’API possède également une voie d’export authentifiée. Nous pouvons vérifier les demandes afin de protéger les comptes et les autres joueurs.'] },
        { heading: 'Modifications et contact', paragraphs: ['Nous pouvons mettre à jour cette politique lorsque l’app, l’API, les fournisseurs ou les obligations légales changent. La date en haut indique la version en vigueur. Pour toute question ou demande de confidentialité, écrivez à admin@dappgo.com.'] },
      ],
    },
    terms: {
      kicker: 'Number RPG · conditions', title: 'Conditions d’utilisation', product: 'Number RPG par DappGo', effective: 'Date d’effet : 2026-10-27',
      summary: 'Ces conditions fixent les règles d’utilisation de Number RPG : jeu en invité, comptes facultatifs, objets virtuels, achats, fair-play et fin du compte.',
      sections: [
        { heading: '1. Acceptation', paragraphs: ['En installant, en consultant ou en utilisant Number RPG, vous acceptez ces Conditions d’utilisation et la Politique de confidentialité de Number RPG. Si vous refusez, n’utilisez pas le jeu.'] },
        { heading: '2. Service et comptes', paragraphs: ['Number RPG est un jeu mobile exploité par DappGo. Vous pouvez jouer en invité. La connexion facultative avec Apple, Google ou Facebook permet la sauvegarde cloud, les fonctions sociales, les classements et la restauration des achats. Protégez votre appareil, vos identifiants et vos informations de récupération.'] },
        { heading: '3. Objets virtuels et achats', paragraphs: ['Le jeu peut proposer une monnaie virtuelle, des vies, accessoires, améliorations ou autres droits numériques. Ils n’ont aucune valeur en espèces, sont concédés sous licence pour le jeu et ne peuvent pas être vendus, transférés ou échangés hors du jeu. Leur disponibilité et les soldes peuvent changer.', 'Les achats passent par Apple App Store ou Google Play. Les remboursements, annulations et litiges de paiement doivent être demandés à la boutique qui a traité la transaction, selon ses règles. RevenueCat aide à enregistrer et restaurer les droits. La suppression du compte efface les données du jeu ; les achats éligibles peuvent rester restaurables via le compte de la boutique.'] },
        { heading: '4. Fair-play et usage acceptable', paragraphs: ['Ne trichez pas, n’exploitez pas les bugs, n’automatisez pas le jeu, ne manipulez pas les scores ou récompenses, n’abusez pas des invitations ou cadeaux, n’usurpez pas l’identité d’autrui et n’interférez pas avec l’API ou le service. N’envoyez pas de contenu ou de nom illégal, abusif, haineux ou portant atteinte aux droits d’autrui.'] },
        { heading: '5. Mesures et résiliation', paragraphs: ['DappGo peut limiter, suspendre ou résilier l’accès lorsqu’il estime raisonnablement qu’un compte ou un appareil triche, abuse du service, est frauduleux, présente un risque de sécurité ou viole ces conditions. Le service peut aussi être modifié, suspendu ou arrêté en partie. Supprimez le compte depuis Réglages → Supprimer le compte ou selon la page de suppression.'] },
        { heading: '6. Garanties et limites', paragraphs: ['Dans la mesure permise par la loi, le jeu est fourni tel qu’il est disponible, sans promesse d’absence d’interruption ou d’erreur ni de conservation permanente de chaque objet ou sauvegarde. DappGo n’est pas responsable des défaillances dues à l’appareil, au réseau, à la boutique, à un fournisseur tiers ou à un événement hors de son contrôle raisonnable. Rien ne limite les droits qui ne peuvent légalement l’être.'] },
        { heading: '7. Droit applicable et juridiction', paragraphs: ['Les présentes Conditions sont régies par les lois de l’État de Californie, aux États-Unis, sans tenir compte des règles de conflit de lois. Le lieu de juridiction exclusif est celui des tribunaux d’État ou fédéraux situés dans le comté de Los Angeles, en Californie. Cela ne limite pas les droits impératifs des consommateurs dans le pays où vous résidez.'] },
        { heading: '8. Contact', paragraphs: ['Les questions sur ces conditions peuvent être envoyées à admin@dappgo.com.'] },
      ],
    },
    deleteAccount: {
      kicker: 'Number RPG · suppression du compte', title: 'Supprimer votre compte', product: 'Number RPG par DappGo', effective: 'Instructions en vigueur : 2026-10-27',
      summary: 'Vous pouvez demander la suppression dans l’app ou par e-mail. Le parcours dans l’app est le moyen le plus rapide de supprimer le compte et les données du joueur.',
      sections: [
        { heading: 'Supprimer dans l’app', paragraphs: ['Ouvrez Number RPG et allez à Réglages → Supprimer le compte. Lisez la confirmation, confirmez et gardez l’app en ligne jusqu’au succès. Si une identité Apple est liée, l’app ou l’API peut demander une nouvelle autorisation Apple.'] },
        { heading: 'Demander par e-mail', paragraphs: ['Écrivez à admin@dappgo.com pour demander la suppression de votre compte Number RPG. Fournissez des informations suffisantes, comme le nom affiché et l’ID du compte s’il est disponible. N’envoyez pas de mot de passe, de jeton fournisseur ou de clé privée Apple. Une vérification peut être demandée.'] },
        { heading: 'Ce que l’API supprime', paragraphs: ['Une suppression réussie retire le compte et les données liées : identités, appareils et sessions, sauvegardes cloud, scores, invitations, amitiés, cadeaux, récompenses, événements, activité, achats, données antifraude et jetons push. L’app réinitialise la progression locale. Les achats Apple ou Google peuvent rester restaurables selon la boutique et le droit.'] },
        { heading: 'Délai', paragraphs: ['L’implémentation actuelle de DELETE /me crée la demande, effectue la révocation Apple nécessaire, supprime les données, marque la demande comme terminée et renvoie le succès dans la même opération serveur. Aucun délai d’attente n’est défini dans le code pour une demande réussie dans l’app. Une panne réseau ou une nouvelle autorisation Apple impose de réessayer.', 'La demande terminée conserve ses heures de demande et de fin, mais supprime la référence au joueur ; les audits associés sont anonymisés. Le code ne fixe pas de délai pour une demande e-mail vérifiée manuellement ; cette procédure doit être revue par l’Owner.'] },
        { heading: 'Besoin d’aide ?', paragraphs: ['Contactez admin@dappgo.com si le parcours échoue, si vous n’avez plus accès au compte ou si vous avez une question sur une demande e-mail.'] },
      ],
    },
  },
  de: {
    privacy: {
      kicker: 'Number RPG · Datenschutz', title: 'Datenschutzerklärung', product: 'Number RPG von DappGo', effective: 'Gültig ab: 2026-10-27',
      summary: 'Number RPG kann als Gast gespielt werden. Eine Anmeldung ist freiwillig und ergänzt kontobasiertes Cloud-Speichern und die Wiederherstellung auf anderen Geräten. Diese Seite beschreibt die aktuelle App- und API-Implementierung.',
      sections: [
        { heading: 'Wer wir sind', paragraphs: ['Number RPG wird von DappGo betrieben. Fragen zu dieser Erklärung oder zu Ihren Daten richten Sie bitte an admin@dappgo.com.'] },
        { heading: 'Konten und Anmeldung', paragraphs: ['Sie können als Gast spielen oder sich freiwillig mit Apple, Google oder Facebook anmelden. Unter iOS verwendet die Facebook-Anmeldung Meta Limited Login. Die Number-RPG-API prüft die Anbieter-Anmeldedaten, speichert aber keine Zugriffs-Tokens der Anbieter.', 'Die Gastsitzung wird einem Gerät zugeordnet und kann den Fortschritt dort speichern. Durch die Verknüpfung mit einem Anbieter bleibt das Serverkonto erhalten; Cloud-Speicherung, Ranglisten, die Wiederherstellung von Käufen und der Gerätewechsel werden ermöglicht.'], bullets: ['Konto-ID und Profildaten wie Anzeigename, Land und ausgewähltes Anführer-Pet.', 'Anbietername und Subject-ID von Apple, Google oder Facebook; eine E-Mail-Adresse nur, wenn sie vom Anbieter übermittelt wird.'] },
        { heading: 'Verarbeitete Daten', paragraphs: ['Je nach verwendeten Funktionen können die App und data.dappgo.com Folgendes verarbeiten:'], bullets: ['Cloud-Speicherstände, Spielfortschritt, Punkte, Ranglisten-Einreichungen und Spielereignisse.', 'Einladungscodes, Aktivierungs- und Betrugsbekämpfungsdaten, Freunde, Geschenke, Belohnungen und zugehörige Aktivitäten.', 'Über RevenueCat erhaltene Kaufdaten wie Produkt, Transaktion, Store, Umgebung und Kaufzeitpunkt zur Vergabe oder Wiederherstellung von Berechtigungen.', 'Eine serverseitig gehashte Gerätekennung für Sitzungen und Betrugsbekämpfung sowie Push-Tokens, wenn Benachrichtigungen aktiviert sind.', 'Daten von Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config und Cloud Messaging für die jeweiligen Funktionen.'] },
        { heading: 'Verwendung und Weitergabe', paragraphs: ['DappGo verwendet diese Informationen, um das Spiel bereitzustellen, Fortschritt zu speichern und wiederherzustellen, Ranglisten und soziale Funktionen zu betreiben, Käufe zu verarbeiten, Betrug und Missbrauch zu verhindern, Konten zu schützen, gewünschte Benachrichtigungen zu senden und den Dienst zu betreiben.', 'App und API teilen erforderliche Informationen mit Apple, Google, Meta/Facebook, Firebase, Google AdMob und RevenueCat. Jeder Anbieter verarbeitet Daten nach eigenen Bedingungen und Datenschutzhinweisen. Die aktuelle Codebasis legt keine anbieterbezogenen Aufbewahrungsfristen fest; diese müssen vom Owner bestätigt werden.'] },
        { heading: 'Analysen, Absturzberichte, Werbung und Einwilligung', paragraphs: ['Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config und Cloud Messaging sind optionale Integrationen. Die Erhebung wird durch die Einwilligungssteuerung der App begrenzt; Analysen sind vor der Klärung der Einwilligung deaktiviert und eine Änderung kann die Erhebung widerrufen.', 'Im EWR steuert die Einwilligung über Google User Messaging Platform (UMP), ob Werbung bereit ist. Unter iOS wird, falls erforderlich, nach UMP App Tracking Transparency angefragt. Google-AdMob-Werbung darf erst nach einem werbefähigen Einwilligungsstatus angezeigt werden; personalisierte Werbung wird nur mit der erforderlichen Einwilligung verwendet.'], bullets: ['Sie können Einwilligung über die in der App angezeigten Datenschutzoptionen ablehnen oder ändern und Benachrichtigungs- sowie Tracking-Berechtigungen in den Geräteeinstellungen steuern.', 'Die genauen Kategorien und Aufbewahrungsfristen von Firebase, AdMob, Apple, Google, Meta und RevenueCat sind im App-Code nicht festgelegt und müssen vor der Veröffentlichung bestätigt werden.'] },
        { heading: 'Aufbewahrung und Löschung', paragraphs: ['Solange ein Konto aktiv ist, bewahrt die API das Konto und die für die genannten Funktionen erforderlichen Spielerdaten auf. Cloud-Speicherstände behalten die zehn neuesten Versionen. Zugriffstokens gelten 15 Minuten; Serversitzungen und rotierende Refresh-Tokens werden für 30 Tage angelegt, abgelaufene Sitzungen werden durch den Wartungsjob gelöscht.', 'Nach erfolgreicher Kontolöschung löscht die API den Spieler und zugehörige Daten, darunter Identitäten, Geräte, Sitzungen, Speicherstände, Punkte, Einladungen, Freundschaften, Belohnungen, Geschenke, Ereignisse, Aktivität, Käufe, Betrugsdaten und Push-Tokens. Ein abgeschlossener Löschantrag bleibt als Betriebsnachweis ohne Spielerreferenz; Audit-Zeilen werden anonymisiert.', 'Der Quellcode legt keine gesonderte Frist für von Anbietern gespeicherte Telemetrie-, Werbe-, Kauf-, Benachrichtigungs- oder Anfrageprotokolldaten fest. Fristen und gesetzliche Ausnahmen müssen vom Owner geprüft werden.'] },
        { heading: 'Kinder und Ihre Rechte', paragraphs: ['Number RPG richtet sich nicht an Kinder unter 13 Jahren und lädt sie nicht wissentlich zur Kontoerstellung ein. Wenn Sie glauben, dass ein Kind personenbezogene Daten übermittelt hat, kontaktieren Sie admin@dappgo.com.', 'Sie können per E-Mail an admin@dappgo.com Auskunft, Export, Berichtigung, Löschung oder Informationen zur Einwilligung verlangen. Die API bietet auch einen authentifizierten Datenexport. Zum Schutz von Konten und anderen Spielern können wir Anfragen prüfen.'] },
        { heading: 'Änderungen und Kontakt', paragraphs: ['Wir können diese Erklärung ändern, wenn sich App, API, Anbieter oder gesetzliche Anforderungen ändern. Das Datum oben bezeichnet die aktuelle Fassung. Datenschutzfragen und Anfragen senden Sie an admin@dappgo.com.'] },
      ],
    },
    terms: {
      kicker: 'Number RPG · Bedingungen', title: 'Nutzungsbedingungen', product: 'Number RPG von DappGo', effective: 'Gültig ab: 2026-10-27',
      summary: 'Diese Bedingungen regeln die Nutzung von Number RPG, einschließlich Gastspiel, optionalen Konten, virtuellen Gegenständen, Käufen, fairem Spiel und Kontobeendigung.',
      sections: [
        { heading: '1. Zustimmung', paragraphs: ['Durch Installation, Zugriff oder Nutzung von Number RPG stimmen Sie diesen Nutzungsbedingungen und der Datenschutzerklärung von Number RPG zu. Wenn Sie nicht zustimmen, nutzen Sie das Spiel nicht.'] },
        { heading: '2. Dienst und Konten', paragraphs: ['Number RPG ist ein von DappGo betriebener Mobilspieldienst. Sie können als Gast spielen. Die freiwillige Anmeldung mit Apple, Google oder Facebook unterstützt Cloud-Speicherung, soziale Funktionen, Ranglisten und die Wiederherstellung von Käufen. Schützen Sie Gerät, Anmeldedaten und Wiederherstellungsinformationen.'] },
        { heading: '3. Virtuelle Gegenstände und Käufe', paragraphs: ['Das Spiel kann virtuelle Währung, Leben, Zubehör, Verbesserungen oder andere digitale Berechtigungen anbieten. Sie haben keinen Geldwert, werden für die Nutzung im Spiel lizenziert und dürfen außerhalb des Spiels nicht verkauft, übertragen oder eingelöst werden. Verfügbarkeit und Guthaben können sich mit dem Dienst oder den Spielregeln ändern.', 'Käufe werden über Apple App Store oder Google Play abgerechnet. Erstattungen, Stornierungen und Zahlungsstreitigkeiten müssen nach den Regeln des Stores, der die Transaktion verarbeitet hat, dort beantragt werden. RevenueCat hilft bei der Aufzeichnung und Wiederherstellung von Berechtigungen. Die Kontolöschung löscht Spieldaten; berechtigte Store-Käufe können über das Store-Konto wiederherstellbar bleiben.'] },
        { heading: '4. Fair Play und zulässige Nutzung', paragraphs: ['Cheaten, das Ausnutzen von Fehlern, automatisiertes Spielen, die Manipulation von Punkten oder Belohnungen, der Missbrauch von Einladungs- oder Geschenksystemen, Identitätsvortäuschung, Eingriffe in API oder Dienst sowie die Nutzung zum Schaden anderer sind nicht erlaubt. Senden Sie keine rechtswidrigen, beleidigenden, hasserfüllten oder rechtsverletzenden Inhalte oder Anzeigenamen.'] },
        { heading: '5. Maßnahmen und Beendigung', paragraphs: ['DappGo kann den Zugriff begrenzen, sperren oder beenden, wenn ein Konto oder Gerät nach vernünftiger Einschätzung cheatet, missbraucht, betrügerisch oder unsicher ist oder gegen diese Bedingungen verstößt. Teile des Dienstes können geändert, pausiert oder eingestellt werden. Sie können das Konto über Einstellungen → Konto löschen oder die Löschseite löschen.'] },
        { heading: '6. Haftungsausschlüsse und Grenzen', paragraphs: ['Soweit gesetzlich zulässig, wird das Spiel in der verfügbaren Form bereitgestellt, ohne Zusicherung eines ununterbrochenen oder fehlerfreien Betriebs oder einer dauerhaften Speicherung jedes Gegenstands und Spielstands. DappGo haftet nicht für Ausfälle durch Gerät, Netzwerk, App-Store, Drittanbieter oder Ereignisse außerhalb angemessener Kontrolle. Gesetzlich unabdingbare Rechte bleiben unberührt.'] },
        { heading: '7. Anwendbares Recht und Gerichtsstand', paragraphs: ['Diese Bedingungen unterliegen dem Recht des US-Bundesstaates Kalifornien, ohne Berücksichtigung kollisionsrechtlicher Vorschriften. Ausschließlicher Gerichtsstand sind die staatlichen oder bundesstaatlichen Gerichte im Los Angeles County, Kalifornien. Dies schränkt zwingende Verbraucherrechte im Land Ihres Wohnsitzes nicht ein.'] },
        { heading: '8. Kontakt', paragraphs: ['Fragen zu diesen Bedingungen senden Sie an admin@dappgo.com.'] },
      ],
    },
    deleteAccount: {
      kicker: 'Number RPG · Konto löschen', title: 'Konto löschen', product: 'Number RPG von DappGo', effective: 'Anleitung gültig ab: 2026-10-27',
      summary: 'Sie können die Löschung in der App oder per E-Mail beantragen. Der In-App-Ablauf ist der schnellste Weg, Konto und Spielerdaten zu löschen.',
      sections: [
        { heading: 'In der App löschen', paragraphs: ['Öffnen Sie Number RPG und gehen Sie zu Einstellungen → Konto löschen. Lesen und bestätigen Sie die Meldung und lassen Sie die App online, bis der Erfolg angezeigt wird. Bei verknüpfter Apple-Identität kann eine erneute Apple-Autorisierung erforderlich sein.'] },
        { heading: 'Per E-Mail beantragen', paragraphs: ['Senden Sie eine Bitte an admin@dappgo.com. Fügen Sie ausreichende Angaben zur Identifizierung hinzu, etwa Anzeigename und, falls verfügbar, Konto-ID. Senden Sie kein Passwort, Anbieter-Token oder Apple-Privatschlüssel. Vor der Bearbeitung kann eine Prüfung verlangt werden.'] },
        { heading: 'Was die API löscht', paragraphs: ['Bei Erfolg werden Konto und zugehörige Daten entfernt: Anbieteridentitäten, Geräte und Sitzungen, Cloud-Speicherstände, Punkte, Einladungen, Freunde, Geschenke, Belohnungen, Ereignisse, Aktivität, Käufe, Betrugsdaten und Push-Tokens. Die App setzt lokalen Fortschritt zurück. Apple- oder Google-Käufe können nach Store- und Berechtigungsregeln wiederherstellbar bleiben.'] },
        { heading: 'Dauer', paragraphs: ['DELETE /me erstellt den Antrag, führt nötige Apple-Widerrufe aus, löscht die Spielerdaten, markiert den Antrag als abgeschlossen und meldet Erfolg in derselben Serveroperation. Für einen erfolgreichen In-App-Antrag gibt es im Code keine Wartefrist. Netzwerkfehler oder Apple-Neuautorisierung erfordern einen erneuten Versuch.', 'Der abgeschlossene Antrag bewahrt Antrags- und Abschlusszeit, entfernt aber die Spielerreferenz; zugehörige Audit-Einträge werden anonymisiert. Für manuell geprüfte E-Mail-Anträge definiert der Code keine Frist; das Verfahren muss der Owner prüfen.'] },
        { heading: 'Hilfe', paragraphs: ['Kontaktieren Sie admin@dappgo.com, wenn der Ablauf fehlschlägt, Sie keinen Zugriff haben oder Fragen zu einem E-Mail-Antrag bestehen.'] },
      ],
    },
  },
  'pt-BR': {
    privacy: {
      kicker: 'Number RPG · privacidade', title: 'Política de privacidade', product: 'Number RPG da DappGo', effective: 'Vigência: 2026-10-27',
      summary: 'Number RPG permite jogar como convidado. O login é opcional e acrescenta salvamento na nuvem vinculado à conta e recuperação entre dispositivos. Esta página descreve a implementação atual do app e da API.',
      sections: [
        { heading: 'Quem somos', paragraphs: ['Number RPG é operado pela DappGo. Perguntas sobre esta política ou sobre seus dados podem ser enviadas para admin@dappgo.com.'] },
        { heading: 'Contas e login', paragraphs: ['Você pode jogar como convidado ou fazer login opcional com Apple, Google ou Facebook. No iOS, o login do Facebook usa Meta Limited Login. A API do Number RPG verifica as credenciais do provedor, mas não armazena tokens de acesso do provedor.', 'A sessão de convidado é associada a um dispositivo e pode manter o progresso nele. Vincular um provedor preserva a conta do servidor e habilita salvamento na nuvem, placares, restauração de compras e recuperação entre dispositivos.'], bullets: ['ID da conta e perfil, como nome exibido, país e mascote líder.', 'Nome e subject ID do provedor Apple, Google ou Facebook; e-mail somente quando fornecido pelo provedor.'] },
        { heading: 'Dados processados', paragraphs: ['Dependendo dos recursos usados, o app e data.dappgo.com podem processar:'], bullets: ['Salvamentos na nuvem, progresso, pontuações, envios para placares e eventos de jogo.', 'Códigos de convite, ativação e registros antifraude, amigos, presentes, recompensas e atividade relacionada.', 'Registros de compras recebidos pelo RevenueCat, como produto, transação, loja, ambiente e horário da compra, para conceder ou restaurar direitos.', 'Um identificador de dispositivo representado por hash no servidor para sessões e antifraude, além de tokens push quando as notificações são ativadas.', 'Dados do Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config e Cloud Messaging usados pelos recursos correspondentes.'] },
        { heading: 'Uso e compartilhamento', paragraphs: ['A DappGo usa essas informações para oferecer o jogo, salvar e restaurar o progresso, operar placares e recursos sociais, processar compras, evitar trapaças e abusos, proteger contas, enviar notificações solicitadas e manter o serviço.', 'O app e a API compartilham informações necessárias com Apple, Google, Meta/Facebook, Firebase, Google AdMob e RevenueCat. Cada provedor pode tratar dados conforme seus próprios termos e documentos de privacidade. O código atual não define prazos específicos de retenção dos provedores; eles precisam ser confirmados pelo Owner.'] },
        { heading: 'Análises, falhas, anúncios e consentimento', paragraphs: ['Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config e Cloud Messaging são integrações opcionais. A coleta é controlada pelo consentimento do app; a análise fica desativada antes da resolução do consentimento e uma mudança pode revogar a coleta.', 'No EEE, o consentimento do Google User Messaging Platform (UMP) controla a disponibilidade de anúncios. No iOS, quando necessário, o App Tracking Transparency é solicitado depois do UMP. O Google AdMob só pode exibir anúncios após um estado de consentimento apto; anúncios personalizados só são usados com o consentimento necessário.'], bullets: ['Você pode recusar ou alterar o consentimento nas opções de privacidade exibidas pelo app e controlar notificações e rastreamento nas configurações do dispositivo.', 'As categorias exatas e os prazos de retenção de Firebase, AdMob, Apple, Google, Meta e RevenueCat não estão fixados no código do app e precisam ser confirmados antes da publicação.'] },
        { heading: 'Retenção e exclusão', paragraphs: ['Enquanto a conta estiver ativa, a API retém a conta e os registros do jogador necessários aos recursos acima. O salvamento na nuvem mantém as dez versões mais recentes. Tokens de acesso duram 15 minutos; sessões do servidor e tokens de atualização rotativos são criados por 30 dias, e a manutenção remove sessões expiradas.', 'Quando a exclusão é concluída, a API remove o jogador e os dados associados, incluindo identidades, dispositivos, sessões, salvamentos, pontuações, convites, amizades, recompensas, presentes, eventos, atividade, compras, dados antifraude e tokens push. O registro de exclusão concluído permanece para fins operacionais, sem a referência ao jogador; registros de auditoria são anonimizados.', 'O código não define um prazo separado para telemetria, anúncios, compras, notificações ou logs de solicitações mantidos por provedores. Os prazos e exceções legais exigem revisão do Owner.'] },
        { heading: 'Crianças e seus direitos', paragraphs: ['Number RPG não é direcionado a menores de 13 anos e não os convida conscientemente a criar uma conta. Se você acredita que uma criança forneceu dados pessoais, contate admin@dappgo.com.', 'Você pode solicitar acesso, exportação, correção, exclusão ou informações sobre consentimento em admin@dappgo.com. A API também possui uma rota autenticada de exportação. Podemos verificar solicitações para proteger contas e outros jogadores.'] },
        { heading: 'Alterações e contato', paragraphs: ['Podemos atualizar esta política quando mudarem o app, a API, os provedores ou as exigências legais. A data acima identifica a versão vigente. Envie dúvidas e solicitações de privacidade para admin@dappgo.com.'] },
      ],
    },
    terms: {
      kicker: 'Number RPG · termos', title: 'Termos de serviço', product: 'Number RPG da DappGo', effective: 'Vigência: 2026-10-27',
      summary: 'Estes termos definem as regras para usar Number RPG, incluindo jogo como convidado, contas opcionais, itens virtuais, compras, jogo justo e encerramento de conta.',
      sections: [
        { heading: '1. Aceitação', paragraphs: ['Ao instalar, acessar ou usar Number RPG, você aceita estes Termos de Serviço e a Política de Privacidade do Number RPG. Se não concordar, não use o jogo.'] },
        { heading: '2. Serviço e contas', paragraphs: ['Number RPG é um jogo móvel operado pela DappGo. Você pode jogar como convidado. O login opcional com Apple, Google ou Facebook permite salvamento na nuvem, recursos sociais, placares e restauração de compras. Proteja seu dispositivo, credenciais e informações de recuperação.'] },
        { heading: '3. Itens virtuais e compras', paragraphs: ['O jogo pode oferecer moeda virtual, vidas, acessórios, melhorias ou outros direitos digitais. Eles não têm valor em dinheiro, são licenciados para uso no jogo e não podem ser vendidos, transferidos ou trocados fora dele. A disponibilidade e os saldos podem mudar com o serviço ou as regras.', 'As compras são feitas pela cobrança do Apple App Store ou Google Play. Reembolsos, cancelamentos e disputas de pagamento devem ser solicitados à loja que processou a transação, conforme suas regras. O RevenueCat ajuda a registrar e restaurar direitos. Excluir a conta remove os dados do jogo; compras elegíveis podem continuar restauráveis pela conta da loja.'] },
        { heading: '4. Jogo justo e uso aceitável', paragraphs: ['Não trapaceie, explore bugs, automatize o jogo, manipule pontuações ou recompensas, abuse de convites ou presentes, se passe por outra pessoa, interfira na API ou no serviço, nem use o jogo para prejudicar alguém. Não envie conteúdo ou nomes ilegais, abusivos, de ódio ou que violem direitos de terceiros.'] },
        { heading: '5. Medidas e encerramento', paragraphs: ['A DappGo pode limitar, suspender ou encerrar o acesso quando acreditar razoavelmente que uma conta ou dispositivo está trapaceando, abusando, fraudando, oferecendo risco de segurança ou violando estes termos. Partes do serviço também podem ser alteradas, pausadas ou encerradas. Exclua a conta em Configurações → Excluir conta ou na página de exclusão.'] },
        { heading: '6. Isenções e limites', paragraphs: ['Na medida permitida por lei, o jogo é fornecido conforme disponível, sem promessa de funcionamento ininterrupto, ausência de erros ou preservação permanente de todos os itens e salvamentos. A DappGo não responde por falhas causadas por dispositivo, rede, loja, provedor terceiro ou eventos fora de controle razoável. Nada limita direitos que não possam ser legalmente limitados.'] },
        { heading: '7. Lei aplicável e foro', paragraphs: ['Estes Termos são regidos pelas leis do Estado da Califórnia, EUA, sem considerar as regras de conflito de leis. O foro exclusivo é o dos tribunais estaduais ou federais localizados no Condado de Los Angeles, Califórnia. Isso não limita os direitos obrigatórios do consumidor no país onde você reside.'] },
        { heading: '8. Contato', paragraphs: ['Perguntas sobre estes termos podem ser enviadas para admin@dappgo.com.'] },
      ],
    },
    deleteAccount: {
      kicker: 'Number RPG · excluir conta', title: 'Excluir sua conta', product: 'Number RPG da DappGo', effective: 'Instruções vigentes: 2026-10-27',
      summary: 'Você pode solicitar a exclusão no app ou por e-mail. O fluxo no app é a forma mais rápida de excluir a conta e os dados do jogador.',
      sections: [
        { heading: 'Excluir no app', paragraphs: ['Abra Number RPG e vá a Configurações → Excluir conta. Leia a confirmação, confirme e mantenha o app online até informar sucesso. Se houver uma identidade Apple vinculada, o app/API pode exigir nova autorização da Apple.'] },
        { heading: 'Solicitar por e-mail', paragraphs: ['Envie um e-mail para admin@dappgo.com pedindo a exclusão da conta Number RPG. Inclua informações suficientes para identificar a conta, como nome exibido e ID da conta, se disponível. Não envie senha, token de provedor ou chave privada Apple. Podemos solicitar verificação.'] },
        { heading: 'O que a API exclui', paragraphs: ['Uma exclusão bem-sucedida remove a conta e os dados vinculados: identidades, dispositivos e sessões, salvamentos, pontuações, convites, amizades, presentes, recompensas, eventos, atividade, compras, dados antifraude e tokens push. O app redefine o progresso local. Compras da Apple ou Google podem continuar restauráveis conforme a loja e o direito.'] },
        { heading: 'Quanto tempo leva', paragraphs: ['A implementação atual de DELETE /me cria a solicitação, faz a revogação Apple necessária, exclui os dados, marca a solicitação como concluída e retorna sucesso na mesma operação do servidor. Não existe prazo de espera definido no código para uma solicitação bem-sucedida no app. Falha de rede ou nova autorização Apple exige nova tentativa.', 'A solicitação concluída mantém os horários de solicitação e conclusão, mas remove a referência ao jogador; auditorias relacionadas são anonimizadas. O código não define prazo para solicitação por e-mail verificada manualmente; o procedimento exige revisão do Owner.'] },
        { heading: 'Precisa de ajuda?', paragraphs: ['Fale com admin@dappgo.com se o fluxo falhar, se você não conseguir acessar a conta ou se tiver dúvidas sobre um pedido por e-mail.'] },
      ],
    },
  },
  th: {
    privacy: {
      kicker: 'Number RPG · ความเป็นส่วนตัว', title: 'นโยบายความเป็นส่วนตัว', product: 'Number RPG โดย DappGo', effective: 'มีผลบังคับใช้: 2026-10-27',
      summary: 'Number RPG ให้คุณเล่นในฐานะผู้เยี่ยมชมได้ การเข้าสู่ระบบเป็นทางเลือก และเพิ่มการบันทึกบนคลาวด์ที่ผูกกับบัญชีและการกู้คืนข้ามอุปกรณ์ หน้านี้อธิบายการทำงานปัจจุบันของแอปและ API',
      sections: [
        { heading: 'เราเป็นใคร', paragraphs: ['Number RPG ดำเนินการโดย DappGo หากมีคำถามเกี่ยวกับนโยบายหรือข้อมูลของคุณ โปรดส่งอีเมลไปที่ admin@dappgo.com'] },
        { heading: 'บัญชีและการเข้าสู่ระบบ', paragraphs: ['คุณเล่นเป็นผู้เยี่ยมชม หรือเข้าสู่ระบบโดยสมัครใจกับ Apple, Google หรือ Facebook ได้ บน iOS การเข้าสู่ระบบ Facebook ใช้ Meta Limited Login API ของ Number RPG ตรวจสอบข้อมูลรับรองของผู้ให้บริการ แต่ไม่เก็บโทเค็นการเข้าถึงของผู้ให้บริการ', 'เซสชันผู้เยี่ยมชมเชื่อมโยงกับอุปกรณ์และอาจเก็บความคืบหน้าไว้บนอุปกรณ์นั้น การเชื่อมโยงผู้ให้บริการจะคงบัญชีเซิร์ฟเวอร์และเปิดใช้การบันทึกบนคลาวด์ กระดานจัดอันดับ การกู้คืนการซื้อ และการกู้คืนข้ามอุปกรณ์'], bullets: ['ID บัญชีและข้อมูลโปรไฟล์ เช่น ชื่อที่แสดง ประเทศ และสัตว์เลี้ยงผู้นำ', 'ชื่อผู้ให้บริการและ subject ID ของ Apple, Google หรือ Facebook; อีเมลเฉพาะเมื่อผู้ให้บริการส่งมาให้'] },
        { heading: 'ข้อมูลที่เราประมวลผล', paragraphs: ['ตามฟังก์ชันที่คุณใช้ แอปและ data.dappgo.com อาจประมวลผล:'], bullets: ['การบันทึกบนคลาวด์ ความคืบหน้า คะแนน การส่งคะแนนขึ้นกระดาน และเหตุการณ์ในเกม', 'รหัสเชิญ การเปิดใช้งานคำเชิญและบันทึกป้องกันการฉ้อโกง เพื่อน ของขวัญ รางวัล และกิจกรรมที่เกี่ยวข้อง', 'บันทึกการซื้อที่ได้รับผ่าน RevenueCat เช่น สินค้า ธุรกรรม ร้านค้า สภาพแวดล้อม และเวลาซื้อ เพื่อมอบหรือกู้คืนสิทธิ์', 'ตัวระบุอุปกรณ์ที่จัดเก็บเป็นแฮชฝั่งเซิร์ฟเวอร์เพื่อใช้กับเซสชันและการป้องกันการฉ้อโกง รวมถึงโทเค็นพุชเมื่อเปิดการแจ้งเตือน', 'ข้อมูลจาก Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config และ Cloud Messaging สำหรับฟังก์ชันที่เกี่ยวข้อง'] },
        { heading: 'การใช้และการแบ่งปัน', paragraphs: ['DappGo ใช้ข้อมูลเพื่อให้บริการเกม บันทึกและกู้คืนความคืบหน้า ดำเนินการกระดานจัดอันดับและฟังก์ชันสังคม ประมวลผลการซื้อ ป้องกันการโกงและการใช้งานในทางที่ผิด รักษาความปลอดภัยบัญชี ส่งการแจ้งเตือนที่ร้องขอ และดูแลบริการ', 'แอปและ API แบ่งปันข้อมูลที่จำเป็นกับ Apple, Google, Meta/Facebook, Firebase, Google AdMob และ RevenueCat ผู้ให้บริการแต่ละรายอาจประมวลผลข้อมูลตามข้อกำหนดและเอกสารความเป็นส่วนตัวของตนเอง โค้ดปัจจุบันไม่ได้กำหนดระยะเวลาเก็บข้อมูลของผู้ให้บริการ ต้องให้ Owner ยืนยันก่อนเผยแพร่'] },
        { heading: 'การวิเคราะห์ รายงานข้อขัดข้อง โฆษณา และความยินยอม', paragraphs: ['Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config และ Cloud Messaging เป็นการเชื่อมต่อที่เลือกได้ การเก็บข้อมูลควบคุมโดยตัวควบคุมความยินยอมของแอป การวิเคราะห์จะปิดก่อนยืนยันความยินยอม และการเปลี่ยนแปลงความยินยอมอาจยกเลิกการเก็บข้อมูล', 'ใน EEA ความยินยอมของ Google User Messaging Platform (UMP) ควบคุมความพร้อมของโฆษณา บน iOS จะขอ App Tracking Transparency หลัง UMP เมื่อจำเป็น Google AdMob จะแสดงโฆษณาได้หลังมีสถานะความยินยอมที่พร้อมสำหรับโฆษณาเท่านั้น และใช้โฆษณาเฉพาะบุคคลเมื่อมีความยินยอมที่จำเป็น'], bullets: ['คุณปฏิเสธหรือเปลี่ยนความยินยอมได้จากตัวเลือกความเป็นส่วนตัวในแอป และควบคุมการแจ้งเตือนกับสิทธิ์การติดตามในการตั้งค่าอุปกรณ์', 'หมวดหมู่และระยะเวลาเก็บข้อมูลที่แน่นอนของ Firebase, AdMob, Apple, Google, Meta และ RevenueCat ไม่ได้กำหนดไว้ในซอร์สแอป ต้องยืนยันก่อนเผยแพร่'] },
        { heading: 'การเก็บรักษาและการลบ', paragraphs: ['ขณะที่บัญชียังใช้งานอยู่ API จะเก็บบัญชีและข้อมูลผู้เล่นที่จำเป็นต่อฟังก์ชันข้างต้น การบันทึกบนคลาวด์เก็บ 10 เวอร์ชันล่าสุด โทเค็นเข้าถึงมีอายุ 15 นาที เซสชันเซิร์ฟเวอร์และโทเค็นรีเฟรชแบบหมุนเวียนสร้างขึ้นเป็นเวลา 30 วัน และงานบำรุงรักษาจะลบเซสชันที่หมดอายุ', 'เมื่อการลบบัญชีสำเร็จ API จะลบผู้เล่นและข้อมูลที่เชื่อมโยง เช่น ตัวตน อุปกรณ์ เซสชัน การบันทึก คะแนน คำเชิญ มิตรภาพ รางวัล ของขวัญ เหตุการณ์ กิจกรรม การซื้อ ข้อมูลป้องกันการฉ้อโกง และโทเค็นพุช บันทึกคำขอลบที่เสร็จสมบูรณ์ยังคงอยู่เพื่อหลักฐานการดำเนินงานแต่ล้างการอ้างอิงผู้เล่น รายการตรวจสอบของผู้ดูแลจะทำให้ไม่ระบุตัวตน', 'โค้ดไม่ได้กำหนดระยะเวลาแยกสำหรับข้อมูลเทเลเมทรี โฆษณา การซื้อ การแจ้งเตือน หรือบันทึกคำขอที่ผู้ให้บริการเก็บไว้ ต้องให้ Owner ตรวจสอบระยะเวลาและข้อยกเว้นตามกฎหมาย'] },
        { heading: 'เด็กและสิทธิ์ของคุณ', paragraphs: ['Number RPG ไม่ได้มุ่งเป้าไปที่เด็กอายุต่ำกว่า 13 ปี และไม่ได้เชิญเด็กกลุ่มนี้ให้สร้างบัญชีโดยรู้เห็น หากคิดว่าเด็กให้ข้อมูลส่วนบุคคล โปรดติดต่อ admin@dappgo.com', 'คุณขอเข้าถึง ส่งออก แก้ไข ลบข้อมูล หรือสอบถามตัวเลือกความยินยอมได้ที่ admin@dappgo.com API ยังมีเส้นทางส่งออกข้อมูลที่ต้องยืนยันตัวตน เราอาจตรวจสอบคำขอเพื่อปกป้องบัญชีและผู้เล่นอื่น'] },
        { heading: 'การเปลี่ยนแปลงและการติดต่อ', paragraphs: ['เราอาจปรับปรุงนโยบายเมื่อแอป API ผู้ให้บริการ หรือข้อกำหนดทางกฎหมายเปลี่ยน วันที่ด้านบนระบุเวอร์ชันปัจจุบัน สำหรับคำถามหรือคำขอด้านความเป็นส่วนตัว โปรดติดต่อ admin@dappgo.com'] },
      ],
    },
    terms: {
      kicker: 'Number RPG · ข้อกำหนด', title: 'ข้อกำหนดการให้บริการ', product: 'Number RPG โดย DappGo', effective: 'มีผลบังคับใช้: 2026-10-27',
      summary: 'ข้อกำหนดนี้อธิบายกฎการใช้ Number RPG รวมถึงการเล่นแบบผู้เยี่ยมชม บัญชีเสริม รายการเสมือน การซื้อ การเล่นอย่างยุติธรรม และการยุติบัญชี',
      sections: [
        { heading: '1. การยอมรับ', paragraphs: ['การติดตั้ง เข้าถึง หรือใช้ Number RPG หมายถึงคุณยอมรับข้อกำหนดนี้และนโยบายความเป็นส่วนตัวของ Number RPG หากไม่ยอมรับ โปรดอย่าใช้เกม'] },
        { heading: '2. บริการและบัญชี', paragraphs: ['Number RPG เป็นเกมมือถือที่ DappGo ดำเนินการ คุณเล่นแบบผู้เยี่ยมชมได้ การเข้าสู่ระบบกับ Apple, Google หรือ Facebook ซึ่งเป็นทางเลือก ช่วยรองรับการบันทึกบนคลาวด์ ฟังก์ชันสังคม กระดานจัดอันดับ และการกู้คืนการซื้อ โปรดรักษาความปลอดภัยของอุปกรณ์ ข้อมูลเข้าสู่ระบบ และข้อมูลกู้คืน'] },
        { heading: '3. รายการเสมือนและการซื้อ', paragraphs: ['เกมอาจมีสกุลเงินเสมือน ชีวิต อุปกรณ์เสริม การอัปเกรด หรือสิทธิ์ดิจิทัลอื่น รายการเหล่านี้ไม่มีมูลค่าเงินสด อนุญาตให้ใช้ในเกม และห้ามขาย โอน หรือแลกเปลี่ยนนอกเกม ความพร้อมและยอดคงเหลืออาจเปลี่ยนตามบริการหรือกฎเกม', 'การซื้อผ่านการเรียกเก็บเงินของ Apple App Store หรือ Google Play การคืนเงิน การยกเลิก และข้อพิพาทการชำระเงินต้องขอกับร้านค้าที่ดำเนินธุรกรรมตามกฎของร้านค้า RevenueCat ช่วยบันทึกและกู้คืนสิทธิ์ การลบบัญชีลบข้อมูลเกม แต่การซื้อที่เข้าเกณฑ์อาจกู้คืนผ่านบัญชีร้านค้าได้'] },
        { heading: '4. การเล่นอย่างยุติธรรมและการใช้งานที่ยอมรับได้', paragraphs: ['ห้ามโกง ใช้บั๊ก เล่นอัตโนมัติ ปรับเปลี่ยนคะแนนหรือรางวัล ใช้ระบบเชิญหรือของขวัญในทางที่ผิด แอบอ้างบุคคลอื่น รบกวน API หรือบริการ หรือใช้เกมทำร้ายผู้อื่น ห้ามส่งเนื้อหาหรือชื่อที่ผิดกฎหมาย ละเมิด แสดงความเกลียดชัง หรือละเมิดสิทธิ์ผู้อื่น'] },
        { heading: '5. การบังคับใช้และการยุติ', paragraphs: ['DappGo อาจจำกัด ระงับ หรือยุติการเข้าถึงเมื่อเชื่ออย่างสมเหตุสมผลว่าบัญชีหรืออุปกรณ์โกง ใช้งานในทางที่ผิด ฉ้อโกง ไม่ปลอดภัย หรือฝ่าฝืนข้อกำหนด และอาจเปลี่ยน หยุดชั่วคราว หรือยุติบางส่วนของบริการ คุณลบบัญชีได้จาก การตั้งค่า → ลบบัญชี หรือหน้าคำแนะนำการลบ'] },
        { heading: '6. ข้อปฏิเสธและข้อจำกัด', paragraphs: ['เท่าที่กฎหมายอนุญาต เกมให้บริการตามที่มีอยู่ โดยไม่รับรองว่าจะไม่ขัดข้อง ไม่มีข้อผิดพลาด หรือเก็บทุกไอเท็มและการบันทึกไว้ตลอดไป DappGo ไม่รับผิดชอบความล้มเหลวจากอุปกรณ์ เครือข่าย ร้านค้า ผู้ให้บริการภายนอก หรือเหตุการณ์นอกเหนือการควบคุมที่สมเหตุสมผล ไม่มีข้อความใดจำกัดสิทธิ์ที่กฎหมายห้ามจำกัด'] },
        { heading: '7. กฎหมายและเขตอำนาจ', paragraphs: ['ข้อกำหนดนี้อยู่ภายใต้กฎหมายของรัฐแคลิฟอร์เนีย สหรัฐอเมริกา โดยไม่คำนึงถึงหลักกฎหมายขัดกัน เขตอำนาจศาลแต่เพียงผู้เดียวคือศาลของรัฐหรือศาลรัฐบาลกลางที่ตั้งอยู่ใน Los Angeles County รัฐแคลิฟอร์เนีย ข้อนี้ไม่จำกัดสิทธิผู้บริโภคที่กฎหมายบังคับของประเทศที่คุณอาศัยอยู่รับรองไว้'] },
        { heading: '8. ติดต่อ', paragraphs: ['ส่งคำถามเกี่ยวกับข้อกำหนดไปที่ admin@dappgo.com'] },
      ],
    },
    deleteAccount: {
      kicker: 'Number RPG · ลบบัญชี', title: 'ลบบัญชีของคุณ', product: 'Number RPG โดย DappGo', effective: 'คำแนะนำมีผล: 2026-10-27',
      summary: 'คุณขอลบได้ในแอปหรือทางอีเมล ขั้นตอนในแอปเป็นวิธีที่เร็วที่สุดในการลบบัญชีและข้อมูลผู้เล่น',
      sections: [
        { heading: 'ลบในแอป', paragraphs: ['เปิด Number RPG ไปที่ การตั้งค่า → ลบบัญชี อ่านคำยืนยัน ยืนยันการลบ และให้แอปออนไลน์จนกว่าจะแจ้งว่าสำเร็จ หากเชื่อมโยงตัวตน Apple แอปหรือ API อาจขอให้ยืนยัน Apple อีกครั้ง'] },
        { heading: 'ขอทางอีเมล', paragraphs: ['ส่งอีเมลไปที่ admin@dappgo.com เพื่อขอลบบัญชี Number RPG ใส่ข้อมูลที่ระบุบัญชีได้ เช่น ชื่อในเกมและ ID บัญชีถ้ามี อย่าส่งรหัสผ่าน โทเค็นผู้ให้บริการ หรือคีย์ส่วนตัว Apple เราอาจขอการยืนยันก่อนดำเนินการ'] },
        { heading: 'API ลบอะไร', paragraphs: ['เมื่อลบสำเร็จ จะลบบัญชีและข้อมูลที่ผูกกับผู้เล่น ได้แก่ ตัวตน อุปกรณ์ เซสชัน การบันทึก คะแนน คำเชิญ เพื่อน ของขวัญ รางวัล เหตุการณ์ กิจกรรม การซื้อ ข้อมูลป้องกันการฉ้อโกง และโทเค็นพุช แอปจะรีเซ็ตความคืบหน้าในเครื่อง การซื้อจาก Apple หรือ Google อาจกู้คืนได้ตามร้านค้าและสิทธิ์'] },
        { heading: 'ใช้เวลานานเท่าใด', paragraphs: ['DELETE /me ปัจจุบันจะสร้างคำขอลบ ดำเนินการเพิกถอน Apple ที่จำเป็น ลบข้อมูลผู้เล่น ทำเครื่องหมายคำขอว่าเสร็จ และส่งผลสำเร็จในกระบวนการเซิร์ฟเวอร์เดียวกัน ไม่มีระยะรอที่กำหนดในโค้ดสำหรับคำขอในแอปที่สำเร็จ หากเครือข่ายล้มเหลวหรือจำเป็นต้องยืนยัน Apple อีกครั้ง ต้องลองใหม่', 'คำขอที่เสร็จแล้วเก็บเวลาที่ขอและเวลาที่เสร็จ แต่ล้างการอ้างอิงผู้เล่น รายการตรวจสอบที่เกี่ยวข้องทำให้ไม่ระบุตัวตน โค้ดไม่ได้กำหนดกำหนดเวลาสำหรับคำขอทางอีเมลที่ตรวจสอบด้วยคน ขั้นตอนนี้ต้องให้ Owner ตรวจสอบ'] },
        { heading: 'ต้องการความช่วยเหลือหรือไม่', paragraphs: ['ติดต่อ admin@dappgo.com หากขั้นตอนในแอปล้มเหลว เข้าบัญชีไม่ได้ หรือมีคำถามเกี่ยวกับคำขอทางอีเมล'] },
      ],
    },
  },
  vi: {
    privacy: {
      kicker: 'Number RPG · quyền riêng tư', title: 'Chính sách quyền riêng tư', product: 'Number RPG của DappGo', effective: 'Ngày có hiệu lực: 2026-10-27',
      summary: 'Number RPG cho phép chơi với tư cách khách. Đăng nhập là tùy chọn và bổ sung lưu trên đám mây gắn với tài khoản cùng khả năng khôi phục giữa các thiết bị. Trang này mô tả triển khai hiện tại của ứng dụng và API.',
      sections: [
        { heading: 'Chúng tôi là ai', paragraphs: ['Number RPG do DappGo vận hành. Câu hỏi về chính sách hoặc dữ liệu của bạn có thể gửi đến admin@dappgo.com.'] },
        { heading: 'Tài khoản và đăng nhập', paragraphs: ['Bạn có thể chơi với tư cách khách hoặc tùy chọn đăng nhập bằng Apple, Google hay Facebook. Trên iOS, đăng nhập Facebook dùng Meta Limited Login. API Number RPG xác minh thông tin xác thực của nhà cung cấp nhưng không lưu token truy cập của nhà cung cấp.', 'Phiên khách gắn với thiết bị và có thể giữ tiến trình trên thiết bị đó. Liên kết nhà cung cấp giữ tài khoản máy chủ và bật lưu đám mây, bảng xếp hạng, khôi phục giao dịch mua và khôi phục giữa thiết bị.'], bullets: ['ID tài khoản và thông tin hồ sơ như tên hiển thị, quốc gia và thú cưng dẫn đầu.', 'Tên nhà cung cấp và subject ID của Apple, Google hoặc Facebook; email chỉ khi nhà cung cấp gửi cho chúng tôi.'] },
        { heading: 'Dữ liệu chúng tôi xử lý', paragraphs: ['Tùy tính năng bạn dùng, ứng dụng và data.dappgo.com có thể xử lý:'], bullets: ['Bản lưu đám mây, tiến trình, điểm số, lần gửi bảng xếp hạng và sự kiện trong game.', 'Mã mời, kích hoạt lời mời và hồ sơ chống gian lận, bạn bè, quà tặng, phần thưởng và hoạt động liên quan.', 'Hồ sơ mua hàng nhận qua RevenueCat, như sản phẩm, giao dịch, cửa hàng, môi trường và thời điểm mua, để cấp hoặc khôi phục quyền lợi.', 'Mã nhận dạng thiết bị được biểu diễn bằng hàm băm phía máy chủ cho phiên và chống gian lận, cùng token đẩy khi bật thông báo.', 'Dữ liệu của Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config và Cloud Messaging cho các chức năng tương ứng.'] },
        { heading: 'Sử dụng và chia sẻ', paragraphs: ['DappGo dùng thông tin để cung cấp game, lưu và khôi phục tiến trình, vận hành bảng xếp hạng và tính năng xã hội, xử lý mua hàng, ngăn gian lận và lạm dụng, bảo vệ tài khoản, gửi thông báo được yêu cầu và duy trì dịch vụ.', 'Ứng dụng và API chia sẻ thông tin cần thiết với Apple, Google, Meta/Facebook, Firebase, Google AdMob và RevenueCat. Mỗi nhà cung cấp xử lý theo điều khoản và tài liệu quyền riêng tư của họ. Mã hiện tại không đặt thời hạn lưu riêng cho nhà cung cấp; Owner phải xác nhận trước khi phát hành.'] },
        { heading: 'Phân tích, báo cáo lỗi, quảng cáo và đồng ý', paragraphs: ['Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config và Cloud Messaging là các tích hợp tùy chọn. Việc thu thập được kiểm soát bởi bộ điều khiển đồng ý của ứng dụng; phân tích bị tắt trước khi xác định đồng ý và thay đổi đồng ý có thể thu hồi việc thu thập.', 'Tại EEA, đồng ý Google User Messaging Platform (UMP) kiểm soát trạng thái sẵn sàng quảng cáo. Trên iOS, App Tracking Transparency được yêu cầu sau UMP khi cần. Google AdMob chỉ có thể hiển thị sau trạng thái đồng ý sẵn sàng quảng cáo; quảng cáo được cá nhân hóa chỉ dùng khi có đồng ý cần thiết.'], bullets: ['Bạn có thể từ chối hoặc đổi đồng ý tại các tùy chọn quyền riêng tư trong ứng dụng và kiểm soát thông báo, quyền theo dõi trong cài đặt thiết bị.', 'Danh mục và thời hạn lưu chính xác của Firebase, AdMob, Apple, Google, Meta và RevenueCat không cố định trong mã ứng dụng và phải được xác nhận trước khi xuất bản.'] },
        { heading: 'Lưu giữ và xóa', paragraphs: ['Khi tài khoản còn hoạt động, API giữ tài khoản và bản ghi người chơi cần cho các tính năng trên. Lưu đám mây giữ mười phiên bản gần nhất. Token truy cập có thời hạn 15 phút; phiên máy chủ và token làm mới luân phiên được tạo trong 30 ngày, còn phiên hết hạn bị công việc bảo trì xóa.', 'Khi xóa tài khoản thành công, API xóa người chơi và dữ liệu liên kết, gồm danh tính, thiết bị, phiên, bản lưu, điểm, lời mời, bạn bè, phần thưởng, quà tặng, sự kiện, hoạt động, giao dịch mua, dữ liệu chống gian lận và token đẩy. Bản ghi yêu cầu xóa đã hoàn tất còn lại cho bằng chứng vận hành nhưng xóa liên kết người chơi; bản ghi kiểm toán được ẩn danh.', 'Mã nguồn không quy định thời hạn riêng cho dữ liệu đo lường, quảng cáo, mua hàng, thông báo hoặc nhật ký yêu cầu do nhà cung cấp giữ. Owner phải xem xét thời hạn và ngoại lệ pháp lý.'] },
        { heading: 'Trẻ em và quyền của bạn', paragraphs: ['Number RPG không hướng tới trẻ dưới 13 tuổi và không cố ý mời trẻ dưới 13 tuổi tạo tài khoản. Nếu bạn cho rằng trẻ đã cung cấp dữ liệu cá nhân, hãy liên hệ admin@dappgo.com.', 'Bạn có thể yêu cầu truy cập, xuất, sửa, xóa hoặc hỏi về lựa chọn đồng ý tại admin@dappgo.com. API cũng có đường xuất dữ liệu cần xác thực. Chúng tôi có thể xác minh yêu cầu để bảo vệ tài khoản và người chơi khác.'] },
        { heading: 'Thay đổi và liên hệ', paragraphs: ['Chúng tôi có thể cập nhật chính sách khi ứng dụng, API, nhà cung cấp hoặc yêu cầu pháp lý thay đổi. Ngày ở đầu trang cho biết phiên bản hiện tại. Gửi câu hỏi hoặc yêu cầu về quyền riêng tư đến admin@dappgo.com.'] },
      ],
    },
    terms: {
      kicker: 'Number RPG · điều khoản', title: 'Điều khoản dịch vụ', product: 'Number RPG của DappGo', effective: 'Ngày có hiệu lực: 2026-10-27',
      summary: 'Điều khoản này nêu quy tắc dùng Number RPG, gồm chơi khách, tài khoản tùy chọn, vật phẩm ảo, mua hàng, chơi công bằng và chấm dứt tài khoản.',
      sections: [
        { heading: '1. Chấp nhận', paragraphs: ['Khi cài đặt, truy cập hoặc dùng Number RPG, bạn đồng ý với Điều khoản dịch vụ này và Chính sách quyền riêng tư của Number RPG. Nếu không đồng ý, hãy ngừng sử dụng game.'] },
        { heading: '2. Dịch vụ và tài khoản', paragraphs: ['Number RPG là game di động do DappGo vận hành. Bạn có thể chơi khách. Đăng nhập tùy chọn bằng Apple, Google hoặc Facebook hỗ trợ lưu đám mây, tính năng xã hội, bảng xếp hạng và khôi phục mua hàng. Hãy bảo vệ thiết bị, thông tin đăng nhập và khôi phục.'] },
        { heading: '3. Vật phẩm ảo và mua hàng', paragraphs: ['Game có thể cung cấp tiền ảo, mạng sống, phụ kiện, nâng cấp hoặc quyền lợi số khác. Chúng không có giá trị tiền mặt, được cấp phép dùng trong game và không được bán, chuyển nhượng hay đổi bên ngoài game. Tính sẵn có và số dư có thể thay đổi theo dịch vụ hoặc luật game.', 'Mua hàng qua thanh toán Apple App Store hoặc Google Play. Yêu cầu hoàn tiền, hủy và tranh chấp thanh toán phải gửi cho cửa hàng đã xử lý giao dịch theo quy tắc của cửa hàng. RevenueCat giúp ghi nhận và khôi phục quyền lợi. Xóa tài khoản xóa dữ liệu game; mua hàng đủ điều kiện có thể vẫn khôi phục qua tài khoản cửa hàng.'] },
        { heading: '4. Chơi công bằng và sử dụng được phép', paragraphs: ['Không gian lận, khai thác lỗi, tự động hóa, thao túng điểm hoặc phần thưởng, lạm dụng hệ thống mời hoặc quà, giả mạo người khác, can thiệp API/dịch vụ hoặc dùng game để gây hại. Không gửi nội dung hoặc tên hiển thị bất hợp pháp, xúc phạm, thù ghét hoặc vi phạm quyền người khác.'] },
        { heading: '5. Thực thi và chấm dứt', paragraphs: ['DappGo có thể hạn chế, đình chỉ hoặc chấm dứt quyền truy cập nếu có lý do hợp lý cho rằng tài khoản hoặc thiết bị gian lận, lạm dụng, gian dối, không an toàn hoặc vi phạm điều khoản. DappGo cũng có thể thay đổi, tạm dừng hoặc ngừng một phần dịch vụ. Bạn có thể xóa tài khoản ở Cài đặt → Xóa tài khoản hoặc trang hướng dẫn xóa.'] },
        { heading: '6. Tuyên bố miễn trừ và giới hạn', paragraphs: ['Trong phạm vi pháp luật cho phép, game được cung cấp theo tình trạng sẵn có, không cam kết không gián đoạn, không lỗi hoặc lưu giữ vĩnh viễn mọi vật phẩm và bản lưu. DappGo không chịu trách nhiệm cho lỗi do thiết bị, mạng, cửa hàng, nhà cung cấp bên thứ ba hoặc sự kiện ngoài kiểm soát hợp lý. Không điều gì giới hạn quyền không thể giới hạn theo luật.'] },
        { heading: '7. Luật áp dụng và nơi xét xử', paragraphs: ['Các Điều khoản này chịu sự điều chỉnh của pháp luật Bang California, Hoa Kỳ, không áp dụng các quy tắc xung đột pháp luật. Tòa án có thẩm quyền duy nhất là tòa án bang hoặc liên bang tại Quận Los Angeles, California. Điều này không hạn chế các quyền bắt buộc của người tiêu dùng theo pháp luật của quốc gia nơi bạn cư trú.'] },
        { heading: '8. Liên hệ', paragraphs: ['Câu hỏi về điều khoản gửi đến admin@dappgo.com.'] },
      ],
    },
    deleteAccount: {
      kicker: 'Number RPG · xóa tài khoản', title: 'Xóa tài khoản', product: 'Number RPG của DappGo', effective: 'Hướng dẫn có hiệu lực: 2026-10-27',
      summary: 'Bạn có thể yêu cầu xóa trong ứng dụng hoặc qua email. Quy trình trong ứng dụng là cách nhanh nhất để xóa tài khoản và dữ liệu người chơi.',
      sections: [
        { heading: 'Xóa trong ứng dụng', paragraphs: ['Mở Number RPG và vào Cài đặt → Xóa tài khoản. Đọc xác nhận, xác nhận xóa và giữ ứng dụng trực tuyến đến khi báo thành công. Nếu liên kết danh tính Apple, ứng dụng/API có thể yêu cầu xác thực lại Apple.'] },
        { heading: 'Yêu cầu qua email', paragraphs: ['Gửi email đến admin@dappgo.com yêu cầu xóa tài khoản Number RPG. Cung cấp thông tin đủ để nhận diện tài khoản như tên hiển thị và ID tài khoản nếu có. Không gửi mật khẩu, token nhà cung cấp hoặc khóa riêng Apple. Chúng tôi có thể yêu cầu xác minh.'] },
        { heading: 'API xóa gì', paragraphs: ['Xóa thành công sẽ xóa tài khoản và dữ liệu gắn với người chơi: danh tính, thiết bị và phiên, bản lưu, điểm, lời mời, bạn bè, quà, phần thưởng, sự kiện, hoạt động, mua hàng, dữ liệu chống gian lận và token đẩy. Ứng dụng đặt lại tiến trình cục bộ. Mua từ Apple hoặc Google có thể khôi phục tùy cửa hàng và quyền lợi.'] },
        { heading: 'Mất bao lâu', paragraphs: ['DELETE /me hiện tạo yêu cầu xóa, thực hiện thu hồi Apple cần thiết, xóa dữ liệu, đánh dấu yêu cầu hoàn tất và trả thành công trong cùng thao tác máy chủ. Không có thời gian chờ được định nghĩa trong mã cho yêu cầu trong ứng dụng thành công. Lỗi mạng hoặc xác thực lại Apple cần thử lại.', 'Yêu cầu đã hoàn tất giữ thời điểm yêu cầu và hoàn tất nhưng xóa liên kết người chơi; bản kiểm toán liên quan được ẩn danh. Mã không quy định thời hạn riêng cho yêu cầu email được kiểm tra thủ công; quy trình cần Owner xem xét.'] },
        { heading: 'Cần hỗ trợ?', paragraphs: ['Liên hệ admin@dappgo.com nếu quy trình thất bại, bạn không truy cập được tài khoản hoặc có câu hỏi về yêu cầu email.'] },
      ],
    },
  },
  id: {
    privacy: {
      kicker: 'Number RPG · privasi', title: 'Kebijakan privasi', product: 'Number RPG oleh DappGo', effective: 'Berlaku mulai: 2026-10-27',
      summary: 'Number RPG dapat dimainkan sebagai tamu. Login bersifat opsional dan menambahkan penyimpanan cloud berbasis akun serta pemulihan lintas perangkat. Halaman ini menjelaskan implementasi aplikasi dan API saat ini.',
      sections: [
        { heading: 'Siapa kami', paragraphs: ['Number RPG dioperasikan oleh DappGo. Pertanyaan tentang kebijakan atau data Anda dapat dikirim ke admin@dappgo.com.'] },
        { heading: 'Akun dan login', paragraphs: ['Anda dapat bermain sebagai tamu atau login secara opsional dengan Apple, Google, atau Facebook. Di iOS, login Facebook memakai Meta Limited Login. API Number RPG memverifikasi kredensial penyedia tetapi tidak menyimpan token akses penyedia.', 'Sesi tamu dikaitkan dengan perangkat dan dapat menyimpan kemajuan di perangkat tersebut. Menghubungkan penyedia mempertahankan akun server dan mengaktifkan penyimpanan cloud, papan peringkat, pemulihan pembelian, serta pemulihan lintas perangkat.'], bullets: ['ID akun dan profil seperti nama tampilan, negara, serta hewan pemimpin.', 'Nama penyedia dan subject ID Apple, Google, atau Facebook; alamat email hanya jika diberikan oleh penyedia.'] },
        { heading: 'Data yang kami proses', paragraphs: ['Bergantung pada fitur yang digunakan, aplikasi dan data.dappgo.com dapat memproses:'], bullets: ['Simpanan cloud, kemajuan permainan, skor, pengiriman papan peringkat, dan peristiwa permainan.', 'Kode undangan, aktivasi undangan dan catatan anti-penipuan, teman, hadiah, reward, serta aktivitas terkait.', 'Catatan pembelian dari RevenueCat, seperti produk, transaksi, toko, lingkungan, dan waktu pembelian untuk memberikan atau memulihkan hak.', 'Pengenal perangkat yang direpresentasikan sebagai hash server untuk sesi dan anti-penipuan, serta token push ketika notifikasi diaktifkan.', 'Data Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config, dan Cloud Messaging untuk fungsi terkait.'] },
        { heading: 'Penggunaan dan pembagian', paragraphs: ['DappGo menggunakan informasi ini untuk menyediakan permainan, menyimpan dan memulihkan kemajuan, menjalankan papan peringkat dan fitur sosial, memproses pembelian, mencegah kecurangan dan penyalahgunaan, mengamankan akun, mengirim notifikasi yang diminta, dan menjaga layanan.', 'Aplikasi dan API berbagi informasi yang diperlukan dengan Apple, Google, Meta/Facebook, Firebase, Google AdMob, dan RevenueCat. Setiap penyedia memproses sesuai ketentuan dan dokumen privasinya. Kode saat ini tidak menetapkan masa simpan khusus penyedia; Owner harus mengonfirmasinya sebelum publikasi.'] },
        { heading: 'Analitik, laporan kerusakan, iklan, dan persetujuan', paragraphs: ['Firebase Analytics, Crashlytics, Performance Monitoring, Remote Config, dan Cloud Messaging adalah integrasi opsional. Pengumpulan dikendalikan oleh pengontrol persetujuan aplikasi; analitik dinonaktifkan sebelum persetujuan dipastikan dan perubahan persetujuan dapat mencabut pengumpulan.', 'Di EEA, persetujuan Google User Messaging Platform (UMP) mengontrol kesiapan iklan. Di iOS, App Tracking Transparency diminta setelah UMP jika diperlukan. Iklan Google AdMob hanya dapat ditampilkan setelah status persetujuan siap iklan; iklan yang dipersonalisasi hanya digunakan dengan persetujuan yang diperlukan.'], bullets: ['Anda dapat menolak atau mengubah persetujuan dari opsi privasi di aplikasi dan mengontrol notifikasi serta izin pelacakan di pengaturan perangkat.', 'Kategori dan masa simpan pasti Firebase, AdMob, Apple, Google, Meta, dan RevenueCat tidak ditetapkan di kode aplikasi dan harus dikonfirmasi sebelum publikasi.'] },
        { heading: 'Penyimpanan dan penghapusan', paragraphs: ['Selama akun aktif, API menyimpan akun dan catatan pemain yang diperlukan untuk fitur di atas. Penyimpanan cloud mempertahankan sepuluh versi terbaru. Token akses berlaku 15 menit; sesi server dan token refresh bergilir dibuat selama 30 hari, dan sesi kedaluwarsa dihapus oleh pekerjaan pemeliharaan.', 'Setelah penghapusan akun berhasil, API menghapus pemain dan data terkait, termasuk identitas, perangkat, sesi, simpanan, skor, undangan, pertemanan, reward, hadiah, peristiwa, aktivitas, pembelian, data anti-penipuan, dan token push. Catatan permintaan penghapusan yang selesai disimpan untuk bukti operasional tanpa referensi pemain; catatan audit dianonimkan.', 'Kode tidak menetapkan masa simpan terpisah untuk telemetri, iklan, pembelian, notifikasi, atau log permintaan yang disimpan penyedia. Masa simpan dan pengecualian hukum memerlukan tinjauan Owner.'] },
        { heading: 'Anak-anak dan hak Anda', paragraphs: ['Number RPG tidak ditujukan untuk anak di bawah 13 tahun dan tidak secara sadar mengundang mereka membuat akun. Jika Anda yakin anak memberikan data pribadi, hubungi admin@dappgo.com.', 'Anda dapat meminta akses, ekspor, koreksi, penghapusan, atau informasi tentang pilihan persetujuan melalui admin@dappgo.com. API juga memiliki jalur ekspor data terautentikasi. Kami dapat memverifikasi permintaan untuk melindungi akun dan pemain lain.'] },
        { heading: 'Perubahan dan kontak', paragraphs: ['Kami dapat memperbarui kebijakan ini saat aplikasi, API, penyedia, atau persyaratan hukum berubah. Tanggal di atas menunjukkan versi yang berlaku. Kirim pertanyaan atau permintaan privasi ke admin@dappgo.com.'] },
      ],
    },
    terms: {
      kicker: 'Number RPG · ketentuan', title: 'Ketentuan layanan', product: 'Number RPG oleh DappGo', effective: 'Berlaku mulai: 2026-10-27',
      summary: 'Ketentuan ini menjelaskan aturan penggunaan Number RPG, termasuk permainan tamu, akun opsional, item virtual, pembelian, permainan adil, dan penghentian akun.',
      sections: [
        { heading: '1. Penerimaan', paragraphs: ['Dengan memasang, mengakses, atau menggunakan Number RPG, Anda menyetujui Ketentuan Layanan ini dan Kebijakan Privasi Number RPG. Jika tidak setuju, jangan gunakan permainan.'] },
        { heading: '2. Layanan dan akun', paragraphs: ['Number RPG adalah permainan seluler yang dioperasikan DappGo. Anda dapat bermain sebagai tamu. Login opsional dengan Apple, Google, atau Facebook mendukung penyimpanan cloud, fitur sosial, papan peringkat, dan pemulihan pembelian. Jaga keamanan perangkat, kredensial, dan informasi pemulihan.'] },
        { heading: '3. Item virtual dan pembelian', paragraphs: ['Permainan dapat menawarkan mata uang virtual, nyawa, aksesori, peningkatan, atau hak digital lainnya. Semua tidak memiliki nilai tunai, dilisensikan untuk digunakan dalam permainan, dan tidak boleh dijual, dipindahkan, atau ditukar di luar permainan. Ketersediaan dan saldo dapat berubah mengikuti layanan atau aturan permainan.', 'Pembelian dilakukan melalui penagihan Apple App Store atau Google Play. Pengembalian dana, pembatalan, dan sengketa pembayaran harus diajukan kepada toko yang memproses transaksi sesuai aturannya. RevenueCat membantu mencatat dan memulihkan hak. Penghapusan akun menghapus data permainan; pembelian yang memenuhi syarat mungkin tetap dapat dipulihkan melalui akun toko.'] },
        { heading: '4. Permainan adil dan penggunaan yang dapat diterima', paragraphs: ['Jangan curang, mengeksploitasi bug, mengotomatisasi permainan, memanipulasi skor atau reward, menyalahgunakan sistem undangan atau hadiah, menyamar sebagai orang lain, mengganggu API atau layanan, atau menggunakan permainan untuk merugikan orang lain. Jangan mengirim konten atau nama tampilan yang ilegal, kasar, penuh kebencian, atau melanggar hak orang lain.'] },
        { heading: '5. Penegakan dan penghentian', paragraphs: ['DappGo dapat membatasi, menangguhkan, atau menghentikan akses jika secara wajar meyakini akun atau perangkat melakukan kecurangan, penyalahgunaan, penipuan, menimbulkan risiko keamanan, atau melanggar ketentuan. Bagian layanan juga dapat diubah, dijeda, atau dihentikan. Anda dapat menghapus akun dari Pengaturan → Hapus akun atau halaman penghapusan.'] },
        { heading: '6. Penyangkalan dan batasan', paragraphs: ['Sejauh diizinkan hukum, permainan disediakan sebagaimana tersedia tanpa janji tidak terputus, bebas kesalahan, atau menyimpan setiap item dan simpanan selamanya. DappGo tidak bertanggung jawab atas kegagalan karena perangkat, jaringan, toko aplikasi, penyedia pihak ketiga, atau kejadian di luar kendali wajar. Tidak ada yang membatasi hak yang tidak boleh dibatasi secara hukum.'] },
        { heading: '7. Hukum dan forum', paragraphs: ['Ketentuan ini diatur oleh hukum Negara Bagian California, AS, tanpa memperhatikan aturan pertentangan hukum. Tempat pengadilan eksklusif adalah pengadilan negara bagian atau federal yang berada di Los Angeles County, California. Hal ini tidak membatasi hak konsumen wajib berdasarkan hukum negara tempat Anda tinggal.'] },
        { heading: '8. Kontak', paragraphs: ['Pertanyaan tentang ketentuan ini dapat dikirim ke admin@dappgo.com.'] },
      ],
    },
    deleteAccount: {
      kicker: 'Number RPG · hapus akun', title: 'Hapus akun Anda', product: 'Number RPG oleh DappGo', effective: 'Petunjuk berlaku: 2026-10-27',
      summary: 'Anda dapat meminta penghapusan di aplikasi atau melalui email. Alur dalam aplikasi adalah cara tercepat untuk menghapus akun dan data pemain.',
      sections: [
        { heading: 'Hapus di aplikasi', paragraphs: ['Buka Number RPG dan buka Pengaturan → Hapus akun. Baca konfirmasi, konfirmasikan penghapusan, dan tetap online sampai aplikasi melaporkan berhasil. Jika identitas Apple tertaut, aplikasi/API mungkin meminta otorisasi ulang Apple.'] },
        { heading: 'Minta melalui email', paragraphs: ['Email admin@dappgo.com untuk meminta penghapusan akun Number RPG. Sertakan informasi yang cukup untuk mengenali akun, seperti nama tampilan dan ID akun jika tersedia. Jangan kirim kata sandi, token penyedia, atau kunci pribadi Apple. Kami mungkin meminta verifikasi.'] },
        { heading: 'Yang dihapus API', paragraphs: ['Penghapusan berhasil menghapus akun dan data pemain terkait: identitas, perangkat dan sesi, simpanan cloud, skor, undangan, teman, hadiah, reward, peristiwa, aktivitas, pembelian, data anti-penipuan, dan token push. Aplikasi mengatur ulang kemajuan lokal. Pembelian Apple atau Google dapat tetap dipulihkan sesuai toko dan haknya.'] },
        { heading: 'Berapa lama?', paragraphs: ['DELETE /me saat ini membuat permintaan, melakukan pencabutan Apple yang diperlukan, menghapus data pemain, menandai permintaan selesai, dan mengembalikan keberhasilan dalam operasi server yang sama. Tidak ada masa tunggu yang didefinisikan kode untuk permintaan dalam aplikasi yang berhasil. Kegagalan jaringan atau otorisasi ulang Apple memerlukan percobaan lagi.', 'Permintaan selesai mempertahankan waktu permintaan dan penyelesaian tetapi menghapus referensi pemain; audit terkait dianonimkan. Kode tidak menentukan batas waktu untuk permintaan email yang diverifikasi manual; prosedur ini memerlukan tinjauan Owner.'] },
        { heading: 'Perlu bantuan?', paragraphs: ['Hubungi admin@dappgo.com jika alur gagal, Anda tidak dapat mengakses akun, atau memiliki pertanyaan tentang permintaan email.'] },
      ],
    },
  },
});

const apiBase = 'https://data.dappgo.com/v1/number-rpg';

const ownerByLocale = {
  en: 'Number RPG is operated by Yenlung Lai, a sole proprietor doing business as DappGo, San Gabriel, California, USA.',
  'zh-TW': 'Number RPG 由 Yenlung Lai 以個人獨資業者 DappGo 名義營運，所在地為美國加州 San Gabriel。',
  'zh-CN': 'Number RPG 由 Yenlung Lai 以个体经营者 DappGo 名义运营，所在地为美国加利福尼亚州 San Gabriel。',
  ja: 'Number RPG は、米国カリフォルニア州サンガブリエルの個人事業主 Yenlung Lai が DappGo の名称で運営しています。',
  ko: 'Number RPG는 미국 캘리포니아주 샌개브리얼에서 DappGo라는 상호로 사업하는 개인사업자 Yenlung Lai가 운영합니다.',
  es: 'Number RPG es operado por Yenlung Lai, empresario individual que opera bajo el nombre comercial DappGo en San Gabriel, California, Estados Unidos.',
  fr: 'Number RPG est exploité par Yenlung Lai, entrepreneur individuel exerçant sous le nom commercial DappGo à San Gabriel, en Californie, aux États-Unis.',
  de: 'Number RPG wird von Yenlung Lai betrieben, einem Einzelunternehmer, der unter dem Namen DappGo in San Gabriel, Kalifornien, USA, tätig ist.',
  'pt-BR': 'Number RPG é operado por Yenlung Lai, empresário individual que atua sob o nome comercial DappGo, em San Gabriel, Califórnia, EUA.',
  th: 'Number RPG ดำเนินการโดย Yenlung Lai ผู้ประกอบการรายบุคคลที่ทำธุรกิจในชื่อ DappGo ในเมือง San Gabriel รัฐแคลิฟอร์เนีย สหรัฐอเมริกา',
  vi: 'Number RPG do Yenlung Lai vận hành, với tư cách cá nhân kinh doanh dưới tên DappGo tại San Gabriel, California, Hoa Kỳ.',
  id: 'Number RPG dioperasikan oleh Yenlung Lai, pemilik usaha perseorangan yang menjalankan bisnis dengan nama DappGo di San Gabriel, California, AS.',
};

const privacyWhoByLocale = {
  en: `${ownerByLocale.en} Questions about this policy or your data can be sent to admin@dappgo.com.`,
  'zh-TW': `${ownerByLocale['zh-TW']} 若對本政策或您的資料有疑問，請寄信至 admin@dappgo.com。`,
  'zh-CN': `${ownerByLocale['zh-CN']} 有关本政策或您的数据，请发送邮件至 admin@dappgo.com。`,
  ja: `${ownerByLocale.ja} 本ポリシーやデータについては admin@dappgo.com までご連絡ください。`,
  ko: `${ownerByLocale.ko} 이 방침이나 데이터에 관한 질문은 admin@dappgo.com으로 보내 주세요.`,
  es: `${ownerByLocale.es} Puedes enviar preguntas sobre esta política o tus datos a admin@dappgo.com.`,
  fr: `${ownerByLocale.fr} Les questions concernant cette politique ou vos données peuvent être envoyées à admin@dappgo.com.`,
  de: `${ownerByLocale.de} Fragen zu dieser Richtlinie oder Ihren Daten können Sie an admin@dappgo.com senden.`,
  'pt-BR': `${ownerByLocale['pt-BR']} Dúvidas sobre esta política ou seus dados podem ser enviadas para admin@dappgo.com.`,
  th: `${ownerByLocale.th} หากมีคำถามเกี่ยวกับนโยบายนี้หรือข้อมูลของคุณ โปรดส่งไปที่ admin@dappgo.com`,
  vi: `${ownerByLocale.vi} Bạn có thể gửi câu hỏi về chính sách này hoặc dữ liệu của mình đến admin@dappgo.com.`,
  id: `${ownerByLocale.id} Pertanyaan tentang kebijakan ini atau data Anda dapat dikirim ke admin@dappgo.com.`,
};

const privacySummaryByLocale = {
  en: 'Number RPG lets you play as a guest. Sign-in is optional; it adds account-backed cloud save and cross-device recovery. This page describes the data Number RPG uses.',
  'zh-TW': 'Number RPG 可讓您以訪客身分遊玩。登入是選擇性的；登入後可使用帳戶雲端存檔與跨裝置復原。本頁說明 Number RPG 使用的資料。',
  'zh-CN': 'Number RPG 支持以访客身份游玩。登录是可选的；登录后可使用账户云端存档和跨设备恢复。本页说明 Number RPG 使用的数据。',
  ja: 'Number RPG はゲストとして遊ぶことができます。サインインは任意で、アカウントに紐づくクラウドセーブと端末間の復元を利用できます。本ページでは Number RPG が使用するデータを説明します。',
  ko: 'Number RPG는 게스트로 플레이할 수 있습니다. 로그인은 선택 사항이며 계정 기반 클라우드 저장과 기기 간 복구를 제공합니다. 이 페이지는 Number RPG가 사용하는 데이터를 설명합니다.',
  es: 'Puedes jugar a Number RPG como invitado. Iniciar sesión es opcional y añade guardado en la nube asociado a la cuenta y recuperación entre dispositivos. Esta página describe los datos que usa Number RPG.',
  fr: 'Number RPG peut être utilisé en tant qu’invité. La connexion est facultative et ajoute la sauvegarde cloud liée au compte ainsi que la récupération entre appareils. Cette page décrit les données utilisées par Number RPG.',
  de: 'Number RPG kann als Gast gespielt werden. Die Anmeldung ist optional und ermöglicht einen kontobasierten Cloud-Spielstand sowie die Wiederherstellung auf mehreren Geräten. Diese Seite beschreibt die von Number RPG verwendeten Daten.',
  'pt-BR': 'Você pode jogar Number RPG como visitante. O login é opcional e acrescenta salvamento na nuvem vinculado à conta e recuperação entre dispositivos. Esta página descreve os dados usados pelo Number RPG.',
  th: 'คุณสามารถเล่น Number RPG ในฐานะผู้เยี่ยมชมได้ การลงชื่อเข้าใช้เป็นทางเลือกและเพิ่มการบันทึกบนคลาวด์ของบัญชีและการกู้คืนข้ามอุปกรณ์ หน้านี้อธิบายข้อมูลที่ Number RPG ใช้',
  vi: 'Bạn có thể chơi Number RPG với tư cách khách. Đăng nhập là tùy chọn và bổ sung lưu trên đám mây theo tài khoản cùng khả năng khôi phục trên nhiều thiết bị. Trang này mô tả dữ liệu Number RPG sử dụng.',
  id: 'Anda dapat memainkan Number RPG sebagai tamu. Login bersifat opsional dan menambahkan penyimpanan cloud berbasis akun serta pemulihan lintas perangkat. Halaman ini menjelaskan data yang digunakan Number RPG.',
};

const lawByLocale = {
  en: 'These Terms are governed by the laws of the State of California, USA, without regard to conflict-of-laws rules. Exclusive venue is in the state or federal courts located in Los Angeles County, California. This does not limit mandatory consumer rights in the country where you live.',
  'zh-TW': '本條款受美國加州法律管轄，不適用其法律衝突規則。專屬管轄地為位於加州洛杉磯郡的州法院或聯邦法院。本條款不限制您居住國家法律賦予您的強制性消費者權利。',
  'zh-CN': '本条款受美国加利福尼亚州法律管辖，不适用其法律冲突规则。专属管辖地为位于加利福尼亚州洛杉矶县的州法院或联邦法院。本条款不限制您居住国家法律赋予您的强制性消费者权利。',
  ja: '本規約は、法の抵触に関する規則を除き、米国カリフォルニア州法に準拠します。専属的な裁判地は、カリフォルニア州ロサンゼルス郡に所在する州裁判所または連邦裁判所とします。これは、お住まいの国の法律に基づく強行的な消費者の権利を制限しません。',
  ko: '이 약관은 법률 충돌 규칙을 제외하고 미국 캘리포니아주 법률의 적용을 받습니다. 전속 관할은 캘리포니아주 로스앤젤레스 카운티에 있는 주 법원 또는 연방 법원입니다. 이는 귀하가 거주하는 국가의 법률에 따른 강행적 소비자 권리를 제한하지 않습니다.',
  es: 'Estos Términos se rigen por las leyes del estado de California, Estados Unidos, sin tener en cuenta sus normas sobre conflicto de leyes. La jurisdicción exclusiva corresponde a los tribunales estatales o federales situados en el condado de Los Ángeles, California. Esto no limita los derechos obligatorios de los consumidores del país donde resides.',
  fr: 'Les présentes Conditions sont régies par les lois de l’État de Californie, aux États-Unis, sans tenir compte des règles de conflit de lois. Le lieu de juridiction exclusif est celui des tribunaux d’État ou fédéraux situés dans le comté de Los Angeles, en Californie. Cela ne limite pas les droits impératifs des consommateurs dans le pays où vous résidez.',
  de: 'Diese Bedingungen unterliegen dem Recht des US-Bundesstaates Kalifornien, ohne Berücksichtigung kollisionsrechtlicher Vorschriften. Ausschließlicher Gerichtsstand sind die staatlichen oder bundesstaatlichen Gerichte im Los Angeles County, Kalifornien. Dies schränkt zwingende Verbraucherrechte im Land Ihres Wohnsitzes nicht ein.',
  'pt-BR': 'Estes Termos são regidos pelas leis do Estado da Califórnia, EUA, sem considerar as regras de conflito de leis. O foro exclusivo é o dos tribunais estaduais ou federais localizados no Condado de Los Angeles, Califórnia. Isso não limita os direitos obrigatórios do consumidor no país onde você reside.',
  th: 'ข้อกำหนดนี้อยู่ภายใต้กฎหมายของรัฐแคลิฟอร์เนีย สหรัฐอเมริกา โดยไม่คำนึงถึงหลักกฎหมายขัดกัน เขตอำนาจศาลแต่เพียงผู้เดียวคือศาลของรัฐหรือศาลรัฐบาลกลางที่ตั้งอยู่ใน Los Angeles County รัฐแคลิฟอร์เนีย ข้อนี้ไม่จำกัดสิทธิผู้บริโภคที่กฎหมายบังคับของประเทศที่คุณอาศัยอยู่รับรองไว้',
  vi: 'Các Điều khoản này chịu sự điều chỉnh của pháp luật Bang California, Hoa Kỳ, không áp dụng các quy tắc xung đột pháp luật. Tòa án có thẩm quyền duy nhất là tòa án bang hoặc liên bang tại Quận Los Angeles, California. Điều này không hạn chế các quyền bắt buộc của người tiêu dùng theo pháp luật của quốc gia nơi bạn cư trú.',
  id: 'Ketentuan ini diatur oleh hukum Negara Bagian California, AS, tanpa memperhatikan aturan pertentangan hukum. Tempat pengadilan eksklusif adalah pengadilan negara bagian atau federal yang berada di Los Angeles County, California. Hal ini tidak membatasi hak konsumen wajib berdasarkan hukum negara tempat Anda tinggal.',
};

const retentionByLocale = {
  en: [
    'Account data is kept while your account is active. In-app and web self-service deletion take effect immediately. Email and web-form requests are completed within 30 days after verification; we verify with the account ID from Settings → Account or a reply from the email linked to the account.',
    'Third-party providers process data under their own policies: {{firebaseGoogle}}, {{admob}}, {{apple}}, {{meta}}, and {{revenuecat}}. Google Analytics data is retained for 14 months, and server request logs are retained for 30 days.',
    'When deletion succeeds, we remove the account and player data such as identities, devices, sessions, saves, scores, invites, friendships, rewards, gifts, events, activity, fraud records, and push tokens. Purchase records required by Apple or Google stay with those stores. Account data is otherwise deleted as described above.',
  ],
  'zh-TW': [
    '帳戶資料會在帳戶啟用期間保留。App 內與網頁自助刪除會立即生效。電子郵件與網頁表單請求會在完成驗證後 30 天內處理；我們會透過設定 → 帳戶中的帳戶 ID，或由綁定帳戶的電子郵件回覆來驗證。',
    '第三方供應商依其自身政策處理資料：{{firebaseGoogle}}、{{admob}}、{{apple}}、{{meta}}及{{revenuecat}}。Google Analytics 資料保留 14 個月，伺服器請求日誌保留 30 天。',
    '刪除成功後，我們會移除帳戶及玩家資料，例如身分、裝置、工作階段、存檔、分數、邀請、好友、獎勵、禮物、事件、活動、反詐欺紀錄與推播權杖。Apple 或 Google 要求保留的購買紀錄會留在這些商店。其他帳戶資料會依上述說明刪除。',
  ],
  'zh-CN': [
    '账户数据会在账户处于活动状态期间保留。App 内和网页自助删除会立即生效。电子邮件和网页表单请求会在完成验证后 30 天内处理；我们会通过设置 → 账户中的账户 ID，或由关联账户的电子邮件回复来验证。',
    '第三方供应商按照各自的政策处理数据：{{firebaseGoogle}}、{{admob}}、{{apple}}、{{meta}}和{{revenuecat}}。Google Analytics 数据保留 14 个月，服务器请求日志保留 30 天。',
    '删除成功后，我们会移除账户及玩家数据，例如身份、设备、会话、存档、分数、邀请、好友、奖励、礼物、事件、活动、反欺诈记录和推送令牌。Apple 或 Google 要求保留的购买记录会留在这些商店。其他账户数据会按照上述说明删除。',
  ],
  ja: [
    'アカウントデータはアカウントが有効な間保持されます。アプリ内およびウェブのセルフサービスによる削除は直ちに反映されます。メールまたはウェブフォームによる依頼は、本人確認後 30 日以内に完了します。確認には、設定 → アカウントに表示されるアカウント ID、または連携したメールアドレスからの返信を使います。',
    '第三者プロバイダーはそれぞれのポリシーに従ってデータを処理します：{{firebaseGoogle}}、{{admob}}、{{apple}}、{{meta}}、{{revenuecat}}。Google Analytics のデータは 14 か月、サーバーのリクエストログは 30 日保持します。',
    '削除が完了すると、認証情報、端末、セッション、セーブ、スコア、招待、フレンド、報酬、ギフト、イベント、アクティビティ、不正防止記録、プッシュトークンなどのアカウントとプレイヤーデータを削除します。Apple または Google が保持を必要とする購入記録は各ストアに残ります。その他のアカウントデータは上記のとおり削除されます。',
  ],
  ko: [
    '계정 데이터는 계정이 활성 상태인 동안 보관됩니다. 앱 내 삭제와 웹 셀프서비스 삭제는 즉시 적용됩니다. 이메일 또는 웹 양식 요청은 본인 확인 후 30일 이내에 완료됩니다. 설정 → 계정의 계정 ID 또는 연결된 이메일에서 보낸 회신으로 확인합니다.',
    '제3자 제공자는 각자의 정책에 따라 데이터를 처리합니다: {{firebaseGoogle}}, {{admob}}, {{apple}}, {{meta}}, {{revenuecat}}. Google Analytics 데이터는 14개월, 서버 요청 로그는 30일 동안 보관됩니다.',
    '삭제가 완료되면 ID, 기기, 세션, 저장 데이터, 점수, 초대, 친구, 보상, 선물, 이벤트, 활동, 부정행위 기록 및 푸시 토큰 등 계정과 플레이어 데이터를 삭제합니다. Apple 또는 Google이 보관해야 하는 구매 기록은 각 스토어에 남습니다. 그 밖의 계정 데이터는 위 설명에 따라 삭제됩니다.',
  ],
  es: [
    'Conservamos los datos de la cuenta mientras esté activa. La eliminación desde la aplicación y la eliminación autoservicio desde la web tienen efecto inmediato. Las solicitudes por correo electrónico o formulario web se completan en un plazo de 30 días después de la verificación; verificamos con el ID de cuenta de Ajustes → Cuenta o con una respuesta desde el correo vinculado a la cuenta.',
    'Los proveedores externos tratan los datos según sus propias políticas: {{firebaseGoogle}}, {{admob}}, {{apple}}, {{meta}} y {{revenuecat}}. Conservamos los datos de Google Analytics durante 14 meses y los registros de solicitudes del servidor durante 30 días.',
    'Cuando la eliminación se completa, eliminamos la cuenta y los datos del jugador, como identidades, dispositivos, sesiones, partidas guardadas, puntuaciones, invitaciones, amistades, recompensas, regalos, eventos, actividad, registros antifraude y tokens de notificaciones. Los registros de compras que Apple o Google deban conservar permanecen en esas tiendas. Los demás datos de la cuenta se eliminan como se ha descrito.',
  ],
  fr: [
    'Les données du compte sont conservées tant que le compte est actif. La suppression dans l’application et la suppression en libre-service sur le web prennent effet immédiatement. Les demandes par e-mail ou formulaire web sont traitées dans les 30 jours suivant la vérification ; nous vérifions avec l’identifiant du compte dans Réglages → Compte ou avec une réponse depuis l’adresse e-mail associée.',
    'Les fournisseurs tiers traitent les données selon leurs propres politiques : {{firebaseGoogle}}, {{admob}}, {{apple}}, {{meta}} et {{revenuecat}}. Les données Google Analytics sont conservées pendant 14 mois et les journaux des requêtes du serveur pendant 30 jours.',
    'Une fois la suppression terminée, nous supprimons le compte et les données du joueur, notamment les identités, appareils, sessions, sauvegardes, scores, invitations, amitiés, récompenses, cadeaux, événements, activité, données antifraude et jetons de notification. Les relevés d’achat qu’Apple ou Google doivent conserver restent auprès de ces boutiques. Les autres données du compte sont supprimées comme indiqué ci-dessus.',
  ],
  de: [
    'Kontodaten werden gespeichert, solange Ihr Konto aktiv ist. Die Löschung in der App und die selbst bediente Löschung im Web werden sofort wirksam. Anfragen per E-Mail oder Webformular werden innerhalb von 30 Tagen nach der Verifizierung abgeschlossen; zur Verifizierung verwenden wir die Konto-ID unter Einstellungen → Konto oder eine Antwort von der verknüpften E-Mail-Adresse.',
    'Drittanbieter verarbeiten Daten nach ihren eigenen Richtlinien: {{firebaseGoogle}}, {{admob}}, {{apple}}, {{meta}} und {{revenuecat}}. Google-Analytics-Daten werden 14 Monate und Server-Anforderungsprotokolle 30 Tage gespeichert.',
    'Nach erfolgreicher Löschung entfernen wir das Konto und Spielerdaten wie Identitäten, Geräte, Sitzungen, Spielstände, Punktzahlen, Einladungen, Freundschaften, Belohnungen, Geschenke, Ereignisse, Aktivitäten, Betrugsaufzeichnungen und Push-Tokens. Von Apple oder Google aufzubewahrende Kaufdaten verbleiben bei diesen Stores. Andere Kontodaten werden wie oben beschrieben gelöscht.',
  ],
  'pt-BR': [
    'Os dados da conta são mantidos enquanto a conta estiver ativa. A exclusão no aplicativo e a exclusão autônoma pela web entram em vigor imediatamente. Solicitações por e-mail ou formulário web são concluídas em até 30 dias após a verificação; verificamos usando o ID da conta em Configurações → Conta ou uma resposta do e-mail vinculado à conta.',
    'Provedores terceirizados processam dados de acordo com suas próprias políticas: {{firebaseGoogle}}, {{admob}}, {{apple}}, {{meta}} e {{revenuecat}}. Os dados do Google Analytics são mantidos por 14 meses e os registros de solicitações do servidor por 30 dias.',
    'Quando a exclusão é concluída, removemos a conta e os dados do jogador, como identidades, dispositivos, sessões, salvamentos, pontuações, convites, amizades, recompensas, presentes, eventos, atividade, registros antifraude e tokens de push. Registros de compras que a Apple ou o Google precisem manter permanecem nessas lojas. Os demais dados da conta são excluídos conforme descrito acima.',
  ],
  th: [
    'เราจะเก็บข้อมูลบัญชีไว้ขณะที่บัญชียังใช้งานอยู่ การลบภายในแอปและการลบด้วยตนเองบนเว็บมีผลทันที คำขอทางอีเมลหรือแบบฟอร์มเว็บจะดำเนินการให้เสร็จภายใน 30 วันหลังยืนยันตัวตน โดยยืนยันด้วย ID บัญชีจากการตั้งค่า → บัญชี หรือการตอบกลับจากอีเมลที่เชื่อมโยงกับบัญชี',
    'ผู้ให้บริการภายนอกประมวลผลข้อมูลตามนโยบายของตนเอง: {{firebaseGoogle}}, {{admob}}, {{apple}}, {{meta}} และ {{revenuecat}} เราเก็บข้อมูล Google Analytics ไว้ 14 เดือน และเก็บบันทึกคำขอของเซิร์ฟเวอร์ไว้ 30 วัน',
    'เมื่อการลบเสร็จสมบูรณ์ เราจะลบบัญชีและข้อมูลผู้เล่น เช่น ข้อมูลยืนยันตัวตน อุปกรณ์ เซสชัน การบันทึก คะแนน คำเชิญ เพื่อน รางวัล ของขวัญ เหตุการณ์ กิจกรรม ข้อมูลป้องกันการทุจริต และโทเค็นพุช บันทึกการซื้อที่ Apple หรือ Google จำเป็นต้องเก็บไว้จะยังคงอยู่กับร้านค้าเหล่านั้น ข้อมูลบัญชีส่วนอื่นจะถูกลบตามที่อธิบายไว้ข้างต้น',
  ],
  vi: [
    'Dữ liệu tài khoản được giữ trong thời gian tài khoản còn hoạt động. Xóa trong ứng dụng và xóa tự phục vụ trên web có hiệu lực ngay lập tức. Yêu cầu qua email hoặc biểu mẫu web được hoàn tất trong vòng 30 ngày sau khi xác minh; chúng tôi xác minh bằng ID tài khoản trong Cài đặt → Tài khoản hoặc thư trả lời từ email đã liên kết.',
    'Nhà cung cấp bên thứ ba xử lý dữ liệu theo chính sách riêng của họ: {{firebaseGoogle}}, {{admob}}, {{apple}}, {{meta}} và {{revenuecat}}. Dữ liệu Google Analytics được giữ trong 14 tháng và nhật ký yêu cầu máy chủ được giữ trong 30 ngày.',
    'Khi xóa hoàn tất, chúng tôi xóa tài khoản và dữ liệu người chơi như danh tính, thiết bị, phiên, bản lưu, điểm số, lời mời, bạn bè, phần thưởng, quà tặng, sự kiện, hoạt động, bản ghi chống gian lận và mã thông báo đẩy. Bản ghi giao dịch mà Apple hoặc Google yêu cầu giữ lại sẽ ở lại với các cửa hàng đó. Dữ liệu tài khoản còn lại được xóa như mô tả ở trên.',
  ],
  id: [
    'Data akun disimpan selama akun Anda aktif. Penghapusan di dalam aplikasi dan penghapusan mandiri melalui web berlaku segera. Permintaan melalui email atau formulir web diselesaikan dalam 30 hari setelah verifikasi; kami memverifikasi dengan ID akun dari Pengaturan → Akun atau balasan dari email yang tertaut ke akun.',
    'Penyedia pihak ketiga memproses data berdasarkan kebijakan mereka sendiri: {{firebaseGoogle}}, {{admob}}, {{apple}}, {{meta}}, dan {{revenuecat}}. Data Google Analytics disimpan selama 14 bulan dan log permintaan server selama 30 hari.',
    'Setelah penghapusan berhasil, kami menghapus akun dan data pemain seperti identitas, perangkat, sesi, simpanan, skor, undangan, pertemanan, reward, hadiah, peristiwa, aktivitas, catatan anti-penipuan, dan token push. Catatan pembelian yang wajib disimpan Apple atau Google tetap berada di toko tersebut. Data akun lainnya dihapus seperti yang dijelaskan di atas.',
  ],
};

const childrenByLocale = {
  en: 'Number RPG is not directed to children under 13. The app is intended for users 13 and older, and we do not knowingly invite children under 13 to create an account. If you believe a child has provided personal data, contact admin@dappgo.com.',
  'zh-TW': 'Number RPG 並非以 13 歲以下兒童為對象。本 App 供 13 歲以上使用者使用，我們也不會明知而邀請 13 歲以下兒童建立帳戶。若您認為兒童提供了個人資料，請聯絡 admin@dappgo.com。',
  'zh-CN': 'Number RPG 不面向 13 岁以下儿童。本 App 面向 13 岁及以上用户，我们也不会明知而邀请 13 岁以下儿童创建账户。如果您认为儿童提供了个人数据，请联系 admin@dappgo.com。',
  ja: 'Number RPG は 13 歳未満の子どもを対象としていません。本アプリは 13 歳以上のユーザーを対象としており、13 歳未満の子どもにアカウント作成を故意に勧めることはありません。子どもが個人データを提供したと思われる場合は admin@dappgo.com までご連絡ください。',
  ko: 'Number RPG는 13세 미만 아동을 대상으로 하지 않습니다. 이 앱은 13세 이상 사용자를 대상으로 하며, 13세 미만 아동에게 계정을 만들도록 고의로 권유하지 않습니다. 아동이 개인정보를 제공했다고 생각되면 admin@dappgo.com으로 연락해 주세요.',
  es: 'Number RPG no está dirigido a menores de 13 años. La aplicación está destinada a usuarios de 13 años o más y no invitamos conscientemente a menores de 13 años a crear una cuenta. Si crees que un menor ha proporcionado datos personales, contacta con admin@dappgo.com.',
  fr: 'Number RPG ne s’adresse pas aux enfants de moins de 13 ans. L’application est destinée aux utilisateurs âgés d’au moins 13 ans et nous n’invitons pas sciemment les enfants de moins de 13 ans à créer un compte. Si vous pensez qu’un enfant a fourni des données personnelles, contactez admin@dappgo.com.',
  de: 'Number RPG richtet sich nicht an Kinder unter 13 Jahren. Die App ist für Nutzer ab 13 Jahren bestimmt, und wir fordern Kinder unter 13 Jahren nicht wissentlich zur Erstellung eines Kontos auf. Wenn Sie glauben, dass ein Kind personenbezogene Daten bereitgestellt hat, wenden Sie sich an admin@dappgo.com.',
  'pt-BR': 'Number RPG não é destinado a crianças menores de 13 anos. O aplicativo é destinado a usuários com 13 anos ou mais e não convidamos conscientemente crianças menores de 13 anos a criar uma conta. Se você acredita que uma criança forneceu dados pessoais, entre em contato com admin@dappgo.com.',
  th: 'Number RPG ไม่ได้มุ่งเป้าไปที่เด็กอายุต่ำกว่า 13 ปี แอปนี้มีไว้สำหรับผู้ใช้อายุ 13 ปีขึ้นไป และเราไม่เชิญชวนเด็กอายุต่ำกว่า 13 ปีให้สร้างบัญชีโดยรู้เห็น หากคุณเชื่อว่าเด็กได้ให้ข้อมูลส่วนบุคคล โปรดติดต่อ admin@dappgo.com',
  vi: 'Number RPG không hướng đến trẻ em dưới 13 tuổi. Ứng dụng dành cho người dùng từ 13 tuổi trở lên và chúng tôi không cố ý mời trẻ dưới 13 tuổi tạo tài khoản. Nếu bạn cho rằng trẻ em đã cung cấp dữ liệu cá nhân, hãy liên hệ admin@dappgo.com.',
  id: 'Number RPG tidak ditujukan untuk anak di bawah 13 tahun. Aplikasi ini ditujukan untuk pengguna berusia 13 tahun ke atas dan kami tidak dengan sengaja mengundang anak di bawah 13 tahun untuk membuat akun. Jika Anda yakin anak telah memberikan data pribadi, hubungi admin@dappgo.com.',
};

const deleteCopyByLocale = {
  en: {
    summary: `${ownerByLocale.en} You can request deletion in the app, on this page, or by email.`,
    app: 'Open Number RPG and go to Settings → Delete account. Read the confirmation, confirm the deletion, and keep the app online until it reports success. In-app deletion takes effect immediately. If an Apple identity is linked, the app may require Apple re-authorisation before deletion can finish.',
    requestHeading: 'Request deletion by email or web form',
    request: 'For Apple, Facebook, or guest accounts, use the form on this page or email admin@dappgo.com. Include the account ID from Settings → Account and the contact email linked to the account when available. Email and web-form requests are completed within 30 days after verification; verification can use the account ID or a reply from the linked email. Do not send a password, provider access token, or Apple private key.',
    removedHeading: 'What we remove',
    removed: 'A successful deletion removes the account and player data: provider identities, device and session records, cloud saves, scores, invites, friendships, gifts, rewards, events, activity, fraud records, and push tokens. Local game progress is reset by the app. Purchase records required by Apple or Google stay with those stores.',
    timingHeading: 'How long it takes',
    timing: 'In-app and web self-service deletion take effect immediately. Email and web-form requests are completed within 30 days after verification. To verify, provide the account ID from Settings → Account or reply from the email linked to the account.',
    timingTwo: 'Purchase records required by Apple or Google stay with those stores. Contact admin@dappgo.com if you need help or cannot access the account.',
  },
  'zh-TW': {
    summary: `${ownerByLocale['zh-TW']} 您可以在 App 內、本頁面或透過電子郵件要求刪除。`,
    app: '開啟 Number RPG，前往設定 → 刪除帳戶。閱讀確認訊息並確認刪除，保持 App 在線直到顯示成功。App 內刪除會立即生效。若已連結 Apple 身分，App 可能要求 Apple 重新授權。',
    requestHeading: '透過電子郵件或網頁表單要求刪除',
    request: 'Apple、Facebook 或訪客帳戶可以使用本頁表單或寄信至 admin@dappgo.com。若可以，請提供設定 → 帳戶中的帳戶 ID，以及與帳戶綁定的聯絡電子郵件。電子郵件與網頁表單請求會在完成驗證後 30 天內處理；驗證可以使用帳戶 ID，或由綁定電子郵件回覆。不要寄送密碼、供應商存取權杖或 Apple 私密金鑰。',
    removedHeading: '我們會移除的資料',
    removed: '成功刪除會移除帳戶及玩家資料：供應商身分、裝置與工作階段、雲端存檔、分數、邀請、好友、禮物、獎勵、事件、活動、反詐欺紀錄與推播權杖。App 會重設本機遊戲進度。Apple 或 Google 要求保留的購買紀錄會留在這些商店。',
    timingHeading: '需要多久',
    timing: 'App 內與網頁自助刪除會立即生效。電子郵件與網頁表單請求會在完成驗證後 30 天內處理。驗證時請提供設定 → 帳戶中的帳戶 ID，或由綁定帳戶的電子郵件回覆。',
    timingTwo: 'Apple 或 Google 要求保留的購買紀錄會留在這些商店。如需協助或無法存取帳戶，請聯絡 admin@dappgo.com。',
  },
  'zh-CN': {
    summary: `${ownerByLocale['zh-CN']} 您可以在 App 内、本页面或通过电子邮件请求删除。`,
    app: '打开 Number RPG，前往设置 → 删除账户。阅读确认消息并确认删除，保持 App 在线直到显示成功。App 内删除会立即生效。如果已关联 Apple 身份，App 可能要求 Apple 重新授权。',
    requestHeading: '通过电子邮件或网页表单请求删除',
    request: 'Apple、Facebook 或访客账户可以使用本页面表单或发送邮件至 admin@dappgo.com。如果可以，请提供设置 → 账户中的账户 ID，以及与账户关联的联系邮箱。电子邮件和网页表单请求会在完成验证后 30 天内处理；验证可以使用账户 ID，或由关联邮箱回复。不要发送密码、供应商访问令牌或 Apple 私钥。',
    removedHeading: '我们会移除的数据',
    removed: '成功删除会移除账户及玩家数据：供应商身份、设备与会话、云端存档、分数、邀请、好友、礼物、奖励、事件、活动、反欺诈记录和推送令牌。App 会重置本地游戏进度。Apple 或 Google 要求保留的购买记录会留在这些商店。',
    timingHeading: '需要多长时间',
    timing: 'App 内和网页自助删除会立即生效。电子邮件和网页表单请求会在完成验证后 30 天内处理。验证时请提供设置 → 账户中的账户 ID，或由关联账户的邮箱回复。',
    timingTwo: 'Apple 或 Google 要求保留的购买记录会留在这些商店。如需帮助或无法访问账户，请联系 admin@dappgo.com。',
  },
  ja: {
    summary: `${ownerByLocale.ja} アプリ内、このページ、またはメールで削除を依頼できます。`,
    app: 'Number RPG を開き、設定 → アカウントを削除に進みます。確認内容を読み、削除を確定し、成功が表示されるまでアプリをオンラインにしてください。アプリ内の削除は直ちに反映されます。Apple ID を連携している場合、Apple の再認証が必要になることがあります。',
    requestHeading: 'メールまたはウェブフォームで削除を依頼',
    request: 'Apple、Facebook、またはゲストアカウントは、このページのフォームまたは admin@dappgo.com へのメールを利用できます。可能であれば、設定 → アカウントのアカウント ID と連携したメールアドレスを入力してください。メールとウェブフォームの依頼は本人確認後 30 日以内に完了します。確認にはアカウント ID または連携メールからの返信を使います。パスワード、プロバイダーのアクセストークン、Apple の秘密鍵は送らないでください。',
    removedHeading: '削除されるデータ',
    removed: '削除が完了すると、プロバイダーの認証情報、端末とセッション、クラウドセーブ、スコア、招待、フレンド、ギフト、報酬、イベント、アクティビティ、不正防止記録、プッシュトークンなどのアカウントとプレイヤーデータを削除します。アプリ内の進行状況はリセットされます。Apple または Google が保持を必要とする購入記録は各ストアに残ります。',
    timingHeading: '所要時間',
    timing: 'アプリ内およびウェブのセルフサービスによる削除は直ちに反映されます。メールとウェブフォームの依頼は本人確認後 30 日以内に完了します。確認には設定 → アカウントのアカウント ID、または連携メールからの返信を使います。',
    timingTwo: 'Apple または Google が保持を必要とする購入記録は各ストアに残ります。サポートが必要な場合やアカウントにアクセスできない場合は admin@dappgo.com までご連絡ください。',
  },
  ko: {
    summary: `${ownerByLocale.ko} 앱, 이 페이지 또는 이메일로 삭제를 요청할 수 있습니다.`,
    app: 'Number RPG를 열고 설정 → 계정 삭제로 이동하세요. 안내를 읽고 삭제를 확인한 다음 성공 메시지가 표시될 때까지 앱을 온라인 상태로 유지하세요. 앱 내 삭제는 즉시 적용됩니다. Apple ID가 연결되어 있으면 Apple 재인증이 필요할 수 있습니다.',
    requestHeading: '이메일 또는 웹 양식으로 삭제 요청',
    request: 'Apple, Facebook 또는 게스트 계정은 이 페이지의 양식이나 admin@dappgo.com 이메일을 이용하세요. 가능하면 설정 → 계정의 계정 ID와 계정에 연결된 연락 이메일을 제공하세요. 이메일 및 웹 양식 요청은 본인 확인 후 30일 이내에 완료됩니다. 계정 ID 또는 연결된 이메일의 회신으로 확인합니다. 비밀번호, 제공자 액세스 토큰 또는 Apple 개인 키는 보내지 마세요.',
    removedHeading: '삭제되는 데이터',
    removed: '삭제가 완료되면 제공자 ID, 기기와 세션, 클라우드 저장, 점수, 초대, 친구, 선물, 보상, 이벤트, 활동, 부정행위 기록 및 푸시 토큰 등 계정과 플레이어 데이터를 삭제합니다. 앱 내 진행 상황은 초기화됩니다. Apple 또는 Google이 보관해야 하는 구매 기록은 각 스토어에 남습니다.',
    timingHeading: '처리 시간',
    timing: '앱 내 삭제와 웹 셀프서비스 삭제는 즉시 적용됩니다. 이메일 및 웹 양식 요청은 본인 확인 후 30일 이내에 완료됩니다. 설정 → 계정의 계정 ID 또는 연결된 이메일의 회신으로 확인합니다.',
    timingTwo: 'Apple 또는 Google이 보관해야 하는 구매 기록은 각 스토어에 남습니다. 도움이 필요하거나 계정에 접근할 수 없으면 admin@dappgo.com으로 연락해 주세요.',
  },
  es: {
    summary: `${ownerByLocale.es} Puedes solicitar la eliminación en la aplicación, en esta página o por correo electrónico.`,
    app: 'Abre Number RPG y ve a Ajustes → Eliminar cuenta. Lee la confirmación, confirma la eliminación y mantén la aplicación conectada hasta que indique que se completó. La eliminación desde la aplicación tiene efecto inmediato. Si hay una identidad de Apple vinculada, la aplicación puede pedirte que vuelvas a autorizar Apple.',
    requestHeading: 'Solicitar la eliminación por correo o formulario web',
    request: 'Para cuentas de Apple, Facebook o invitado, usa el formulario de esta página o escribe a admin@dappgo.com. Cuando sea posible, incluye el ID de cuenta de Ajustes → Cuenta y el correo de contacto vinculado. Las solicitudes por correo o formulario web se completan en un plazo de 30 días después de la verificación; verificamos con el ID o con una respuesta desde el correo vinculado. No envíes contraseñas, tokens de acceso ni claves privadas de Apple.',
    removedHeading: 'Qué eliminamos',
    removed: 'Una eliminación correcta elimina la cuenta y los datos del jugador: identidades de proveedores, dispositivos y sesiones, partidas guardadas, puntuaciones, invitaciones, amistades, regalos, recompensas, eventos, actividad, registros antifraude y tokens de notificaciones. La aplicación restablece el progreso local. Los registros de compras que Apple o Google deban conservar permanecen en esas tiendas.',
    timingHeading: 'Cuánto tarda',
    timing: 'La eliminación desde la aplicación y la eliminación autoservicio desde la web tienen efecto inmediato. Las solicitudes por correo o formulario web se completan en un plazo de 30 días después de la verificación. Para verificar, proporciona el ID de Ajustes → Cuenta o responde desde el correo vinculado.',
    timingTwo: 'Los registros de compras que Apple o Google deban conservar permanecen en esas tiendas. Contacta con admin@dappgo.com si necesitas ayuda o no puedes acceder a la cuenta.',
  },
  fr: {
    summary: `${ownerByLocale.fr} Vous pouvez demander la suppression dans l’application, sur cette page ou par e-mail.`,
    app: 'Ouvrez Number RPG et accédez à Réglages → Supprimer le compte. Lisez la confirmation, confirmez la suppression et gardez l’application en ligne jusqu’à l’affichage de la réussite. La suppression dans l’application prend effet immédiatement. Si une identité Apple est associée, l’application peut demander une nouvelle autorisation Apple.',
    requestHeading: 'Demander la suppression par e-mail ou formulaire web',
    request: 'Pour les comptes Apple, Facebook ou invités, utilisez le formulaire de cette page ou écrivez à admin@dappgo.com. Si possible, indiquez l’identifiant du compte dans Réglages → Compte et l’adresse e-mail de contact associée. Les demandes par e-mail ou formulaire web sont traitées dans les 30 jours suivant la vérification ; nous vérifions avec l’identifiant ou une réponse depuis l’adresse associée. N’envoyez pas de mot de passe, de jeton d’accès ni de clé privée Apple.',
    removedHeading: 'Données supprimées',
    removed: 'Une suppression réussie retire le compte et les données du joueur : identités des fournisseurs, appareils et sessions, sauvegardes cloud, scores, invitations, amitiés, cadeaux, récompenses, événements, activité, données antifraude et jetons de notification. La progression locale est réinitialisée par l’application. Les relevés d’achat qu’Apple ou Google doivent conserver restent auprès de ces boutiques.',
    timingHeading: 'Délai',
    timing: 'La suppression dans l’application et la suppression en libre-service sur le web prennent effet immédiatement. Les demandes par e-mail ou formulaire web sont traitées dans les 30 jours suivant la vérification. Pour vérifier, fournissez l’identifiant dans Réglages → Compte ou répondez depuis l’adresse associée.',
    timingTwo: 'Les relevés d’achat qu’Apple ou Google doivent conserver restent auprès de ces boutiques. Contactez admin@dappgo.com si vous avez besoin d’aide ou si vous ne pouvez pas accéder au compte.',
  },
  de: {
    summary: `${ownerByLocale.de} Sie können die Löschung in der App, auf dieser Seite oder per E-Mail anfordern.`,
    app: 'Öffnen Sie Number RPG und gehen Sie zu Einstellungen → Konto löschen. Lesen Sie die Bestätigung, bestätigen Sie die Löschung und lassen Sie die App online, bis sie den Erfolg meldet. Die Löschung in der App wird sofort wirksam. Bei einer verknüpften Apple-Identität kann eine erneute Apple-Autorisierung erforderlich sein.',
    requestHeading: 'Löschung per E-Mail oder Webformular anfordern',
    request: 'Für Apple-, Facebook- oder Gastkonten können Sie das Formular auf dieser Seite oder admin@dappgo.com verwenden. Geben Sie nach Möglichkeit die Konto-ID unter Einstellungen → Konto und die mit dem Konto verknüpfte Kontakt-E-Mail an. Anfragen per E-Mail oder Webformular werden innerhalb von 30 Tagen nach der Verifizierung abgeschlossen; zur Bestätigung verwenden wir die Konto-ID oder eine Antwort von der verknüpften E-Mail-Adresse. Senden Sie kein Passwort, Zugriffstoken oder keinen privaten Apple-Schlüssel.',
    removedHeading: 'Was wir löschen',
    removed: 'Bei erfolgreicher Löschung entfernen wir das Konto und Spielerdaten: Anbieteridentitäten, Geräte und Sitzungen, Cloud-Spielstände, Punktzahlen, Einladungen, Freundschaften, Geschenke, Belohnungen, Ereignisse, Aktivitäten, Betrugsaufzeichnungen und Push-Tokens. Der lokale Spielfortschritt wird von der App zurückgesetzt. Von Apple oder Google aufzubewahrende Kaufdaten verbleiben bei diesen Stores.',
    timingHeading: 'Wie lange es dauert',
    timing: 'Die Löschung in der App und die selbst bediente Löschung im Web werden sofort wirksam. Anfragen per E-Mail oder Webformular werden innerhalb von 30 Tagen nach der Verifizierung abgeschlossen. Zur Verifizierung benötigen wir die Konto-ID unter Einstellungen → Konto oder eine Antwort von der verknüpften E-Mail-Adresse.',
    timingTwo: 'Von Apple oder Google aufzubewahrende Kaufdaten verbleiben bei diesen Stores. Wenden Sie sich an admin@dappgo.com, wenn Sie Hilfe benötigen oder keinen Zugriff auf das Konto haben.',
  },
  'pt-BR': {
    summary: `${ownerByLocale['pt-BR']} Você pode solicitar a exclusão no aplicativo, nesta página ou por e-mail.`,
    app: 'Abra o Number RPG e acesse Configurações → Excluir conta. Leia a confirmação, confirme a exclusão e mantenha o aplicativo online até ele informar que foi concluída. A exclusão no aplicativo entra em vigor imediatamente. Se houver uma identidade Apple vinculada, o aplicativo poderá exigir uma nova autorização da Apple.',
    requestHeading: 'Solicitar exclusão por e-mail ou formulário web',
    request: 'Para contas Apple, Facebook ou de visitante, use o formulário desta página ou envie um e-mail para admin@dappgo.com. Quando possível, inclua o ID da conta em Configurações → Conta e o e-mail de contato vinculado. Solicitações por e-mail ou formulário web são concluídas em até 30 dias após a verificação; verificamos pelo ID ou por uma resposta do e-mail vinculado. Não envie senha, token de acesso ou chave privada da Apple.',
    removedHeading: 'O que removemos',
    removed: 'Uma exclusão bem-sucedida remove a conta e os dados do jogador: identidades de provedores, dispositivos e sessões, salvamentos na nuvem, pontuações, convites, amizades, presentes, recompensas, eventos, atividade, registros antifraude e tokens de push. O progresso local é redefinido pelo aplicativo. Registros de compras que a Apple ou o Google precisem manter permanecem nessas lojas.',
    timingHeading: 'Quanto tempo leva',
    timing: 'A exclusão no aplicativo e a exclusão autônoma pela web entram em vigor imediatamente. Solicitações por e-mail ou formulário web são concluídas em até 30 dias após a verificação. Para verificar, forneça o ID em Configurações → Conta ou responda pelo e-mail vinculado.',
    timingTwo: 'Registros de compras que a Apple ou o Google precisem manter permanecem nessas lojas. Entre em contato com admin@dappgo.com se precisar de ajuda ou não conseguir acessar a conta.',
  },
  th: {
    summary: `${ownerByLocale.th} คุณสามารถขอลบได้ในแอป หน้านี้ หรือทางอีเมล`,
    app: 'เปิด Number RPG แล้วไปที่การตั้งค่า → ลบบัญชี อ่านคำยืนยัน ยืนยันการลบ และเปิดแอปออนไลน์จนกว่าจะแสดงว่าสำเร็จ การลบในแอปมีผลทันที หากเชื่อมโยงตัวตน Apple ไว้ แอปอาจขอให้ยืนยัน Apple อีกครั้ง',
    requestHeading: 'ขอลบทางอีเมลหรือแบบฟอร์มเว็บ',
    request: 'สำหรับบัญชี Apple, Facebook หรือบัญชีผู้เยี่ยมชม ให้ใช้แบบฟอร์มในหน้านี้หรือส่งอีเมลไปที่ admin@dappgo.com หากทำได้ ให้ระบุ ID บัญชีจากการตั้งค่า → บัญชีและอีเมลติดต่อที่เชื่อมโยง คำขอทางอีเมลหรือแบบฟอร์มเว็บจะเสร็จภายใน 30 วันหลังยืนยันตัวตน โดยยืนยันด้วย ID บัญชีหรือการตอบกลับจากอีเมลที่เชื่อมโยง อย่าส่งรหัสผ่าน โทเค็นการเข้าถึง หรือคีย์ส่วนตัวของ Apple',
    removedHeading: 'ข้อมูลที่เราลบ',
    removed: 'การลบที่สำเร็จจะลบบัญชีและข้อมูลผู้เล่น ได้แก่ ตัวตนของผู้ให้บริการ อุปกรณ์และเซสชัน การบันทึกบนคลาวด์ คะแนน คำเชิญ เพื่อน ของขวัญ รางวัล เหตุการณ์ กิจกรรม ข้อมูลป้องกันการทุจริต และโทเค็นพุช แอปจะรีเซ็ตความคืบหน้าในเครื่อง บันทึกการซื้อที่ Apple หรือ Google จำเป็นต้องเก็บไว้จะยังคงอยู่กับร้านค้าเหล่านั้น',
    timingHeading: 'ใช้เวลานานเท่าใด',
    timing: 'การลบในแอปและการลบด้วยตนเองบนเว็บมีผลทันที คำขอทางอีเมลและแบบฟอร์มเว็บจะเสร็จภายใน 30 วันหลังยืนยันตัวตน ในการยืนยัน โปรดให้ ID บัญชีจากการตั้งค่า → บัญชี หรือตอบกลับจากอีเมลที่เชื่อมโยง',
    timingTwo: 'บันทึกการซื้อที่ Apple หรือ Google จำเป็นต้องเก็บไว้จะยังคงอยู่กับร้านค้าเหล่านั้น หากต้องการความช่วยเหลือหรือเข้าถึงบัญชีไม่ได้ โปรดติดต่อ admin@dappgo.com',
  },
  vi: {
    summary: `${ownerByLocale.vi} Bạn có thể yêu cầu xóa trong ứng dụng, trên trang này hoặc qua email.`,
    app: 'Mở Number RPG và vào Cài đặt → Xóa tài khoản. Đọc xác nhận, xác nhận xóa và giữ ứng dụng trực tuyến cho đến khi báo thành công. Xóa trong ứng dụng có hiệu lực ngay lập tức. Nếu đã liên kết danh tính Apple, ứng dụng có thể yêu cầu xác thực lại Apple.',
    requestHeading: 'Yêu cầu xóa qua email hoặc biểu mẫu web',
    request: 'Đối với tài khoản Apple, Facebook hoặc khách, hãy dùng biểu mẫu trên trang này hoặc gửi email đến admin@dappgo.com. Nếu có thể, hãy cung cấp ID tài khoản trong Cài đặt → Tài khoản và email liên hệ đã liên kết. Yêu cầu qua email hoặc biểu mẫu web được hoàn tất trong vòng 30 ngày sau khi xác minh; chúng tôi xác minh bằng ID hoặc thư trả lời từ email đã liên kết. Không gửi mật khẩu, mã thông báo truy cập hoặc khóa riêng Apple.',
    removedHeading: 'Dữ liệu chúng tôi xóa',
    removed: 'Việc xóa thành công sẽ xóa tài khoản và dữ liệu người chơi: danh tính nhà cung cấp, thiết bị và phiên, bản lưu trên đám mây, điểm số, lời mời, bạn bè, quà tặng, phần thưởng, sự kiện, hoạt động, bản ghi chống gian lận và mã thông báo đẩy. Ứng dụng đặt lại tiến trình cục bộ. Bản ghi giao dịch mà Apple hoặc Google yêu cầu giữ lại sẽ ở lại với các cửa hàng đó.',
    timingHeading: 'Thời gian xử lý',
    timing: 'Xóa trong ứng dụng và xóa tự phục vụ trên web có hiệu lực ngay lập tức. Yêu cầu qua email và biểu mẫu web được hoàn tất trong vòng 30 ngày sau khi xác minh. Để xác minh, hãy cung cấp ID trong Cài đặt → Tài khoản hoặc trả lời từ email đã liên kết.',
    timingTwo: 'Bản ghi giao dịch mà Apple hoặc Google yêu cầu giữ lại sẽ ở lại với các cửa hàng đó. Hãy liên hệ admin@dappgo.com nếu cần trợ giúp hoặc không thể truy cập tài khoản.',
  },
  id: {
    summary: `${ownerByLocale.id} Anda dapat meminta penghapusan di dalam aplikasi, pada halaman ini, atau melalui email.`,
    app: 'Buka Number RPG dan buka Pengaturan → Hapus akun. Baca konfirmasi, konfirmasikan penghapusan, dan tetap online sampai aplikasi melaporkan keberhasilan. Penghapusan di dalam aplikasi berlaku segera. Jika identitas Apple tertaut, aplikasi mungkin meminta otorisasi ulang Apple.',
    requestHeading: 'Minta penghapusan melalui email atau formulir web',
    request: 'Untuk akun Apple, Facebook, atau tamu, gunakan formulir di halaman ini atau email admin@dappgo.com. Jika tersedia, sertakan ID akun dari Pengaturan → Akun dan email kontak yang tertaut. Permintaan melalui email atau formulir web diselesaikan dalam 30 hari setelah verifikasi; kami memverifikasi dengan ID atau balasan dari email yang tertaut. Jangan kirim kata sandi, token akses, atau kunci pribadi Apple.',
    removedHeading: 'Yang kami hapus',
    removed: 'Penghapusan yang berhasil menghapus akun dan data pemain: identitas penyedia, perangkat dan sesi, simpanan cloud, skor, undangan, pertemanan, hadiah, reward, peristiwa, aktivitas, catatan anti-penipuan, dan token push. Aplikasi mengatur ulang kemajuan lokal. Catatan pembelian yang wajib disimpan Apple atau Google tetap berada di toko tersebut.',
    timingHeading: 'Berapa lama?',
    timing: 'Penghapusan di dalam aplikasi dan penghapusan mandiri melalui web berlaku segera. Permintaan melalui email dan formulir web diselesaikan dalam 30 hari setelah verifikasi. Untuk verifikasi, berikan ID akun dari Pengaturan → Akun atau balasan dari email yang tertaut.',
    timingTwo: 'Catatan pembelian yang wajib disimpan Apple atau Google tetap berada di toko tersebut. Hubungi admin@dappgo.com jika membutuhkan bantuan atau tidak dapat mengakses akun.',
  },
};

const deletionToolsByLocale = {
  en: { heading: 'Delete on the web', intro: 'Use the app for immediate deletion, or use these browser options when the app is not installed.', googleHeading: 'Self-service with Google', googleCopy: 'Sign in with Google to confirm the account display name, then type DELETE to continue.', accountLabel: 'Signed in as', confirmLabel: 'Type DELETE to confirm', confirmHint: 'This takes effect immediately.', confirmButton: 'Delete my account', requestHeading: 'Request help with another account', requestCopy: 'For Apple, Facebook, or guest accounts, send a request with your account ID and contact email. We will complete it within 30 days after verification.', accountIdLabel: 'Account ID', accountIdHint: 'Find it in Settings → Account.', emailLabel: 'Contact email', reasonLabel: 'Reason (optional)', submitButton: 'Submit deletion request', timeline: 'Requests by email or web form are completed within 30 days after verification. Verify with the account ID from Settings → Account or a reply from the linked email.', storeNote: 'Purchase records required by Apple or Google stay with those stores.', signedOut: 'Google sign-in is ready when the browser library loads.', success: 'Your account deletion took effect immediately.', requestSuccess: 'Your request was sent. We will complete it within 30 days after verification.', error: 'We could not complete this request. Please try again or use the email option.', rateLimit: 'Too many requests. Please wait and try again later.' },
  'zh-TW': { heading: '在網頁上刪除', intro: 'App 內刪除會立即生效；若未安裝 App，也可以使用以下瀏覽器選項。', googleHeading: '使用 Google 自助刪除', googleCopy: '使用 Google 登入以確認帳戶顯示名稱，然後輸入 DELETE 繼續。', accountLabel: '登入帳戶', confirmLabel: '輸入 DELETE 以確認', confirmHint: '刪除會立即生效。', confirmButton: '刪除我的帳戶', requestHeading: '為其他帳戶提交請求', requestCopy: 'Apple、Facebook 或訪客帳戶請提供帳戶 ID 和聯絡電子郵件。我們會在驗證後 30 天內完成。', accountIdLabel: '帳戶 ID', accountIdHint: '可在設定 → 帳戶中找到。', emailLabel: '聯絡電子郵件', reasonLabel: '原因（選填）', submitButton: '提交刪除請求', timeline: '電子郵件或網頁表單請求會在驗證後 30 天內完成。請使用設定 → 帳戶中的帳戶 ID，或由綁定電子郵件回覆驗證。', storeNote: 'Apple 或 Google 要求保留的購買紀錄會留在這些商店。', signedOut: 'Google 登入會在瀏覽器程式庫載入後可用。', success: '您的帳戶刪除已立即生效。', requestSuccess: '請求已送出。我們會在驗證後 30 天內完成。', error: '無法完成請求。請重試或使用電子郵件選項。', rateLimit: '請求過多，請稍後再試。' },
  'zh-CN': { heading: '在网页上删除', intro: 'App 内删除会立即生效；如果未安装 App，也可以使用以下浏览器选项。', googleHeading: '使用 Google 自助删除', googleCopy: '使用 Google 登录以确认账户显示名称，然后输入 DELETE 继续。', accountLabel: '登录账户', confirmLabel: '输入 DELETE 以确认', confirmHint: '删除会立即生效。', confirmButton: '删除我的账户', requestHeading: '为其他账户提交请求', requestCopy: 'Apple、Facebook 或访客账户请提供账户 ID 和联系邮箱。我们会在验证后 30 天内完成。', accountIdLabel: '账户 ID', accountIdHint: '可在设置 → 账户中找到。', emailLabel: '联系邮箱', reasonLabel: '原因（可选）', submitButton: '提交删除请求', timeline: '电子邮件或网页表单请求会在验证后 30 天内完成。请使用设置 → 账户中的账户 ID，或由关联邮箱回复验证。', storeNote: 'Apple 或 Google 要求保留的购买记录会留在这些商店。', signedOut: 'Google 登录会在浏览器程序库加载后可用。', success: '您的账户删除已立即生效。', requestSuccess: '请求已发送。我们会在验证后 30 天内完成。', error: '无法完成请求。请重试或使用电子邮件选项。', rateLimit: '请求过多，请稍后再试。' },
  ja: { heading: 'ウェブで削除', intro: 'アプリ内の削除は直ちに反映されます。アプリをインストールしていない場合は、次のブラウザー選択肢を利用できます。', googleHeading: 'Google によるセルフサービス', googleCopy: 'Google でサインインしてアカウントの表示名を確認し、DELETE と入力して続行します。', accountLabel: 'サインイン中', confirmLabel: '確認のため DELETE と入力', confirmHint: '削除は直ちに反映されます。', confirmButton: 'アカウントを削除', requestHeading: 'その他のアカウントを依頼', requestCopy: 'Apple、Facebook、ゲストアカウントはアカウント ID と連絡先メールを送ってください。確認後 30 日以内に完了します。', accountIdLabel: 'アカウント ID', accountIdHint: '設定 → アカウントで確認できます。', emailLabel: '連絡先メール', reasonLabel: '理由（任意）', submitButton: '削除依頼を送信', timeline: 'メールまたはウェブフォームの依頼は本人確認後 30 日以内に完了します。設定 → アカウントの ID または連携メールからの返信で確認します。', storeNote: 'Apple または Google が保持を必要とする購入記録は各ストアに残ります。', signedOut: 'Google のサインインはブラウザーライブラリの読み込み後に利用できます。', success: 'アカウントの削除は直ちに反映されました。', requestSuccess: '依頼を送信しました。本人確認後 30 日以内に完了します。', error: '依頼を完了できませんでした。再試行するかメールを利用してください。', rateLimit: '依頼が多すぎます。しばらくしてから再試行してください。' },
  ko: { heading: '웹에서 삭제', intro: '앱 내 삭제는 즉시 적용됩니다. 앱이 설치되어 있지 않다면 다음 브라우저 옵션을 사용하세요.', googleHeading: 'Google 셀프서비스', googleCopy: 'Google로 로그인하여 계정 표시 이름을 확인한 다음 DELETE를 입력해 계속하세요.', accountLabel: '로그인 계정', confirmLabel: '확인하려면 DELETE 입력', confirmHint: '삭제는 즉시 적용됩니다.', confirmButton: '내 계정 삭제', requestHeading: '다른 계정 삭제 요청', requestCopy: 'Apple, Facebook 또는 게스트 계정은 계정 ID와 연락 이메일을 보내 주세요. 본인 확인 후 30일 이내에 완료합니다.', accountIdLabel: '계정 ID', accountIdHint: '설정 → 계정에서 확인하세요.', emailLabel: '연락 이메일', reasonLabel: '사유(선택)', submitButton: '삭제 요청 제출', timeline: '이메일 또는 웹 양식 요청은 본인 확인 후 30일 이내에 완료됩니다. 설정 → 계정의 계정 ID 또는 연결된 이메일 회신으로 확인합니다.', storeNote: 'Apple 또는 Google이 보관해야 하는 구매 기록은 각 스토어에 남습니다.', signedOut: '브라우저 라이브러리가 로드되면 Google 로그인을 사용할 수 있습니다.', success: '계정 삭제가 즉시 적용되었습니다.', requestSuccess: '요청이 전송되었습니다. 본인 확인 후 30일 이내에 완료합니다.', error: '요청을 완료할 수 없습니다. 다시 시도하거나 이메일 옵션을 사용하세요.', rateLimit: '요청이 너무 많습니다. 잠시 후 다시 시도하세요.' },
  es: { heading: 'Eliminar en la web', intro: 'La eliminación desde la aplicación tiene efecto inmediato. Si no tienes la aplicación instalada, usa estas opciones del navegador.', googleHeading: 'Autoservicio con Google', googleCopy: 'Inicia sesión con Google para confirmar el nombre visible de la cuenta y escribe DELETE para continuar.', accountLabel: 'Sesión iniciada como', confirmLabel: 'Escribe DELETE para confirmar', confirmHint: 'Tiene efecto inmediato.', confirmButton: 'Eliminar mi cuenta', requestHeading: 'Solicitar ayuda con otra cuenta', requestCopy: 'Para cuentas de Apple, Facebook o invitado, envía el ID de cuenta y el correo de contacto. Lo completaremos en un plazo de 30 días tras la verificación.', accountIdLabel: 'ID de cuenta', accountIdHint: 'Lo encontrarás en Ajustes → Cuenta.', emailLabel: 'Correo de contacto', reasonLabel: 'Motivo (opcional)', submitButton: 'Enviar solicitud de eliminación', timeline: 'Las solicitudes por correo o formulario web se completan en un plazo de 30 días después de la verificación. Verifica con el ID de Ajustes → Cuenta o respondiendo desde el correo vinculado.', storeNote: 'Los registros de compras que Apple o Google deban conservar permanecen en esas tiendas.', signedOut: 'El inicio de sesión de Google estará disponible cuando se cargue la biblioteca del navegador.', success: 'La eliminación de tu cuenta se ha aplicado de inmediato.', requestSuccess: 'Hemos enviado tu solicitud. La completaremos en un plazo de 30 días tras la verificación.', error: 'No hemos podido completar la solicitud. Inténtalo de nuevo o usa el correo electrónico.', rateLimit: 'Demasiadas solicitudes. Espera un momento e inténtalo de nuevo.' },
  fr: { heading: 'Supprimer sur le web', intro: 'La suppression dans l’application prend effet immédiatement. Si l’application n’est pas installée, utilisez ces options du navigateur.', googleHeading: 'Libre-service avec Google', googleCopy: 'Connectez-vous avec Google pour confirmer le nom affiché du compte, puis saisissez DELETE pour continuer.', accountLabel: 'Connecté en tant que', confirmLabel: 'Saisissez DELETE pour confirmer', confirmHint: 'La suppression prend effet immédiatement.', confirmButton: 'Supprimer mon compte', requestHeading: 'Demander de l’aide pour un autre compte', requestCopy: 'Pour les comptes Apple, Facebook ou invités, envoyez l’identifiant du compte et l’adresse e-mail de contact. La demande sera traitée dans les 30 jours suivant la vérification.', accountIdLabel: 'Identifiant du compte', accountIdHint: 'Disponible dans Réglages → Compte.', emailLabel: 'E-mail de contact', reasonLabel: 'Motif (facultatif)', submitButton: 'Envoyer la demande de suppression', timeline: 'Les demandes par e-mail ou formulaire web sont traitées dans les 30 jours suivant la vérification. Vérifiez avec l’identifiant dans Réglages → Compte ou une réponse depuis l’adresse associée.', storeNote: 'Les relevés d’achat qu’Apple ou Google doivent conserver restent auprès de ces boutiques.', signedOut: 'La connexion Google sera disponible après le chargement de la bibliothèque du navigateur.', success: 'La suppression de votre compte a pris effet immédiatement.', requestSuccess: 'Votre demande a été envoyée. Elle sera traitée dans les 30 jours suivant la vérification.', error: 'Nous n’avons pas pu traiter la demande. Réessayez ou utilisez l’e-mail.', rateLimit: 'Trop de demandes. Veuillez patienter avant de réessayer.' },
  de: { heading: 'Im Web löschen', intro: 'Die Löschung in der App wird sofort wirksam. Wenn die App nicht installiert ist, können Sie diese Browseroptionen verwenden.', googleHeading: 'Selbstbedienung mit Google', googleCopy: 'Melden Sie sich mit Google an, bestätigen Sie den Kontonamen und geben Sie DELETE ein, um fortzufahren.', accountLabel: 'Angemeldet als', confirmLabel: 'Zur Bestätigung DELETE eingeben', confirmHint: 'Die Löschung wird sofort wirksam.', confirmButton: 'Mein Konto löschen', requestHeading: 'Hilfe für ein anderes Konto anfordern', requestCopy: 'Für Apple-, Facebook- oder Gastkonten senden Sie Konto-ID und Kontakt-E-Mail. Wir schließen die Anfrage innerhalb von 30 Tagen nach der Verifizierung ab.', accountIdLabel: 'Konto-ID', accountIdHint: 'Unter Einstellungen → Konto zu finden.', emailLabel: 'Kontakt-E-Mail', reasonLabel: 'Grund (optional)', submitButton: 'Löschanfrage senden', timeline: 'Anfragen per E-Mail oder Webformular werden innerhalb von 30 Tagen nach der Verifizierung abgeschlossen. Bestätigen Sie mit der Konto-ID unter Einstellungen → Konto oder einer Antwort von der verknüpften E-Mail-Adresse.', storeNote: 'Von Apple oder Google aufzubewahrende Kaufdaten verbleiben bei diesen Stores.', signedOut: 'Die Google-Anmeldung ist verfügbar, sobald die Browserbibliothek geladen ist.', success: 'Die Löschung Ihres Kontos wurde sofort wirksam.', requestSuccess: 'Ihre Anfrage wurde gesendet. Wir schließen sie innerhalb von 30 Tagen nach der Verifizierung ab.', error: 'Die Anfrage konnte nicht abgeschlossen werden. Versuchen Sie es erneut oder nutzen Sie E-Mail.', rateLimit: 'Zu viele Anfragen. Bitte warten Sie und versuchen Sie es später erneut.' },
  'pt-BR': { heading: 'Excluir pela web', intro: 'A exclusão no aplicativo entra em vigor imediatamente. Se o aplicativo não estiver instalado, use estas opções do navegador.', googleHeading: 'Autoatendimento com Google', googleCopy: 'Faça login com o Google para confirmar o nome exibido da conta e digite DELETE para continuar.', accountLabel: 'Login como', confirmLabel: 'Digite DELETE para confirmar', confirmHint: 'A exclusão entra em vigor imediatamente.', confirmButton: 'Excluir minha conta', requestHeading: 'Solicitar ajuda com outra conta', requestCopy: 'Para contas Apple, Facebook ou de visitante, envie o ID da conta e o e-mail de contato. Concluiremos em até 30 dias após a verificação.', accountIdLabel: 'ID da conta', accountIdHint: 'Encontre em Configurações → Conta.', emailLabel: 'E-mail de contato', reasonLabel: 'Motivo (opcional)', submitButton: 'Enviar solicitação de exclusão', timeline: 'Solicitações por e-mail ou formulário web são concluídas em até 30 dias após a verificação. Verifique com o ID em Configurações → Conta ou uma resposta do e-mail vinculado.', storeNote: 'Registros de compras que a Apple ou o Google precisem manter permanecem nessas lojas.', signedOut: 'O login do Google ficará disponível quando a biblioteca do navegador for carregada.', success: 'A exclusão da sua conta entrou em vigor imediatamente.', requestSuccess: 'Sua solicitação foi enviada. Nós a concluiremos em até 30 dias após a verificação.', error: 'Não foi possível concluir a solicitação. Tente novamente ou use o e-mail.', rateLimit: 'Solicitações demais. Aguarde e tente novamente mais tarde.' },
  th: { heading: 'ลบบนเว็บ', intro: 'การลบในแอปมีผลทันที หากไม่ได้ติดตั้งแอป ให้ใช้ตัวเลือกเบราว์เซอร์เหล่านี้', googleHeading: 'ลบด้วยตนเองผ่าน Google', googleCopy: 'ลงชื่อเข้าใช้ด้วย Google เพื่อยืนยันชื่อที่แสดงของบัญชี แล้วพิมพ์ DELETE เพื่อดำเนินการต่อ', accountLabel: 'ลงชื่อเข้าใช้ในชื่อ', confirmLabel: 'พิมพ์ DELETE เพื่อยืนยัน', confirmHint: 'มีผลทันที', confirmButton: 'ลบบัญชีของฉัน', requestHeading: 'ขอความช่วยเหลือสำหรับบัญชีอื่น', requestCopy: 'สำหรับบัญชี Apple, Facebook หรือผู้เยี่ยมชม ให้ส่ง ID บัญชีและอีเมลติดต่อ เราจะดำเนินการให้เสร็จภายใน 30 วันหลังยืนยันตัวตน', accountIdLabel: 'ID บัญชี', accountIdHint: 'ดูได้ที่การตั้งค่า → บัญชี', emailLabel: 'อีเมลติดต่อ', reasonLabel: 'เหตุผล (ไม่บังคับ)', submitButton: 'ส่งคำขอลบบัญชี', timeline: 'คำขอทางอีเมลหรือแบบฟอร์มเว็บจะเสร็จภายใน 30 วันหลังยืนยันตัวตน ยืนยันด้วย ID บัญชีจากการตั้งค่า → บัญชีหรือการตอบกลับจากอีเมลที่เชื่อมโยง', storeNote: 'บันทึกการซื้อที่ Apple หรือ Google จำเป็นต้องเก็บไว้จะยังคงอยู่กับร้านค้าเหล่านั้น', signedOut: 'การลงชื่อเข้าใช้ Google จะใช้ได้เมื่อโหลดไลบรารีเบราว์เซอร์แล้ว', success: 'การลบบัญชีของคุณมีผลทันที', requestSuccess: 'ส่งคำขอแล้ว เราจะดำเนินการให้เสร็จภายใน 30 วันหลังยืนยันตัวตน', error: 'ไม่สามารถดำเนินการตามคำขอได้ โปรดลองอีกครั้งหรือใช้อีเมล', rateLimit: 'มีคำขอมากเกินไป โปรดรอสักครู่แล้วลองใหม่' },
  vi: { heading: 'Xóa trên web', intro: 'Xóa trong ứng dụng có hiệu lực ngay lập tức. Nếu chưa cài ứng dụng, hãy dùng các lựa chọn trình duyệt này.', googleHeading: 'Tự xóa bằng Google', googleCopy: 'Đăng nhập bằng Google để xác nhận tên hiển thị của tài khoản, sau đó nhập DELETE để tiếp tục.', accountLabel: 'Đã đăng nhập với', confirmLabel: 'Nhập DELETE để xác nhận', confirmHint: 'Có hiệu lực ngay lập tức.', confirmButton: 'Xóa tài khoản của tôi', requestHeading: 'Yêu cầu trợ giúp cho tài khoản khác', requestCopy: 'Đối với tài khoản Apple, Facebook hoặc khách, hãy gửi ID tài khoản và email liên hệ. Chúng tôi sẽ hoàn tất trong vòng 30 ngày sau khi xác minh.', accountIdLabel: 'ID tài khoản', accountIdHint: 'Tìm trong Cài đặt → Tài khoản.', emailLabel: 'Email liên hệ', reasonLabel: 'Lý do (không bắt buộc)', submitButton: 'Gửi yêu cầu xóa', timeline: 'Yêu cầu qua email hoặc biểu mẫu web được hoàn tất trong vòng 30 ngày sau khi xác minh. Xác minh bằng ID trong Cài đặt → Tài khoản hoặc thư trả lời từ email đã liên kết.', storeNote: 'Bản ghi giao dịch mà Apple hoặc Google yêu cầu giữ lại sẽ ở lại với các cửa hàng đó.', signedOut: 'Đăng nhập Google sẽ dùng được sau khi thư viện trình duyệt tải xong.', success: 'Việc xóa tài khoản của bạn đã có hiệu lực ngay lập tức.', requestSuccess: 'Đã gửi yêu cầu. Chúng tôi sẽ hoàn tất trong vòng 30 ngày sau khi xác minh.', error: 'Không thể hoàn tất yêu cầu. Hãy thử lại hoặc dùng email.', rateLimit: 'Quá nhiều yêu cầu. Vui lòng đợi rồi thử lại.' },
  id: { heading: 'Hapus di web', intro: 'Penghapusan di dalam aplikasi berlaku segera. Jika aplikasi tidak terpasang, gunakan pilihan browser berikut.', googleHeading: 'Penghapusan mandiri dengan Google', googleCopy: 'Login dengan Google untuk mengonfirmasi nama tampilan akun, lalu ketik DELETE untuk melanjutkan.', accountLabel: 'Login sebagai', confirmLabel: 'Ketik DELETE untuk mengonfirmasi', confirmHint: 'Berlaku segera.', confirmButton: 'Hapus akun saya', requestHeading: 'Minta bantuan untuk akun lain', requestCopy: 'Untuk akun Apple, Facebook, atau tamu, kirim ID akun dan email kontak. Kami akan menyelesaikannya dalam 30 hari setelah verifikasi.', accountIdLabel: 'ID akun', accountIdHint: 'Temukan di Pengaturan → Akun.', emailLabel: 'Email kontak', reasonLabel: 'Alasan (opsional)', submitButton: 'Kirim permintaan penghapusan', timeline: 'Permintaan melalui email atau formulir web diselesaikan dalam 30 hari setelah verifikasi. Verifikasi dengan ID akun dari Pengaturan → Akun atau balasan dari email yang tertaut.', storeNote: 'Catatan pembelian yang wajib disimpan Apple atau Google tetap berada di toko tersebut.', signedOut: 'Login Google tersedia setelah pustaka browser dimuat.', success: 'Penghapusan akun Anda berlaku segera.', requestSuccess: 'Permintaan Anda telah dikirim. Kami akan menyelesaikannya dalam 30 hari setelah verifikasi.', error: 'Permintaan tidak dapat diselesaikan. Coba lagi atau gunakan email.', rateLimit: 'Terlalu banyak permintaan. Tunggu dan coba lagi nanti.' },
};

const serviceWordByLocale = { en: 'the service', 'zh-TW': '服務', 'zh-CN': '服务', ja: 'サービス', ko: '서비스', es: 'servicio', fr: 'service', de: 'Dienst', 'pt-BR': 'serviço', th: 'บริการ', vi: 'dịch vụ', id: 'layanan' };

const sharingByLocale = {
  en: 'Number RPG shares information with the providers needed for the feature you choose, including Apple, Google, Meta/Facebook, Firebase, Google AdMob, and RevenueCat. Each provider may process data under its own terms and privacy documentation.',
  'zh-TW': 'Number RPG 會與您選用功能所需的供應商分享資料，包括 Apple、Google、Meta／Facebook、Firebase、Google AdMob 與 RevenueCat。各供應商依其自身條款與隱私文件處理資料。',
  'zh-CN': 'Number RPG 会与您选择的功能所需的供应商分享数据，包括 Apple、Google、Meta／Facebook、Firebase、Google AdMob 和 RevenueCat。各供应商按照自己的条款和隐私文件处理数据。',
  ja: 'Number RPG は、選択した機能に必要な Apple、Google、Meta／Facebook、Firebase、Google AdMob、RevenueCat などのプロバイダーと情報を共有します。各プロバイダーは独自の規約とプライバシー文書に従って処理します。',
  ko: 'Number RPG는 선택한 기능에 필요한 Apple, Google, Meta/Facebook, Firebase, Google AdMob 및 RevenueCat과 정보를 공유합니다. 각 제공자는 자체 약관과 개인정보 문서에 따라 데이터를 처리할 수 있습니다.',
  es: 'Number RPG comparte información con los proveedores necesarios para la función que eliges, como Apple, Google, Meta/Facebook, Firebase, Google AdMob y RevenueCat. Cada proveedor puede tratar los datos según sus propios términos y documentos de privacidad.',
  fr: 'Number RPG partage des informations avec les fournisseurs nécessaires à la fonction que vous choisissez, notamment Apple, Google, Meta/Facebook, Firebase, Google AdMob et RevenueCat. Chaque fournisseur peut traiter les données selon ses propres conditions et documents de confidentialité.',
  de: 'Number RPG teilt Informationen mit den für die von Ihnen gewählte Funktion erforderlichen Anbietern, darunter Apple, Google, Meta/Facebook, Firebase, Google AdMob und RevenueCat. Jeder Anbieter kann Daten nach seinen eigenen Bedingungen und Datenschutzdokumenten verarbeiten.',
  'pt-BR': 'O Number RPG compartilha informações com os provedores necessários para o recurso escolhido, incluindo Apple, Google, Meta/Facebook, Firebase, Google AdMob e RevenueCat. Cada provedor pode processar dados segundo seus próprios termos e documentos de privacidade.',
  th: 'Number RPG แบ่งปันข้อมูลกับผู้ให้บริการที่จำเป็นสำหรับฟีเจอร์ที่คุณเลือก ได้แก่ Apple, Google, Meta/Facebook, Firebase, Google AdMob และ RevenueCat ผู้ให้บริการแต่ละรายอาจประมวลผลข้อมูลตามข้อกำหนดและเอกสารความเป็นส่วนตัวของตนเอง',
  vi: 'Number RPG chia sẻ thông tin với các nhà cung cấp cần thiết cho tính năng bạn chọn, gồm Apple, Google, Meta/Facebook, Firebase, Google AdMob và RevenueCat. Mỗi nhà cung cấp có thể xử lý dữ liệu theo điều khoản và tài liệu quyền riêng tư riêng.',
  id: 'Number RPG membagikan informasi dengan penyedia yang diperlukan untuk fitur yang Anda pilih, termasuk Apple, Google, Meta/Facebook, Firebase, Google AdMob, dan RevenueCat. Setiap penyedia dapat memproses data berdasarkan ketentuan dan dokumen privasinya sendiri.',
};

const providerDetailByLocale = {
  en: 'See the provider policies listed in Retention and deletion for more information.',
  'zh-TW': '詳細資訊請參閱「保存與刪除」中列出的供應商政策。',
  'zh-CN': '详细信息请参阅“保存与删除”中列出的供应商政策。',
  ja: '詳しくは「保存と削除」に記載したプロバイダーのポリシーをご覧ください。',
  ko: '자세한 내용은 보관 및 삭제에 나열된 제공자 정책을 확인하세요.',
  es: 'Consulta las políticas de los proveedores indicadas en Retención y eliminación para obtener más información.',
  fr: 'Pour plus d’informations, consultez les politiques des fournisseurs indiquées dans Conservation et suppression.',
  de: 'Weitere Informationen finden Sie in den unter Aufbewahrung und Löschung aufgeführten Anbieterrichtlinien.',
  'pt-BR': 'Para mais informações, consulte as políticas dos provedores listadas em Retenção e exclusão.',
  th: 'ดูข้อมูลเพิ่มเติมได้จากนโยบายของผู้ให้บริการที่ระบุไว้ในหัวข้อการเก็บรักษาและการลบ',
  vi: 'Xem chính sách của các nhà cung cấp trong mục Lưu giữ và xóa để biết thêm thông tin.',
  id: 'Lihat kebijakan penyedia yang tercantum dalam Penyimpanan dan penghapusan untuk informasi lebih lanjut.',
};

const termsIntroByLocale = {
  en: `${ownerByLocale.en} Number RPG is a mobile game. You may play as a guest. Optional Apple, Google, or Facebook sign-in supports cloud save, social features, leaderboards, and purchase restoration. Keep your device, sign-in credentials, and recovery information secure.`,
  'zh-TW': `${ownerByLocale['zh-TW']} Number RPG 是手機遊戲。您可以訪客身分遊玩。選擇性 Apple、Google 或 Facebook 登入支援雲端存檔、社交功能、排行榜與購買復原。請保護裝置、登入憑證與復原資訊。`,
  'zh-CN': `${ownerByLocale['zh-CN']} Number RPG 是手机游戏。您可以访客身份游玩。可选的 Apple、Google 或 Facebook 登录支持云端存档、社交功能、排行榜和购买恢复。请保护设备、登录凭证和恢复信息。`,
  ja: `${ownerByLocale.ja} Number RPG はモバイルゲームです。ゲストとして遊べます。任意の Apple、Google、Facebook サインインでクラウドセーブ、ソーシャル機能、ランキング、購入の復元を利用できます。端末、サインイン情報、復元情報を安全に管理してください。`,
  ko: `${ownerByLocale.ko} Number RPG는 모바일 게임입니다. 게스트로 플레이할 수 있습니다. 선택적 Apple, Google 또는 Facebook 로그인은 클라우드 저장, 소셜 기능, 순위표와 구매 복원을 지원합니다. 기기와 로그인 및 복구 정보를 안전하게 관리하세요.`,
  es: `${ownerByLocale.es} Number RPG es un juego para móviles. Puedes jugar como invitado. El inicio de sesión opcional con Apple, Google o Facebook permite guardar en la nube, usar funciones sociales, consultar clasificaciones y restaurar compras. Protege tu dispositivo, tus credenciales y la información de recuperación.`,
  fr: `${ownerByLocale.fr} Number RPG est un jeu mobile. Vous pouvez jouer en tant qu’invité. La connexion facultative avec Apple, Google ou Facebook permet la sauvegarde cloud, les fonctions sociales, les classements et la restauration des achats. Protégez votre appareil, vos identifiants et vos informations de récupération.`,
  de: `${ownerByLocale.de} Number RPG ist ein mobiles Spiel. Sie können als Gast spielen. Eine optionale Anmeldung mit Apple, Google oder Facebook unterstützt Cloud-Spielstände, soziale Funktionen, Ranglisten und die Wiederherstellung von Käufen. Schützen Sie Ihr Gerät, Ihre Anmeldedaten und Ihre Wiederherstellungsinformationen.`,
  'pt-BR': `${ownerByLocale['pt-BR']} Number RPG é um jogo para celular. Você pode jogar como visitante. O login opcional com Apple, Google ou Facebook permite salvamento na nuvem, recursos sociais, placares e restauração de compras. Proteja seu dispositivo, suas credenciais e suas informações de recuperação.`,
  th: `${ownerByLocale.th} Number RPG เป็นเกมมือถือ คุณสามารถเล่นในฐานะผู้เยี่ยมชมได้ การลงชื่อเข้าใช้ Apple, Google หรือ Facebook แบบเลือกได้รองรับการบันทึกบนคลาวด์ ฟีเจอร์โซเชียล กระดานจัดอันดับ และการกู้คืนการซื้อ โปรดรักษาความปลอดภัยของอุปกรณ์ ข้อมูลเข้าสู่ระบบ และข้อมูลการกู้คืน`,
  vi: `${ownerByLocale.vi} Number RPG là một trò chơi di động. Bạn có thể chơi với tư cách khách. Đăng nhập tùy chọn bằng Apple, Google hoặc Facebook hỗ trợ lưu trên đám mây, tính năng xã hội, bảng xếp hạng và khôi phục giao dịch mua. Hãy bảo vệ thiết bị, thông tin đăng nhập và thông tin khôi phục của bạn.`,
  id: `${ownerByLocale.id} Number RPG adalah permainan seluler. Anda dapat bermain sebagai tamu. Login opsional dengan Apple, Google, atau Facebook mendukung penyimpanan cloud, fitur sosial, papan peringkat, dan pemulihan pembelian. Jaga keamanan perangkat, kredensial login, dan informasi pemulihan Anda.`,
};

function updatePageText(locale) {
  const data = pages[locale];
  const privacy = data.privacy;
  const terms = data.terms;
  const deletion = data.deleteAccount;
  const retention = retentionByLocale[locale];
  const copy = deleteCopyByLocale[locale];
  const service = serviceWordByLocale[locale];

  privacy.summary = privacySummaryByLocale[locale];
  privacy.sections[0].paragraphs = [privacyWhoByLocale[locale]];
  privacy.sections[1].paragraphs[0] = privacy.sections[1].paragraphs[0].replace(/Number RPG API/g, 'Number RPG').replace(/API を/g, 'サービスを').replace(/API가/g, '서비스가').replace(/API /g, `${service} `).replace(/API/g, service);
  privacy.sections[3].paragraphs[1] = sharingByLocale[locale];
  privacy.sections[4].bullets[1] = providerDetailByLocale[locale];
  privacy.sections[5].paragraphs = retention;
  privacy.sections[6].paragraphs[0] = childrenByLocale[locale];
  privacy.sections[6].paragraphs[1] = privacy.sections[6].paragraphs[1].replace(/ The API also has an authenticated data-export path\./, '').replace(/ API 也提供需驗證的資料匯出路徑。/, '').replace(/ API 也提供需认证的数据导出路径。/, '').replace(/API には認証済みのデータエクスポート経路もあります。/, '').replace(/ API에는 인증된 데이터 내보내기 경로도 있습니다\./, '').replace(/ API también tiene una ruta de exportación de datos autenticada\./, '').replace(/ L’API propose également un chemin d’exportation authentifié des données\./, '').replace(/ Die App bietet auch einen authentifizierten Datenexport\./, '').replace(/ A API também possui um caminho autenticado de exportação de dados\./, '').replace(/ API ยังมีช่องทางส่งออกข้อมูลที่ต้องยืนยันตัวตน/, '').replace(/ API cũng có đường dẫn xuất dữ liệu đã xác thực\./, '').replace(/ API juga memiliki jalur ekspor data terautentikasi\./, '');
  privacy.sections[7].paragraphs[0] = privacy.sections[7].paragraphs[0].replace(/, API, vendors/, ', vendors').replace(/, API、供應商/, '、供應商').replace(/、API、供应商/, '、供应商').replace(/、API、プロバイダー/, '、プロバイダー').replace(/, API, 공급자/, ', 공급자').replace(/, API, proveedores/, ', proveedores').replace(/, l’API, les fournisseurs/, ', les fournisseurs').replace(/, API, Anbieter/, ', Anbieter').replace(/, API, provedores/, ', provedores').replace(/, API, ผู้ให้บริการ/, ', ผู้ให้บริการ').replace(/, API, nhà cung cấp/, ', nhà cung cấp').replace(/, API, penyedia/, ', penyedia');

  terms.sections[1].paragraphs[0] = termsIntroByLocale[locale];
  terms.sections[3].paragraphs[0] = terms.sections[3].paragraphs[0].replace(/interfere with the API or service/g, 'interfere with the game or service').replace(/干擾 API 或服務/g, '干擾遊戲或服務').replace(/干扰 API 或服务/g, '干扰游戏或服务').replace(/API やサービス/g, 'ゲームやサービス').replace(/API나 서비스/g, '게임이나 서비스').replace(/interferir con la API o el servicio/g, 'interferir con el juego o el servicio').replace(/interférer avec l’API ou le service/g, 'interférer avec le jeu ou le service').replace(/API oder den Dienst zu beeinträchtigen/g, 'das Spiel oder den Dienst zu beeinträchtigen').replace(/interferir com a API ou o serviço/g, 'interferir com o jogo ou o serviço').replace(/รบกวน API หรือบริการ/g, 'รบกวนเกมหรือบริการ').replace(/can thiệp vào API hoặc dịch vụ/g, 'can thiệp vào trò chơi hoặc dịch vụ').replace(/mengganggu API atau layanan/g, 'mengganggu permainan atau layanan');
  terms.sections[6].paragraphs = [lawByLocale[locale]];
  delete terms.sections[6].placeholder;

  deletion.summary = copy.summary;
  deletion.sections[0].paragraphs = [copy.app];
  deletion.sections[1].heading = copy.requestHeading;
  deletion.sections[1].paragraphs = [copy.request];
  deletion.sections[2].heading = copy.removedHeading;
  deletion.sections[2].paragraphs = [copy.removed];
  deletion.sections[3].heading = copy.timingHeading;
  deletion.sections[3].paragraphs = [copy.timing, copy.timingTwo];

  function clean(value) {
    if (typeof value !== 'string') return value;
    return value
      .replace(/\bAPI\b/g, service)
      .replace(/\bimplementation\b/gi, locale === 'en' ? 'description' : service)
      .replace(/\bsource code\b/gi, locale === 'en' ? 'published information' : service)
      .replace(/\bOwner review\b/gi, locale === 'en' ? 'further details' : service);
  }
  function walk(value) {
    if (Array.isArray(value)) return value.map(walk);
    if (value && typeof value === 'object') {
      Object.keys(value).forEach((key) => { value[key] = walk(value[key]); });
      return value;
    }
    return clean(value);
  }
  walk(data);
  deletion.tools = deletionToolsByLocale[locale] || deletionToolsByLocale.en;
}

localeOrder.forEach(updatePageText);

window.NUMBER_RPG_LEGAL = { localeOrder, localeNames, pages, apiBase };
