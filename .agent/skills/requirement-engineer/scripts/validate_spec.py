#!/usr/bin/env python3
"""
Validation script for PRD and SPEC documents.
Checks for required sections and provides completeness scoring.

Usage:
    python validate_spec.py <filepath> [--json]
    python validate_spec.py docs/SPEC.md
    python validate_spec.py docs/PRD.md --json
"""

import sys
import os
import json
import re

# Required sections for SPEC documents
SPEC_REQUIRED_SECTIONS = {
    "critical": [
        "# Technical Specification",
        "## 2. User Stories",
        "## 3. Functional Requirements", 
        "## 4. Non-Functional Requirements",
        "## 5. Data Model",
        "## 7. Proposed Tech Stack",
    ],
    "important": [
        "## 6. API Requirements",
        "## 8. Security & Compliance",
        "## 9. Edge Cases & Error Handling",
    ],
    "recommended": [
        "## 4.4 Accessibility",
        "## 4.5 Observability",
        "## 10. Risks & Mitigations",
        "## 11. Glossary",
    ]
}

# Required sections for PRD documents
PRD_REQUIRED_SECTIONS = {
    "critical": [
        "# Product Requirements Document",
        "## 1. Executive Summary",
        "## 2. Target Users",
        "## 3. Feature Requirements",
    ],
    "important": [
        "### Must-Have",
        "## 4. User Flows",
        "## 5. Constraints & Dependencies",
    ],
    "recommended": [
        "### Won't-Have",
        "## 6. Open Questions",
        "## 7. Approval",
    ]
}


def detect_doc_type(content):
    """Detect if document is PRD or SPEC based on content."""
    if "# Product Requirements Document" in content:
        return "PRD"
    elif "# Technical Specification" in content:
        return "SPEC"
    else:
        # Fallback detection
        if "User Stories" in content and "Tech Stack" in content:
            return "SPEC"
        elif "Target Users" in content or "Feature Requirements" in content:
            return "PRD"
    return "UNKNOWN"


def validate_document(filepath, output_json=False):
    """Validate a PRD or SPEC document and return completeness report."""
    
    if not os.path.exists(filepath):
        result = {"error": f"File not found: {filepath}", "score": 0}
        if output_json:
            print(json.dumps(result, indent=2))
        else:
            print(f"Error: {filepath} not found.")
        sys.exit(1)

    with open(filepath, 'r') as f:
        content = f.read()

    doc_type = detect_doc_type(content)
    
    if doc_type == "UNKNOWN":
        result = {"error": "Could not detect document type (PRD or SPEC)", "score": 0}
        if output_json:
            print(json.dumps(result, indent=2))
        else:
            print("Error: Could not detect document type. Ensure document starts with proper heading.")
        sys.exit(1)

    required_sections = PRD_REQUIRED_SECTIONS if doc_type == "PRD" else SPEC_REQUIRED_SECTIONS
    
    results = {
        "document_type": doc_type,
        "filepath": filepath,
        "critical": {"present": [], "missing": []},
        "important": {"present": [], "missing": []},
        "recommended": {"present": [], "missing": []},
    }
    
    # Check each section
    for level, sections in required_sections.items():
        for section in sections:
            # Use flexible matching (case-insensitive, allow variations)
            pattern = re.escape(section).replace(r"\ ", r"\s+")
            if re.search(pattern, content, re.IGNORECASE):
                results[level]["present"].append(section)
            else:
                results[level]["missing"].append(section)
    
    # Calculate score
    critical_count = len(required_sections["critical"])
    important_count = len(required_sections["important"])
    recommended_count = len(required_sections["recommended"])
    
    critical_present = len(results["critical"]["present"])
    important_present = len(results["important"]["present"])
    recommended_present = len(results["recommended"]["present"])
    
    # Weighted scoring: critical=50%, important=35%, recommended=15%
    score = (
        (critical_present / critical_count * 50) +
        (important_present / important_count * 35) +
        (recommended_present / recommended_count * 15)
    )
    
    results["score"] = round(score, 1)
    results["grade"] = (
        "A" if score >= 90 else
        "B" if score >= 75 else
        "C" if score >= 60 else
        "D" if score >= 50 else
        "F"
    )
    
    # Check for critical failures
    has_critical_missing = len(results["critical"]["missing"]) > 0
    
    if output_json:
        print(json.dumps(results, indent=2))
    else:
        print(f"\n{'='*50}")
        print(f"Document: {filepath}")
        print(f"Type: {doc_type}")
        print(f"Score: {results['score']}% (Grade: {results['grade']})")
        print(f"{'='*50}\n")
        
        if results["critical"]["missing"]:
            print("❌ CRITICAL - Missing (must fix):")
            for s in results["critical"]["missing"]:
                print(f"   • {s}")
            print()
        
        if results["important"]["missing"]:
            print("⚠️  IMPORTANT - Missing (should fix):")
            for s in results["important"]["missing"]:
                print(f"   • {s}")
            print()
        
        if results["recommended"]["missing"]:
            print("💡 RECOMMENDED - Missing (nice to have):")
            for s in results["recommended"]["missing"]:
                print(f"   • {s}")
            print()
        
        if not any([results["critical"]["missing"], results["important"]["missing"], results["recommended"]["missing"]]):
            print("✅ All sections present!\n")
        
        if has_critical_missing:
            print("❌ Validation FAILED: Critical sections missing.\n")
        else:
            print("✅ Validation PASSED: All critical sections present.\n")
    
    sys.exit(1 if has_critical_missing else 0)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python validate_spec.py <filepath> [--json]")
        print("Example: python validate_spec.py docs/SPEC.md")
        sys.exit(1)
    
    filepath = sys.argv[1]
    output_json = "--json" in sys.argv
    
    validate_document(filepath, output_json)