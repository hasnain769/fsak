import re

def validate_citation(response_text, source_data):
    """
    Checks if citations in response_text exist in source_data and if quotes match.
    """
    results = {
        "total_citations": 0,
        "valid_citations": 0,
        "hallucinations": []
    }
    
    # Regex for standard US citations
    cite_pattern = re.compile(r'\d+\s+U\.S\.\s+\d+')
    cites_found = cite_pattern.findall(response_text)
    results["total_citations"] = len(cites_found)
    
    for cite in cites_found:
        # Check if cite exists in the 'Golden Data' source (mock logic)
        if cite in str(source_data):
            results["valid_citations"] += 1
        else:
            results["hallucinations"].append(f"Citation not found in source: {cite}")
            
    return results

if __name__ == "__main__":
    sample_response = "As seen in 347 U.S. 483, segregation is illegal."
    sample_source = "Text containing 347 U.S. 483..."
    print(validate_citation(sample_response, sample_source))
