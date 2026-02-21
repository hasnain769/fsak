
import unittest
import os
import sys

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))

class TestTddEnforcer(unittest.TestCase):
    def test_scripts_existence(self):
        """Verify that the suite_orchestrator.py script exists."""
        script_path = os.path.join(os.path.dirname(__file__), '../scripts/suite_orchestrator.py')
        self.assertTrue(os.path.exists(script_path), "suite_orchestrator.py should exist")

if __name__ == '__main__':
    unittest.main()
