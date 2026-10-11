# Product requirements

- Opening `news.dappgo.com/` must land on the US News edition.
- On a first US visit, an English browser receives English copy and a Chinese
  browser receives Chinese copy.
- An explicit `?lang=zh|en` URL choice remains authoritative. A language the
  reader selected in News remains authoritative through the existing local
  preference; browser language is only the fallback for a new reader.
- The TW edition keeps its current Chinese default unless the reader chooses a
  valid URL or saved language.
- Do not change the published data, AI analysis, article links, or market
  navigation behavior.
