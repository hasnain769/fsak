---
name: legal-hybrid-retriever-builder
description: Engineer multi-modal legal retrieval engines. Use when building search pipelines that require (1) Query expansion (Synonyms, HyDE), (2) Hybrid search (Vector + BM25), (3) Reciprocal Rank Fusion, or (4) Jurisdictional re-ranking.
---

# Legal Hybrid Retriever Builder

Build production-grade legal search engines that combine semantic precision with keyword recall.

## Core Workflow

### 1. Query Transformation
Expand and decompose the user's legal query to cover synonyms and hypothetical holdings.
- **Action**: Use `scripts/query_expander.py` to perform HyDE and legal synonym expansion.

### 2. Multi-Modal Search
Execute conceptual and keyword searches in parallel and merge results.
- **Action**: Use `scripts/hybrid_orchestrator.py` to run Vector and BM25 searches concurrently and unify them using Reciprocal Rank Fusion (RRF).
- **Standard**: Always prioritise citations and exact statute matches in the initial pool.

### 3. Jurisdictional Re-ranking
Refine search results using legal authority weights and court hierarchies.
- **Reference**: See [jurisdiction_weights.json](references/jurisdiction_weights.json) for authority multipliers.
- **Action**: Use `scripts/legal_reranker.py` to boost results from target jurisdictions and higher courts.
- **Heuristic**: Use [rerank_prompts.json](references/rerank_prompts.json) for second-pass assessments.

### 4. Integration
Access the unified search capabilities through the standard pipeline.
- **Asset**: Use [retrieval_pipeline.py](assets/retrieval_pipeline.py) as the main entry point for search execution.

## Engineering Standards
- **Parallelism**: Execute independent searches concurrently via `asyncio`.
- **Explainability**: Return relevance score breakdowns including jurisdictional boosts.
- **Citation Priority**: Queries containing citations must treat BM25 matches as high-signal candidates.
