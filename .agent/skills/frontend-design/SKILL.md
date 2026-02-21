---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
---

# Frontend Design

This skill creates distinctive, production-grade frontend interfaces that avoid generic "AI slop".

## Core Workflow

1.  **Define Aesthetic**: Commit to a BOLD direction (e.g., Brutalist, Glassmorphism, Retro-Futurism). avoiding generic defaults.
2.  **Structure**: layout the HTML/Component structure with semantic elements.
3.  **Style**: Implement CSS with variables for typography, color, and spacing. Use complex gradients and textures.
4.  **Animate**: Add micro-interactions and entrance animations (staggered reveals).
5.  **Refine**: Polish spacing, cursor effects, and shadows to look "premium".

## Engineering Standards

1.  **Typography**: No generic fonts (Arial, Inter). Use distinctive Google Fonts pairs.
2.  **Color**: Use cohesive palettes with sharp accents. Avoid purple gradients on white.
3.  **Motion**: Use CSS transitions for interactions. Avoid janky JS animations.
4.  **Spatial Composition**: Use asymmetry, overlap, and grid-breaking layouts.
5.  **Accessibility**: All images must have `alt` tags. Interactive elements must be focusable.

## Verification Plan

### Automated Verification
*   **A11y Check**: Run the accessibility script.
    ```bash
    python3 scripts/check_accessibility.py <file.html>
    ```

### Manual Verification
*   **Visual Audit**: Does it look generic? If yes, REFACTOR with a bolder font or color.
*   **Responsive Check**: Verify layout on mobile and desktop.
