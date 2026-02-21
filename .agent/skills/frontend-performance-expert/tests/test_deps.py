
import unittest
import os
import sys
import tempfile
import json

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))
from analyze_deps import analyze_deps

class TestFrontendPerformanceExpert(unittest.TestCase):
    def test_heavy_dep_moment(self):
        """Verify analyzer catches moment.js."""
        pkg = {"dependencies": {"moment": "^2.0.0"}}
        with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
            json.dump(pkg, tmp)
            tmp_path = tmp.name
        tmp.close()  # Close explicitly for Windows compatibility if needed
            
        try:
            with self.assertRaises(SystemExit):
                analyze_deps(tmp_path)
        finally:
            os.remove(tmp_path)

if __name__ == '__main__':
    unittest.main()
