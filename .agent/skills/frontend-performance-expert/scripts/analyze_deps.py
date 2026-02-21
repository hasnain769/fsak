
import sys
import json
import os

HEAVY_LIBRARIES = {
    'moment': 'Use date-fns or Luxon instead',
    'lodash': 'Use lodash-es or native JS methods',
    'request': 'Use axios or fetch',
    'axios': 'Use fetch (native) if possible',
}

def analyze_deps(file_path):
    if not os.path.exists(file_path):
        print(f"File {file_path} not found.")
        sys.exit(1)

    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
    except json.JSONDecodeError:
        print("Invalid JSON")
        sys.exit(1)

    deps = data.get('dependencies', {})
    deps.update(data.get('devDependencies', {}))
    
    issues = []
    for dep, warning in HEAVY_LIBRARIES.items():
        if dep in deps:
            issues.append(f"Found heavy library '{dep}': {warning}")

    if issues:
        print("Performance Issues Found in Dependencies:")
        for issue in issues:
            print(f"- {issue}")
        sys.exit(1)
    else:
        print("Dependency performance check passed.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python analyze_deps.py <package.json>")
        sys.exit(1)
    analyze_deps(sys.argv[1])
