
import importlib.util
import sys

def check_adk():
    spec = importlib.util.find_spec("google.labs.adk")
    if spec is None:
        print("Google ADK not found. Install via pip install google-labs-adk")
        sys.exit(1)
    else:
        print("Google ADK is installed.")

if __name__ == "__main__":
    check_adk()
