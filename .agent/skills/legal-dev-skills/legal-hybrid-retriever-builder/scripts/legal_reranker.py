import json

def apply_legal_weights(results, jurisdiction, court_weights):
    """
    Adjusts scores based on jurisdiction and court level.
    """
    reranked = []
    for doc_id, base_score in results:
        # Simulated metadata lookup
        doc_metadata = {
            "jurisdiction": "NY" if doc_id == "doc1" else "CA",
            "court_level": "supreme_court" if doc_id == "doc1" else "district_court"
        }
        
        multiplier = 1.0
        if doc_metadata["jurisdiction"] == jurisdiction:
            multiplier *= 1.5
            
        multiplier *= court_weights.get(doc_metadata["court_level"], 0.5)
        
        final_score = base_score * multiplier
        reranked.append({
            "doc_id": doc_id,
            "score": final_score,
            "metadata": doc_metadata,
            "explanation": f"Base: {base_score:.4f}, Multiplier: {multiplier:.2f}"
        })
        
    return sorted(reranked, key=lambda x: x["score"], reverse=True)

if __name__ == "__main__":
    results = [("doc1", 0.05), ("doc2", 0.04)]
    court_weights = {"supreme_court": 1.0, "district_court": 0.6}
    reranked = apply_legal_weights(results, "NY", court_weights)
    print(json.dumps(reranked, indent=2))
