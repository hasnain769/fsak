---
name: mcp-builder
description: Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools. Use when building MCP servers to integrate external APIs or services, whether in Python (FastMCP) or Node/TypeScript (MCP SDK).
license: Complete terms in LICENSE.txt
---

# MCP Builder

Create MCP (Model Context Protocol) servers that enable LLMs to interact with external services through well-designed tools.

## Core Workflow

1.  **Plan**: Research APIs and define tool schema. Choose specific endpoints over comprehensive coverage if workflow is prioritized.
2.  **Set Up**: Initialize project using Python (FastMCP) or TypeScript SDKs.
3.  **Implement**: Create tools with Zod/Pydantic schemas. Implement error handling and valid return types.
4.  **Annotate**: Add hints like `destructiveHint`, `isReadOnly` to tools.
5.  **Evaluate**: Create an evaluation dataset (10 QA pairs) to test the server with a real LLM.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     Plan        │────▶│    Implement    │────▶│    Annotate     │
│ (Endpoints/Tools)│     │  (Schema/Func)  │     │ (Hints/Descr)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
┌─────────────────┐     ┌─────────────────┐             │
│    Evaluate     │◀────│      Build      │◀────────────┘
│ (Golden Dataset)│     │ (Compile/Lint)  │
└─────────────────┘     └─────────────────┘
```

## Engineering Standards

1.  ** naming**: Use snake_case for tools (e.g., `github_create_issue`). Prefix with service name.
2.  **Descriptions**: Tool descriptions must be comprehensive for LLM understanding.
3.  **Error Handling**: Return actionable error messages, not stack traces.
4.  **Modularity**: Separate API logic from MCP tool definitions.
5.  **Evaluation**: Every server must pass a 10-question golden dataset evaluation.

## Verification Plan

### Automated Verification
*   **Evaluation Script**: Run the evaluation harness against the golden dataset.
    ```bash
    python3 scripts/evaluation.py <server_cmd> <eval_file.xml>
    ```
*   **Inspector**: Use the MCP Inspector to manually test tool calls.
    ```bash
    npx @modelcontextprotocol/inspector <server_cmd>
    ```

### Manual Verification
*   **Ref Check**: Verify all tools have clear descriptions and argument examples.
*   **Safety Check**: Ensure destructive tools have `destructiveHint: true`.
