import { Pokemon } from "@/types";
import PokemonCard from "./PokemonCard";
import { CONTENT } from "@/constants/content";

interface PokemonGridProps {
  pokemons: Pokemon[];
}

export default function PokemonGrid({ pokemons }: PokemonGridProps) {
  return (
    <section className="bg-brand-dark py-10 md:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-6 xl:px-20">
        <header className="mb-8 md:mb-10">
          <h2 className="font-inter font-medium text-white text-heading-2 text-center md:text-left">
            {CONTENT.grid.title}
          </h2>

          <p className="mt-3 font-inter font-normal text-white text-body-md text-center md:text-left">
            {CONTENT.grid.subtitle}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pokemons.map((poke, index) => (
            <PokemonCard
              key={poke.id}
              pokemon={poke}
              isPriority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
