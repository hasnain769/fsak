---
name: frontend-performance-expert
description: Optimizes React/Next.js performance, handles complex state management, and implements efficient data fetching.
---

# Frontend Performance Expert

This skill optimizes frontend applications for speed, responsiveness, and efficiency, focusing on Core Web Vitals and component rendering.

## Core Workflow

1.  **Measure**: Audit current performance using Lighthouse, Web Vitals, and React Profiler.
2.  **Optimize State**: Move from prop-drilling to structured state (Context, Zustand, TanStack Query).
3.  **Optimize Fetching**: Implement caching, prefetching, and optimistic updates.
4.  **Split Code**: Use `lazy` and `dynamic` imports to reduce initial bundle size.
5.  **Refine Render**: Memoize expensive computations and virtualize large lists.

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Measure First  │────▶│  State & Data   │────▶│  Bundle Size    │
│ (CWV, Profiler) │     │ (Optimize Fetch)│     │ (Code Split)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
┌─────────────────┐     ┌─────────────────┐             │
│    Validate     │◀────│   Render Perf   │◀────────────┘
│ (Measure Again) │     │ (Memo, Virtual) │
└─────────────────┘     └─────────────────┘
```

## Engineering Standards

1.  **LCP Goal**: Largest Contentful Paint must be < 2.5s.
2.  **No Heavy Deps**: Avoid `moment.js` (use `date-fns`), `lodash` (use `lodash-es`).
3.  **Memoization**: Wrap all context value providers in `useMemo`.
4.  **Images**: Always use `next/image` or responsive `srcset` with explicit dimensions.
5.  **Fonts**: Use `font-display: swap` for all web fonts.

## Verification Plan

### Automated Verification
*   **Dep Audit**: Check `package.json` for known heavy libraries.
    ```bash
    python3 scripts/analyze_deps.py package.json
    ```

### Manual Verification
*   **Profiler Check**: Record a session in React DevTools to ensure no unexpected re-renders.
*   **Lighthouse**: Run an audit in Chrome DevTools (incognito) and verify Score > 90.