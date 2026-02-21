
import sys
import datetime

TEMPLATE = """# Incident Report: [Title]

## Meta
- Date: {date}
- Status: Investigating

## Summary
- Duration: [Start] - [End]
- Impact: [Description]
- Root Cause: [Pending]

## Timeline
- {time_start}: Incident detected

## 5-Whys
1. Why? 
2. Why? 
3. Why? 
4. Why? 
5. Why? 

## Resolution
- Immediate: 
- Permanent: 
"""

def generate_rca(filename="RCA_DRAFT.md"):
    content = TEMPLATE.format(
        date=datetime.date.today(),
        time_start=datetime.datetime.now().strftime("%H:%M")
    )
    with open(filename, 'w') as f:
        f.write(content)
    print(f"Generated {filename}")

if __name__ == "__main__":
    generate_rca(sys.argv[1] if len(sys.argv) > 1 else "RCA_DRAFT.md")
