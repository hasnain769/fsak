# ADK Design Patterns

## 1. Sequential Pipeline
- **Structure**: `SequentialAgent([fetcher, processor, summarizer])`.
- **Use Case**: Multi-step data transformation.

## 2. Parallel Synthesis (Fan-out/Gather)
- **Structure**: `SequentialAgent([ParallelAgent([r1, r2]), synthesizer])`.
- **Use Case**: Concurrent research followed by unified reporting.

## 3. Validation Loop (Critic/Refiner)
- **Structure**: `LoopAgent([generator, critic])`.
- **Use Case**: Iterative refinement or SQL/Code generation with feedback.

## 4. LLM Routing (Coordinator)
- **Structure**: `LlmAgent` with `AgentTool` sub-agents.
- **Use Case**: Specialized capability delegation (e.g., TripPlanner -> FlightAgent, HotelAgent).

## 5. Human-in-the-Loop
- **Structure**: `FunctionTool` that pauses execution for external approval or input.
