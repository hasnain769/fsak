#!/usr/bin/env python3
"""
Lint Wrapper - Unified linting interface for multiple languages.

Detects project type and runs appropriate linter.

Usage:
    python3 lint_wrapper.py <path> [--fix]
"""

import sys
import os
import subprocess
import json


LINTER_CONFIG = {
    "typescript": {
        "detect": ["package.json", "tsconfig.json"],
        "lint": "npx eslint . --ext .ts,.tsx",
        "fix": "npx eslint . --ext .ts,.tsx --fix",
        "format": "npx prettier --write ."
    },
    "javascript": {
        "detect": ["package.json"],
        "lint": "npx eslint . --ext .js,.jsx",
        "fix": "npx eslint . --ext .js,.jsx --fix",
        "format": "npx prettier --write ."
    },
    "python": {
        "detect": ["requirements.txt", "pyproject.toml", "setup.py"],
        "lint": "ruff check .",
        "fix": "ruff check . --fix",
        "format": "black ."
    },
    "go": {
        "detect": ["go.mod"],
        "lint": "golangci-lint run",
        "fix": "golangci-lint run --fix",
        "format": "gofmt -w ."
    }
}


def detect_language(path):
    """Detect project language based on config files."""
    for lang, config in LINTER_CONFIG.items():
        for detect_file in config["detect"]:
            if os.path.exists(os.path.join(path, detect_file)):
                return lang
    return None


def run_linter(path, fix=False):
    """Run linter for detected language."""
    lang = detect_language(path)
    
    if not lang:
        print("Could not detect project language.")
        print("Supported: TypeScript, JavaScript, Python, Go")
        sys.exit(1)
    
    config = LINTER_CONFIG[lang]
    cmd = config["fix"] if fix else config["lint"]
    
    print(f"Detected: {lang.upper()}")
    print(f"Running: {cmd}")
    print("-" * 50)
    
    result = subprocess.run(
        cmd,
        shell=True,
        cwd=path,
        capture_output=True,
        text=True
    )
    
    if result.stdout:
        print(result.stdout)
    if result.stderr:
        print(result.stderr)
    
    if result.returncode == 0:
        print("\n✅ Lint passed!")
    else:
        print("\n❌ Lint failed - issues found")
    
    return result.returncode


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 lint_wrapper.py <path> [--fix]")
        sys.exit(1)
    
    path = sys.argv[1]
    fix = "--fix" in sys.argv
    
    if not os.path.exists(path):
        print(f"Path not found: {path}")
        sys.exit(1)
    
    exit_code = run_linter(path, fix)
    sys.exit(exit_code)


if __name__ == "__main__":
    main()
