
import unittest
import os
import sys

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))

class TestMcpBuilder(unittest.TestCase):
    def test_scripts_existence(self):
        """Verify that the evaluation.py script exists."""
        script_path = os.path.join(os.path.dirname(__file__), '../scripts/evaluation.py')
        self.assertTrue(os.path.exists(script_path), "evaluation.py should exist")
        
    def test_connections_existence(self):
        """Verify that the connections.py script exists."""
        script_path = os.path.join(os.path.dirname(__file__), '../scripts/connections.py')
        self.assertTrue(os.path.exists(script_path), "connections.py should exist")

if __name__ == '__main__':
    unittest.main()
