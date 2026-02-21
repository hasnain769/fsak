
import unittest
import os
import sys
import tempfile

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))
from init_rca import generate_rca

class TestRootCauseTracer(unittest.TestCase):
    def test_generate_rca(self):
        """Verify RCA template generation."""
        with tempfile.TemporaryDirectory() as tmpdir:
            path = os.path.join(tmpdir, "RCA_TEST.md")
            generate_rca(path)
            self.assertTrue(os.path.exists(path))
            with open(path, 'r') as f:
                content = f.read()
                self.assertIn("# Incident Report", content)

if __name__ == '__main__':
    unittest.main()
