#!/usr/bin/env python3
"""
Architecture Alignment Validation Script

Validates that every requirement in SPEC.md is addressed by a component in ARCHITECTURE.md.

Usage:
    python3 check_alignment.py <spec_path> <arch_path> [--json]
    python3 check_alignment.py docs/SPEC.md docs/ARCHITECTURE.md
"""

import sys
import os
import re
import json


def extract_requirements(content):
    """Extract requirement IDs and descriptions from SPEC.md."""
    requirements = []
    
    # Match patterns like FR-001, NFR-001, US-001
    patterns = [
        r'(FR-\d+)[:\s]+([^\n|]+)',      # Functional Requirements
        r'(NFR-\d+)[:\s]+([^\n|]+)',     # Non-Functional Requirements
        r'(US-\d+)[:\s|]+([^\n|]+)',     # User Stories
    ]
    
    for pattern in patterns:
        matches = re.findall(pattern, content, re.IGNORECASE)
        for match in matches:
            req_id = match[0].upper()
            desc = match[1].strip()[:100]  # Truncate description
            if req_id not in [r['id'] for r in requirements]:
                requirements.append({'id': req_id, 'description': desc})
    
    return requirements


def extract_components(content):
    """Extract component names from ARCHITECTURE.md."""
    components = []
    
    # Match section headers for components
    component_patterns = [
        r'###\s+\d+\.\d+\s+([^\n]+)',           # ### 3.1 Component Name
        r'\|\s*([A-Z][a-zA-Z\s]+)\s*\|[^|]+\|',  # Table rows with component names
    ]
    
    for pattern in component_patterns:
        matches = re.findall(pattern, content)
        for match in matches:
            comp = match.strip()
            if comp and comp not in components and len(comp) > 2:
                components.append(comp)
    
    return components


def extract_traceability(content):
    """Extract requirement-to-component mappings from traceability section."""
    mappings = {}
    
    # Look for traceability table: | SPEC Requirement | Component(s) |
    trace_pattern = r'\|\s*((?:FR|NFR|US)-\d+)[^|]*\|\s*([^|]+)\|'
    matches = re.findall(trace_pattern, content, re.IGNORECASE)
    
    for match in matches:
        req_id = match[0].upper()
        components = match[1].strip()
        if components and components.lower() not in ['component(s)', 'notes', '']:
            mappings[req_id] = components
    
    return mappings


def validate_alignment(spec_path, arch_path, output_json=False):
    """Validate spec requirements are addressed in architecture."""
    
    # Check files exist
    for path in [spec_path, arch_path]:
        if not os.path.exists(path):
            result = {"error": f"File not found: {path}", "score": 0}
            if output_json:
                print(json.dumps(result, indent=2))
            else:
                print(f"Error: {path} not found.")
            sys.exit(1)
    
    with open(spec_path, 'r') as f:
        spec_content = f.read()
    
    with open(arch_path, 'r') as f:
        arch_content = f.read()
    
    # Extract data
    requirements = extract_requirements(spec_content)
    components = extract_components(arch_content)
    traceability = extract_traceability(arch_content)
    
    results = {
        "spec_file": spec_path,
        "arch_file": arch_path,
        "requirements_found": len(requirements),
        "components_found": len(components),
        "mapped": [],
        "unmapped": [],
    }
    
    # Check each requirement for mapping
    for req in requirements:
        req_id = req['id']
        if req_id in traceability:
            results["mapped"].append({
                "id": req_id,
                "description": req['description'],
                "component": traceability[req_id]
            })
        else:
            # Check if requirement ID appears anywhere in architecture
            if req_id in arch_content:
                results["mapped"].append({
                    "id": req_id,
                    "description": req['description'],
                    "component": "(mentioned but not in traceability table)"
                })
            else:
                results["unmapped"].append({
                    "id": req_id,
                    "description": req['description']
                })
    
    # Calculate score
    total = len(requirements)
    mapped = len(results["mapped"])
    score = (mapped / total * 100) if total > 0 else 100
    
    results["score"] = round(score, 1)
    results["grade"] = (
        "A" if score >= 90 else
        "B" if score >= 75 else
        "C" if score >= 60 else
        "D" if score >= 50 else
        "F"
    )
    
    has_unmapped = len(results["unmapped"]) > 0
    
    if output_json:
        print(json.dumps(results, indent=2))
    else:
        print(f"\n{'='*60}")
        print(f"Architecture Alignment Validation")
        print(f"{'='*60}")
        print(f"SPEC: {spec_path}")
        print(f"ARCH: {arch_path}")
        print(f"{'='*60}")
        print(f"Requirements found: {results['requirements_found']}")
        print(f"Components found: {results['components_found']}")
        print(f"Alignment Score: {results['score']}% (Grade: {results['grade']})")
        print(f"{'='*60}\n")
        
        if results["unmapped"]:
            print("❌ UNMAPPED REQUIREMENTS:")
            for req in results["unmapped"]:
                print(f"   • {req['id']}: {req['description']}")
            print()
        
        if results["mapped"]:
            print(f"✅ MAPPED REQUIREMENTS ({len(results['mapped'])} total):")
            for req in results["mapped"][:5]:  # Show first 5
                print(f"   • {req['id']} → {req['component']}")
            if len(results["mapped"]) > 5:
                print(f"   ... and {len(results['mapped']) - 5} more")
            print()
        
        if has_unmapped:
            print("⚠️  Validation WARNING: Some requirements are not mapped to components.\n")
        else:
            print("✅ Validation PASSED: All requirements mapped to architecture.\n")
    
    sys.exit(1 if has_unmapped else 0)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 check_alignment.py <spec_path> <arch_path> [--json]")
        print("Example: python3 check_alignment.py docs/SPEC.md docs/ARCHITECTURE.md")
        sys.exit(1)
    
    spec_path = sys.argv[1]
    arch_path = sys.argv[2]
    output_json = "--json" in sys.argv
    
    validate_alignment(spec_path, arch_path, output_json)
