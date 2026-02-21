---
name: root-cause-tracer
description: Performs systematic Root Cause Analysis (RCA). Correlates logs and traces to identify why a system failed and proposes permanent fixes.
---

# Root Cause Tracer

This skill performs systematic Root Cause Analysis (RCA) to diagnose failures and prevent recurrence.

## Core Workflow

1.  **Gather Facts**: Collect logs, traces, and metrics from the time of incident.
2.  **Construct Timeline**: Build a minute-by-minute sequence of events.
3.  **5-Whys Analysis**: Recursively ask "Why?" until a systemic root cause is found.
4.  **Propose Fixes**: Identify immediate mitigation and permanent prevention (code/process).
5.  **Document**: Publish the RCA report using the standard template.

```
Symptom → Why 1 → Why 2 → Why 3 → Why 4 → Why 5 = Root Cause
```

## Engineering Standards

1.  **Blameless**: Focus on system processes, not human error.
2.  **Evidence-Based**: Every "Why" must be supported by logs/data.
3.  **Corrective Action**: Every RCA must result in a new regression test or monitoring alert.
4.  **Loop Closing**: The incident is not closed until the preventative fix is deployed.
5.  **Report Format**: All RCAs must follow the standard template structure.

## Verification Plan

### Automated Verification
*   **Template Gen**: Run the script to verify template generation.
    ```bash
    python3 scripts/init_rca.py RCA_TEST.md
    ```

### Manual Verification
*   **Logic Check**: Does the 5th Why logically follow from the 4th?
*   **Fix Check**: Does the preventative fix actually prevent the root cause?