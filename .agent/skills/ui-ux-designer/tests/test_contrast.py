
import unittest
import os
import sys

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))
from check_contrast import contrast_ratio, luminance

class TestUiUxDesigner(unittest.TestCase):
    def test_contrast_calculation(self):
        """Verify contrast ratio calculation."""
        # Black and White should be 21:1
        l1 = luminance(0, 0, 0)
        l2 = luminance(255, 255, 255)
        ratio = contrast_ratio(l1, l2)
        self.assertAlmostEqual(ratio, 21.0, places=1)

if __name__ == "__main__":
    unittest.main()
