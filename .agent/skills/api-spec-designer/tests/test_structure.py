
import unittest
import os
import sys

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))

class TestApiSpecDesigner(unittest.TestCase):
    def test_scripts_existence(self):
        """Verify that the validate_oas.py script exists."""
        script_path = os.path.join(os.path.dirname(__file__), '../scripts/validate_oas.py')
        self.assertTrue(os.path.exists(script_path), "validate_oas.py should exist")

if __name__ == '__main__':
    unittest.main()
