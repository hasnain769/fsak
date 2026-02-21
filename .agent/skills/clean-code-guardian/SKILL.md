---
name: clean-code-guardian
description: Audits code for SOLID principles, DRYness, and maintainability. Enforces style guides and reduces technical debt during the Refactor phase.
---

# Clean Code Guardian

This skill enforces code quality safeguards, auditing for complexity, style compliance, and architectural integrity.

## Core Workflow

1.  **Static Analysis**: Run linters (ESLint, Ruff) using `scripts/lint_wrapper.py`. Auto-fix format issues.
2.  **Audit Complexity**: Check for large files and complex functions using `scripts/analyze_complexity.py`.
3.  **Review Design**: Manually audit for SOLID principles (e.g., Single Responsibility, Dependency Inversion).
4.  **Check DRYness**: Identify duplicated logic and suggest refactors.
5.  **Verify Docs**: Ensure all exported members are documented and typed.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Static Analysis │────▶│ Complexity Audit│────▶│  SOLID Check    │
│ (Lint + Format) │     │ (Cyclomatic CC) │     │ (Design Review) │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
┌─────────────────┐     ┌─────────────────┐             │
│  Generate Report│◀────│  Doc Coverage   │◀────────────┘
│(CODE_REVIEW.md) │     │ (Types + Docs)  │
└─────────────────┘     └─────────────────┘
```

## Engineering Standards

1.  **Readable > Clever**: Code must be understandable by a junior engineer.
2.  **Fail Fast**: CI/CD must fail on linting or complexity violations.
3.  **Meaningful Names**: No `temp`, `data`, or one-letter variables (except loops).
4.  **Small Functions**: < 50 lines per function.
5.  **Small Classes/Files**: < 300 lines per file.

### Code Smells to Reject
*   **Long Method**: > 50 lines.
*   **Large Class**: > 300 lines.
*   **Magic Numbers**: Hardcoded values (use constants).
*   **Primitive Obsession**: Using strings/ints for domain concepts (use value objects).

## Verification Plan

### Automated Verification
*   **Complexity Check**: Run the complexity analyzer.
    ```bash
    python3 scripts/analyze_complexity.py <file_path>
    ```

### Manual Verification
*   **Naming Check**: Scan for `data`, `info`, `manager` generic names.
*   **Comment Check**: Ensure comments explain "why", not "what".