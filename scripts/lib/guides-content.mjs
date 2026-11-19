// Hand-written reading pages: guides, about and policy pages, in English and Traditional Chinese.
// The thresholds quoted in the guides restate the report engines' rules; when an engine rule changes,
// update the matching paragraph here and bump `updated`.
// `body` receives p(path) which maps an English path to the page language.
export const PAGES = [
  {
    path: "/guides/how-to-read-the-daily-stock-report/",
    section: "guides",
    ads: true,
    updated: "2026-11-18",
    en: {
      title: "How to read the DappGo daily stock report | DappGo",
      description: "A plain walk through the DappGo US and Taiwan daily stock reports: market regime, breadth, sector temperature, movers, RSI extremes and the mean-reversion screen.",
      kicker: "Guide",
      h1: "How to read the daily stock report",
      lede: "The US and Taiwan reports use the same layout. This guide goes through it from top to bottom and says what each part can and cannot tell you.",
      body: (p) => `
      <h2>Start with the time stamp</h2>
      <p>Every report page opens with three facts: the trading session it describes, the time the report was generated, and whether that was before or after the market closed. Read them first. The US report is published while New York is still trading, so its prices are the latest available at that moment and can differ from the final close. The Taiwan report is finalised after the 13:30 Taipei close, and its institutional-flow figures arrive later still, so the newest Taiwan revision of a session is often generated the following morning.</p>
      <p>The short code after "source payload" is the first twelve characters of a hash of the report data. Two pages with the same code were built from identical data.</p>

      <h2>Market regime</h2>
      <p>The regime is a one-word summary of the backdrop: risk-on, risk-off, neutral or mixed. It is produced by a fixed rule from three inputs: where the benchmark (SPY for the US, the TAIEX for Taiwan) sits against its 50-day and 200-day averages, how volatile the benchmark's daily returns have been over 20 sessions, and breadth.</p>
      <p>Treat it as context for everything below it. A stock that looks strong in a risk-off report is swimming against the tide; the same reading in a risk-on report is moving with it. The regime does not say what happens next. It says which conditions held when the report was built. The exact thresholds are in <a href="${p("/guides/how-dappgo-computes-signals/")}">how DappGo computes its signals</a>.</p>

      <h2>Breadth</h2>
      <p>Breadth answers a simple question: is the move shared? The report gives it in two ways.</p>
      <ul>
        <li><b>Share above the 20-day average.</b> The percentage of tracked tickers priced above their own 20-day moving average. This is the breadth figure the regime rule uses. Below 30% is weak; above 55% is strong.</li>
        <li><b>Advancers and decliners.</b> How many tickers rose and fell on the day, with the median move. The median is more honest than an average here because one stock moving 20% cannot drag it.</li>
      </ul>
      <p>The two can disagree, and the disagreement is informative. A day with many advancers but few names above the 20-day average is a bounce inside a decline. A day with many decliners while most names remain above the average is a pause inside an advance.</p>

      <h2>Sector table</h2>
      <p>Each row averages the one-day move and the 14-day RSI of the tracked tickers in that sector and attaches a temperature from Cold to Hot. Two cautions apply. First, a sector with one or two tracked names is really a statement about those names, which is why the summary text compares only sectors with at least two. Second, the table describes the tracked universe, not the whole market: the US list is a reviewed watchlist of 36 large names, and the Taiwan list is the 100 largest companies plus one ETF.</p>

      <h2>Largest moves</h2>
      <p>The movers tables show the five largest gains and losses with the 5-day and 30-day changes beside them. Read across the row. A stock up 4% today and down 25% over 30 days is a different situation from one up 4% today and up 25% over 30 days, though both appear in the same table.</p>

      <h2>Momentum extremes</h2>
      <p>This section lists tickers whose 14-day RSI is at or below 30, or at or above 70, with the distance of the price from its 20-day average and its position inside the 52-week range. An RSI below 30 means selling has dominated the last fourteen sessions. It is often called oversold, which suggests a rebound is due. It is not due. In a persistent decline RSI can stay under 30 for weeks. Use the list to find where pressure is concentrated, then look at the 52-week position to see whether the stock is near the bottom of its range or simply cooling off near the top.</p>

      <h2>Mean-reversion screen</h2>
      <p>The screen names up to three tickers that meet all of four conditions at once: price below the 20-day average, RSI between 30 and 55, a first sign of momentum turning up, and volatility that is not high relative to the rest of the universe. It then ranks the matches by a score. The page prints the conditions each match met.</p>
      <p>A match is a description of a set-up that some traders look for. It is not a recommendation, it takes no account of your circumstances, and on many days nothing qualifies. When the list is empty the page says so.</p>

      <h2>What the Taiwan report adds</h2>
      <p>Taiwan publishes daily net buying and selling by three institutional groups: foreign investors, investment trusts and dealers. The report sums them over five sessions, in lots of 1,000 shares, and the archive page shows the largest foreign net buys and sells with the trust figure beside each. When foreign investors and trusts are on opposite sides of the same stock, price tends to be contested rather than trending.</p>

      <h2>What the US report adds</h2>
      <p>The US page lists tracked companies with an earnings date in the next 14 days. Earnings are the most common reason for a gap that no indicator anticipates, so check this table before reading anything into a quiet chart.</p>

      <h2>What the report does not do</h2>
      <p>It does not forecast prices, it does not know your holdings or your tolerance for loss, and it covers a fixed list of tickers. Its job is to measure the same things the same way every session so that changes stand out. The <a href="${p("/reports/")}">archive</a> exists so you can check any reading against the sessions before it.</p>`
    },
    zh: {
      title: "如何閱讀 DappGo 每日股票報告｜DappGo",
      description: "逐段說明 DappGo 美股與台股每日報告：市場環境、市場廣度、類股溫度、漲跌幅最大個股、RSI 極端值與均值回歸篩選。",
      kicker: "閱讀指南",
      h1: "如何閱讀每日股票報告",
      lede: "美股與台股報告採用相同的版面。這篇指南由上到下走一遍，說明每一段能告訴你什麼、不能告訴你什麼。",
      body: (p) => `
      <h2>先看時間戳記</h2>
      <p>每一頁報告開頭都有三項資訊：它描述的交易日、報告產生的時間，以及產生時間是在收盤前還是收盤後。請先讀這三項。美股報告在紐約盤中發布，價格是當時的最新報價，可能與最終收盤價不同。台股報告在台北 13:30 收盤後定稿，法人買賣超資料又更晚公布，所以同一交易日的最新版本常常是隔天早上才產生。</p>
      <p>「來源資料雜湊」後面的短碼，是報告資料雜湊值的前十二碼。兩頁的短碼相同，代表它們由完全相同的資料產生。</p>

      <h2>市場環境</h2>
      <p>市場環境用一個詞概括大盤背景：風險偏好、風險規避、中性或訊號分歧。它由固定規則從三項輸入算出：指數（美股用 SPY，台股用加權指數）相對 50 日與 200 日均線的位置、指數近 20 個交易日的日報酬波動，以及市場廣度。</p>
      <p>請把它當作閱讀下方所有內容的背景。風險規避的報告裡看起來強勢的股票是逆勢而行；同樣的讀數出現在風險偏好的報告裡，則是順勢。市場環境不會告訴你接下來會怎樣，它只說明報告產生當下哪些條件成立。確切門檻見<a href="${p("/guides/how-dappgo-computes-signals/")}">DappGo 訊號怎麼算</a>。</p>

      <h2>市場廣度</h2>
      <p>廣度回答一個簡單的問題：這波走勢是不是大家都有份？報告用兩種方式呈現。</p>
      <ul>
        <li><b>高於 20 日均線的比例。</b>追蹤標的中，價格高於自身 20 日均線的百分比。市場環境規則用的就是這個數字：低於 30% 偏弱，高於 55% 偏強。</li>
        <li><b>上漲與下跌檔數。</b>當日上漲、下跌各幾檔，以及漲跌幅中位數。這裡用中位數比平均數更貼近實況，因為單一個股大漲 20% 拉不動中位數。</li>
      </ul>
      <p>兩者可能不一致，而不一致本身就是資訊。上漲檔數多、站上 20 日均線的卻很少，是跌勢中的反彈；下跌檔數多、但多數標的仍在均線之上，則是漲勢中的休息。</p>

      <h2>類股表</h2>
      <p>每一列是該類股內追蹤標的的單日平均漲跌與 14 日 RSI 平均，並附上由冷到熱的溫度標籤。有兩點要留意。第一，只有一兩檔追蹤標的的類股，說的其實是那一兩檔股票，所以摘要文字只比較至少有兩檔標的的類股。第二，這張表描述的是追蹤範圍而非整個市場：美股是 36 檔大型標的的審核清單，台股是市值前 100 大公司加一檔 ETF。</p>

      <h2>漲跌幅最大的個股</h2>
      <p>這兩張表列出漲幅與跌幅最大的各五檔，旁邊附上 5 日與 30 日的變動。請橫著讀。今天漲 4%、近 30 日跌 25% 的股票，和今天漲 4%、近 30 日也漲 25% 的股票，雖然出現在同一張表，卻是完全不同的處境。</p>

      <h2>動能極端值</h2>
      <p>這一段列出 14 日 RSI 在 30 以下或 70 以上的標的，並附上價格與 20 日均線的乖離，以及在 52 週區間中的位置。RSI 低於 30 代表過去十四個交易日賣壓居多，常被稱為「超賣」，聽起來像是該反彈了。其實未必。在持續下跌的走勢中，RSI 可以連續幾週低於 30。這份清單的用途是找出壓力集中在哪裡，再搭配 52 週位置，判斷股價是貼近區間底部，還是只是在高檔降溫。</p>

      <h2>均值回歸篩選</h2>
      <p>篩選最多列出三檔同時符合四項條件的標的：價格低於 20 日均線、RSI 介於 30 至 55、動能出現轉強的初步跡象，以及波動相對於追蹤範圍不算高。符合者再依分數排序，頁面會列出每一檔符合的條件。</p>
      <p>符合條件只是描述某些交易者會留意的型態。它不是建議，沒有考慮你的個人狀況，而且很多交易日根本沒有標的符合。清單為空時，頁面會直接說明。</p>

      <h2>台股報告多了什麼</h2>
      <p>台灣每日公布三大法人（外資、投信、自營商）的買賣超。報告將其加總為近五個交易日的數字，單位為張；檔案頁列出外資買超與賣超最多的標的，並列出同一檔的投信數字。外資與投信在同一檔股票上站在相反方向時，股價往往是拉鋸而非趨勢。</p>

      <h2>美股報告多了什麼</h2>
      <p>美股頁面會列出未來 14 天內有財報日的追蹤公司。財報是最常造成跳空的原因，而且沒有任何指標能事先反映，所以在解讀一張平靜的走勢圖之前，請先看這張表。</p>

      <h2>報告不做的事</h2>
      <p>它不預測股價，不知道你的持股與風險承受度，而且只涵蓋固定的標的清單。它的工作是每個交易日用同一套方法量同樣的東西，讓變化自己浮現。<a href="${p("/reports/")}">檔案庫</a>的用途，就是讓你把任何一天的讀數拿去和先前的交易日對照。</p>`
    }
  },
  {
    path: "/guides/how-to-read-the-options-report/",
    section: "guides",
    ads: true,
    updated: "2026-11-18",
    en: {
      title: "How to read the DappGo options report | DappGo",
      description: "What each column of the DappGo US options report means: premium, distance from the share price, days to expiry, implied volatility, annualized yield, probability and the composite score.",
      kicker: "Guide",
      h1: "How to read the options report",
      lede: "The options report ranks contracts that an option seller might study. This guide explains each column, why short-dated yields look enormous, and what the backtest does and does not show.",
      body: (p) => `
      <h2>What the report is about</h2>
      <p>The report looks at two income strategies on a reviewed list of US stocks and ETFs. In a <b>cash-secured put</b> you sell a put and hold enough cash to buy the shares at the strike if they are assigned to you. In a <b>covered call</b> you sell a call against shares you already own. In both cases you are paid a premium now and accept an obligation later.</p>
      <p>The seller's profit is capped at the premium. The loss is not capped in the same way: a put seller who is assigned owns shares bought at the strike, however far the market has fallen below it. Keep that asymmetry in mind for every number that follows.</p>

      <h2>The columns</h2>
      <h3>Strike and distance</h3>
      <p>The strike is the price at which shares change hands if the option is exercised. Distance is how far the strike sits from the current share price, as a percentage. For a put, a strike 8% below the share price means the shares can fall 8% before the option is in the money. More distance means more room, and a smaller premium.</p>
      <h3>Premium</h3>
      <p>The premium is the bid price per share. One contract covers 100 shares, so a premium of $2.40 is $240 per contract before fees. The report only lists contracts with a bid between $1.00 and $7.00, which removes contracts too cheap to be worth the commission and contracts so expensive that they are already deep in the money.</p>
      <h3>Expiry and days</h3>
      <p>Days is the number of calendar days until the option expires. Short-dated options lose time value fastest, and they are also the most sensitive to a sudden move in the shares.</p>
      <h3>Implied volatility</h3>
      <p>Implied volatility (IV) is the volatility figure that makes an option-pricing model agree with the market price. It is quoted as an annual percentage. High IV means the market is pricing a wide range of outcomes, often because of earnings or news. High IV is the reason a premium is large, so a rich premium and a risky underlying usually arrive together.</p>
      <h3>Annualized yield</h3>
      <p>For a put this is the premium divided by the strike, scaled to a year:</p>
      <p class="formula">annualized % = premium ÷ strike × 365 ÷ days × 100</p>
      <p>This is the column most likely to mislead. A $2.40 premium on a $42 strike with three days to run is a 5.7% return on the cash set aside. Multiplying by 365 ÷ 3 gives about 695% a year. Nobody earns that, because it assumes the same trade can be repeated 121 times in a row without one assignment. Read annualized yield as a way to compare contracts of similar length, never as an expected return.</p>
      <h3>Probability out of the money</h3>
      <p>This is a model estimate, from the Black-Scholes formula using the contract's implied volatility, of the chance that the option expires worthless and the seller keeps the whole premium. A figure of 80% does not mean the trade is safe. It means the model expects the bad outcome about one time in five, and says nothing about how bad it is when it comes.</p>
      <h3>Composite score</h3>
      <p>The score puts four things on one 0 to 100 scale: yield, distance, delta and the speed of time decay. It deliberately discounts yields from contracts shorter than 30 days. The exact weights are in <a href="${p("/guides/how-dappgo-computes-signals/")}">how DappGo computes its signals</a>. The score ranks contracts against each other on the same day. It is not a probability and it has no meaning across days.</p>

      <h2>Reading the daily page</h2>
      <p>The archive page for each session starts with how many candidates passed the filters and how their expiries are distributed. A day on which most candidates expire within a week is a day when the list is dominated by fast, sensitive contracts. Next comes the highest-scored candidate for each underlying, then a breakdown of the score for the top rows, so you can see whether a high score came from yield or from distance. The implied-volatility table shows which underlyings the market expects to move most.</p>

      <h2>The backtest</h2>
      <p>Each page repeats the report's reference backtest with its dates. Look at two numbers together: the win rate and the profit factor. Option selling normally shows a high win rate, because most options expire worthless. The profit factor, total gains divided by total losses, tells you whether the wins paid for the losses. A win rate above 80% with a profit factor below 1 is a losing record. The backtest covers a short, fixed window and a small number of underlyings, so it describes that period only.</p>

      <h2>Before you act on anything</h2>
      <p>Check the earnings date of the underlying, the bid-ask spread in your own broker, and whether you are willing to own the shares at the strike. The report cannot do any of these for you. It is research material, not advice. The <a href="${p("/guides/glossary/")}">glossary</a> defines the terms used here.</p>`
    },
    zh: {
      title: "如何閱讀 DappGo 選擇權報告｜DappGo",
      description: "說明 DappGo 美股選擇權報告每一欄的意義：權利金、價外幅度、到期天數、隱含波動率、年化報酬、機率與綜合分數。",
      kicker: "閱讀指南",
      h1: "如何閱讀選擇權報告",
      lede: "選擇權報告替賣方可能想研究的合約排序。這篇指南說明每一欄的意義、為什麼短天期的年化報酬看起來高得離譜，以及回測說明了什麼、沒說明什麼。",
      body: (p) => `
      <h2>報告在看什麼</h2>
      <p>報告針對一份經審核的美股與 ETF 清單，研究兩種收取權利金的策略。<b>現金擔保賣權</b>是賣出賣權，同時保留足夠現金，被履約時以履約價買進股票。<b>掩護性買權</b>是針對已持有的股票賣出買權。兩者都是現在收取權利金，並承擔日後的義務。</p>
      <p>賣方的獲利上限就是權利金，虧損卻沒有同樣的上限：賣權賣方被履約後，是以履約價買進股票，無論市價已跌到履約價以下多遠。閱讀以下每一個數字時，請記得這個不對稱。</p>

      <h2>各欄位</h2>
      <h3>履約價與價外幅度</h3>
      <p>履約價是選擇權被執行時股票的成交價。價外幅度是履約價與目前股價的距離，以百分比表示。以賣權為例，履約價低於股價 8%，代表股價要下跌 8% 之後選擇權才會進入價內。距離越大，緩衝越多，權利金也越少。</p>
      <h3>權利金</h3>
      <p>權利金為每股的買方報價。一口合約為 100 股，所以權利金 $2.40 相當於每口 $240（未計手續費）。報告只列出買價介於 $1.00 至 $7.00 的合約，排除便宜到不值得付手續費的合約，以及貴到已深度價內的合約。</p>
      <h3>到期日與天數</h3>
      <p>天數是距離到期的日曆天數。短天期選擇權的時間價值流失最快，對股價的突然波動也最敏感。</p>
      <h3>隱含波動率</h3>
      <p>隱含波動率（IV）是讓選擇權定價模型算出的價格等於市價的那個波動率，以年化百分比表示。IV 高，代表市場替較大的結果區間定價，常見原因是財報或消息。權利金之所以高，就是因為 IV 高，所以豐厚的權利金和高風險的標的通常一起出現。</p>
      <h3>年化報酬</h3>
      <p>以賣權而言，是權利金除以履約價，再換算成一年：</p>
      <p class="formula">年化 % = 權利金 ÷ 履約價 × 365 ÷ 天數 × 100</p>
      <p>這是最容易誤導的一欄。履約價 $42、權利金 $2.40、剩三天到期，相當於保留資金的 5.7% 報酬。乘上 365 ÷ 3，就變成年化約 695%。沒有人能真的賺到這個數字，因為它假設同一筆交易可以連續重複 121 次而一次都不被履約。年化報酬只適合用來比較天期相近的合約，絕不能當成預期報酬。</p>
      <h3>價外機率</h3>
      <p>這是模型估計值：以該合約的隱含波動率代入 Black-Scholes 公式，估算選擇權到期時毫無價值、賣方保留全部權利金的機率。80% 不代表這筆交易安全，而是模型預期大約每五次會出現一次不利結果，至於不利時有多糟，它完全沒說。</p>
      <h3>綜合分數</h3>
      <p>分數把四件事放到同一個 0 到 100 的尺度上：報酬、價外距離、Delta 與時間價值流失的速度，並刻意對不滿 30 天的合約報酬打折。確切權重見<a href="${p("/guides/how-dappgo-computes-signals/")}">DappGo 訊號怎麼算</a>。分數是同一天內合約之間的相對排序，不是機率，跨日比較也沒有意義。</p>

      <h2>怎麼讀每日頁面</h2>
      <p>每個交易日的檔案頁，先說明有多少候選合約通過篩選、到期日如何分布。多數候選在一週內到期的那一天，清單就是由反應快、敏感度高的合約主導。接著是各標的分數最高的候選，再來是前幾名的分數組成，讓你看出高分是來自報酬還是來自價外距離。隱含波動率表則顯示市場預期哪些標的波動最大。</p>

      <h2>回測</h2>
      <p>每頁都會附上報告的參考回測與其期間。請把兩個數字放在一起看：勝率與獲利因子。賣方策略的勝率通常很高，因為多數選擇權到期時沒有價值。獲利因子是總獲利除以總虧損，它告訴你贏的錢夠不夠付輸的錢。勝率高於 80%、獲利因子卻低於 1，就是一份虧損的紀錄。回測涵蓋的是一段固定且不長的期間與少數標的，只能說明那段期間。</p>

      <h2>採取任何行動之前</h2>
      <p>請確認標的的財報日、你自己券商的買賣價差，以及你是否願意以履約價持有股票。這些報告都無法替你做。它是研究資料，不是建議。本文用到的名詞見<a href="${p("/guides/glossary/")}">名詞解釋</a>。</p>`
    }
  },
  {
    path: "/guides/how-dappgo-computes-signals/",
    section: "guides",
    ads: true,
    updated: "2026-11-18",
    en: {
      title: "How DappGo computes its signals: the rules behind the reports | DappGo",
      description: "The exact rules behind DappGo's reports: market regime thresholds, the four per-ticker signals, sector temperature, the mean-reversion screen score and the options composite score.",
      kicker: "Methodology",
      h1: "How DappGo computes its signals",
      lede: "Every label in a DappGo report comes from a fixed rule applied to market data. This page states those rules, with the thresholds, so you can check any reading yourself.",
      body: (p) => `
      <h2>Principles</h2>
      <ul>
        <li><b>Rules, not opinions.</b> Regime, signal labels, sector temperature and scores are computed by code. The same inputs always give the same output.</li>
        <li><b>One published payload per revision.</b> Each report revision is a single data file identified by a hash. Our pages and apps read a pointer to the latest file and accept the data only if its hash matches the pointer.</li>
        <li><b>Coverage is stated.</b> Each report says how many of its expected tickers it covers. A report with missing tickers says so.</li>
        <li><b>Thresholds are judgment calls.</b> The numbers below are conventional choices. They make readings comparable from day to day. They are not laws of the market.</li>
      </ul>

      <h2>Market regime</h2>
      <p>Inputs, all from daily closes: the benchmark (SPY for the US report, the TAIEX for Taiwan), and every tracked ticker.</p>
      <ul>
        <li><b>Benchmark trend.</b> Up if the benchmark is more than 2% above its close 20 sessions earlier, down if more than 2% below, otherwise sideways.</li>
        <li><b>Volatility band.</b> The standard deviation of the benchmark's last 20 daily returns: calm below 0.8%, high above 1.5%, moderate in between.</li>
        <li><b>Breadth.</b> The share of tracked tickers priced above their own 20-day average.</li>
      </ul>
      <p>The rule is applied in this order, and the first match wins:</p>
      <ol>
        <li><b>Risk-on</b> if the benchmark is above its 50-day average, breadth is above 55%, and volatility is not high.</li>
        <li><b>Risk-off</b> if the benchmark is below its 200-day average, or breadth is below 30%, or volatility is high.</li>
        <li><b>Neutral</b> if the benchmark trend is sideways and breadth is between 40% and 60%.</li>
        <li><b>Mixed</b> in every other case.</li>
      </ol>
      <p>Note the asymmetry: risk-on needs three conditions together, while any one of three is enough for risk-off. The report also publishes the advance-decline ratio and the standard deviation of sector average moves, which describe the day but do not enter the rule.</p>

      <h2>The four per-ticker signals</h2>
      <p>Each ticker gets four labels. The apps show them with the reason for each.</p>
      <h3>Trend</h3>
      <p>With at least 200 daily bars, the trend is strong-up when price, the 20-day, 60-day and 200-day averages are stacked in that order and the 200-day average is rising, and strong-down for the mirror image. Price above a rising 200-day average is up; price below a falling one is down; anything else is sideways. With shorter histories the same idea is applied to the 120-day, 60-day or 20-day average.</p>
      <h3>Momentum</h3>
      <p>From the 14-day RSI and the MACD line: overbought at RSI 70 or more, oversold at 30 or less, bullish when RSI is at least 50 with MACD above zero, bearish when RSI is under 50 with MACD below zero, otherwise neutral.</p>
      <h3>Volume</h3>
      <p>The ratio of the session's volume to the five-day average: surge at 2.0 or more, active at 1.5 or more, quiet at 0.5 or less, otherwise normal.</p>
      <h3>Ownership (US) and institutional flow (Taiwan)</h3>
      <p>For US tickers the label comes from insider transactions over 30 days and the share of stock held by institutions: accumulating when insiders are net buyers, distributing when they are net sellers, and otherwise a description of how concentrated institutional holding is. For Taiwan tickers it comes from the five-day net position of foreign investors, investment trusts and dealers combined: accumulating above 5,000 lots of net buying, distributing below 5,000 lots of net selling, balanced in between.</p>
      <h3>How the four are combined</h3>
      <p>The engine counts supportive readings (an up trend, bullish or oversold momentum, above-normal volume, accumulation) and adverse readings (a down trend, bearish or overbought momentum, distribution). Three or more supportive readings with none adverse gives the strongest label, and three or more adverse readings the weakest. The apps show this summary label alongside the four inputs. This site's archive pages show the inputs and leave the summary label out, because a one-word label reads too much like advice when it is taken out of the app's context.</p>

      <h2>Sector temperature</h2>
      <p>Each sector gets points from the average one-day move of its tracked tickers (+2 at +2.0% or more, +1 at +0.5% or more, −1 at −0.5% or less, −2 at −2.0% or less), from their average RSI (+1 at 65 or more, −1 at 35 or less), and, for US sectors, from insider activity (+1 or −1 when buyers and sellers differ by two or more companies). A total of 3 or more is Hot, 1 or 2 is Warm, 0 is Neutral, −1 or −2 is Cool, and −3 or less is Cold.</p>

      <h2>Mean-reversion screen</h2>
      <p>A ticker must pass all of these filters:</p>
      <ul>
        <li>price below its 20-day average;</li>
        <li>14-day RSI between 30 and 55;</li>
        <li>MACD histogram above zero, or stochastic %K above %D;</li>
        <li>20-day historical volatility no more than 1.2 times the median of the universe;</li>
        <li>not already carrying one of the two weakest summary labels.</li>
      </ul>
      <p>Survivors are scored and the top three are listed:</p>
      <p class="formula">score = min(gap below 20-day average in % × 5, 30)
      + max(0, 50 − |RSI − 45|) × 0.5
      + (10 if MACD and stochastic both turned up, else 5)
      + (10 if volatility is under 0.85 × universe median, else 5)</p>
      <p>The score rewards a larger discount to the average, an RSI near 45, agreement between two momentum measures and lower volatility. It ranks matches on one day. It is not a forecast of return.</p>

      <h2>Options composite score</h2>
      <p>Candidates are puts and calls with a bid between $1.00 and $7.00. For each one the report computes an annualized yield, the Black-Scholes delta and theta from the contract's implied volatility, and the model probability of expiring out of the money. The composite is:</p>
      <p class="formula">score = 0.30 × return + 0.25 × safety margin + 0.25 × delta + 0.20 × theta efficiency</p>
      <ul>
        <li><b>Return</b> (0 to 100): annualized yield, first multiplied by √(days ÷ 30) for contracts shorter than 30 days, then capped at 200% and rescaled.</li>
        <li><b>Safety margin</b> (0 to 100): distance of the strike from the share price, reaching 100 at 10% out of the money.</li>
        <li><b>Delta</b> (0 to 100): (1 − |delta|) × 100, so a lower chance of finishing in the money scores higher.</li>
        <li><b>Theta efficiency</b> (0 to 100): daily time decay as a fraction of the premium, capped at 100.</li>
      </ul>
      <p>The short-dated haircut exists because annualizing a one-day premium multiplies it by 365 and hides the risk of a sharp move. The displayed annualized figure is left untouched so you can see the raw number; only the score is adjusted.</p>

      <h2>Where the data comes from</h2>
      <p>Taiwan prices and institutional flows come from exchange and market-data feeds for TWSE-listed companies, and the Taiwan universe is rebuilt from official exchange closing prices and share counts. US fundamentals used in valuation views come from company filings on SEC EDGAR. Option chains come from a brokerage market-data feed. News items in the apps are shown as a headline, the publisher's name and a link to the publisher. Sources can be delayed or wrong, which is why each page carries its generation time and why we publish a <a href="${p("/editorial-policy/")}">corrections policy</a>.</p>
      <p>See the rules applied to real sessions in the <a href="${p("/reports/")}">report archive</a>.</p>`
    },
    zh: {
      title: "DappGo 訊號怎麼算：報告背後的規則｜DappGo",
      description: "DappGo 報告背後的確切規則：市場環境門檻、個股四項訊號、類股溫度、均值回歸篩選分數與選擇權綜合分數。",
      kicker: "方法說明",
      h1: "DappGo 訊號怎麼算",
      lede: "DappGo 報告裡的每一個標籤，都來自套用在市場資料上的固定規則。本頁把這些規則連同門檻寫出來，讓你可以自己驗證任何一項判讀。",
      body: (p) => `
      <h2>原則</h2>
      <ul>
        <li><b>是規則，不是意見。</b>市場環境、訊號標籤、類股溫度與分數都由程式計算，相同的輸入一定得到相同的輸出。</li>
        <li><b>每個版本對應一份已發布資料。</b>每一版報告都是一個以雜湊值標識的資料檔。我們的網頁與 App 讀取指向最新檔案的指標，只有在資料的雜湊值與指標相符時才採用。</li>
        <li><b>涵蓋範圍會標明。</b>每份報告都會說明預期標的中實際涵蓋了幾檔；有缺漏時會直接標示。</li>
        <li><b>門檻是人為選擇。</b>以下數字是常見的慣例取值，用途是讓每天的讀數可以互相比較，並不是市場定律。</li>
      </ul>

      <h2>市場環境</h2>
      <p>輸入全部來自日收盤價：指數（美股報告用 SPY，台股用加權指數）以及每一檔追蹤標的。</p>
      <ul>
        <li><b>指數趨勢。</b>指數比 20 個交易日前的收盤高出 2% 以上為向上，低 2% 以上為向下，其餘為橫盤。</li>
        <li><b>波動區間。</b>指數近 20 個日報酬的標準差：低於 0.8% 為低，高於 1.5% 為偏高，介於其間為中等。</li>
        <li><b>市場廣度。</b>追蹤標的中價格高於自身 20 日均線的比例。</li>
      </ul>
      <p>規則依下列順序套用，先符合者為準：</p>
      <ol>
        <li><b>風險偏好</b>：指數站上 50 日均線，廣度高於 55%，且波動不屬偏高。</li>
        <li><b>風險規避</b>：指數低於 200 日均線，或廣度低於 30%，或波動偏高。</li>
        <li><b>中性</b>：指數趨勢為橫盤，且廣度介於 40% 至 60%。</li>
        <li><b>訊號分歧</b>：其餘所有情況。</li>
      </ol>
      <p>請注意其中的不對稱：風險偏好需要三項條件同時成立，風險規避只要三項中任一項成立即可。報告另外公布漲跌家數比與類股平均漲跌的標準差，它們用來描述當日狀況，但不進入上述規則。</p>

      <h2>個股四項訊號</h2>
      <p>每檔標的有四個標籤，App 會連同理由一併顯示。</p>
      <h3>趨勢</h3>
      <p>日線資料達 200 筆以上時：價格、20 日、60 日、200 日均線依序排列且 200 日均線上揚，為強勢向上；反之為強勢向下。價格在上揚的 200 日均線之上為向上，在下彎的 200 日均線之下為向下，其餘為橫盤。資料較短時，以同樣的邏輯改用 120 日、60 日或 20 日均線。</p>
      <h3>動能</h3>
      <p>依 14 日 RSI 與 MACD：RSI 在 70 以上為過熱，30 以下為超賣；RSI 不低於 50 且 MACD 大於零為偏多；RSI 低於 50 且 MACD 小於零為偏空；其餘為中性。</p>
      <h3>量能</h3>
      <p>當日成交量與五日均量的比值：2.0 以上為爆量，1.5 以上為放量，0.5 以下為量縮，其餘為正常。</p>
      <h3>持股（美股）與法人籌碼（台股）</h3>
      <p>美股的標籤來自近 30 日內部人交易與機構持股比例：內部人淨買進為吸籌，淨賣出為出貨，其餘則描述機構持股的集中程度。台股的標籤來自外資、投信、自營商近五日合計買賣超：合計買超逾 5,000 張為吸籌，賣超逾 5,000 張為出貨，介於其間為均衡。</p>
      <h3>四項如何合併</h3>
      <p>引擎分別計算有利讀數（趨勢向上、動能偏多或超賣、量能高於正常、吸籌）與不利讀數（趨勢向下、動能偏空或過熱、出貨）的個數。有利讀數三項以上且沒有不利讀數時，給出最強的標籤；不利讀數三項以上時，給出最弱的標籤。App 會把這個總結標籤與四項輸入一起顯示。本站的檔案頁只呈現輸入、不顯示總結標籤，因為一個單詞的標籤脫離 App 的情境後，讀起來太像投資建議。</p>

      <h2>類股溫度</h2>
      <p>每個類股依三項給分：追蹤標的的單日平均漲跌（+2.0% 以上得 +2，+0.5% 以上得 +1，−0.5% 以下得 −1，−2.0% 以下得 −2）、平均 RSI（65 以上得 +1，35 以下得 −1），以及美股類股的內部人動向（買方與賣方公司數相差兩家以上時得 +1 或 −1）。總分 3 以上為熱，1 至 2 為偏熱，0 為中性，−1 至 −2 為偏冷，−3 以下為冷。</p>

      <h2>均值回歸篩選</h2>
      <p>標的必須通過以下全部條件：</p>
      <ul>
        <li>價格低於 20 日均線；</li>
        <li>14 日 RSI 介於 30 至 55；</li>
        <li>MACD 柱狀體大於零，或 KD 的 K 值高於 D 值；</li>
        <li>20 日歷史波動率不超過追蹤範圍中位數的 1.2 倍；</li>
        <li>尚未被標為最弱的兩種總結標籤之一。</li>
      </ul>
      <p>通過者計分後取前三名：</p>
      <p class="formula">分數 = min(低於 20 日均線的幅度 % × 5, 30)
      + max(0, 50 − |RSI − 45|) × 0.5
      + （MACD 與 KD 同時轉強得 10，否則得 5）
      + （波動低於追蹤範圍中位數的 0.85 倍得 10，否則得 5）</p>
      <p>分數偏好較大的均線折價、接近 45 的 RSI、兩項動能指標一致，以及較低的波動。它是同一天內符合者之間的排序，不是報酬預測。</p>

      <h2>選擇權綜合分數</h2>
      <p>候選合約為買價介於 $1.00 至 $7.00 的賣權與買權。報告針對每一筆計算年化報酬、以合約隱含波動率算出的 Black-Scholes Delta 與 Theta，以及到期時處於價外的模型機率。綜合分數為：</p>
      <p class="formula">分數 = 0.30 × 報酬 + 0.25 × 安全邊際 + 0.25 × Delta + 0.20 × Theta 效率</p>
      <ul>
        <li><b>報酬</b>（0 至 100）：年化報酬；不滿 30 天的合約先乘上 √(天數 ÷ 30)，再以 200% 為上限換算。</li>
        <li><b>安全邊際</b>（0 至 100）：履約價與股價的距離，價外 10% 時達 100。</li>
        <li><b>Delta</b>（0 至 100）：(1 − |Delta|) × 100，到期落入價內的機率越低，分數越高。</li>
        <li><b>Theta 效率</b>（0 至 100）：每日時間價值流失占權利金的比例，上限 100。</li>
      </ul>
      <p>之所以對短天期打折，是因為把一天的權利金年化等於乘上 365，會掩蓋股價急變的風險。表列的年化數字維持原樣，讓你看得到原始值；調整的只有分數。</p>

      <h2>資料從哪裡來</h2>
      <p>台股價格與法人買賣超來自交易所與行情資料來源，台股追蹤範圍依交易所公布的收盤價與發行股數重新計算。美股估值所用的基本面資料來自 SEC EDGAR 上的公司申報文件。選擇權報價來自券商行情資料。App 內的新聞以標題、發布媒體名稱與原文連結呈現。資料來源可能延遲或有誤，因此每一頁都標示產生時間，我們也公開<a href="${p("/editorial-policy/")}">更正政策</a>。</p>
      <p>這些規則套用在實際交易日的結果，見<a href="${p("/reports/")}">報告檔案庫</a>。</p>`
    }
  },
  {
    path: "/guides/glossary/",
    section: "guides",
    ads: true,
    updated: "2026-11-18",
    en: {
      title: "Glossary of terms used in DappGo reports | DappGo",
      description: "Plain definitions of the terms in DappGo's stock and options reports, from advance-decline ratio and breadth to implied volatility, theta and profit factor.",
      kicker: "Guide",
      h1: "Glossary",
      lede: "Definitions of the terms used in the reports, as DappGo uses them.",
      body: (p) => `
      <dl class="glossary">
        <dt>Advance-decline ratio</dt><dd>The number of tracked tickers that rose on the day divided by the number that fell. Above 1 means more rose than fell.</dd>
        <dt>Annualized yield</dt><dd>An option premium expressed as a yearly percentage of the strike: premium ÷ strike × 365 ÷ days to expiry. Useful for comparing contracts of similar length; misleading for very short ones.</dd>
        <dt>Assignment</dt><dd>What happens when the buyer of an option exercises it. A put seller who is assigned must buy the shares at the strike; a call seller must sell them.</dd>
        <dt>Benchmark</dt><dd>The index a market is measured against. The US report uses the SPY exchange-traded fund; the Taiwan report uses the TAIEX.</dd>
        <dt>Bollinger Bands</dt><dd>A 20-day moving average with a band two standard deviations above and below it. Price near the lower band is low relative to its own recent range.</dd>
        <dt>Breadth</dt><dd>How widely a market move is shared. DappGo's main breadth figure is the share of tracked tickers priced above their own 20-day moving average.</dd>
        <dt>Cash-secured put</dt><dd>Selling a put while holding enough cash to buy the shares at the strike if assigned.</dd>
        <dt>Composite score</dt><dd>The 0 to 100 score the options report uses to rank contracts on one day, combining yield, distance from the share price, delta and time decay. See <a href="${p("/guides/how-dappgo-computes-signals/")}">the methodology</a>.</dd>
        <dt>Coverage</dt><dd>How many of a report's expected tickers actually have data in that revision.</dd>
        <dt>Covered call</dt><dd>Selling a call against shares already owned.</dd>
        <dt>Days to expiry (DTE)</dt><dd>Calendar days until an option contract expires.</dd>
        <dt>Delta</dt><dd>How much an option's price changes for a one-dollar change in the share price. Its absolute value is also a rough estimate of the chance the option finishes in the money.</dd>
        <dt>Foreign investors, investment trusts, dealers</dt><dd>The three institutional groups whose daily net buying and selling Taiwan's exchange publishes. Investment trusts are domestic fund managers; dealers are securities firms trading their own accounts.</dd>
        <dt>Historical volatility</dt><dd>The annualized standard deviation of a stock's daily returns over a past window, 20 sessions in DappGo's reports.</dd>
        <dt>Implied volatility (IV)</dt><dd>The volatility that makes an option-pricing model match the option's market price. It reflects what the market is paying for uncertainty, not what will happen.</dd>
        <dt>In the money, out of the money</dt><dd>A put is in the money when the share price is below the strike, a call when it is above. Out of the money is the reverse; an option that expires out of the money is worthless.</dd>
        <dt>Lot</dt><dd>In Taiwan, 1,000 shares. Institutional flows are quoted in lots.</dd>
        <dt>MACD</dt><dd>Moving average convergence divergence: the 12-day exponential average minus the 26-day one, compared with its own 9-day average. The difference between the two is the histogram.</dd>
        <dt>Market regime</dt><dd>DappGo's one-word reading of the backdrop (risk-on, risk-off, neutral or mixed), computed from the benchmark's moving averages, its volatility and breadth.</dd>
        <dt>Median move</dt><dd>The middle value of the tracked tickers' one-day changes. Half moved more, half less.</dd>
        <dt>Moving average</dt><dd>The average closing price over the last N sessions. The 20-day average tracks the short-term trend, the 200-day the long-term one.</dd>
        <dt>Payload hash</dt><dd>A fingerprint of a report's data file. Two pages showing the same hash were built from identical data.</dd>
        <dt>Premium</dt><dd>The price of an option, quoted per share. One US equity option contract covers 100 shares.</dd>
        <dt>Probability out of the money</dt><dd>A model estimate of the chance an option expires worthless, which is the outcome an option seller wants.</dd>
        <dt>Profit factor</dt><dd>Total gains divided by total losses across a set of trades. Below 1 means the set lost money overall.</dd>
        <dt>RSI</dt><dd>Relative strength index, here over 14 sessions. It runs from 0 to 100 and compares recent gains with recent losses. At or below 30 is conventionally called oversold, at or above 70 overbought.</dd>
        <dt>Sector dispersion</dt><dd>The standard deviation of sector average moves on the day. Higher means sectors moved less in step.</dd>
        <dt>Session</dt><dd>One trading day on an exchange. Archive pages are filed by session date, not by the date the report was generated.</dd>
        <dt>Stochastic oscillator (KD)</dt><dd>An indicator that places the close within its recent high-low range. %K is the fast line and %D its average; %K crossing above %D is read as momentum turning up.</dd>
        <dt>Strike</dt><dd>The price at which an option's underlying shares are bought or sold if it is exercised.</dd>
        <dt>Theta</dt><dd>How much value an option loses per day from the passage of time, all else equal.</dd>
        <dt>Underlying</dt><dd>The stock or ETF an option contract refers to.</dd>
        <dt>Universe</dt><dd>The fixed list of tickers a report tracks.</dd>
        <dt>Win rate</dt><dd>The share of trades in a set that made money. It says nothing about the size of the wins and losses; read it with the profit factor.</dd>
        <dt>52-week position</dt><dd>Where the price sits between its 52-week low (0%) and high (100%).</dd>
      </dl>`
    },
    zh: {
      title: "DappGo 報告名詞解釋｜DappGo",
      description: "以白話定義 DappGo 股票與選擇權報告中的名詞，從漲跌家數比、市場廣度到隱含波動率、Theta 與獲利因子。",
      kicker: "閱讀指南",
      h1: "名詞解釋",
      lede: "報告中用到的名詞，依 DappGo 的用法定義。",
      body: (p) => `
      <dl class="glossary">
        <dt>52 週位置</dt><dd>價格落在 52 週低點（0%）與高點（100%）之間的位置。</dd>
        <dt>Delta</dt><dd>股價每變動一元，選擇權價格的變動量。其絕對值也可粗略視為選擇權到期時落入價內的機率。</dd>
        <dt>KD 指標</dt><dd>隨機指標，表示收盤價在近期高低區間中的位置。K 為快線，D 為其平均；K 由下往上穿越 D 被視為動能轉強。</dd>
        <dt>MACD</dt><dd>指數平滑異同移動平均線：12 日指數均線減 26 日指數均線，再與自身的 9 日平均比較，兩者之差即柱狀體。</dd>
        <dt>RSI</dt><dd>相對強弱指標，報告採 14 日。數值介於 0 到 100，比較近期的漲幅與跌幅。慣例上 30 以下稱超賣，70 以上稱過熱。</dd>
        <dt>Theta</dt><dd>其他條件不變時，選擇權每天因時間流逝而減少的價值。</dd>
        <dt>三大法人</dt><dd>外資、投信、自營商。台灣的交易所每日公布三者的買賣超。投信是國內基金公司，自營商是以自有資金交易的證券商。</dd>
        <dt>中位數漲跌幅</dt><dd>追蹤標的單日漲跌幅的中間值：一半高於它，一半低於它。</dd>
        <dt>市場廣度</dt><dd>一波走勢有多少標的共同參與。DappGo 的主要廣度數字，是價格高於自身 20 日均線的追蹤標的比例。</dd>
        <dt>市場環境</dt><dd>DappGo 對大盤背景的單詞判讀（風險偏好、風險規避、中性或訊號分歧），由指數的均線位置、波動與廣度算出。</dd>
        <dt>布林通道</dt><dd>20 日均線上下各兩個標準差形成的通道。價格貼近下緣，代表相對於自身近期區間偏低。</dd>
        <dt>年化報酬</dt><dd>把選擇權權利金換算成履約價的年百分比：權利金 ÷ 履約價 × 365 ÷ 到期天數。適合比較天期相近的合約；用在極短天期時容易誤導。</dd>
        <dt>交易日</dt><dd>交易所的一個營業日。檔案頁依交易日歸檔，而不是依報告產生的日期。</dd>
        <dt>均線</dt><dd>最近 N 個交易日收盤價的平均。20 日均線反映短期趨勢，200 日均線（年線）反映長期趨勢。</dd>
        <dt>到期天數（DTE）</dt><dd>距離選擇權合約到期的日曆天數。</dd>
        <dt>指數基準</dt><dd>衡量市場所用的指數。美股報告使用 SPY ETF，台股報告使用加權指數。</dd>
        <dt>涵蓋範圍</dt><dd>某一版報告中，預期標的實際有資料的檔數。</dd>
        <dt>追蹤範圍</dt><dd>報告固定追蹤的標的清單。</dd>
        <dt>張</dt><dd>台股的交易單位，一張為 1,000 股。法人買賣超以張為單位。</dd>
        <dt>現金擔保賣權</dt><dd>賣出賣權，同時保留足夠現金，被履約時以履約價買進股票。</dd>
        <dt>被履約</dt><dd>選擇權買方執行權利時發生的事。賣權賣方被履約時須以履約價買進股票，買權賣方則須賣出。</dd>
        <dt>勝率</dt><dd>一組交易中獲利交易所占的比例。它不反映賺賠的大小，須與獲利因子一起看。</dd>
        <dt>掩護性買權</dt><dd>針對已持有的股票賣出買權。</dd>
        <dt>資料雜湊</dt><dd>報告資料檔的指紋。兩頁顯示相同雜湊，代表由完全相同的資料產生。</dd>
        <dt>價內、價外</dt><dd>賣權在股價低於履約價時為價內，買權在股價高於履約價時為價內；反之為價外。到期時處於價外的選擇權沒有價值。</dd>
        <dt>價外機率</dt><dd>模型估計選擇權到期時毫無價值的機率，這是賣方希望的結果。</dd>
        <dt>履約價</dt><dd>選擇權被執行時，標的股票買賣的價格。</dd>
        <dt>標的</dt><dd>選擇權合約所對應的股票或 ETF。</dd>
        <dt>漲跌家數比</dt><dd>當日上漲的追蹤標的檔數除以下跌檔數。大於 1 代表上漲多於下跌。</dd>
        <dt>歷史波動率</dt><dd>股票過去一段期間日報酬的年化標準差，DappGo 報告採 20 個交易日。</dd>
        <dt>獲利因子</dt><dd>一組交易的總獲利除以總虧損。低於 1 代表整體虧損。</dd>
        <dt>隱含波動率（IV）</dt><dd>讓選擇權定價模型算出的價格等於市價的那個波動率。它反映市場願意替不確定性付多少錢，而不是實際會發生什麼。</dd>
        <dt>綜合分數</dt><dd>選擇權報告用來替同一天的合約排序的 0 至 100 分，綜合報酬、價外距離、Delta 與時間價值流失。見<a href="${p("/guides/how-dappgo-computes-signals/")}">方法說明</a>。</dd>
        <dt>權利金</dt><dd>選擇權的價格，以每股報價。一口美股選擇權合約為 100 股。</dd>
        <dt>類股離散度</dt><dd>當日各類股平均漲跌的標準差。數字越高，類股走勢越不同步。</dd>
      </dl>`
    }
  },
  {
    path: "/guides/",
    section: "guides",
    ads: false,
    hub: true,
    en: {
      title: "Guides to reading DappGo's market reports | DappGo",
      description: "Guides to DappGo's daily stock and options reports: how to read each section, how every signal is computed, and a glossary.",
      kicker: "Guides",
      h1: "Guides",
      lede: "How to read the reports, how the numbers are produced, and what the terms mean.",
      items: [
        ["/guides/how-to-read-the-daily-stock-report/", "How to read the daily stock report", "The US and Taiwan report from top to bottom: regime, breadth, sectors, movers, RSI extremes and the screen."],
        ["/guides/how-to-read-the-options-report/", "How to read the options report", "Premium, distance, implied volatility, why short-dated yields look enormous, and how to read the backtest."],
        ["/guides/how-dappgo-computes-signals/", "How DappGo computes its signals", "The exact rules and thresholds behind every label and score in the reports."],
        ["/guides/glossary/", "Glossary", "Plain definitions of the terms used across the reports."]
      ],
      after: (p) => `<p>The guides describe the reports as they are built today. To see them applied, open any session in the <a href="${p("/reports/")}">report archive</a>.</p>`
    },
    zh: {
      title: "DappGo 市場報告閱讀指南｜DappGo",
      description: "DappGo 每日股票與選擇權報告的閱讀指南：各段落怎麼讀、每個訊號怎麼算，以及名詞解釋。",
      kicker: "閱讀指南",
      h1: "閱讀指南",
      lede: "報告怎麼讀、數字怎麼來、名詞是什麼意思。",
      items: [
        ["/guides/how-to-read-the-daily-stock-report/", "如何閱讀每日股票報告", "由上到下說明美股與台股報告：市場環境、廣度、類股、漲跌幅、RSI 極端值與篩選。"],
        ["/guides/how-to-read-the-options-report/", "如何閱讀選擇權報告", "權利金、價外幅度、隱含波動率、短天期年化報酬為何高得離譜，以及回測怎麼看。"],
        ["/guides/how-dappgo-computes-signals/", "DappGo 訊號怎麼算", "報告中每個標籤與分數背後的確切規則與門檻。"],
        ["/guides/glossary/", "名詞解釋", "以白話定義報告中用到的名詞。"]
      ],
      after: (p) => `<p>這些指南描述的是報告目前的做法。想看實際套用的結果，請打開<a href="${p("/reports/")}">報告檔案庫</a>中的任一交易日。</p>`
    }
  },
  {
    path: "/about/",
    section: "about",
    ads: false,
    en: {
      title: "About DappGo | DappGo",
      description: "DappGo publishes daily research reports on US stocks, Taiwan stocks and US options, with free apps on iOS, Android and the web.",
      kicker: "About",
      h1: "About DappGo",
      lede: "DappGo publishes daily market research for individual investors and builds the apps that deliver it.",
      body: (p) => `
      <h2>What we publish</h2>
      <p>Every trading day DappGo produces three research reports: one on US stocks, one on Taiwan stocks and one on US options. Each report measures the same things in the same way every session, including market regime, breadth, sector moves, momentum and, for options, the premiums on offer and their risks. The reports are free to read in our apps and on the web.</p>
      <ul>
        <li><a href="${p("/us-stocks/")}">US Stocks</a>, <a href="${p("/tw-stocks/")}">TW Stocks</a> and <a href="${p("/options/")}">Options Explorer</a> on iOS, Android and the web.</li>
        <li>The <a href="${p("/reports/")}">daily report archive</a> on this site: one readable page per session for each market.</li>
        <li><a href="https://news.dappgo.com/">DappGo News</a>: headlines for the companies we track, each linked to its publisher.</li>
        <li><a href="${p("/guides/")}">Guides</a> that explain how to read the reports and how every figure is computed.</li>
      </ul>
      <p>We also make <a href="/number-rpg/">Number RPG</a>, a mobile game that has nothing to do with markets.</p>

      <h2>How we work</h2>
      <p>The reports are produced by software. Data is collected from exchanges, company filings and market-data providers, indicators and labels are computed by fixed rules, and each finished report is published as a single data file with a hash that identifies it. Our apps and this site only display a report whose data matches its published hash. The rules are written down in <a href="${p("/guides/how-dappgo-computes-signals/")}">how DappGo computes its signals</a>.</p>
      <p>Some text in the apps is written by language models under strict limits. Where that happens, and where it does not, is set out in <a href="${p("/ai-disclosure/")}">how we use AI</a>.</p>

      <h2>What we are not</h2>
      <p>DappGo is a publisher. We are not a broker, an investment adviser or a fund, we do not execute trades, and we do not know anything about your finances. Everything we publish is research and educational material. It is not advice to buy or sell anything.</p>

      <h2>Who runs DappGo</h2>
      <p>DappGo is run by Yenlung Lai in California, United States, who is responsible for the reports, the apps and this site.</p>

      <h2>Standards and contact</h2>
      <p>Our <a href="${p("/editorial-policy/")}">editorial policy</a> covers sourcing, time stamps, corrections, advertising and independence. To report an error or ask a question, see the <a href="${p("/contact/")}">contact page</a>.</p>`
    },
    zh: {
      title: "關於 DappGo｜DappGo",
      description: "DappGo 每日發布美股、台股與美股選擇權研究報告，並提供 iOS、Android 與網頁版的免費 App。",
      kicker: "關於",
      h1: "關於 DappGo",
      lede: "DappGo 為個人投資者發布每日市場研究，並開發用來閱讀這些研究的 App。",
      body: (p) => `
      <h2>我們發布什麼</h2>
      <p>每個交易日，DappGo 產出三份研究報告：美股、台股與美股選擇權各一份。每份報告每天用同一套方法量同樣的東西，包括市場環境、市場廣度、類股表現與動能；選擇權報告則涵蓋可收取的權利金及其風險。報告可在我們的 App 與網頁上免費閱讀。</p>
      <ul>
        <li><a href="${p("/us-stocks/")}">US Stocks</a>、<a href="${p("/tw-stocks/")}">TW Stocks</a> 與 <a href="${p("/options/")}">Options Explorer</a>，提供 iOS、Android 與網頁版。</li>
        <li>本站的<a href="${p("/reports/")}">每日報告檔案庫</a>：三個市場的每個交易日各有一頁。</li>
        <li><a href="https://news.dappgo.com/">DappGo News</a>：追蹤公司的新聞標題，每則都連回原發布媒體。</li>
        <li><a href="${p("/guides/")}">閱讀指南</a>：說明報告怎麼讀、每個數字怎麼算。</li>
      </ul>
      <p>我們也開發手機遊戲 <a href="/number-rpg/">Number RPG</a>，與金融市場無關。</p>

      <h2>我們怎麼做</h2>
      <p>報告由軟體產生。資料取自交易所、公司申報文件與行情資料供應商，指標與標籤依固定規則計算，每份完成的報告以單一資料檔發布，並附上用來識別它的雜湊值。我們的 App 與本站只顯示資料與已發布雜湊相符的報告。這些規則寫在<a href="${p("/guides/how-dappgo-computes-signals/")}">DappGo 訊號怎麼算</a>。</p>
      <p>App 內有部分文字由語言模型在嚴格限制下撰寫。哪些地方使用、哪些地方不使用，見<a href="${p("/ai-disclosure/")}">AI 使用說明</a>。</p>

      <h2>我們不是什麼</h2>
      <p>DappGo 是內容發布者。我們不是券商、投資顧問或基金，不代客下單，也不了解你的財務狀況。我們發布的一切都是研究與教育性質的資料，不是買賣任何標的的建議。</p>

      <h2>誰經營 DappGo</h2>
      <p>DappGo 由 Yenlung Lai 經營，所在地為美國加州，負責報告、App 與本站的內容。</p>

      <h2>準則與聯絡方式</h2>
      <p>我們的<a href="${p("/editorial-policy/")}">編輯政策</a>說明資料來源、時間標示、更正、廣告與獨立性。回報錯誤或提問，請見<a href="${p("/contact/")}">聯絡頁面</a>。</p>`
    }
  },
  {
    path: "/editorial-policy/",
    section: "about",
    ads: false,
    en: {
      title: "Editorial policy and methodology | DappGo",
      description: "How DappGo sources, time-stamps and corrects its market reports, how advertising is kept separate, and where the methodology is documented.",
      kicker: "Policy",
      h1: "Editorial policy and methodology",
      lede: "The standards we hold our reports, this site and our apps to.",
      body: (p) => `
      <h2>Numbers come from data, with a time attached</h2>
      <p>Every price, percentage and count we publish is taken from market data or computed from it by code. We do not estimate a number we do not have. Each report states the trading session it describes and the time it was generated, and each archive page says whether that time was before or after the market's close. When a report could not get data for some of its tickers, its coverage line says how many are missing.</p>

      <h2>One identifiable source for every page</h2>
      <p>A report revision is published as a single data file identified by a hash. Our apps and this site read a pointer to the latest file and refuse the data if its hash does not match. Each archive page prints the first twelve characters of that hash, so a reader, or we, can tell exactly which data a page was built from.</p>

      <h2>Description, not prediction</h2>
      <p>Our text describes what the data shows and how our rules classify it. We do not publish price targets of our own, we do not tell readers to buy or sell, and we avoid language that implies a forecast. Screens and scores rank tickers or contracts against fixed criteria on a given day. They are not recommendations.</p>

      <h2>Methodology</h2>
      <p>The rules behind every label and score, with their thresholds, are published in <a href="${p("/guides/how-dappgo-computes-signals/")}">how DappGo computes its signals</a>. When a rule changes we update that page and its date.</p>

      <h2>Third-party news</h2>
      <p>News in our products is shown as the publisher's headline, the publisher's name and a link to the original article. We do not republish article text. Translated headlines are machine translations that are checked against the original for numbers and dates; a translation that fails the check is not shown.</p>

      <h2>Corrections</h2>
      <p>If you find a wrong number, tell us through the <a href="${p("/contact/")}">contact page</a> with the page address and the figure. When an error is in the data or in our code, we fix the cause and rebuild the affected pages from corrected data, and the generation time on the page changes. When an error is in a guide or a policy page, we correct the text and update the date at the foot of that page. We do not silently delete a session from the archive to hide a mistake.</p>

      <h2>Advertising and independence</h2>
      <p>Some pages on this site may show advertising served by Google AdSense, and some of our apps show ads. Advertisers do not see our reports before publication and have no say in what we measure, which tickers we track or how anything is ranked. No company can pay to be included in a report, a screen or a ranking. We keep advertising off our legal, support and contact pages.</p>
      <p>People who work on DappGo may own securities that appear in the reports. The reports are generated by fixed rules that apply equally to every ticker on the list.</p>

      <h2>Use of AI</h2>
      <p>Where language models are used in our products, and the limits placed on them, is described in <a href="${p("/ai-disclosure/")}">how we use AI</a>.</p>

      <h2>Not investment advice</h2>
      <p>DappGo is not a licensed investment adviser. Our material is general research and education. It does not consider your objectives, finances or tolerance for loss. Markets can fall and option selling in particular can lose much more than the premium received. See the <a href="/terms">terms of service</a>.</p>
      <p class="note">Last updated 2026-11-18.</p>`
    },
    zh: {
      title: "編輯政策與方法｜DappGo",
      description: "DappGo 如何取得資料、標示時間與更正市場報告，如何區隔廣告，以及方法說明在哪裡。",
      kicker: "政策",
      h1: "編輯政策與方法",
      lede: "我們對報告、本站與 App 所要求的準則。",
      body: (p) => `
      <h2>數字來自資料，並附上時間</h2>
      <p>我們發布的每一個價格、百分比與計數，都取自市場資料，或由程式根據市場資料計算。沒有的數字，我們不會估計。每份報告都標明它描述的交易日與產生時間，每一頁檔案頁也會說明該時間是在收盤前還是收盤後。報告若未能取得部分標的的資料，涵蓋範圍一欄會說明缺了幾檔。</p>

      <h2>每一頁都有可辨識的單一來源</h2>
      <p>每一版報告以單一資料檔發布，並以雜湊值標識。我們的 App 與本站讀取指向最新檔案的指標，資料的雜湊值與指標不符時就拒絕採用。每一頁檔案頁都會印出該雜湊值的前十二碼，讀者與我們都能確知該頁是由哪一份資料產生。</p>

      <h2>描述，而非預測</h2>
      <p>我們的文字描述資料呈現的狀況，以及規則如何將其分類。我們不發布自己的目標價，不叫讀者買或賣，也避免使用暗示預測的措辭。篩選與分數是在某一天依固定條件替標的或合約排序，並不是推薦。</p>

      <h2>方法</h2>
      <p>每個標籤與分數背後的規則與門檻，公開於<a href="${p("/guides/how-dappgo-computes-signals/")}">DappGo 訊號怎麼算</a>。規則有變動時，我們會更新該頁與其日期。</p>

      <h2>第三方新聞</h2>
      <p>我們產品中的新聞，以原發布媒體的標題、媒體名稱與原文連結呈現，不轉載文章內文。翻譯後的標題為機器翻譯，並會與原文比對數字與日期；未通過比對的翻譯不會顯示。</p>

      <h2>更正</h2>
      <p>發現錯誤的數字，請透過<a href="${p("/contact/")}">聯絡頁面</a>告訴我們，並附上頁面網址與該數字。錯誤若出在資料或我們的程式，我們會修正原因，並以更正後的資料重建受影響的頁面，頁面上的產生時間也會隨之改變。錯誤若出在指南或政策頁，我們會修正文字並更新該頁頁尾的日期。我們不會為了掩蓋錯誤而悄悄刪除檔案庫中的某個交易日。</p>

      <h2>廣告與獨立性</h2>
      <p>本站部分頁面可能顯示由 Google AdSense 提供的廣告，我們部分 App 也有廣告。廣告主無法在發布前看到報告，也無權決定我們量什麼、追蹤哪些標的或如何排序。任何公司都不能付費換取被納入報告、篩選或排名。法律、客服與聯絡頁面不放廣告。</p>
      <p>參與 DappGo 工作的人可能持有報告中出現的證券。報告由固定規則產生，對清單上每一檔標的一體適用。</p>

      <h2>AI 的使用</h2>
      <p>我們的產品在哪些地方使用語言模型、設下哪些限制，見<a href="${p("/ai-disclosure/")}">AI 使用說明</a>。</p>

      <h2>非投資建議</h2>
      <p>DappGo 不是持牌投資顧問。我們的內容是一般性的研究與教育資料，沒有考慮你的目標、財務狀況或風險承受度。市場可能下跌，賣出選擇權的虧損尤其可能遠大於所收權利金。請參閱<a href="/terms">服務條款</a>。</p>
      <p class="note">最後更新：2026-11-18。</p>`
    }
  },
  {
    path: "/ai-disclosure/",
    section: "about",
    ads: false,
    en: {
      title: "How DappGo uses AI | DappGo",
      description: "Where DappGo uses language models, where it does not, and the checks applied: report numbers are computed by code, and AI-written text is limited to supplied facts.",
      kicker: "Policy",
      h1: "How we use AI",
      lede: "Which parts of DappGo are written or translated by language models, which are not, and what we do to keep the output tied to the data.",
      body: (p) => `
      <h2>What AI does not do</h2>
      <ul>
        <li><b>It does not produce the numbers.</b> Prices, indicators, regime, sector temperature, screens and scores are computed by ordinary code from market data. No language model is involved in calculating or choosing them.</li>
        <li><b>It does not write the archive pages on this site.</b> Each <a href="${p("/reports/")}">daily report page</a> is assembled by a program from one report's data. The sentences are fixed templates filled with that day's figures, and a sentence is left out when its figure is missing.</li>
        <li><b>It does not give personal advice.</b> Nothing we publish is tailored to an individual, with or without AI.</li>
      </ul>

      <h2>Where AI is used</h2>
      <h3>Short commentary in the apps</h3>
      <p>The apps show a short commentary for each ticker, written by a language model. The model is given that ticker's computed observations and is instructed to describe them conditionally. The commentary is labelled as a reading of supplied observations and not as a forecast or a verified news explanation. Commentary can still be wrong or awkward, which is why the figures it is based on are always shown beside it.</p>
      <h3>Headline translation</h3>
      <p>News headlines are translated between English and Traditional Chinese by a language model. Each translation is checked automatically against the original for mismatched numbers, dates and script. A translation that fails is discarded and the original headline is shown.</p>
      <h3>Drafting guides and policies</h3>
      <p>The guides and policy pages on this site were drafted with AI assistance under DappGo's direction and describe the rules as implemented in our report code. If a guide and the reports ever disagree, treat it as an error and <a href="${p("/contact/")}">tell us</a>.</p>
      <h3>Social posts</h3>
      <p>Posts on our social accounts are prepared with AI assistance from the same report data and pass automated checks that compare their figures with the report before they are scheduled.</p>

      <h2>Limits you should know about</h2>
      <p>Language models can state things that are not in their input. Our controls reduce that risk and do not remove it. When AI-written text and a number on the same screen disagree, the number is what the report computed and the text is the part to doubt. Report it and we will fix the cause.</p>

      <h2>Your data</h2>
      <p>The reports are built from market data, not from information about readers. How our sites and apps handle personal data is covered in the <a href="/privacy">privacy policy</a>.</p>
      <p class="note">Last updated 2026-11-18.</p>`
    },
    zh: {
      title: "DappGo 的 AI 使用說明｜DappGo",
      description: "DappGo 在哪些地方使用語言模型、哪些地方不使用，以及採取哪些檢核：報告數字由程式計算，AI 撰寫的文字限於所提供的事實。",
      kicker: "政策",
      h1: "AI 使用說明",
      lede: "DappGo 哪些部分由語言模型撰寫或翻譯、哪些不是，以及我們如何讓輸出緊扣資料。",
      body: (p) => `
      <h2>AI 不做的事</h2>
      <ul>
        <li><b>不產生數字。</b>價格、指標、市場環境、類股溫度、篩選與分數，都由一般程式根據市場資料計算，語言模型不參與任何計算或挑選。</li>
        <li><b>不撰寫本站的檔案頁。</b>每一頁<a href="${p("/reports/")}">每日報告</a>都由程式根據單一報告的資料組成。句子是固定的範本，填入當日的數字；缺少數字時，該句就不會出現。</li>
        <li><b>不提供個人化建議。</b>無論有沒有使用 AI，我們發布的內容都不是針對個人量身訂做。</li>
      </ul>

      <h2>使用 AI 的地方</h2>
      <h3>App 內的簡短解讀</h3>
      <p>App 會為每檔標的顯示一段簡短解讀，由語言模型撰寫。模型只拿到該標的已計算好的觀察值，並被要求以條件式的語氣描述。這段解讀會標示為「對所提供觀察值的解讀」，而非預測或經查證的新聞成因。解讀仍可能出錯或語句生硬，所以它所依據的數字一定會並列顯示。</p>
      <h3>新聞標題翻譯</h3>
      <p>新聞標題由語言模型在英文與繁體中文之間翻譯。每則翻譯都會自動與原文比對，檢查數字、日期與文字系統是否一致；未通過者會被捨棄，改為顯示原文標題。</p>
      <h3>指南與政策頁的草稿</h3>
      <p>本站的指南與政策頁，是在 DappGo 的指示下以 AI 輔助起草，內容描述報告程式實際採用的規則。若指南與報告有任何不一致，請視為錯誤並<a href="${p("/contact/")}">告訴我們</a>。</p>
      <h3>社群貼文</h3>
      <p>我們社群帳號上的貼文，是根據同一份報告資料以 AI 輔助撰寫，排程前會通過自動檢核，比對貼文數字與報告是否一致。</p>

      <h2>你應該知道的限制</h2>
      <p>語言模型可能說出輸入中沒有的內容。我們的控管能降低這個風險，但無法完全排除。同一畫面上 AI 撰寫的文字與數字不一致時，數字是報告算出來的，該懷疑的是文字。請回報，我們會修正原因。</p>

      <h2>你的資料</h2>
      <p>報告由市場資料產生，不使用任何關於讀者的資訊。我們的網站與 App 如何處理個人資料，見<a href="/privacy">隱私權政策</a>。</p>
      <p class="note">最後更新：2026-11-18。</p>`
    }
  },
  {
    path: "/contact/",
    section: "about",
    ads: false,
    en: {
      title: "Contact DappGo | DappGo",
      description: "How to reach DappGo: report an error in a report, ask about the apps, or send a business or press enquiry.",
      kicker: "Contact",
      h1: "Contact",
      lede: "The quickest way to reach the right place.",
      body: (p) => `
      <h2>Email</h2>
      <p>Write to <a href="mailto:admin@dappgo.com">admin@dappgo.com</a>. We read every message. The address is the same for readers, app users, businesses and the press.</p>

      <h2>Report an error in a report</h2>
      <p>Send the address of the page, the figure you believe is wrong, and where you saw a different value. The session date and the short payload code at the top of the page help us find the exact data. How we handle corrections is described in the <a href="${p("/editorial-policy/")}">editorial policy</a>.</p>

      <h2>Help with an app</h2>
      <p>The <a href="/support">support page</a> has answers to common questions about the TW Stocks, US Stocks and Options Explorer apps, and forms for feedback. For Number RPG, use the <a href="/number-rpg/support/">Number RPG support page</a>.</p>

      <h2>Privacy requests</h2>
      <p>To ask about or delete personal data, follow the steps in the <a href="/privacy">privacy policy</a> or email the address above.</p>

      <h2>Follow DappGo</h2>
      <p>We post daily report summaries on <a href="https://www.threads.com/@dappgo" rel="noopener noreferrer">Threads</a>, <a href="https://www.instagram.com/dappgo/" rel="noopener noreferrer">Instagram</a>, <a href="https://www.facebook.com/dappgo" rel="noopener noreferrer">Facebook</a> and <a href="https://www.linkedin.com/company/dappgo/" rel="noopener noreferrer">LinkedIn</a>.</p>
      <p class="note">We cannot give personal investment advice or comment on individual trades.</p>`
    },
    zh: {
      title: "聯絡 DappGo｜DappGo",
      description: "如何聯絡 DappGo：回報報告中的錯誤、詢問 App 相關問題，或提出商務與媒體洽詢。",
      kicker: "聯絡",
      h1: "聯絡我們",
      lede: "最快找到對的窗口。",
      body: (p) => `
      <h2>電子郵件</h2>
      <p>請來信 <a href="mailto:admin@dappgo.com">admin@dappgo.com</a>。每一封信我們都會閱讀。讀者、App 使用者、企業與媒體皆使用同一個信箱。</p>

      <h2>回報報告中的錯誤</h2>
      <p>請附上頁面網址、你認為有誤的數字，以及你在哪裡看到不同的數值。頁首的交易日與資料短碼能幫助我們找到確切的資料。我們處理更正的方式見<a href="${p("/editorial-policy/")}">編輯政策</a>。</p>

      <h2>App 使用問題</h2>
      <p><a href="/support">客服支援頁面</a>有 TW Stocks、US Stocks 與 Options Explorer 的常見問題與意見回饋表單。Number RPG 請使用 <a href="/number-rpg/support/">Number RPG 支援頁面</a>。</p>

      <h2>隱私相關請求</h2>
      <p>查詢或刪除個人資料，請依<a href="/privacy">隱私權政策</a>中的步驟辦理，或來信上述信箱。</p>

      <h2>追蹤 DappGo</h2>
      <p>我們每日在 <a href="https://www.threads.com/@dappgo" rel="noopener noreferrer">Threads</a>、<a href="https://www.instagram.com/dappgo/" rel="noopener noreferrer">Instagram</a>、<a href="https://www.facebook.com/dappgo" rel="noopener noreferrer">Facebook</a> 與 <a href="https://www.linkedin.com/company/dappgo/" rel="noopener noreferrer">LinkedIn</a> 發布報告摘要。</p>
      <p class="note">我們無法提供個人投資建議，也不評論個別交易。</p>`
    }
  }
];
