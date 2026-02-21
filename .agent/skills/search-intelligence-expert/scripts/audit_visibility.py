
import sys
import os
import re
import json

def analyze_file(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    issues = []
    
    # 1. Check Title
    if not re.search(r'<title>.*?</title>', content, re.IGNORECASE | re.DOTALL):
        issues.append("Missing <title> tag")

    # 2. Check Meta Description (SEO)
    meta_desc = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', content, re.IGNORECASE)
    if not meta_desc:
        issues.append("Missing meta description")
    elif len(meta_desc.group(1)) > 160:
        issues.append("Meta description too long (>160 chars)")

    # 3. Check JSON-LD (AEO/GEO)
    # Basic check for existence of structured data
    if 'application/ld+json' not in content:
        issues.append("Missing structured data (JSON-LD) for AEO/GEO")

    # 4. Check H1
    if not re.search(r'<h1.*?>.*?</h1>', content, re.IGNORECASE):
        issues.append("Missing <h1> tag")

    return issues

def audit_visibility(target_path):
    if not os.path.exists(target_path):
        print(f"Path {target_path} not found.")
        sys.exit(1)

    all_issues = {}
    
    files_to_scan = []
    if os.path.isfile(target_path):
        files_to_scan.append(target_path)
    else:
        for root, _, files in os.walk(target_path):
            for file in files:
                if file.endswith(('.html', '.htm', '.tsx', '.jsx', '.php')):
                    files_to_scan.append(os.path.join(root, file))

    if not files_to_scan:
        print("No HTML/Template files found to scan.")
        sys.exit(0)

    for file_path in files_to_scan:
        issues = analyze_file(file_path)
        if issues:
            all_issues[file_path] = issues

    if all_issues:
        print("Search Visibility Issues Found:")
        for f, problems in all_issues.items():
             print(f"\nFile: {f}")
             for p in problems:
                 print(f"  - {p}")
        sys.exit(1)
    else:
        print("Audit Passed: Basic SEO/GEO elements present.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python audit_visibility.py <file_or_directory>")
        sys.exit(1)
    audit_visibility(sys.argv[1])
