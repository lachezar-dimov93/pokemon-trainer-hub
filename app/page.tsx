import { Metadata } from "next";
import { getPokemons } from "@/services/pokemonApi";
import HeroSection from "@/components/HeroSection";
import PokemonGrid from "@/components/PokemonGrid";
import { CONTENT } from "@/constants/content";

// 1. Metadata Strategy
// We pull SEO tags from our centralized Content Dictionary (DRY)
export const metadata: Metadata = {
  title: CONTENT.meta.title,
  description: CONTENT.meta.description,
};

export default async function Home() {
  // Data Fetching (Server-Side)
  // Runs on the server at build time (SSG)
  const pokemons = await getPokemons();

  return (
    <main className="min-h-screen flex flex-col">
      <HeroSection />
      <PokemonGrid pokemons={pokemons} />
    </main>
  );
}
