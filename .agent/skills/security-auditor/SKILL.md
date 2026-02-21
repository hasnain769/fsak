---
name: security-auditor
description: Performs SAST (Static Analysis Security Testing), dependency auditing, and secret scanning on the codebase.
---

# Security Auditor

This skill performs systematic security audits including secret scanning, static analysis, and dependency checks.

## Core Workflow

1.  **Secret Scanning**: Scan codebase for hardcoded credentials (API keys, passwords) using `scripts/secret_scanner.py`.
2.  **Dependency Audit**: Check `package.json`/`requirements.txt` against known CVE databases (`npm audit`, `pip-audit`).
3.  **SAST Analysis**: Code review for patterns like SQL Injection, XSS, and missing CSRF tokens.
4.  **IAM Review**: Audit Infrastructure-as-Code for over-permissive policies.
5.  **Report**: Generate `docs/SECURITY_REPORT.md` with findings categorized by severity.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Secret Scanning │────▶│ Dependency Audit│────▶│  SAST Analysis  │
│ (Keys, Tokens)  │     │ (CVE Check)     │     │ (Code Patterns) │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
┌─────────────────┐     ┌─────────────────┐             │
│  Security Report│◀────│   IAM Review    │◀────────────┘
│ (SECURITY.md)   │     │ (Permissions)   │
└─────────────────┘     └─────────────────┘
```

## Engineering Standards

1.  **Deny by Default**: If a high-severity vulnerability is found, the build/deployment MUST fail.
2.  **Zero hardcoded secrets**: All secrets must be loaded from environment variables or a secrets manager.
3.  **Sanitization**: All user input must be sanitized/validated before processing.
4.  **Least Privilege**: Grant only minimum required permissions to services and users.
5.  **Secure Headers**: All web endpoints must send security headers (HSTS, CSP, X-Frame-Options).

## Verification Plan

### Automated Verification
*   **Secret Test**: Run the secret scanner on the codebase.
    ```bash
    python3 scripts/secret_scanner.py .
    ```

### Manual Verification
*   **False Positive Check**: Review scanner output to verify flagged items are actual secrets.
*   **Logic Review**: Manually inspect authentication flows for bypass vulnerabilities.