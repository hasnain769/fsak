
import unittest
import os
import sys

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))

class TestArchitectureBlueprinter(unittest.TestCase):
    def test_scripts_existence(self):
        """Verify that the check_alignment.py script exists."""
        script_path = os.path.join(os.path.dirname(__file__), '../scripts/check_alignment.py')
        self.assertTrue(os.path.exists(script_path), "check_alignment.py should exist")

if __name__ == '__main__':
    unittest.main()
