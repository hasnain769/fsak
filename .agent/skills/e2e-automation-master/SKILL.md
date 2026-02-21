---
name: e2e-automation-master
description: Uses the Antigravity Browser Subagent and Playwright to perform end-to-end testing, visual verification, and UI flow validation.
---

# E2E Automation Master

This skill orchestrates end-to-end testing using the Browser Subagent and Playwright, validating user flows and visual states.

## Core Workflow

1.  **Define Scenario**: Identify the user journey (e.g., "Login -> Dashboard -> Logout").
2.  **Launch Browser**: Use the Browser Subagent to open the target URL.
3.  **Execute Flow**: Perform actions (click, type) using Playwright locators.
4.  **Assert**: Verify success criteria (text presence, URL change, element visibility).
5.  **Record**: Capture screenshots and videos of the session.
6.  **Regression**: Update visual snapshots if UI changes are intentional.

## Engineering Standards

1.  **User-Centric**: Interact with the page as a user (click visible buttons), not via JS injection.
2.  **Flake-Resistant**: Never use fixed sleeps (`waitForTimeout`). Use `waitForSelector` or `waitForLoadState`.
3.  **Isolated**: Tests must run independently and clean up their own state.
4.  **Selectors**: Prefer user-facing attributes (`role`, `label`, `text`) over CSS classes or XPaths.
5.  **Evidence**: Every test run must produce a recording/screenshot artifact.

### Code Patterns
*   **Page Objects**: Encapsulate page logic in classes.
*   **Setup/Teardown**: Use fixtures for logging in/out.

## Verification Plan

### Automated Verification
*   **Env Check**: Verify Playwright is installed and ready.
    ```bash
    python3 scripts/check_deps.py
    ```

### Manual Verification
*   **Visual Check**: Watch the test recording to ensure it flows smoothly.
*   **Snapshot Review**: Manually approve any visual differences in snapshots.