---
name: requirement-engineer
description: Conducts discovery sessions, resolves ambiguity, and creates technical specifications (PRD/SPEC) before development begins. Use when a user provides a vague product request, asks to "gather requirements", "create PRD", "define scope", "build an MVP", or when transitioning from idea to implementation. Triggers on phrases like "I want to build...", "Help me plan...", "What do I need for...", or any product/feature definition request.
---

# Requirement Engineer

This skill transforms vague user requests into detailed technical specifications (PRD/SPEC).

## Core Workflow

1.  **Discovery**: Ask 3-5 high-level questions about Business Context, Core Value, and Technical Constraints.
2.  **Refine Scope**: Use MoSCoW method (Must/Should/Could/Won't) to define features and identify MVP.
3.  **Generate PRD**: Create `docs/PRD.md` focused on product vision and user goals.
4.  **Generate SPEC**: Create `docs/SPEC.md` focused on data models, APIs, and non-functional requirements.
5.  **Validate**: Run `scripts/validate_spec.py` to ensure completeness.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Discovery Phase │────▶│ Scope Definition│────▶│    Refinement   │
│ (Ask Questions) │     │ (MoSCoW Method) │     │ (MVP Classification)
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
┌─────────────────┐     ┌─────────────────┐             │
│    Validate     │◀────│   Artifact Gen  │◀────────────┘
│ (Completeness)  │     │(PRD.md/SPEC.md) │
└─────────────────┘     └─────────────────┘
```

## Engineering Standards

1.  **Traceability**: Every technical requirement in SPEC must link to a user goal in PRD.
2.  **Skepticism**: Challenge complex features. Propose lighter alternatives for MVP.
3.  **No Assumptions**: Explicitly document every assumption as "Pending Confirmation".
4.  **Modern Defaults**: Always include Accessibility, Observability, and Security requirements.
5.  **Explicit Handoff**: Specs must be ready for `architecture-blueprinter` to consume.

## Verification Plan

### Automated Verification
*   **Spec Validation**: Run the validation script on the generated SPEC.
    ```bash
    python3 scripts/validate_spec.py docs/SPEC.md
    ```

### Manual Verification
*   **User Approval**: Explicitly ask the user to approve the PRD/SPEC scope.
*   **Ambiguity Check**: Could two different engineers build different things from this spec? (If yes, refine).