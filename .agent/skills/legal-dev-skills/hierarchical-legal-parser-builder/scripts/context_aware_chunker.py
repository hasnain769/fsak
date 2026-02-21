import json
import re

def hierarchical_chunk(data, chunk_size=1000, overlap=0.15):
    """
    Recursively splits the opinion_body into chunks while maintaining context.
    """
    chunks = []
    case_title = data.get("case_metadata", {}).get("title", "Unknown Case")
    
    opinion_body = data.get("opinion_body", [])
    current_chunk_text = ""
    current_ancestors = [case_title, "Opinion"]
    
    overlap_chars = int(chunk_size * overlap)
    
    for entry in opinion_body:
        text = entry.get("text", "")
        p_idx = entry.get("paragraph_index", 0)
        
        # Simple chunking logic: if adding this paragraph exceeds chunk_size, store and start new
        if len(current_chunk_text) + len(text) > chunk_size and current_chunk_text:
            chunks.append({
                "text": current_chunk_text,
                "metadata": {
                    "ancestry": " > ".join(current_ancestors),
                    "start_p_idx": chunks[-1].get("end_p_idx", 0) if chunks else 0,
                    "end_p_idx": p_idx
                }
            })
            # Handle overlap (simplified)
            current_chunk_text = current_chunk_text[-overlap_chars:] + " " + text
        else:
            current_chunk_text += " " + text
            
    # Final chunk
    if current_chunk_text:
        chunks.append({
            "text": current_chunk_text,
            "metadata": {
                "ancestry": " > ".join(current_ancestors),
                "end_p_idx": opinion_body[-1].get("paragraph_index") if opinion_body else 0
            }
        })
        
    return chunks

if __name__ == "__main__":
    # Example usage
    sample_data = {
        "case_metadata": {"title": "Roe v. Wade"},
        "opinion_body": [{"paragraph_index": i, "text": f"Paragraph {i} content. "} for i in range(20)]
    }
    print(json.dumps(hierarchical_chunk(sample_data, chunk_size=100), indent=2))
