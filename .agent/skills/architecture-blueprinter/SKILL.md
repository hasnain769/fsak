---
name: architecture-blueprinter
description: Translates functional requirements into technical system designs, chooses tech stacks, and creates architectural diagrams. Use when a user provides SPEC.md/PRD.md, asks to "design the system", "choose a stack", "plan the database", or during transition from requirements to implementation. Triggers on "architecture", "system design", "tech stack", "infrastructure", "ERD", "data model".
---

# Architecture Blueprinter

This skill translates requirements into technical system designs, selecting scalable tech stacks and producing architectural blueprints.

## Core Workflow

1.  **Analyze Input**: Read `docs/SPEC.md` to identify functional/non-functional requirements and constraints.
2.  **Select Stack**: Use decision matrices to choose database, API style, and infrastructure (e.g., SQL vs NoSQL, REST vs key-value).
3.  **Draft Blueprint**: Create `docs/ARCHITECTURE.md` including High-Level Diagrams, Component Breakdown, and Data Flows.
4.  **Model Data**: Define the ERD and data storage patterns.
5.  **Validate**: Run `scripts/check_alignment.py` to ensure every requirement in SPEC.md is addressed by a component.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Input Analysis │────▶│ Stack Selection │────▶│    Drafting     │
│  (Read SPEC.md) │     │ (Decision Matrix)│     │ (ARCHITECTURE.md)│
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
┌─────────────────┐     ┌─────────────────┐             │
│    Validation   │◀────│  Data Modeling  │◀────────────┘
│ (check_alignment)│     │  (ERD, Schemas) │
└─────────────────┘     └─────────────────┘
```

## Engineering Standards

1.  **Separation of Concerns**: Decouple frontend, backend, and data layers unless a monolith is explicitly requested.
2.  **Security by Design**: Every blueprint must include an Authentication/Authorization strategy.
3.  **Scalability First**: Design systems to handle 10x the current projected load.
4.  **Cost-Awareness**: Prefer serverless/managed services for MVPs to minimize ops overhead.
5.  **Diagram-Driven**: All major architectural decisions must be visualized using Mermaid diagrams.

## Verification Plan

### Automated Verification
*   **Check Alignment**: Run the alignment script to verify that architecture covers all requirements.
    ```bash
    python3 scripts/check_alignment.py docs/SPEC.md docs/ARCHITECTURE.md
    ```

### Manual Verification
*   **Completeness**: Verify `docs/ARCHITECTURE.md` contains System Diagram, Component Breakdown, ERD, and Infrastructure Schema.
*   **Feasibility**: Review stack choices against team capabilities and budget constraints.