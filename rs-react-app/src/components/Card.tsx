import React from 'react';
import { type PokemonDetails } from '../types/pokemon';

interface Props {
  pokemon: PokemonDetails;
  onClick: () => void;
}

export const Card: React.FC<Props> = ({ pokemon, onClick }) => {
  const imgSrc = pokemon.sprites.front_default;
  return (
    <div
      onClick={onClick}
      className="w-40 p-2 bg-white rounded shadow hover:scale-105 transition cursor-pointer"
    >
      {imgSrc && imgSrc.trim() !== '' && (
        <img
          src={imgSrc}
          alt={pokemon.name}
          className="w-full h-32 object-contain"
        />
      )}
      <div className="text-center mt-2 font-semibold capitalize text-gray-500">
        {pokemon.name}
      </div>
    </div>
  );
};
