import asyncio

async def search_vector(query):
    # Simulated vector search
    await asyncio.sleep(0.1)
    return ["doc1", "doc2", "doc3"]

async def search_bm25(query):
    # Simulated BM25 search
    await asyncio.sleep(0.05)
    return ["doc2", "doc4", "doc1"]

def rrf_score(results_list, k=60):
    """
    Reciprocal Rank Fusion to merge different search result sets.
    """
    scores = {}
    for results in results_list:
        for rank, doc_id in enumerate(results):
            scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank + 1)
    
    # Sort by score descending
    sorted_results = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    return sorted_results

async def hybrid_search(query):
    """
    Executes Vector and BM25 searches in parallel and merges results.
    """
    # Parallel execution
    vector_task = asyncio.create_task(search_vector(query))
    bm25_task = asyncio.create_task(search_bm25(query))
    
    vector_results, bm25_results = await asyncio.gather(vector_task, bm25_task)
    
    merged = rrf_score([vector_results, bm25_results])
    return merged

if __name__ == "__main__":
    results = asyncio.run(hybrid_search("dummy query"))
    print("Merged RRF Results:", results)
