
import sys
import re

def audit_schema(file_path):
    issues = []
    with open(file_path, 'r') as f:
        content = f.read()

    # Check for CREATE TABLE
    tables = re.split(r'CREATE TABLE', content, flags=re.IGNORECASE)[1:]
    
    for table_chunk in tables:
        table_name_match = re.search(r'\s+([a-zA-Z0-9_]+)', table_chunk)
        table_name = table_name_match.group(1) if table_name_match else "unknown"
        
        if "PRIMARY KEY" not in table_chunk.upper():
            issues.append(f"Table '{table_name}' missing PRIMARY KEY.")
            
    if issues:
        print("Schema Issues Found:")
        for issue in issues:
            print(f"- {issue}")
        sys.exit(1)
    else:
        print("Schema audit passed.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python audit_schema.py <schema.sql>")
        sys.exit(1)
    audit_schema(sys.argv[1])
