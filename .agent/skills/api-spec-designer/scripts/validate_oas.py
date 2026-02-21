#!/usr/bin/env python3
"""
OpenAPI Specification Validator

Validates OpenAPI 3.x specifications for syntax and completeness.

Usage:
    python3 validate_oas.py <spec_path> [--json]
    python3 validate_oas.py docs/api-spec.yaml
"""

import sys
import os
import json
import re

try:
    import yaml
    HAS_YAML = True
except ImportError:
    HAS_YAML = False


def load_spec(filepath):
    """Load OpenAPI spec from YAML or JSON file."""
    if not os.path.exists(filepath):
        return None, f"File not found: {filepath}"
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Try YAML first
    if HAS_YAML and (filepath.endswith('.yaml') or filepath.endswith('.yml')):
        try:
            return yaml.safe_load(content), None
        except yaml.YAMLError as e:
            return None, f"YAML parse error: {e}"
    
    # Try JSON
    if filepath.endswith('.json'):
        try:
            return json.loads(content), None
        except json.JSONDecodeError as e:
            return None, f"JSON parse error: {e}"
    
    # Fallback: try both
    if HAS_YAML:
        try:
            return yaml.safe_load(content), None
        except:
            pass
    try:
        return json.loads(content), None
    except:
        pass
    
    return None, "Could not parse file as YAML or JSON"


def validate_openapi(spec):
    """Validate OpenAPI specification structure and content."""
    issues = {
        "errors": [],
        "warnings": [],
        "info": []
    }
    
    # Check OpenAPI version
    openapi_version = spec.get('openapi')
    if not openapi_version:
        issues["errors"].append("Missing 'openapi' version field")
    elif not openapi_version.startswith('3.'):
        issues["warnings"].append(f"OpenAPI version {openapi_version} - recommend 3.1.0")
    else:
        issues["info"].append(f"OpenAPI version: {openapi_version}")
    
    # Check info section
    info = spec.get('info', {})
    if not info.get('title'):
        issues["errors"].append("Missing info.title")
    if not info.get('version'):
        issues["errors"].append("Missing info.version")
    if not info.get('description'):
        issues["warnings"].append("Missing info.description")
    
    # Check servers
    servers = spec.get('servers', [])
    if not servers:
        issues["warnings"].append("No servers defined")
    
    # Check paths
    paths = spec.get('paths', {})
    if not paths:
        issues["errors"].append("No paths defined")
    else:
        issues["info"].append(f"Endpoints defined: {len(paths)}")
        
        operations_count = 0
        operations_missing_id = []
        operations_missing_response = []
        
        for path, methods in paths.items():
            if not path.startswith('/'):
                issues["errors"].append(f"Path must start with '/': {path}")
            
            for method, operation in methods.items():
                if method in ['get', 'post', 'put', 'patch', 'delete']:
                    operations_count += 1
                    
                    # Check operationId
                    if not operation.get('operationId'):
                        operations_missing_id.append(f"{method.upper()} {path}")
                    
                    # Check responses
                    responses = operation.get('responses', {})
                    if not responses:
                        operations_missing_response.append(f"{method.upper()} {path}")
                    
                    # Check for examples
                    has_example = False
                    for status, response in responses.items():
                        content = response.get('content', {})
                        for media, media_obj in content.items():
                            if media_obj.get('example') or media_obj.get('examples'):
                                has_example = True
                    if not has_example and method != 'delete':
                        issues["warnings"].append(f"No response example: {method.upper()} {path}")
        
        issues["info"].append(f"Total operations: {operations_count}")
        
        if operations_missing_id:
            issues["warnings"].append(f"Operations missing operationId: {len(operations_missing_id)}")
        if operations_missing_response:
            issues["errors"].append(f"Operations missing responses: {operations_missing_response}")
    
    # Check security schemes
    components = spec.get('components', {})
    security_schemes = components.get('securitySchemes', {})
    if not security_schemes:
        issues["warnings"].append("No security schemes defined")
    else:
        issues["info"].append(f"Security schemes: {list(security_schemes.keys())}")
    
    # Check schemas
    schemas = components.get('schemas', {})
    issues["info"].append(f"Schemas defined: {len(schemas)}")
    
    return issues


def calculate_score(issues):
    """Calculate completeness score based on issues."""
    score = 100
    score -= len(issues["errors"]) * 15
    score -= len(issues["warnings"]) * 5
    return max(0, min(100, score))


def validate_spec(filepath, output_json=False):
    """Main validation function."""
    spec, error = load_spec(filepath)
    
    if error:
        result = {"error": error, "score": 0}
        if output_json:
            print(json.dumps(result, indent=2))
        else:
            print(f"Error: {error}")
        sys.exit(1)
    
    issues = validate_openapi(spec)
    score = calculate_score(issues)
    grade = (
        "A" if score >= 90 else
        "B" if score >= 75 else
        "C" if score >= 60 else
        "D" if score >= 50 else
        "F"
    )
    
    result = {
        "filepath": filepath,
        "score": score,
        "grade": grade,
        **issues
    }
    
    has_errors = len(issues["errors"]) > 0
    
    if output_json:
        print(json.dumps(result, indent=2))
    else:
        print(f"\n{'='*60}")
        print(f"OpenAPI Specification Validation")
        print(f"{'='*60}")
        print(f"File: {filepath}")
        print(f"Score: {score}% (Grade: {grade})")
        print(f"{'='*60}\n")
        
        if issues["info"]:
            print("ℹ️  INFO:")
            for item in issues["info"]:
                print(f"   • {item}")
            print()
        
        if issues["errors"]:
            print("❌ ERRORS (must fix):")
            for item in issues["errors"]:
                print(f"   • {item}")
            print()
        
        if issues["warnings"]:
            print("⚠️  WARNINGS (should fix):")
            for item in issues["warnings"]:
                print(f"   • {item}")
            print()
        
        if has_errors:
            print("❌ Validation FAILED\n")
        else:
            print("✅ Validation PASSED\n")
    
    sys.exit(1 if has_errors else 0)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 validate_oas.py <spec_path> [--json]")
        print("Example: python3 validate_oas.py docs/api-spec.yaml")
        sys.exit(1)
    
    filepath = sys.argv[1]
    output_json = "--json" in sys.argv
    
    validate_spec(filepath, output_json)
