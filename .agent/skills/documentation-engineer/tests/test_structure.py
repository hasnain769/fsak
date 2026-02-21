
import unittest
import os
import sys

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))

class TestDocumentationEngineer(unittest.TestCase):
    def test_scripts_existence(self):
        """Verify that the doc_sync_checker.py script exists."""
        script_path = os.path.join(os.path.dirname(__file__), '../scripts/doc_sync_checker.py')
        self.assertTrue(os.path.exists(script_path), "doc_sync_checker.py should exist")

if __name__ == '__main__':
    unittest.main()
