
import unittest
import os
import sys

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))

class TestRequirementEngineer(unittest.TestCase):
    def test_scripts_existence(self):
        """Verify that the validate_spec.py script exists."""
        script_path = os.path.join(os.path.dirname(__file__), '../scripts/validate_spec.py')
        self.assertTrue(os.path.exists(script_path), "validate_spec.py should exist")

if __name__ == '__main__':
    unittest.main()
