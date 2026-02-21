from google.adk.agents import LlmAgent, SequentialAgent, ParallelAgent, LoopAgent
from google.adk.tools import AgentTool

def create_sequential_pipeline(agents):
    """Creates a basic linear workflow."""
    return SequentialAgent(
        name="SequentialPipeline",
        sub_agents=agents
    )

def create_research_synthesis_workflow(researchers, synthesizer):
    """Creates a fan-out (parallel) followed by a gather (sequential) workflow."""
    parallel_step = ParallelAgent(
        name="ParallelResearch",
        sub_agents=researchers
    )
    return SequentialAgent(
        name="ResearchWorkflow",
        sub_agents=[parallel_step, synthesizer]
    )

def create_critic_loop(generator, critic, max_iter=3):
    """Creates an iterative refinement loop."""
    return LoopAgent(
        name="RefinementLoop",
        sub_agents=[generator, critic],
        max_iterations=max_iter
    )

def create_coordinator_routing(coordinator_instruction, specialists):
    """Creates an LLM-driven routing agent."""
    tools = [AgentTool(agent) for agent in specialists]
    return LlmAgent(
        name="Coordinator",
        model="gemini-2.5-flash",
        instruction=coordinator_instruction,
        tools=tools
    )
