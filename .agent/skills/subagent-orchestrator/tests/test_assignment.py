
import unittest
import os
import sys
import tempfile
import json

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))
from assign_tasks import assign_tasks

class TestSubagentOrchestrator(unittest.TestCase):
    def test_conflict_detection(self):
        """Verify script detects overlapping files."""
        tasks = [
            {"task": "A", "files": ["f1.py"]},
            {"task": "B", "files": ["f1.py", "f2.py"]}
        ]
        with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
            json.dump(tasks, tmp)
            tmp_path = tmp.name
        tmp.close()
            
        try:
            with self.assertRaises(SystemExit):
                assign_tasks(tmp_path)
        finally:
            os.remove(tmp_path)

if __name__ == '__main__':
    unittest.main()
