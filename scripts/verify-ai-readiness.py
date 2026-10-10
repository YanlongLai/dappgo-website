"""Offline public AI discovery contract; no provider calls or deployment."""
from pathlib import Path
from urllib.parse import urlparse
import re
import xml.etree.ElementTree as ET


def verify(root: Path) -> None:
    robots = (root / 'robots.txt').read_text()
    assert 'Content-Signal: search=yes, ai-input=yes, ai-train=no' in robots
    assert 'User-agent: Google-adstxt\nDisallow:' in robots
    assert 'Allow: /' in robots
    documents = [(root / name).read_text() for name in ('llms.txt', 'ai-guide.txt')]
    allowed = {'dappgo.com', 'stocks.dappgo.com', 'options.dappgo.com', 'data.dappgo.com'}
    for text in documents:
        for url in re.findall(r'https://[^\s)]+', text):
            assert urlparse(url).hostname in allowed, f'Non-public discovery host: {url}'
        for market in ('tw', 'us', 'options'):
            assert f'https://data.dappgo.com/v1/markets/{market}/dashboard/latest.json' in text
        assert 'data_hash' in text and 'report_date' in text
        assert 'data_url_v2' in text
        assert 'ai-train=no' in text
    locations = [node.text for node in ET.parse(root / 'sitemap.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
    assert 'https://dappgo.com/ai-guide.txt' in locations
    for location in locations:
        assert urlparse(location).hostname == 'dappgo.com'


if __name__ == '__main__':
    verify(Path(__file__).resolve().parents[1])
    print('Public AI discovery contract: passed')
