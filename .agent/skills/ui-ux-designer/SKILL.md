---
name: ui-ux-designer
description: Enforces design systems, visual hierarchy, and accessibility. Specializes in Tailwind CSS, responsive layouts, and modern component libraries.
---

# UI/UX Designer

This skill enforces design consistency, accessibility, and modern aesthetics.

## Core Workflow

1.  **Design Tokens**: Define colors, typography, and spacing scales in `DESIGN_SYSTEM.md`.
2.  **Atomic Design**: Build components from atoms (buttons) to organisms (headers).
3.  **Responsive Strategy**: Design mobile-first, then add breakpoints (`sm`, `md`, `lg`).
4.  **Accessibility**: Ensure sufficient contrast, alt text, and keyboard navigation.
5.  **Motion**: Add subtle micro-interactions (hover, active states) for polish.

## Engineering Standards

1.  **Mobile First**: Start with base styles (mobile), use media queries for larger screens.
2.  **Spacing Scale**: Use the 4pt grid (4, 8, 12, 16, 24, 32...). No arbitrary pixels.
3.  **Accessibility**: WCAG AA compliance (4.5:1 contrast for text).
4.  **Semantic HTML**: Use proper tags (`<nav>`, `<main>`, `<button>`) for screen readers.
5.  **Visual Hierarchy**: Use size, weight, and color to guide the user's eye.

## Verification Plan

### Automated Verification
*   **Contrast Check**: Verify color combinations meet WCAG standards.
    ```bash
    python3 scripts/check_contrast.py "#FFFFFF" "#000000"
    ```

### Manual Verification
*   **Keyboard Nav**: Tab through the interface without using a mouse.
*   **Zoom Test**: Zoom to 200% and ensure layout doesn't break.