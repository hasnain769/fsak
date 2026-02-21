
import subprocess
import sys

def check_playwright():
    try:
        subprocess.run(['npx', 'playwright', '--version'], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print("Playwright is installed.")
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("Playwright is NOT installed. Run 'npx playwright install'.")
        sys.exit(1)

if __name__ == "__main__":
    check_playwright()
