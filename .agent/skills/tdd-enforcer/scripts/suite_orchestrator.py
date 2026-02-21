import sys
import subprocess
import json

def detect_and_run():
    # 1. Load framework mapping
    with open('references/test-frameworks.json', 'r') as f:
        config = json.load(f)
    
    # 2. Detect project type (simplified logic)
    if "package.json" in subprocess.getoutput("ls"):
        cmd = config['typescript']['run_cmd']
    elif "pytest.ini" in subprocess.getoutput("ls") or "tests/" in subprocess.getoutput("ls"):
        cmd = config['python']['run_cmd']
    else:
        print("No supported test framework detected.")
        sys.exit(1)

    # 3. Execute
    result = subprocess.run(cmd.split(), capture_output=True, text=True)
    print(result.stdout)
    
    if result.returncode == 0:
        print("STATUS: GREEN")
        sys.exit(0)
    else:
        print("STATUS: RED")
        sys.exit(1)

if __name__ == "__main__":
    detect_and_run()