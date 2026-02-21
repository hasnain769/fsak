
import unittest
import os
import sys

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))

class TestRiskArchitect(unittest.TestCase):
    def test_scripts_existence(self):
        """Verify that the cost_estimator.py script exists."""
        script_path = os.path.join(os.path.dirname(__file__), '../scripts/cost_estimator.py')
        self.assertTrue(os.path.exists(script_path), "cost_estimator.py should exist")

if __name__ == '__main__':
    unittest.main()
