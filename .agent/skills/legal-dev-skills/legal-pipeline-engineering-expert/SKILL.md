---
name: legal-pipeline-engineering-expert
description: Engineer high-fidelity cleaning and normalization pipelines for legal documents (Case-Law). Use when building ingestion pipelines that require (1) Structural anatomy discovery, (2) Zonal segmentation (Opinion vs. Dissent), (3) Extraction schema design, or (4) TDD-driven cleaning logic.
---

# Legal Pipeline Engineering Expert

Engineer anatomy-aware pipelines for legal documents to ensure metadata integrity and precise zonal segmentation.

## Core Workflow

### 1. Structural Discovery
Analyze input documents to identify structural zones and anchor mappings.
- **Reference**: See [case_law_anatomy.json](references/case_law_anatomy.json) for zone definitions.
- **Action**: Run `scripts/anatomy_analyzer.py <file>` to identify zones (Header, Syllabus, Opinion, Dissent, etc.).

### 2. Schema Engineering
Define or satisfy a target extraction schema for the pipeline.
- **Reference**: Use [standard_schema.json](references/standard_schema.json) as the target format.
- **Constraint**: Ensure hierarchical nesting and preserve `page_number` and `paragraph_index`.

### 3. Pipeline Implementation
Build the extraction and cleaning logic using a TDD approach.
- **Asset**: Use [extraction_logic.py](assets/extraction_logic.py) as a template for mapping zones to schema.
- **Logic**: Implement layout-aware extraction and canonicalize citations (e.g., using `eyecite`).

### 4. Validation
Verify output integrity and schema compliance.
- **Action**: Validate extracted JSON with `scripts/schema_validator.py <json> <schema>`.
- **Verify**: Ensure "Opinion" is not polluted by headers/headers and "Disposition" is correctly captured.

## Engineering Standards
- **Anatomy Awareness**: Treat Opinion and Dissent as separate semantic objects.
- **Metadata Traceability**: Tag citations by authority level based on their zone.
- **Idempotency**: Processing schema-ready JSON twice must yield zero changes.