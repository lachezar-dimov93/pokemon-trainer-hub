### Project Title

Pokemon Trainer Hub

### Project Description

A Next.js application displaying the original 8 Pokemon. Built with Next.js (App Router), TypeScript, and Tailwind CSS v4, prioritizing scalability, performance, and clean architectural patterns. Follows provided desktop Figma design.

### Project Author

Lachezar Dimov

### Setup Instructions

This project is designed for zero-friction setup.

1. Clone and Install

```bash
git clone https://github.com/lachezar-dimov93/pokemon-trainer-hub
cd pokemon-trainer-hub
npm install
```

2. Environment Variables (Optional) The application uses a Hybrid Fallback strategy. It runs out-of-the-box using default public endpoints.

- To override settings (e.g., image hosting), copy the example file:

```bash
cp .env.example .env.local
```

3. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 to view the application.

### Approach & Architectural Decisions

1. Framework: Next.js App Router

Chose the App Router (over the legacy Pages Router) to leverage the modern React architecture.

- React Server Components (RSC): By default, the pages and non-interactive components (`HeroSection`, `PokemonGrid`) render entirely on the server. This sends zero JavaScript to the client for those sections, maximizing performance and SEO.

- Simplified Data Fetching: We can `await` data directly in the component (page.tsx), eliminating the need for useEffect chains or getServerSideProps boilerplate.

- Metadata API: Easy integration of dynamic SEO tags.

2. Styling: Tailwind CSS v4

I chose Tailwind CSS over CSS Modules or SCSS.

- Why Tailwind?

* Velocity: It allows for rapid implementation of the Figma specs without context-switching between TSX and CSS files.
* Colocation: Styles live with the component, reducing "Dead Code" accumulation often seen in SCSS projects.
* Consistency: It forces adherence to a design system (defined in `@theme`) rather than arbitrary magic values.

- Why v4? So we leverage the new CSS-first configuration approach; thus removing the need for a JavaScript config file and improving build performance.

- Trade-offs Considered: Tailwind HTML can look "messy" . However, extracting atomic components (PokemonCard) mitigates this by encapsulating the complexity.

#### Global Styles & Responsive Fluidity (globals.css)

Instead of relying strictly on breakpoints (mobile/tablet/desktop), implemented Fluid Typography using CSS clamp().

- Reasoning: This ensures the design scales smoothly across any device width, not just specific breakpoints.

- Implementation:

```css
@utility text-heading-1 {
  /* Scales fluidly from 40px to 72px based on viewport width */
  font-size: clamp(40px, 6vw, 72px);
}
```

- UX Enhancement: Added a subtle Hover/Scale Animation to the Pokemon cards. While not explicitly in the Figma static design, this provides immediate feedback to the user that the element is interactive, improving the overall "feel" of the application.

3. Project Structure: "Folder-by-Type"

Intentionally chose a Folder-by-Type layout (`components/`, `services/`, `utils/`) over a Feature-based layout (`features/pokemon/...`).

- Adhering to KISS principles: For a single-domain application (Pokemon), introducing feature folders adds unnecessary nesting depth.

- Scalability Strategy: This structure is efficient for small-to-medium apps. If we were to add "Authentication" or "User Dashboard" domains later, we would refactor to a Feature-based structure at that time.

### Folder Layout

```
├── app/                 # The "Pages" (Routing layer)
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│   └── error.tsx        # Error boundary
├── components/          # UI Building Blocks
│   └── HeroSection.tsx
│   └── PokemonGrid.tsx
│   └── PokemonCard.tsx
├── constants/
│   └── content.ts
├── services/            # External API calls (Data Layer)
│   └── pokemonApi.ts
├── utils/               # Helper functions
│   └── formatting.ts
├── types/               # Shared Interfaces (Added for clarity)
│   └── index.ts
```

4. Content Strategy (DRY Principle)

Centralized all strings in `constants/content.ts`. Notice that `TITLE` is defined once and reused for both the Hero UI and the SEO Metadata.

```typescript
// constants/content.ts
const TITLE = "Trainer hub"; // Defined once
const GRID_SUBTITLE = "Explore the original creatures...";

export const CONTENT = {
  hero: { title: TITLE }, // Used in UI
  meta: { title: TITLE }, // Used in <head>
  // ...
};
```

Benefit: This is a strict application of DRY (Don't Repeat Yourself). Changing the marketing title in one place updates the entire application instantly. It also prepares the codebase for future Internationalization (i18n).

5. Engineering Principles Applied

- SOLID (Single Responsibility Principle): Decomposed the UI into three distinct components, each with one job:

* `HeroSection`: Pure presentation (Static).

* `PokemonGrid`: Layout strategy (Grid formation).

* `PokemonCard`: Item display and interaction (Client-side image logic).

- YAGNI (You Ain't Gonna Need It):

* Did not implement a complex state management library (Redux/Zustand) because server state is handled by Next.js and local state is minimal.

* Did not add `loading.tsx` because the SSG strategy ensures data is pre-loaded before the user arrives.

- KISS:

* Used standard `fetch` rather than going with `axios` or `react-query`, as the native API is sufficient for Server Components.

6. Time spent - 2.5 hours
