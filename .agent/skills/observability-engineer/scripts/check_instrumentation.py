
import sys
import os
import re

def check_otel(file_path):
    if not os.path.exists(file_path):
        print(f"File {file_path} not found.")
        sys.exit(1)

    with open(file_path, 'r') as f:
        content = f.read()

    # Simple regex check for imports
    if re.search(r'opentelemetry|otel', content, re.IGNORECASE):
        print("OpenTelemetry instrumentation found.")
    else:
        print("No OpenTelemetry instrumentation found. Please import opentelemetry.")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python check_instrumentation.py <source_file>")
        sys.exit(1)
    check_otel(sys.argv[1])
