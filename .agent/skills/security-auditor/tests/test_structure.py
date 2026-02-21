
import unittest
import os
import sys

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))

class TestSecurityAuditor(unittest.TestCase):
    def test_scripts_existence(self):
        """Verify that the secret_scanner.py script exists."""
        script_path = os.path.join(os.path.dirname(__file__), '../scripts/secret_scanner.py')
        self.assertTrue(os.path.exists(script_path), "secret_scanner.py should exist")

if __name__ == '__main__':
    unittest.main()
