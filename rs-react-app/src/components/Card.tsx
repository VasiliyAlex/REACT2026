import React from 'react';
import { type PokemonDetails } from '../types/pokemon';

interface Props {
 pokemon: PokemonDetails;
}

export class Card extends React.Component<Props> {
  render(): React.ReactElement {
    const { pokemon } = this.props;
    const imgSrc = pokemon.sprites.front_default;
  return (
    <div
      className="w-40 h-70 p-2 bg-white border border-black rounded shadow hover:scale-105 transition cursor-pointer line-clamp-5"
    >
       <div className="text-center mt-2 font-semibold capitalize text-gray-500">
        {pokemon.name}
      </div>
      {imgSrc && imgSrc.trim() !== '' && (
        <img
          src={imgSrc}
          alt={pokemon.name}
          className="w-full h-32 object-contain"
        />
      )}
      <div className="mt-2 text-xs text-gray-500">
        {pokemon.description}
      </div>
    </div>
  );
  }
}