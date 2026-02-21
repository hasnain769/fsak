
import sys
import json

def assign_tasks(tasks_json):
    """
    Simple task allocator. Ensures no file overlap.
    Input: [{"task": "A", "files": ["f1", "f2"]}, {"task": "B", "files": ["f2", "f3"]}]
    """
    try:
        tasks = json.loads(tasks_json)
    except json.JSONDecodeError:
        # If input is a file path
        try:
            with open(tasks_json, 'r') as f:
                tasks = json.load(f)
        except:
            print("Invalid input")
            sys.exit(1)

    file_usage = {}
    issues = []

    for task in tasks:
        task_name = task.get('task', 'Unknown')
        files = task.get('files', [])
        
        for f in files:
            if f in file_usage:
                issues.append(f"Conflict: File '{f}' assigned to '{file_usage[f]}' and '{task_name}'")
            else:
                file_usage[f] = task_name

    if issues:
        print("Orchestration Issues Found:")
        for issue in issues:
            print(f"- {issue}")
        sys.exit(1)
    else:
        print("Task assignment valid. No overlapping files.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        # Default example
        print("Usage: python assign_tasks.py <tasks.json>")
        sys.exit(1)
    assign_tasks(sys.argv[1])
