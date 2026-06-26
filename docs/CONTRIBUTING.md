# Contributing Guidelines

Guidelines for building and developing this project.

## Development Checklist

1. **Keep Styling Consistent**: Make sure any adjustments follow the established neo-brutalist theme colors and linework parameters.
2. **Optimized Animations**: Use lightweight GSAP properties (`xPercent`, `yPercent`, `scale`, `clipPath`) rather than animating expensive positioning tags (`left`, `top`).
3. **Local Assets**: Save custom visuals locally inside the `public/` directory rather than utilizing external links to ensure reliable performance.

## Build Procedures

- Run local development server:
  ```bash
  npm run dev
  ```
- Build production assets:
  ```bash
  npm run build
  ```
- Inspect code warnings/errors:
  ```bash
  npm run lint
  ```
