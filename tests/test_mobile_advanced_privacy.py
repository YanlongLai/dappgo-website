from pathlib import Path
import unittest


class MobileAdvancedPrivacyTests(unittest.TestCase):
    def test_bilingual_version_scoped_disclosure(self):
        page = (Path(__file__).resolve().parents[1] / 'privacy.html').read_text()
        for text in (
            'id="mobile-advanced-consent"',
            'Optional detailed usage analytics',
            '選擇性詳細使用分析',
            'limited measurement signals',
            '有限的衡量訊號',
            'all four consent purposes denied by default',
            'does not grant ad storage',
            'without a separate migration flow',
        ):
            self.assertIn(text, page)
        self.assertNotIn('the stock apps do not use Firebase Analytics', page)

    def test_push_purchases_disclosure_matches_shipped_apps(self):
        page = (Path(__file__).resolve().parents[1] / 'privacy.html').read_text()
        for text in (
            'id="mobile-push-purchases"',
            'on by default',
            '預設開啟',
            'Google FCM token',
            'Google FCM',
            'RevenueCat App User ID',
            'RevenueCat 匿名 App User ID',
            'data.dappgo.com',
            'signed trial pass',
            'Firebase Crashlytics',
            'DappGo News',
        ):
            self.assertIn(text, page)
        for stale in (
            'remain paused in the new TW Stocks / US Stocks versions',
            '仍暫停',
            'if paid subscriptions launch',
            'Paid Features (future)',
            '訂閱與付費（未來）',
            'do not initialize or request advertising',
            'Upcoming iOS research apps',
        ):
            self.assertNotIn(stale, page)
        self.assertNotIn('股票 App 不使用 Firebase Analytics', page)


if __name__ == '__main__':
    unittest.main()
