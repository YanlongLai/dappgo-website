# AI 解讀與 Cloudflare 使用統計

News 的 `/us/`、`/tw/` 與 News App 共用 `ai_open` 事件。AI 區塊預設收合，標示股票／全市場及「點擊展開 AI 解讀」，箭頭輕微提示三次；減少動態效果設定會停用動畫。只有使用者展開才計次，收合、切換語言、重新排版不計次。事件代表展開意圖，不保證已閱讀內文。

資料已存在時直接顯示。真實請求未完成時，300ms 前不畫骨架，之後顯示與 AI 段落字級、行距及容器相符的文字骨架與微弱 shimmer；8 秒後改為文字及載入指示。窄螢幕使用較多短行，寬螢幕使用較少長行。刷新保留既有內容，失敗會提供狀態說明。

## 查看次數及股票

這是 Cloudflare Pages Function + D1 的第一方互動統計，並非只有頁面瀏覽數的 Web Analytics beacon。既有 Wrangler 登入即可讀取，不需要把憑證交給網頁或 App。

從網站 repository 根目錄執行（Wrangler 4.149.0 需要 Node 22）：

```sh
node scripts/news-ai-report.mjs --days 7
node scripts/news-ai-report.mjs --days 30 --json
```

`--days` 限 1–90 天，按 UTC 日彙總。輸出包含：

- 每日、台／美股、股票、平台的展開次數及不重複匿名訪客。
- 所選期間按股票、平台、語言的展開次數與匿名訪客日數。
- 全站每日展開次數及跨股票去重後的匿名訪客。

同一瀏覽器／App 安裝每天產生新的匿名 ID；跨天的 `anonymous_reader_days` 是「訪客日數」，不是跨天不重複人數，也無法跨裝置認人。清除儲存空間、重新安裝或停止／重新啟用統計可能產生新 ID。公開事件端點不驗證真人，數據適合產品使用趨勢。

也可在 Cloudflare 控制台的 **Workers & Pages → D1 → dappgo-news-engagement → Console** 查詢：

```sql
SELECT day, market, stock, platform, COUNT(*) AS opens,
       COUNT(DISTINCT visitor_hash) AS anonymous_readers
FROM ai_open_events
WHERE day >= date('now', '-6 days')
GROUP BY day, market, stock, platform
ORDER BY day DESC, opens DESC;
```

`stock = 'all'` 代表全市場；`market` 為 `us`／`tw`，`platform` 為 `web`／`ios`／`android`。原始資料沒有公開讀取 API。

## 已設置的 Cloudflare 資源

- Pages：`dappgo-news`，正式網域 `news.dappgo.com`。
- D1：`dappgo-news-engagement`，ID `910b02e2-089b-4c36-8760-a23b388d2302`。
- 綁定：`NEWS_ENGAGEMENT`，定義於 `news/wrangler.toml`。
- 結構：`news/migrations/0001_ai_engagement.sql`，已套用遠端資料庫。
- 寫入：`POST /api/engagement`，瀏覽器同源；App 使用 HTTPS 且不送 Origin。

事件格式（UUID 均由客戶端產生，不能使用廣告或裝置識別碼）：

```json
{"v":1,"event":"ai_open","event_id":"UUIDv4","visitor_id":"daily UUIDv4","market":"us","stock":"AAPL","platform":"web","language":"zh"}
```

Function 限制 JSON 1KB、嚴格欄位與股票代號、參數化 SQL、event_id 去重；伺服器決定時間並儲存每日加鹽雜湊。預覽部署不寫入正式資料。每次有效寫入最多刪除 100 筆超過 90 天的事件；這是隨寫入清理，停止流量或積壓時不保證第 90 天即刪除。報表最多查 90 天。

## 隱私與 App 發佈交接

頁尾及 App 都提供匿名統計開關；關閉後刪除本機匿名 ID、停止待送請求，再開啟使用新 ID。瀏覽器 DNT／GPC 會直接關閉統計。只送事件、台／美股、股票、平台、語言及每日匿名 ID；自訂資料表不保存 IP、User-Agent、新聞內容、搜尋字、帳號或廣告識別碼。Cloudflare 的平台請求處理仍適用既有隱私政策，這個資料表的欄位限制不等於整個平台沒有請求日誌。

News App 新增 Expo SDK 54 相容的 `expo-crypto` 產生安全 UUID。原始碼須在下一次原生建置／商店發佈才會進入已安裝 App。未在本次提交 App Store Connect 或 Google Play；兩邊隱私揭露及資料安全表須按實際的第一方產品互動資料處理分別檢查，不能以共用 React Native 原始碼替代。

## 本機驗證與回復

```sh
cd news
npx wrangler@4.149.0 d1 migrations apply NEWS_ENGAGEMENT --local
npx wrangler@4.149.0 pages dev . --port 8828 --d1 NEWS_ENGAGEMENT=NEWS_ENGAGEMENT
```

Wrangler 本機 Pages dev 需明確指定 D1 binding；若使用 `--persist-to`，遷移及開發伺服器都須指定相同目錄。缺少 D1 或寫入失敗回 503，客戶端逾時及失敗不影響 AI 閱讀。

部署回復可啟用前一個 Pages deployment。資料表是新增，不需刪除 D1 或既有事件；舊版不會送這個事件。正式驗證的合成事件只依確切 event_id 刪除，保留真實訪客資料。

## 後續廣告方向（本次未開發）

未加入全屏廣告、解鎖流程、廣告 hook 或額外廣告請求。未來設計「看廣告後開啟 AI」時，需先確認買斷／去廣告權益；有權益的使用者直接閱讀，不應被廣告解鎖擋住。其餘廣告策略另立需求，分別處理 Web、iOS、Android 與廣告失敗時的閱讀體驗。
