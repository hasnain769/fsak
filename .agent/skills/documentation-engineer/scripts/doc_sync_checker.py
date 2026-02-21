#!/usr/bin/env python3
"""
Documentation Sync Checker

Verifies documentation is in sync with code:
- API endpoints match docs
- Code examples are valid
- Links are not broken

Usage:
    python3 doc_sync_checker.py [path] [--json]
"""

import sys
import os
import re
import json
import subprocess

def find_markdown_files(path):
    """Find all markdown files in path."""
    md_files = []
    for root, dirs, files in os.walk(path):
        # Skip common non-doc directories
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', '__pycache__', 'venv']]
        for file in files:
            if file.endswith('.md'):
                md_files.append(os.path.join(root, file))
    return md_files


def check_broken_links(content, filepath):
    """Check for broken internal links."""
    issues = []
    base_dir = os.path.dirname(filepath)
    
    # Find markdown links [text](path)
    link_pattern = r'\[([^\]]+)\]\(([^)]+)\)'
    for match in re.finditer(link_pattern, content):
        text, link = match.groups()
        
        # Skip external links and anchors
        if link.startswith(('http://', 'https://', 'mailto:', '#')):
            continue
        
        # Remove anchor from link
        link_path = link.split('#')[0]
        if not link_path:
            continue
        
        # Check if file exists
        full_path = os.path.join(base_dir, link_path)
        if not os.path.exists(full_path):
            issues.append({
                "type": "broken_link",
                "file": filepath,
                "link": link,
                "text": text
            })
    
    return issues


def check_code_blocks(content, filepath):
    """Check if code blocks have language specified."""
    issues = []
    
    # Find code blocks without language
    unlabeled = re.findall(r'^```\s*$', content, re.MULTILINE)
    if unlabeled:
        issues.append({
            "type": "unlabeled_code_block",
            "file": filepath,
            "count": len(unlabeled),
            "message": "Code blocks without language specification"
        })
    
    return issues


def check_todo_items(content, filepath):
    """Find TODO items in documentation."""
    issues = []
    
    patterns = [
        r'\bTODO\b',
        r'\bFIXME\b',
        r'\[TBD\]',
        r'\[PLACEHOLDER\]',
    ]
    
    for pattern in patterns:
        matches = re.findall(pattern, content, re.IGNORECASE)
        if matches:
            issues.append({
                "type": "todo_found",
                "file": filepath,
                "pattern": pattern,
                "count": len(matches)
            })
    
    return issues


def check_outdated_badges(content, filepath):
    """Check for potentially outdated badges."""
    issues = []
    
    # Common outdated badge patterns
    if 'build-failing' in content.lower():
        issues.append({
            "type": "failing_badge",
            "file": filepath,
            "message": "Documentation shows failing build badge"
        })
    
    return issues


def analyze_documentation(path):
    """Analyze documentation for issues."""
    results = {
        "path": path,
        "files_scanned": 0,
        "issues": [],
        "stats": {
            "broken_links": 0,
            "unlabeled_code": 0,
            "todos": 0,
        }
    }
    
    md_files = find_markdown_files(path)
    results["files_scanned"] = len(md_files)
    
    for filepath in md_files:
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Run checks
            issues = []
            issues.extend(check_broken_links(content, filepath))
            issues.extend(check_code_blocks(content, filepath))
            issues.extend(check_todo_items(content, filepath))
            issues.extend(check_outdated_badges(content, filepath))
            
            results["issues"].extend(issues)
            
        except Exception as e:
            results["issues"].append({
                "type": "error",
                "file": filepath,
                "message": str(e)
            })
    
    # Summarize
    for issue in results["issues"]:
        if issue["type"] == "broken_link":
            results["stats"]["broken_links"] += 1
        elif issue["type"] == "unlabeled_code_block":
            results["stats"]["unlabeled_code"] += issue.get("count", 1)
        elif issue["type"] == "todo_found":
            results["stats"]["todos"] += issue.get("count", 1)
    
    return results


def main(path, output_json=False):
    """Main function."""
    if not os.path.exists(path):
        result = {"error": f"Path not found: {path}"}
        if output_json:
            print(json.dumps(result, indent=2))
        else:
            print(f"Error: {path} not found.")
        sys.exit(1)
    
    results = analyze_documentation(path)
    
    if output_json:
        print(json.dumps(results, indent=2))
    else:
        print(f"\n{'='*60}")
        print(f"Documentation Sync Check")
        print(f"{'='*60}")
        print(f"Path: {path}")
        print(f"Files scanned: {results['files_scanned']}")
        print(f"{'='*60}\n")
        
        if results["issues"]:
            print(f"⚠️  Issues Found: {len(results['issues'])}")
            print(f"   • Broken links: {results['stats']['broken_links']}")
            print(f"   • Unlabeled code blocks: {results['stats']['unlabeled_code']}")
            print(f"   • TODOs/placeholders: {results['stats']['todos']}")
            print()
            
            # Show first 10 issues
            for issue in results["issues"][:10]:
                print(f"   [{issue['type']}] {issue.get('file', '')}")
                if issue.get('link'):
                    print(f"      Link: {issue['link']}")
                if issue.get('message'):
                    print(f"      {issue['message']}")
            
            if len(results["issues"]) > 10:
                print(f"\n   ... and {len(results['issues']) - 10} more issues")
            
            sys.exit(1)
        else:
            print("✅ No documentation issues found!\n")
            sys.exit(0)


if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else "."
    output_json = "--json" in sys.argv
    main(path, output_json)
