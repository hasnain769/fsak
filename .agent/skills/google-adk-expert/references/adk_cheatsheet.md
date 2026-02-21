# Google ADK Expert Cheatsheet

## Context Access

| Context Type | Injectable Argument | Access Method | Use Case |
| :--- | :--- | :--- | :--- |
| **Tool Context** | `tool_context: ToolContext` | `tool_context.state['key']` | Persisting data from a tool execution |
| **Callback Context** | `callback_context: CallbackContext` | `callback_context.state['key']` | Modifying state before/after agent steps |
| **Session State** | N/A (Access via above) | `context.state` | Shared storage across the entire session |
| **Invocation** | N/A (Access via above) | `context._invocation_context` | Deep access (Memory, Auth) - *Advanced* |

## Tool Definitions

**MANDATORY**: Type hints and Docstrings.

```python
def web_search(query: str, num_results: int = 5) -> dict[str, Any]:
    """
    Searches the web for the given query.
    
    Args:
        query: The search string.
        num_results: Max number of links to return.
        
    Returns:
        dict: containing 'results' list.
    """
    # ... logic ...
    return {"results": [...]} 
```

## Callbacks

| Callback Name | Trigger Point | Common Use Case |
| :--- | :--- | :--- |
| `before_agent` | Start of request | Validating input, initializing state |
| `after_agent` | End of request | Logging, formatting final response |
| `before_model` | Before LLM call | Redacting PII from prompt |
| `after_model` | After LLM call | Logging raw LLM usage/cost |
| `before_tool` | Before tool exec | Authorizing tool usage |
| `after_tool` | After tool exec | Validating tool output/schema |

## CLI Commands

- **`adk run`**: Start interactive CLI chat with the agent.
- **`adk web`**: Start (or open) the web-based debugger/trace viewer.
- **`adk eval`**: Run an evaluation dataset against the agent.
