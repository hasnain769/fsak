---
name: tdd-enforcer
description: Implements the Test-Driven Development (TDD) loop. Prevents writing implementation code before tests are defined and failing. Use when starting new feature implementation, fixing bugs, or adding business logic. Triggers on "implement feature", "fix bug", "add logic", "write tests first", "TDD".
---

# TDD Enforcer

This skill enforces the Red-Green-Refactor loop to ensure robust, testable code.

## Core Workflow

1.  **Red**: Write a failing test that defines the expected behavior based on specs.
2.  **Run**: Execute the test suite (`scripts/suite_orchestrator.py`) to confirm failure.
3.  **Green**: Write the minimal implementation code to make the test pass.
4.  **Refactor**: Improve code quality without changing external behavior.
5.  **Verify**: Ensure all tests still pass after refactoring.

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  🔴 RED     │────▶│  🟢 GREEN   │────▶│  🔷 REFACTOR│
│ Write Test  │     │ Make Pass   │     │ Clean Up    │
│ (Must Fail) │     │ (Minimal)   │     │ (Keep Pass) │
└─────────────┘     └─────────────┘     └─────────────┘
       ▲                                       │
       └───────────────────────────────────────┘
                    (Repeat)
```

## Engineering Standards

1.  **Isolation**: Unit tests must not depend on external systems (DB, API). Use mocks.
2.  **Naming**: Tests should read like sentences (`test_should_return_error_when_input_invalid`).
3.  **Speed**: Unit tests must run in <100ms.
4.  **Coverage**: 100% of new business logic must be covered by tests.
5.  **Triangulation**: Write multiple test cases (happy path, edge case, error) to drive generic implementation.

## Verification Plan

### Automated Verification
*   **Suite Runner**: Execute the test orchestrator.
    ```bash
    python3 scripts/suite_orchestrator.py
    ```

### Manual Verification
*   **Red Check**: Verify the test failed *before* implementation was written (check history).
*   **Refactor Check**: Ensure the code is clean (DRY, SOLID) after the Green phase.