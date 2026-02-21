# ADK Agent Types

## 1. LLM Agents (`LlmAgent`)
- **Purpose**: Flexible, language-centric reasoning and tool-use.
- **Dynamic**: Decisions are non-deterministic, based on LLM interpretation.
- **Properties**: `name`, `model`, `instruction`, `description`, `tools`, `sub_agents`.

## 2. Workflow Agents (Deterministic)

### SequentialAgent
- **Flow**: Executes sub-agents in a strict, ordered pipeline.
- **State**: Each step reads/writes to the shared `InvocationContext.state`.

### ParallelAgent
- **Flow**: Executes sub-agents concurrently.
- **Performance**: Ideal for independent tasks to reduce latency.
- **Note**: Child events may be interleaved.

### LoopAgent
- **Flow**: Iteratively executes sub-agents.
- **Control**: Terminates via `max_iterations` or a sub-agent returning `escalate=True`.
- **State**: State changes persist across iterations.
