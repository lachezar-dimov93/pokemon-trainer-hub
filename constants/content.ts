const TITLE = "Trainer hub";
const GRID_SUBTITLE = "Explore the original creatures that started the journey";

export const CONTENT = {
  hero: {
    title: TITLE,
  },
  grid: {
    title: "First 8 Entries",
    subtitle: GRID_SUBTITLE,
    fallbackText: "400 x 400",
    fallbackAriaLabel: "Placeholder image for missing Pokemon artwork",
  },
  meta: {
    title: TITLE,
    description: GRID_SUBTITLE,
  },
  error: {
    title: "Something went wrong",
    description: "We couldn't load the Pokemon data. Please try again later.",
    retryButton: "Try again",
  },
} as const;
