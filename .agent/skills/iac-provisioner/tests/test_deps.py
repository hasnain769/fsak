
import unittest
import os
import sys
import subprocess
from unittest.mock import patch

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))
from check_terraform import check_terraform

class TestIaCProvisioner(unittest.TestCase):
    @patch('subprocess.run')
    def test_check_terraform_installed(self, mock_run):
        """Verify check passes when terraform is installed."""
        mock_run.return_value.returncode = 0
        try:
            check_terraform()
        except SystemExit:
            self.fail("check_terraform() raised SystemExit unexpectedly!")

    @patch('subprocess.run')
    def test_check_terraform_missing(self, mock_run):
        """Verify check fails when terraform is missing."""
        mock_run.side_effect = FileNotFoundError
        with self.assertRaises(SystemExit):
            check_terraform()

if __name__ == '__main__':
    unittest.main()
