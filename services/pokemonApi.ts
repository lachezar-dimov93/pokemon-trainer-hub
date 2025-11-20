import { Pokemon } from "@/types";

// 1. CONFIGURATION: Centralized constants
// If this grows, move to src/lib/config.ts. For now, keeping it here is YAGNI.
const API_CONFIG = {
  BASE_URL: "https://pokeapi.co/api/v2",
  IMAGE_BASE_URL:
    process.env.POKEMON_IMAGE_BASE_URL ||
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork",
  LIMIT: 8,
  OFFSET: 0,
} as const;

// DTOs (Data Transfer Objects)
// This describes the shape of the data coming FROM the API.
interface PokeApiResult {
  name: string;
  url: string;
}

interface PokeApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiResult[];
}

/**
 * Fetches the initial list of Pokemon and transforms them into our domain model.
 */
export async function getPokemons(): Promise<Pokemon[]> {
  try {
    // Construct URL using config
    const url = `${API_CONFIG.BASE_URL}/pokemon?limit=${API_CONFIG.LIMIT}&offset=${API_CONFIG.OFFSET}`;

    const res = await fetch(url, {
      cache: "force-cache", // SSG Behavior
    });

    if (!res.ok) {
      throw new Error(
        `Pokemon API fetch failed: ${res.status} ${res.statusText}`
      );
    }

    const data: PokeApiResponse = await res.json();

    // Transformation Logic (Adapter)
    return data.results.map((result) => {
      // Extract ID from the URL (e.g., ".../pokemon/1/")
      const parts = result.url.split("/").filter(Boolean);
      const id = parseInt(parts[parts.length - 1], 10);

      return {
        id,
        name: result.name,
        imageUrl: `${API_CONFIG.IMAGE_BASE_URL}/${id}.png`,
      };
    });
  } catch (error) {
    // In a real app, you might send this to Sentry or a logging service
    console.error("Error fetching pokemons:", error);
    return []; // Return empty array so the UI doesn't crash
  }
}
