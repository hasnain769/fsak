
import unittest
import os
import sys
import tempfile

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))
from analyze_complexity import analyze_complexity

class TestCleanCodeGuardian(unittest.TestCase):
    def test_complexity_large_file(self):
        """Verify analyzer flags large files."""
        # Create a file with 301 lines
        with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
            tmp.write("\n" * 301)
            tmp_path = tmp.name
            
        try:
            with self.assertRaises(SystemExit):
                analyze_complexity(tmp_path)
        finally:
            os.remove(tmp_path)

if __name__ == '__main__':
    unittest.main()
