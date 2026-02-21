import asyncio
from scripts.query_expander import expand_legal_query
from scripts.hybrid_orchestrator import hybrid_search
from scripts.legal_reranker import apply_legal_weights

async def retrieval_pipeline(query, target_jurisdiction="NY"):
    """
    Full pipeline: Expand -> Search -> Re-rank.
    """
    # 1. Expand
    expansion = expand_legal_query(query, lambda p: "Hypothetical answer")
    
    # 2. Search
    temp_results = await hybrid_search(expansion["expanded_query"])
    
    # 3. Re-rank
    court_weights = {"supreme_court": 1.0, "appellate_court": 0.8, "district_court": 0.6}
    final_results = apply_legal_weights(temp_results, target_jurisdiction, court_weights)
    
    return final_results

if __name__ == "__main__":
    # Test the integrated pipeline
    results = asyncio.run(retrieval_pipeline("What are the elements of theft?"))
    print("Final Top Result:", results[0]["doc_id"])
