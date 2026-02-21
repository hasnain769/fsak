#!/usr/bin/env python3
"""
Secret Scanner - Detects hardcoded secrets in codebase.

Usage:
    python3 secret_scanner.py <path> [--json]
"""

import sys
import os
import re
import json

# Patterns to detect secrets
SECRET_PATTERNS = [
    # API Keys
    (r'(?i)(api[_-]?key|apikey)\s*[=:]\s*["\']([^"\']{20,})["\']', "API Key"),
    (r'(?i)(secret[_-]?key|secretkey)\s*[=:]\s*["\']([^"\']{20,})["\']', "Secret Key"),
    
    # AWS
    (r'AKIA[0-9A-Z]{16}', "AWS Access Key ID"),
    (r'(?i)aws[_-]?secret[_-]?access[_-]?key\s*[=:]\s*["\']([^"\']{40})["\']', "AWS Secret Key"),
    
    # Private Keys
    (r'-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----', "Private Key"),
    (r'-----BEGIN PGP PRIVATE KEY BLOCK-----', "PGP Private Key"),
    
    # Tokens
    (r'(?i)(token|bearer)\s*[=:]\s*["\']([^"\']{20,})["\']', "Token"),
    (r'ghp_[0-9a-zA-Z]{36}', "GitHub Personal Access Token"),
    (r'github_pat_[0-9a-zA-Z_]{22,}', "GitHub PAT"),
    (r'sk-[0-9a-zA-Z]{48}', "OpenAI API Key"),
    (r'sk_live_[0-9a-zA-Z]{24,}', "Stripe Live Key"),
    (r'sk_test_[0-9a-zA-Z]{24,}', "Stripe Test Key"),
    
    # Database
    (r'(?i)(postgres|mysql|mongodb)://[^"\'\s]+', "Database URL"),
    (r'(?i)password\s*[=:]\s*["\']([^"\']{8,})["\']', "Password"),
    
    # Other
    (r'(?i)client[_-]?secret\s*[=:]\s*["\']([^"\']{20,})["\']', "Client Secret"),
]

# Files to skip
SKIP_PATTERNS = [
    r'node_modules',
    r'\.git',
    r'\.env\.example',
    r'\.env\.sample',
    r'__pycache__',
    r'\.pyc$',
    r'\.lock$',
    r'package-lock\.json',
    r'yarn\.lock',
]

# File extensions to scan
SCAN_EXTENSIONS = [
    '.js', '.ts', '.jsx', '.tsx', '.py', '.go', '.rs',
    '.json', '.yaml', '.yml', '.toml', '.env', '.sh',
    '.md', '.txt', '.conf', '.config',
]


def should_skip(path):
    """Check if path should be skipped."""
    for pattern in SKIP_PATTERNS:
        if re.search(pattern, path):
            return True
    return False


def should_scan(filepath):
    """Check if file should be scanned."""
    _, ext = os.path.splitext(filepath)
    return ext.lower() in SCAN_EXTENSIONS or os.path.basename(filepath) == '.env'


def scan_file(filepath):
    """Scan a single file for secrets."""
    findings = []
    
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
            lines = content.split('\n')
            
            for i, line in enumerate(lines, 1):
                for pattern, secret_type in SECRET_PATTERNS:
                    if re.search(pattern, line):
                        findings.append({
                            "file": filepath,
                            "line": i,
                            "type": secret_type,
                            "snippet": line[:100] + "..." if len(line) > 100 else line,
                        })
    except Exception as e:
        pass
    
    return findings


def scan_directory(path):
    """Scan directory for secrets."""
    all_findings = []
    files_scanned = 0
    
    for root, dirs, files in os.walk(path):
        # Filter out directories to skip
        dirs[:] = [d for d in dirs if not should_skip(d)]
        
        for filename in files:
            filepath = os.path.join(root, filename)
            
            if should_skip(filepath) or not should_scan(filepath):
                continue
            
            files_scanned += 1
            findings = scan_file(filepath)
            all_findings.extend(findings)
    
    return all_findings, files_scanned


def main(path, output_json=False):
    """Main scanner function."""
    
    if not os.path.exists(path):
        result = {"error": f"Path not found: {path}"}
        if output_json:
            print(json.dumps(result, indent=2))
        else:
            print(f"Error: {path} not found.")
        sys.exit(1)
    
    findings, files_scanned = scan_directory(path)
    
    # Classify by severity
    critical = [f for f in findings if f["type"] in ["Private Key", "AWS Secret Key", "Database URL"]]
    high = [f for f in findings if f["type"] in ["AWS Access Key ID", "Password", "OpenAI API Key", "Stripe Live Key"]]
    medium = [f for f in findings if f not in critical and f not in high]
    
    result = {
        "path": path,
        "files_scanned": files_scanned,
        "total_findings": len(findings),
        "critical": len(critical),
        "high": len(high),
        "medium": len(medium),
        "findings": findings[:50],  # Limit output
    }
    
    if output_json:
        print(json.dumps(result, indent=2))
    else:
        print(f"\n{'='*60}")
        print(f"Secret Scan Results")
        print(f"{'='*60}")
        print(f"Path: {path}")
        print(f"Files scanned: {files_scanned}")
        print(f"{'='*60}\n")
        
        if findings:
            print(f"⚠️  SECRETS FOUND: {len(findings)}")
            print(f"   Critical: {len(critical)}")
            print(f"   High: {len(high)}")
            print(f"   Medium: {len(medium)}")
            print()
            
            for f in findings[:10]:
                print(f"❌ [{f['type']}] {f['file']}:{f['line']}")
                print(f"   {f['snippet']}")
                print()
            
            if len(findings) > 10:
                print(f"... and {len(findings) - 10} more findings")
            
            print("\n❌ SCAN FAILED - Secrets detected!\n")
            sys.exit(1)
        else:
            print("✅ No secrets detected\n")
            sys.exit(0)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 secret_scanner.py <path> [--json]")
        sys.exit(1)
    
    path = sys.argv[1]
    output_json = "--json" in sys.argv
    
    main(path, output_json)
