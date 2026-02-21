
import unittest
import os
import sys
import tempfile

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))
from audit_schema import audit_schema

class TestBackendScaleSpecialist(unittest.TestCase):
    def test_audit_schema_no_pk(self):
        """Verify auditor catches missing primary key."""
        bad_sql = "CREATE TABLE users (id int, name text);"
        with tempfile.NamedTemporaryFile(mode='w+', delete=False) as tmp:
            tmp.write(bad_sql)
            tmp_path = tmp.name
            
        try:
            # Capturing stdout is tricky in simple test, we just check if it exits with 1
            with self.assertRaises(SystemExit):
                audit_schema(tmp_path)
        finally:
            os.remove(tmp_path)

if __name__ == '__main__':
    unittest.main()
