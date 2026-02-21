
import sys
import os

REQUIRED_SECTIONS = [
    ["goal", "objective", "purpose"],
    ["risk", "con", "drawback", "challenge"],
    ["strategy", "approach", "plan", "solution"]
]

def analyze_plan(file_path):
    if not os.path.exists(file_path):
        print(f"File {file_path} not found.")
        sys.exit(1)

    with open(file_path, 'r') as f:
        content = f.read().lower()

    missing_categories = []
    
    for synonyms in REQUIRED_SECTIONS:
        found = False
        for keyword in synonyms:
            if keyword in content:
                found = True
                break
        if not found:
            missing_categories.append(synonyms[0].upper())

    if missing_categories:
        print("Plan Quality Issues Check:")
        for missing in missing_categories:
            print(f"- Missing section related to: {missing}")
        print("\nRecommendation: A robust plan should clearly state Goals, Risks, and Strategy.")
        sys.exit(1)
    else:
        print("Plan structure looks solid. Contains Goals, Risks, and Strategy.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python analyze_plan.py <plan.md>")
        sys.exit(1)
    analyze_plan(sys.argv[1])
