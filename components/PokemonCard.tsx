"use client";

import Image from "next/image";
import { useState } from "react";
import { Pokemon } from "@/types";
import { formatPokemonId } from "@/utils/formatting";
import { CONTENT } from "@/constants/content";

export default function PokemonCard({
  pokemon,
  isPriority,
}: {
  pokemon: Pokemon;
  isPriority: boolean;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full aspect-3/2 sm:aspect-4/3 lg:aspect-square bg-brand-card rounded-lg overflow-hidden mb-4 flex items-center justify-center">
        {!hasError ? (
          // Happy Path: Try to load the image
          <Image
            src={pokemon.imageUrl}
            alt={pokemon.name}
            fill
            className="object-contain p-4 hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={isPriority}
            onError={() => setHasError(true)}
          />
        ) : (
          // Error Path: Show the Figma design fallback
          <span
            className="text-gray-400 text-xl font-medium"
            role="img"
            aria-label={CONTENT.grid.fallbackAriaLabel}
          >
            {CONTENT.grid.fallbackText}
          </span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3">
        <span className="font-inter font-medium text-body-lg capitalize">
          {pokemon.name}
        </span>

        {/* ID: 22px max, 150%, 600 */}
        <span className="font-inter font-semibold text-body-lg">
          {formatPokemonId(pokemon.id)}
        </span>
      </div>
    </div>
  );
}
