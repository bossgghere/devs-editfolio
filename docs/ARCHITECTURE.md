# Architecture & Design Overview

This document highlights the design philosophy, animation patterns, and structure of the portfolio project.

## Design Philosophy

The project utilizes a custom **Neo-Brutalist** aesthetic combined with dynamic typography and high contrast details:
- **Warm Contrast**: Soft cream and beige background colors paired with rich, dark brown-charcoal content wrappers.
- **Bold Linework**: Standard thick borders and flat dark shadows on interactive elements.
- **Aspect Ratio Control**: Lightweight responsive grids to present visual works cleanly.

## Key Component Structures

1. **Preloader (`src/components/Preloader.tsx`)**:
   - Manages initial startup timeline using GSAP.
   - Hosts custom ease timings (`hop`) to animate crop-paths, scaling, and character-reveal spacing.
   - Loads 4 high-context local imagery slides sequentially to configure branding tone.

2. **Video Grid (`src/components/VideoGrid.tsx`)**:
   - Manages widescreen horizontal clips and tall portrait mobile reels.
   - Features a custom unified aspect-ratio-aware video modal player tailored to both landscape and vertical clips.
