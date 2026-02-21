
import unittest
import os
import sys
import tempfile

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))
from analyze_plan import analyze_plan

class TestBrainstormStrategist(unittest.TestCase):
    def test_missing_sections(self):
        """Verify analyzer catches missing risks/goals."""
        # Content missing "Risk"
        content = "My Plan\n\nGoal: Win.\nStrategy: Run fast." 
        
        with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
            tmp.write(content)
            tmp_path = tmp.name
        tmp.close()
            
        try:
            with self.assertRaises(SystemExit):
                analyze_plan(tmp_path)
        finally:
            os.remove(tmp_path)

    def test_good_plan(self):
        """Verify good plan passes."""
        content = "My Plan\n\nGoal: Win.\nRisk: Trip.\nStrategy: Run fast."
        with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
            tmp.write(content)
            tmp_path = tmp.name
        tmp.close()

        try:
            analyze_plan(tmp_path)
        except SystemExit:
            self.fail("analyze_plan() raised SystemExit on a valid plan!")
        finally:
            os.remove(tmp_path)

if __name__ == '__main__':
    unittest.main()
