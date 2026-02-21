import json

def expand_legal_query(query, model_callback):
    """
    Expands a legal query using HyDE and synonym expansion.
    """
    # 1. Synonym Expansion (Simplified)
    synonyms = {
        "theft": ["larceny", "conversion", "embezzlement"],
        "employment": ["labor", "workplace", "master-servant"],
        "negligence": ["tort", "duty of care", "breach"]
    }
    
    expanded_terms = [query]
    for word in query.lower().split():
        if word in synonyms:
            expanded_terms.extend(synonyms[word])
            
    # 2. HyDE (Hypothetical Document Embedding)
    # Generate a hypothetical answer to the query to improve vector search
    hyde_prompt = f"Write a one-paragraph legal summary that answers the following question: {query}"
    hypothetical_answer = model_callback(hyde_prompt)
    
    return {
        "original_query": query,
        "expanded_query": " ".join(set(expanded_terms)),
        "hypothetical_answer": hypothetical_answer
    }

if __name__ == "__main__":
    # Dummy callback for testing
    def dummy_llm(prompt):
        return "Hypothetical legal holding regarding the query."
        
    print(json.dumps(expand_legal_query("What are the elements of theft?", dummy_llm), indent=2))
