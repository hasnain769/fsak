
import unittest
import os
import sys
import tempfile

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))
from check_accessibility import check_accessibility

class TestFrontendDesign(unittest.TestCase):
    def test_missing_alt(self):
        """Verify checker catches missing alt tags."""
        bad_html = "<div><img src='foo.jpg'></div>"
        with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
            tmp.write(bad_html)
            tmp_path = tmp.name
            
        try:
            with self.assertRaises(SystemExit):
                check_accessibility(tmp_path)
        finally:
            os.remove(tmp_path)

if __name__ == '__main__':
    unittest.main()
