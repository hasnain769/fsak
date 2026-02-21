---
name: subagent-orchestrator
description: Manages multi-agent workflows. Splits complex project specs into parallel tasks and coordinates sub-agents to execute them.
---

# Subagent Orchestrator

This skill decomposes complex projects into parallel tasks and coordinates multiple specialized agents.

## Core Workflow

1.  **Decompose**: Analyze `docs/ARCHITECTURE.md` to identify independent modules (e.g., Frontend, Backend, QA).
2.  **Tasks Assignment**: Create task definition JSON, ensuring no two agents edit the same file.
3.  **Isolation**: Provide each worker only the context (files) they strictly need.
4.  **Integration**: Merge worker outputs and resolve conflicts.
5.  **Verification**: Run integration tests (`tdd-enforcer`) on the merged result.

```
┌─────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Worker A │  │ Worker B │  │ Worker C │              │
│  │(Frontend)│  │(Backend) │  │  (QA)    │              │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘              │
│       │             │             │                     │
│       └─────────────┼─────────────┘                     │
│                     ▼                                   │
│              ┌──────────┐                               │
│              │  Merge   │                               │
│              └──────────┘                               │
29: └─────────────────────────────────────────────────────────┘
```

## Engineering Standards

1.  **Independence**: Never assign the same file to two concurrent workers.
2.  **Interface First**: Define API contracts (interfaces) before parallel implementation starts.
3.  **Minimal Context**: Reduce hallucination risk by limiting file visibility per worker.
4.  **Integration Tests**: The orchestration is only complete when all integration tests pass.
5.  **Sync Points**: Establish explicit synchronization points for merging code.

## Verification Plan

### Automated Verification
*   **Conflict Check**: Run the assignment script to detect file overlaps.
    ```bash
    python3 scripts/assign_tasks.py <tasks_config.json>
    ```

### Manual Verification
*   **Merge Review**: manually check for logic conflicts that git merge missed.
*   **Logs**: Audit delegation logs to ensure workers stayed within scope.