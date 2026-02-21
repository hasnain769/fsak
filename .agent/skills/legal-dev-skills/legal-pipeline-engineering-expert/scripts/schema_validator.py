import sys
import json
import jsonschema
from jsonschema import validate

def validate_json(data, schema_path):
    with open(schema_path, 'r') as f:
        schema = json.load(f)
    
    try:
        validate(instance=data, schema=schema)
        return True, "Validation successful"
    except jsonschema.exceptions.ValidationError as err:
        return False, str(err)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 schema_validator.py <json_file> <schema_file>")
        sys.exit(1)
        
    with open(sys.argv[1], 'r') as f:
        data = json.load(f)
        
    success, message = validate_json(data, sys.argv[2])
    print(message)
    sys.exit(0 if success else 1)
