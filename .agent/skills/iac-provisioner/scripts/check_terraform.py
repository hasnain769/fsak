
import subprocess
import sys

def check_terraform():
    try:
        subprocess.run(['terraform', '--version'], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print("Terraform is installed.")
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("Terraform is NOT installed. Please install it.")
        sys.exit(1)

if __name__ == "__main__":
    check_terraform()
