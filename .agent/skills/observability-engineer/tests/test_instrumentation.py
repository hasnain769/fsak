
import unittest
import os
import sys
import tempfile

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))
from check_instrumentation import check_otel

class TestObservabilityEngineer(unittest.TestCase):
    def test_missing_otel(self):
        """Verify checker catches missing OTel imports."""
        bad_code = "import json\nprint('hello')"
        with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
            tmp.write(bad_code)
            tmp_path = tmp.name
            
        try:
            with self.assertRaises(SystemExit):
                check_otel(tmp_path)
        finally:
            os.remove(tmp_path)

if __name__ == '__main__':
    unittest.main()
