
import unittest
import os
import sys
from unittest.mock import patch

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))
from check_adk_setup import check_adk

class TestAdkBuilder(unittest.TestCase):
    @patch('importlib.util.find_spec')
    def test_check_adk_installed(self, mock_find_spec):
        """Verify check passes when ADK is installed."""
        mock_find_spec.return_value = True
        try:
            check_adk()
        except SystemExit:
            self.fail("check_adk() raised SystemExit unexpectedly!")

    @patch('importlib.util.find_spec')
    def test_check_adk_missing(self, mock_find_spec):
        """Verify check fails when ADK is missing."""
        mock_find_spec.return_value = None
        with self.assertRaises(SystemExit):
            check_adk()

if __name__ == '__main__':
    unittest.main()
