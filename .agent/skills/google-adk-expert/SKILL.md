---
name: google-adk-expert
description: Engineer sophisticated multi-agent reasoning systems using Google's Agent Development Kit (ADK). Use this skill when building hierarchical, parallel, or iterative agent workflows, or when users mention "ADK", "Google Agent", "Session State", "Context", "Callbacks", or "Events".
---

# Google ADK Expert

This skill provides expert-level guidance for building, orchestrating, and optimizing multi-agent systems using Google's Agent Development Kit (ADK).

## Core Workflow

1.  **Define Agent Strategy**:
    *   **Reasoning**: Use `LlmAgent` for tasks requiring natural language understanding and dynamic decision making.
    *   **Deterministic Flow**: Use `SequentialAgent` for linear pipelines or `ParallelAgent` for independent concurrent tasks.
    *   **Routing**: Use `RouterAgent` (if available) or a master `LlmAgent` to delegate tasks to sub-agents.

2.  **Architect Context & State**:
    *   **Session State (`session.state`)**: Use for transient data within a conversation (e.g., `shopping_cart`, `current_topic`).
    *   **Invocation Context**: Access implicit context in tools/callbacks via `callback_context._invocation_context` (use with caution, prefer high-level APIs).
    *   **Memory Service**: Configure `MemoryService` (e.g., `VertexInMemoryService`) for long-term knowledge retrieval across sessions.
    *   **Artifacts**: Use `save_document_reference` for persisting files/blobs.

3.  **Implement Tools**:
    *   **Typing**: **MANDATORY**. All tool arguments MUST have Python type hints (`str`, `int`, `list[str]`, `dict`).
    *   **Docstrings**: **MANDATORY**. Deeply descriptive docstrings are the primary interface for the LLM.
    *   **Return Values**: Always return a `dict` or a JSON-serializable object.

4.  **Control Behavior with Callbacks**:
    *   **Observability**: Use `Before Agent` / `After Agent` to log inputs/outputs.
    *   **Modification**: Use `Before Model` / `After Model` to inspect or sanitize LLM calls.
    *   **State Management**: Update `session.state` inside callbacks to persist tracking data invisible to the user.

5.  **Orchestrate & Verify**:
    *   **Events**: Understand that every action triggers an `Event`.
    *   **Runtime**: Use `adk run` for local CLI testing and `adk web` for interactive debugging with trace views.
    *   **Evaluation**: Define specific success metrics and use `adk eval` on a dataset of interactions (trajectory analysis) rather than just final output.

## Engineering Standards

1.  **Type Safety**: All tools and callbacks must be strictly typed.
    *   *Bad*: `def my_tool(data):`
    *   *Good*: `def my_tool(data: dict[str, Any]) -> dict[str, Any]:`
2.  **Context Isolation**: Do not rely on global variables. Use `context.state` for all state storage.
3.  **Docstring Quality**: Docstrings must explain *what* the tool does, *when* to use it, and *what* the parameters represent.
4.  **Async/Await**: ADK is async-first. Ensure all I/O bound tools and callbacks are `async def` and properly awaited.
5.  **Error Handling**: Tools should return graceful error messages in the dictionary (e.g., `{"error": "File not found"}`) rather than raising exceptions, allowing the agent to self-correct.

## Verification Plan

### Automated Verification
*   **Structure Check**: Run `python3 tests/verify_adk_structure.py` to ensure the project layout meets ADK standards.
*   **Linting**: Ensure all Python files are valid and typed.

### Manual Verification
*   **Trace Review**: Run `adk web` and inspect the "Trace" tab. Verify:
    1.  The agent correctly selects the tool.
    2.  The tool arguments match the schema.
    3.  Session state updates are visible in the trace.
*   **Callback Test**: Add a logging callback and verify it prints to console during execution.

## Common Operations

### Accessing State in a Tool
```python
def my_tool(arg: str, tool_context: ToolContext = None):
    # 'tool_context' is injected automatically if typed and named correctly
    if tool_context:
        previous_val = tool_context.state.get('my_key')
        tool_context.state['my_key'] = arg
    return {"status": "updated"}
```

### Defining a Callback
```python
async def log_before_agent(context: CallbackContext):
    print(f"Agent {context.agent_name} starting turn.")
    # Access session state
    context.state['turn_count'] = context.state.get('turn_count', 0) + 1
```

### Configuring Memory
```python
agent = Agent(
    model=MODEL,
    tools=[PreloadMemoryTool()], # Automatically loads context
    memory_service=MyMemoryService()
)
```
