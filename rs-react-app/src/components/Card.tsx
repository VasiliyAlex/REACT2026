import React from 'react';
import { type PokemonDetails } from '../types/pokemon';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { toggleSelected } from '../store/selectedSlice';
import { SelectableCheckbox } from './SelectableCheckbox';

interface Props {
  pokemon: PokemonDetails;
  onClick: () => void;
}

export const Card = React.memo(({ pokemon, onClick }: Props) => {
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((state) =>
    state.selectedPokemons.selected.some((p) => p.id === pokemon.id)
  );

  const handleCheckboxChange = () => {
    dispatch(toggleSelected(pokemon));
  };

  const imgSrc = pokemon.sprites?.front_default;

  return (
    <div className="relative group w-40 p-2 bg-gray-100 dark:bg-gray-400 rounded shadow transition-transform hover:scale-105 cursor-pointer">
      <div onClick={onClick}>
        {imgSrc?.trim() ? (
          <img
            src={imgSrc}
            alt={pokemon.name}
            className="w-full h-32 object-contain"
          />
        ) : null}
        <div className="text-center mt-2 font-semibold capitalize text-gray-500 dark:text-white">
          {pokemon.name}
        </div>
      </div>

      <SelectableCheckbox
        checked={isSelected}
        onToggle={handleCheckboxChange}
      />
    </div>
  );
});

Card.displayName = 'Card';
