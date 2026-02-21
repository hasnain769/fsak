
import unittest
import os
import sys
import tempfile

# Ensure scripts dir is on path
sys.path.append(os.path.join(os.path.dirname(__file__), '../scripts'))
from audit_visibility import audit_visibility

class TestSearchIntelligenceExpert(unittest.TestCase):
    def test_missing_elements(self):
        """Verify audit catches missing SEO elements."""
        # Missing title, meta description, JSON-LD
        bad_html = "<html><body><h1>Hello</h1></body></html>"
        
        with tempfile.NamedTemporaryFile(mode='w+', suffix='.html', delete=False) as tmp:
            tmp.write(bad_html)
            tmp_path = tmp.name
        tmp.close()
            
        try:
            with self.assertRaises(SystemExit):
                audit_visibility(tmp_path)
        finally:
            os.remove(tmp_path)

    def test_complete_page(self):
        """Verify good page passes."""
        good_html = """
        <html>
        <head>
            <title>Good Page</title>
            <meta name="description" content="A very good description for SEO purposes.">
            <script type="application/ld+json">{"@context": "https://schema.org"}</script>
        </head>
        <body>
            <h1>Main Title</h1>
        </body>
        </html>
        """
        with tempfile.NamedTemporaryFile(mode='w+', suffix='.html', delete=False) as tmp:
            tmp.write(good_html)
            tmp_path = tmp.name
        tmp.close()

        try:
            audit_visibility(tmp_path)
        except SystemExit:
            self.fail("audit_visibility() raised SystemExit on a valid page!")
        finally:
            os.remove(tmp_path)

if __name__ == '__main__':
    unittest.main()
