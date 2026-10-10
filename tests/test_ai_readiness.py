import importlib.util
from pathlib import Path
import tempfile
import unittest

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('readiness', ROOT / 'scripts/verify-ai-readiness.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class ReadinessTests(unittest.TestCase):
    def test_current_contract(self):
        module.verify(ROOT)

    def altered_contract(self, file, old, new):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for name in ('robots.txt', 'llms.txt', 'ai-guide.txt', 'sitemap.xml'):
                text = (ROOT / name).read_text()
                (root / name).write_text(text.replace(old, new) if name == file else text)
            with self.assertRaises(AssertionError):
                module.verify(root)

    def test_training_opt_in_rejected(self):
        self.altered_contract('robots.txt', 'ai-train=no', 'ai-train=yes')

    def test_private_host_rejected(self):
        self.altered_contract('llms.txt', 'https://dappgo.com/support', 'https://git.dappgo.com/support')

    def test_old_cdn_pointer_rejected(self):
        self.altered_contract('llms.txt', 'https://data.dappgo.com/v1/markets/tw/dashboard/latest.json', 'https://cdn.jsdelivr.net/old.json')


if __name__ == '__main__':
    unittest.main()
