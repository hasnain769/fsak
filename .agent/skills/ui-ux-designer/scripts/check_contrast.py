
import sys

def luminance(r, g, b):
    a = [v / 255.0 for v in [r, g, b]]
    a = [((v + 0.055) / 1.055) ** 2.4 if v > 0.03928 else v / 12.92 for v in a]
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722

def contrast_ratio(l1, l2):
    lighter = max(l1, l2)
    darker = min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)

def check_contrast(hex1, hex2):
    h1 = hex1.lstrip('#')
    h2 = hex2.lstrip('#')
    r1, g1, b1 = tuple(int(h1[i:i+2], 16) for i in (0, 2, 4))
    r2, g2, b2 = tuple(int(h2[i:i+2], 16) for i in (0, 2, 4))
    
    l1 = luminance(r1, g1, b1)
    l2 = luminance(r2, g2, b2)
    
    ratio = contrast_ratio(l1, l2)
    print(f"Contrast Ratio: {ratio:.2f}:1")
    
    if ratio < 4.5:
        print("FAIL: Contrast below WCAG AA standard (4.5:1)")
        sys.exit(1)
    else:
        print("PASS: Contrast is accessible.")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python check_contrast.py <hex1> <hex2>")
        sys.exit(1)
    check_contrast(sys.argv[1], sys.argv[2])
