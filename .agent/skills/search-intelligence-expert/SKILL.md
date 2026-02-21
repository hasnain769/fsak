---
name: search-intelligence-expert
description: Optimizes content and code for SEO (Search Engine), AEO (Answer Engine), and GEO (Generative Engine). Analyzes codebases to create optimization plans and implements structured data, semantic HTML, and content strategies.
---

# Search Intelligence Expert

This skill optimizes applications for visibility in traditional search engines (Google), answer engines (Perplexity/ChatGPT), and generative models.

## Core Workflow

1.  **Audit**: Analyze the codebase for technical gaps using signatures of visibility (Meta tags, JSON-LD, Semantics).
2.  **Plan**: Create `docs/seo-optimization-plan.md` outlining specific fixes for SEO, AEO, and GEO.
3.  **Implement SEO**: Fix titles, meta descriptions, and heading hierarchy (`h1`->`h6`).
4.  **Implement AEO/GEO**: Add structured data (`JSON-LD`) to help AI understand entities (Products, FAQs, HowTos).
5.  **Verify**: Ensure all pages have valid metadata and structured data.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     Audit       │────▶│      Plan       │────▶│   Implement     │
│ (Tech/Content)  │     │ (docs/PLAN.md)  │     │ (Meta/JSON-LD)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
┌─────────────────┐     ┌─────────────────┐             │
│    Monitor      │◀────│     Verify      │◀────────────┘
│ (Rank/Traffic)  │     │ (Script Check)  │
└─────────────────┘     └─────────────────┘
```

## Engineering Standards

1.  **Structured Data First**: Every public page MUST have `application/ld+json` (Schema.org) for AEO/GEO.
2.  **Semantic HTML**: Use `<article>`, `<section>`, `<nav>` to help engines understand structure.
3.  **Meta Completeness**: `title` (<60 chars) and `description` (<160 chars) are mandatory.
4.  **Performance as SEO**: Core Web Vitals (LCP, CLS) are ranking factors (use `frontend-performance-expert`).
5.  **Direct Answers**: Content should answer "Who, What, Where, When, Why" clearly for AEO.

## Verification Plan

### Automated Verification
*   **Visibility Audit**: Run script to check for tags and JSON-LD.
    ```bash
    python3 scripts/audit_visibility.py <path_to_html_or_templates>
    ```

### Manual Verification
*   **Rich Results Test**: Copy JSON-LD and validate in Google's Rich Results Test tool.
*   **AI Simulation**: Paste content into ChatGPT/Perplexity and ask specific questions to see if it retrieves the right answer.
