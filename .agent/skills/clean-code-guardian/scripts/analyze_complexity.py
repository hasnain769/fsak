
import sys
import os

def analyze_complexity(file_path):
    if not os.path.exists(file_path):
        print(f"File {file_path} not found.")
        sys.exit(1)

    with open(file_path, 'r') as f:
        lines = f.readlines()
        
    line_count = len(lines)
    function_count = sum(1 for line in lines if line.strip().startswith('def ') or line.strip().startswith('func '))
    
    issues = []
    if line_count > 300:
        issues.append(f"File too large: {line_count} lines (max 300)")
        
    if function_count > 20:
        issues.append(f"Too many functions: {function_count} (max 20)")
        
    if issues:
        print("Complexity Issues Found:")
        for issue in issues:
            print(f"- {issue}")
        sys.exit(1)
    else:
        print(f"Complexity check passed. ({line_count} lines, {function_count} functions)")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python analyze_complexity.py <file_path>")
        sys.exit(1)
    analyze_complexity(sys.argv[1])
