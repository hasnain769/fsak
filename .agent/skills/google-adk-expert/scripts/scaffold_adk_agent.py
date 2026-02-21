#!/usr/bin/env python3
import os
import argparse

def create_file(path, content):
    with open(path, 'w') as f:
        f.write(content)
    print(f"Created: {path}")

def scaffold_agent(name, path):
    base_dir = os.path.join(path, name)
    os.makedirs(base_dir, exist_ok=True)
    
    # 1. main.py
    main_py = f"""import asyncio
from {name}.agent import create_agent

# Run with: adk run {name}.main:agent_runner
async def agent_runner():
    agent = create_agent()
    # In a real runner, you'd loop or serve this.
    # For ADK CLI, we return the agent instance or a runner function.
    return agent

if __name__ == "__main__":
    # Local test
    print("Use 'adk run' to interact with this agent.")
"""
    create_file(os.path.join(base_dir, 'main.py'), main_py)

    # 2. agent.py
    agent_py = f"""from google.adk.agents import Agent
from {name}.tools import my_custom_tool
from {name}.callbacks import log_before_agent

def create_agent():
    return Agent(
        name='{name}',
        model='gemini-2.0-flash-exp', # Replace with your model
        instruction='You are a helpful assistant named {name}.',
        tools=[my_custom_tool],
        before_agent_callback=log_before_agent
    )
"""
    create_file(os.path.join(base_dir, 'agent.py'), agent_py)

    # 3. tools.py
    tools_py = """from typing import Any, Dict
from google.adk.context import ToolContext

def my_custom_tool(query: str, tool_context: ToolContext = None) -> Dict[str, Any]:
    \"\"\"
    A sample tool that echoes the query and updates state.
    
    Args:
        query: The input string to process.
        tool_context: (Injected) The context to access session state.
    \"\"\"
    if tool_context:
        # Example: preserving state
        count = tool_context.state.get('usage_count', 0) + 1
        tool_context.state['usage_count'] = count
        
    return {
        "result": f"Processed: {query}",
        "status": "success"
    }
"""
    create_file(os.path.join(base_dir, 'tools.py'), tools_py)

    # 4. callbacks.py
    callbacks_py = """from google.adk.context import CallbackContext

async def log_before_agent(context: CallbackContext):
    \"\"\"
    Logs a message before the agent starts processing.
    \"\"\"
    print(f"[{context.agent_name}] Starting new turn...")
    # Example: Initialize session state if needed
    if 'history' not in context.state:
        context.state['history'] = []
"""
    create_file(os.path.join(base_dir, 'callbacks.py'), callbacks_py)
    
    # 5. __init__.py
    create_file(os.path.join(base_dir, '__init__.py'), "")
    
    print(f"\\nSuccess! Scaffolding complete for agent '{name}' at {base_dir}")
    print(f"Run it with: adk run {name}.main:agent_runner --path {path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Scaffold a new Google ADK Agent")
    parser.add_argument("name", help="Name of the agent (snake_case)")
    parser.add_argument("--path", default=".", help="Directory to create the agent in")
    args = parser.parse_args()
    
    scaffold_agent(args.name, args.path)
