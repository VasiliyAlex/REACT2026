import React from 'react';
import { useGetPokemonDetailsQuery } from '../api/pokemonApi';
import { SkeletonCard } from './SkeletonCard';
import { Card } from './Card';

type Props = {
  name: string;
  onClick: (id: string) => void;
};

export const CardLoader: React.FC<Props> = ({ name, onClick }) => {
  const { data, isLoading } = useGetPokemonDetailsQuery(name);

  if (isLoading || !data) {
    return <SkeletonCard />;
  }

  return <Card pokemon={data} onClick={() => onClick(data.id.toString())} />;
};
