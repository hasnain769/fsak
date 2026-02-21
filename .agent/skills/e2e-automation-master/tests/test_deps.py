
import unittest
import os
import sys
import subprocess
from unittest.mock import patch

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))
from check_deps import check_playwright

class TestE2EAutomationMaster(unittest.TestCase):
    @patch('subprocess.run')
    def test_check_playwright_success(self, mock_run):
        """Verify check passes when playwright is present."""
        mock_run.return_value.returncode = 0
        try:
            check_playwright()
        except SystemExit:
            self.fail("check_playwright() raised SystemExit unexpectedly!")

    @patch('subprocess.run')
    def test_check_playwright_fail(self, mock_run):
        """Verify check fails when playwright is missing."""
        mock_run.side_effect = FileNotFoundError
        with self.assertRaises(SystemExit):
            check_playwright()

if __name__ == '__main__':
    unittest.main()
