#!/usr/bin/env python3
import os
import sys
import ast

def error(msg):
    print(f"❌ {msg}")
    sys.exit(1)

def success(msg):
    print(f"✅ {msg}")

def check_file_exists(path):
    if not os.path.exists(path):
        error(f"Missing file: {path}")
    success(f"Found file: {path}")

def check_structure(base_dir):
    print(f"Checking structure in {base_dir}...")
    required_files = ['main.py', 'agent.py', 'tools.py', 'callbacks.py']
    for f in required_files:
        check_file_exists(os.path.join(base_dir, f))

def check_typing(file_path):
    print(f"Checking typing in {file_path}...")
    with open(file_path, 'r') as f:
        tree = ast.parse(f.read())
    
    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            # check arguments
            for arg in node.args.args:
                if arg.arg == 'self': continue
                if arg.annotation is None:
                    error(f"Function '{node.name}' argument '{arg.arg}' is missing type hint in {file_path}")
            
            # check return type (only strict for tools, but good practice everywhere)
            # We skip this for now to be lenient on main/callbacks, 
            # but in a real 'expert' validator we might enforce it for tools/tools.py

    success(f"Typing check passed for {file_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: verify_adk_structure.py <agent_dir>")
        sys.exit(1)
        
    agent_dir = sys.argv[1]
    check_structure(agent_dir)
    check_typing(os.path.join(agent_dir, 'tools.py'))
    
    print("\n🎉 Verification Complete! This agent structure looks solid.")
