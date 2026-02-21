
import sys
import os
import re

def check_accessibility(file_path):
    issues = []
    with open(file_path, 'r') as f:
        content = f.read()

    # Check for img tags without alt
    img_tags = re.findall(r'<img[^>]+>', content)
    for tag in img_tags:
        if 'alt=' not in tag:
            issues.append(f"Image missing alt text: {tag[:50]}...")

    # Check for button tags without aria-label or text content (simplistic)
    # This is a very basic check
    
    if issues:
        print("Accessibility Issues Found:")
        for issue in issues:
            print(f"- {issue}")
        sys.exit(1)
    else:
        print("Basic accessibility check passed.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python check_accessibility.py <html_file>")
        sys.exit(1)
    check_accessibility(sys.argv[1])
