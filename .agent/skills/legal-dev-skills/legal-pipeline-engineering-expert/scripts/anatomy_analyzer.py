import sys
import json
import re

def analyze_text(text):
    # Simplified analysis for demonstration
    zones = {
        "header": [],
        "syllabus": [],
        "opinion": [],
        "dissent": []
    }
    
    lines = text.split('\n')
    current_zone = "header"
    
    for line in lines:
        if "Syllabus" in line:
            current_zone = "syllabus"
        elif "delivered the opinion of the Court" in line:
            current_zone = "opinion"
        elif "dissenting" in line:
            current_zone = "dissent"
        
        zones[current_zone].append(line)
    
    return zones

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 anatomy_analyzer.py <text_file>")
        sys.exit(1)
        
    with open(sys.argv[1], 'r') as f:
        content = f.read()
        
    results = analyze_text(content)
    print(json.dumps(results, indent=2))
