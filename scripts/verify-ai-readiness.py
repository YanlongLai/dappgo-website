"""Offline public AI discovery contract; no provider calls or deployment."""
from pathlib import Path
from urllib.parse import urlparse
from html.parser import HTMLParser
import json
import re
import xml.etree.ElementTree as ET


class HomeDocument(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links = []
        self.meta = {}
        self.lang = None
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'html':
            self.lang = attrs.get('lang')
        elif tag == 'link':
            self.links.append(attrs)
        elif tag == 'meta':
            self.meta[attrs.get('name', attrs.get('property'))] = attrs.get('content')


def verify(root: Path) -> None:
    robots = (root / 'robots.txt').read_text()
    assert 'Content-Signal: search=yes, ai-input=yes, ai-train=no' in robots
    assert 'User-agent: Google-adstxt\nDisallow:' in robots
    assert 'Allow: /' in robots
    documents = [(root / name).read_text() for name in ('llms.txt', 'ai-guide.txt')]
    allowed = {'dappgo.com', 'stocks.dappgo.com', 'options.dappgo.com', 'news.dappgo.com', 'data.dappgo.com', 'hackathon.dappgo.com'}
    for text in documents:
        for url in re.findall(r'https://[^\s)]+', text):
            assert urlparse(url).hostname in allowed, f'Non-public discovery host: {url}'
        for market in ('tw', 'us', 'options'):
            assert f'https://data.dappgo.com/v1/markets/{market}/dashboard/latest.json' in text
        assert 'data_hash' in text and 'report_date' in text
        assert 'data_url_v2' in text
        assert 'ai-train=no' in text
    locations = [node.text for node in ET.parse(root / 'sitemap.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
    for resource in ('https://dappgo.com/ai-guide.txt', 'https://dappgo.com/mobile-version-policy.json', 'https://dappgo.com/data/pulse.json'):
        assert resource not in locations, f'Non-HTML resource must not be in sitemap: {resource}'
    for location in locations:
        assert urlparse(location).hostname == 'dappgo.com'
        assert not re.search(r'\.(txt|json|xml)$', urlparse(location).path), f'Sitemap lists a non-HTML resource: {location}'
    # Options is served at /options/ (301 from /options). Slashless links create redirect chains in Search Console.
    slashless = re.compile(r'(?:https://dappgo\.com|["\'(])/options(?![/\w.-])')
    for path in root.rglob('*'):
        relative = path.relative_to(root)
        if path.suffix not in {'.html', '.js', '.mjs', '.json', '.txt', '.xml'} or {'.git', 'node_modules', 'artifacts', 'docs'} & set(relative.parts):
            continue
        assert not slashless.search(path.read_text(errors='ignore')), f'Slashless /options link in {relative}; use /options/'
    alternates = {'en': 'https://dappgo.com/', 'zh-Hant': 'https://dappgo.com/zh/', 'x-default': 'https://dappgo.com/'}
    assert alternates['zh-Hant'] in documents[0], 'llms.txt missing Traditional Chinese homepage'
    pulse = json.loads((root / 'data/pulse.json').read_text())
    for file, lang, locale, url in (
        ('index.html', 'en', 'en_US', alternates['en']),
        ('zh/index.html', 'zh-Hant', 'zh_TW', alternates['zh-Hant']),
    ):
        assert url in locations, f'Sitemap missing {url}'
        text = (root / file).read_text()
        home = HomeDocument(text)
        assert home.lang == lang, f'{file}: language'
        assert any(link.get('rel') == 'canonical' and link.get('href') == url for link in home.links)
        assert home.meta.get('og:url') == url
        assert home.meta.get('og:locale') == locale
        assert {link.get('hreflang'): link.get('href') for link in home.links if link.get('rel') == 'alternate'} == alternates
        assert home.meta.get('description') == home.meta.get('og:description') == home.meta.get('twitter:description')
        assert home.meta.get('og:title') == home.meta.get('twitter:title')
        for region in ('stats', 'board', 'wire', 'source'):
            assert f'<!-- pulse:{region}:start -->' in text and f'<!-- pulse:{region}:end -->' in text
        assert 'Today’s report needs JavaScript' not in text
        assert pulse['built_at_utc'].replace('T', ' ').replace('Z', '') in text
        for market in pulse['markets'].values():
            assert market['report_date'] in text
            assert f"{market['coverage']['covered']}/{market['coverage']['expected']}" in text
        for story in pulse['news']:
            assert story['url'].replace('&', '&amp;') in text
        assert ('不構成投資建議' if lang == 'zh-Hant' else 'not investment advice') in text
    for node in ET.parse(root / 'sitemap.xml').getroot():
        if node.findtext('{http://www.sitemaps.org/schemas/sitemap/0.9}loc') in alternates.values():
            assert {link.get('hreflang'): link.get('href') for link in node.findall('{http://www.w3.org/1999/xhtml}link')} == alternates


if __name__ == '__main__':
    verify(Path(__file__).resolve().parents[1])
    print('Public AI discovery contract: passed')
