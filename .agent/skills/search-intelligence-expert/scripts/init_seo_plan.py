
import sys
import datetime

TEMPLATE = """# SEO & Search Intelligence Optimization Plan

## Meta
- Date: {date}
- Target: SEO, AEO (Answer Engines), GEO (Generative Engines)

## 1. Technical Audit Findings
- [ ] Title/Meta Tags: [Status]
- [ ] Semantic HTML: [Status]
- [ ] Structured Data (JSON-LD): [Status]
- [ ] Core Web Vitals: [Status]

## 2. Optimization Strategy

### Phase 1: Foundational SEO (The Basics)
- Ensure unique <title> and description for every page.
- Fix heading hierarchy (h1 -> h2 -> h3).
- Add alt text to images.

### Phase 2: Entity & Answer Optimization (AEO)
- Implement `application/ld+json` for key entities.
- Structure content as Q&A for Featured Snippets.
- Create explicit "What is X?" definitions.

### Phase 3: Generative Control (GEO)
- optimize content specifically for LLM retrieval (high info density).
- Add citations and credible sources.

## 3. Implementation Checklist
- [ ] Fix technical errors found in audit script
- [ ] Add JSON-LD schemas
- [ ] Optimize top 5 landing pages
"""

def generate_plan(filename="docs/seo-optimization-plan.md"):
    content = TEMPLATE.format(date=datetime.date.today())
    
    # Ensure docs dir exists
    if "/" in filename:
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        
    with open(filename, 'w') as f:
        f.write(content)
    print(f"Generated {filename}")

if __name__ == "__main__":
    import os
    target = sys.argv[1] if len(sys.argv) > 1 else "docs/seo-optimization-plan.md"
    generate_plan(target)
