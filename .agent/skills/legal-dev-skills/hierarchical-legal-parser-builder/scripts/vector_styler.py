def style_vector_payload(chunk):
    """
    Prepends hierarchy/breadcrumb context to the chunk text for indexing.
    """
    ancestry = chunk.get("metadata", {}).get("ancestry", "")
    text = chunk.get("text", "")
    
    # Prepend breadcrumb in a human-readable format for the embedder
    styled_text = f"[{ancestry}] {text}"
    
    return {
        "content": styled_text,
        "metadata": chunk.get("metadata", {})
    }

if __name__ == "__main__":
    sample_chunk = {
        "text": "The Fourteenth Amendment requires...",
        "metadata": {"ancestry": "Roe v. Wade > Opinion > Section II"}
    }
    import json
    print(json.dumps(style_vector_payload(sample_chunk), indent=2))
