---
name: legal-evals-orchestrator-builder
description: Engineer automated evaluation frameworks for Legal RAG. Use when building evaluation pipelines that require (1) Synthetic data generation (QGA), (2) Multi-dimensional legal metrics (Faithfulness, Citation Grounding), (3) LLM-as-a-Judge grading, or (4) Hallucination defense testing.
---

# Legal Evals Orchestrator Builder

Build high-fidelity evaluation environments that ensure Legal RAG outputs are 100% grounded and jurisidictionally accurate.

## Core Workflow

### 1. Synthetic Dataset Engineering
Create automated "Final Exams" for the pipeline based on your Golden Data.
- **Action**: Use `scripts/synthetic_data_gen.py` to generate Question-Grounding-Answer (QGA) pairs.
- **Diversity**: Ensure coverage for Statutory Interpretation, Case Comparison, and Procedural Rules.

### 2. Legal Metric Implementation
Implement deterministic and probabilistic metrics to detect hallucinations.
- **Reference**: Use [eval_rubrics.json](references/eval_rubrics.json) for scoring criteria.
- **Action**: Run `scripts/citation_validator.py` to verify Bluebook citations exist and match source text.
- **Constraint**: Penalize models for "Jurisdictional Drift" (e.g., citing out-of-state law as mandatory).

### 3. LLM-as-a-Judge Pipeline
Use high-reasoning models to grade student model performance.
- **Action**: Use `scripts/llm_judge_factory.py` to grade responses against IRAC (Issue, Rule, Application, Conclusion) standards.
- **Adversarial**: Include trick questions about bad or overturned law in your [baseline_datasets.json](references/baseline_datasets.json).

### 4. Regression & Reporting
Track performance over time as the system evolves.
- **Asset**: View evaluation results using the [report_dashboard.html](assets/report_dashboard.html).
- **Automation**: Code "Fail-Fast" mechanisms if citation accuracy drops below 98%.

## Engineering Standards
- **Deterministic First**: Always prefer deterministic scripts for citation and factual matching over LLM guesses.
- **Cost-Efficiency**: Use caching for evaluations; only re-eval if source data or models change.
- **Explainability**: Output specific diffs for every hallucination or factual error.
