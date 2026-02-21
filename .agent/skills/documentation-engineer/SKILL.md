---
name: documentation-engineer
description: Creates and maintains API documentation, project READMEs, technical guides, and developer documentation. Ensures docs stay in sync with code. Use when asked to "document the API", "create README", "write docs", "generate documentation", or when codebase changes need doc updates. Triggers on "documentation", "README", "API docs", "technical writing", "changelog".
---

# Documentation Engineer

This skill manages technical documentation, ensuring it is comprehensive, up-to-date, and synced with the codebase.

## Core Workflow

1.  **Audit**: Scan for existing `README.md`, `docs/`, `CHANGELOG.md`, and API specs.
2.  **Identify Gaps**: Determine missing docs (Setup Guide, Architecture, API Reference).
3.  **Generate**: Create documentation using templates and auto-generation tools (TypeDoc, Swagger).
4.  **Sync**: Verify that documentation matches code (e.g., check that documented endpoints exist).
5.  **Publish**: Update `README.md` and commit changes.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Audit Existing │────▶│  Generate New   │────▶│   Sync Check    │
│  (What exists?) │     │ (What's missing)│     │ (Code ↔ Docs)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
┌─────────────────┐     ┌─────────────────┐             │
│    Validate     │◀────│   Publish/Link  │◀────────────┘
│ (Links, Format) │     │ (README, site)  │
└─────────────────┘     └─────────────────┘
```

## Engineering Standards

1.  **Docs as Code**: Treat documentation like code (versioned, reviewed, tested).
2.  **Single Source of Truth**: Auto-generate API docs from code/specs whenever possible.
3.  **Actionable**: Instructions must start with verbs and be copy-pasteable.
4.  **Reproducible**: All code examples must be runnable and tested.
5.  **Tone**: Clear, concise, and jargon-free.

### Writing Guidelines
*   **Headings**: Use sentence case.
*   **Lists**: Use bullet points for options, numbered lists for steps.
*   **Code Blocks**: Always specify the language for syntax highlighting.

## Verification Plan

### Automated Verification
*   **Link Check**: Ensure no broken links in `README.md`.
    ```bash
    npx markdown-link-check README.md
    ```
*   **Sync Check**: Run the doc sync checker to verify API docs match code.
    ```bash
    python3 scripts/doc_sync_checker.py
    ```

### Manual Verification
*   **Readability**: Can a new developer understand the `README.md` in 5 minutes?
*   **Completeness**: Does every new feature have a corresponding changelog entry?
