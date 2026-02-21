---
name: hierarchical-legal-parser-builder
description: Engineer hierarchical parsing and multi-lingual indexing pipelines for legal data. Use when transforming structured JSON into searchable indexes that preserve (1) Contextual ancestry (Breadcrumbs), (2) Citation relationships (Graph), or (3) RAG-optimized vector stores.
---

# Hierarchical Legal Parser Builder

Transform structured legal data into a searchable Knowledge Graph and Vector Index while maintaining semantic integrity and authority levels.

## Core Workflow

### 1. Contextual Splitting
Break down documents into manageable chunks without losing their hierarchical position.
- **Reference**: See [hierarchy_weights.json](references/hierarchy_weights.json) for importance scoring.
- **Action**: Run `scripts/context_aware_chunker.py` to recursively split text while injecting ancestry metadata.

### 2. Relationship Mapping
Extract citations and structural links to build a network of legal authority.
- **Reference**: See [index_contracts.json](references/index_contracts.json) for graph node/edge schemas.
- **Action**: Use `scripts/graph_edge_extractor.py` to map "CITES", "INTERPRETS", and "CRITICIZES" relationships.

### 3. Contextual Breadcrumbs
Format chunks for embedding by prepending their semantic hierarchy to the text.
- **Action**: Use `scripts/vector_styler.py` to prepend breadcrumbs (e.g., "[Case > Opinion > Section]") to improve RAG relevance.

### 4. Multi-Modal Indexing
Push processed data to semantic and structural databases.
- **Asset**: Use `assets/db_adapters/pgvector_adapter.py` for vector upserts.
- **Asset**: Use `assets/db_adapters/neo4j_adapter.py` for graph population.

## Engineering Standards
- **Breadcrumb Injection**: Never index a raw chunk; always prepend hierarchical context.
- **Edge Integrity**: Treat every normalized citation as a potential graph node.
- **Batch Processing**: Use batch-upserts to optimize latency for both Vector and Graph stores.
