import React, { useEffect, useState } from 'react';
import { fetchPokemons } from '../api/fetchPokemons';
import { type PokemonDetails } from '../types/pokemon';
import { fetchPokemonDetails } from '../api/fetchPokemonDetails';
import { Card } from './Card';
import { SelectionFooter } from './SelectionFooter';
import { SkeletonCard } from './SkeletonCard';
import { Pagination } from './Pagination';
import { useAppSelector } from '../hooks/storeHooks';

type Props = {
  search: string;
  page: number;
  onPageChange: (newPage: number) => void;
  onCardClick: (id: string) => void;
  setIsFading: (value: boolean) => void;
  isFading: boolean;
};

export const CardList: React.FC<Props> = ({
  search,
  page,
  onPageChange,
  onCardClick,
  setIsFading,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [localFading, setLocalFading] = useState(false);
  const selected = useAppSelector((state) => state.selectedPokemons.selected);
  console.log(selected);

  useEffect(() => {
    let isMounted = true;

    const loadPokemons = async () => {
      setLocalFading(true);
      setTimeout(async () => {
        setLoading(true);
        setError('');

        try {
          const data = await fetchPokemons(search, page);
          const detailsArray = await Promise.all(
            data.results.map((p) => fetchPokemonDetails(p.name))
          );

          if (isMounted) {
            setPokemons(page === 1 ? detailsArray : [...detailsArray]);
            setTotalCount(data.total_records);
          }
        } catch (e) {
          if (isMounted) {
            setError(e instanceof Error ? e.message : 'Unknown error');
          }
        } finally {
          if (isMounted) {
            setLoading(false);
            setLocalFading(false);
            setIsFading(false);
          }
        }
      }, 200);
    };

    loadPokemons();

    return () => {
      isMounted = false;
    };
  }, [page, search, setIsFading]);

  const totalPages = Math.ceil(totalCount / 12);

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="pb-24">
      <div className="min-h-[600px] p-4 flex flex-wrap gap-2 justify-center items-center relative">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4
  transition-opacity duration-500
            ${localFading ? 'opacity-0' : 'opacity-100'}`}
          >
            {pokemons.map((pokemon) => (
              <Card
                key={pokemon.id}
                pokemon={pokemon}
                onClick={() => onCardClick(pokemon.id.toString())}
              />
            ))}
          </div>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
      <SelectionFooter />
    </div>
  );
};
