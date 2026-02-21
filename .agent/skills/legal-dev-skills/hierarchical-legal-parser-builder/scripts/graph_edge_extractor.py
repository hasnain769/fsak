import re

def extract_edges(data):
    """
    Extracts citation and structural relationships from the structured JSON.
    """
    edges = []
    case_id = data.get("case_metadata", {}).get("title", "Target")
    
    # 1. Structural Edges (Opinion -> Case)
    edges.append({"source": "Opinion", "target": case_id, "type": "PART_OF"})
    
    # 2. Citation Edges (Simplified Regex)
    # Looking for patterns like "347 U.S. 483"
    cite_pattern = re.compile(r'\d+\s+U\.S\.\s+\d+')
    
    opinion_body = data.get("opinion_body", [])
    for entry in opinion_body:
        text = entry.get("text", "")
        matches = cite_pattern.findall(text)
        for match in matches:
            edges.append({
                "source": case_id,
                "target": match,
                "type": "CITES",
                "context": text[:50] + "..."
            })
            
    # 3. Dissenting Edges
    dissents = data.get("dissents", [])
    for dissent in dissents:
        author = dissent.get("author", "Unknown")
        edges.append({"source": author, "target": "Opinion", "type": "CRITICIZES"})
        
    return edges

if __name__ == "__main__":
    sample_data = {
        "case_metadata": {"title": "Brown v. Board"},
        "opinion_body": [{"text": "As noted in 347 U.S. 483..."}],
        "dissents": [{"author": "Justice X", "text": "I disagree."}]
    }
    import json
    print(json.dumps(extract_edges(sample_data), indent=2))
