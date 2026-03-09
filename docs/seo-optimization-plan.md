# Search Intelligence Optimization Plan

## 1. Executive Summary
This optimization plan details the semantic, structural, and metadata enhancements required to position FSAK Logistics at the top of organic SERPs, Answer Engines (Perplexity, ChatGPT), and Generative Search Engines. Focus areas include "logistics in Saudi Arabia", "Middle East", and "Pakistan".

## 2. SEO (Search Engine Optimization)
- **Global Metadata (`layout.tsx`)**: 
  - Enhance the global title template to inject targeted keywords smoothly.
  - Add robust `openGraph` and `twitter` card configurations.
  - Implement `alternates` for i18n routing (`en` and `ar`).
  - Add `robots` directives to explicitly encourage indexing.
- **On-Page SEO (`page.tsx` & Components)**: 
  - Ensure a strict `<h1>` to `<h6>` hierarchy. Currently, the Hero component has an `<h1>`, we must verify components like `ServicesSection` possess clean `<h2>` tags.
  - Inject semantic grouping (`<section>`, `<article>`, `<aside>`) into layout components.

## 3. AEO (Answer Engine Optimization)
- **Direct Answers**: Provide clear, concise answers to "What logistics services are available in Saudi Arabia?", "Best heavy transport company in the Middle East?", and "Supply chain solutions for Pakistan" across `AboutSection` and `ServicesSection`.

## 4. GEO (Generative Engine Optimization) - JSON-LD
- **Organization & LocalBusiness Schema (`page.tsx`)**:
  - Implement `application/ld+json` injecting `LogisticsService` schema.
  - Include properties such as `name`, `url`, `logo`, `contactPoint`, and `areaServed` (Saudi Arabia, Middle East, Pakistan).
- **Service Schema**:
  - Add specific Service schemas for sub-offerings (Heavy Transport, Customs Clearance, Warehousing).

## 5. Execution Steps
1. Refactor `layout.tsx` metadata.
2. Inject JSON-LD into `page.tsx`.
3. Audit and semantically enhance `Hero`, `ServicesSection`, and `AboutSection`.
4. Run verification.
