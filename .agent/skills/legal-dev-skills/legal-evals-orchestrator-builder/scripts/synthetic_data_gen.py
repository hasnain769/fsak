import json

def generate_synthetic_qa(chunk, model_callback):
    """
    Generates a legal Q&A pair based on a specific chunk of 'Golden Data'.
    """
    ancestry = chunk.get("metadata", {}).get("ancestry", "Unknown Location")
    text = chunk.get("text", "")
    
    prompt = f"Given the following legal text from {ancestry}:\n{text}\n\nGenerate a complex legal question, a grounded answer, and the specific citation."
    
    raw_response = model_callback(prompt)
    
    # In a real implementation, we would parse the LLM output into a structured JSON
    return {
        "source_chunk_id": chunk.get("id", "unknown"),
        "question": f"Question based on {ancestry}...",
        "ground_truth": f"Answer grounded in {text[:50]}...",
        "citation": "Bluebook Citation here"
    }

if __name__ == "__main__":
    sample_chunk = {"text": "The Fourteenth Amendment...", "metadata": {"ancestry": "U.S. Constitution"}}
    print(json.dumps(generate_synthetic_qa(sample_chunk, lambda x: "LLM Output"), indent=2))
