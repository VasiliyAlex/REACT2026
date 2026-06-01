import React, { useState, useEffect } from 'react';
import { useGetPokemonsQuery } from '../api/pokemonApi';
import { CardLoader } from './CardLoader';
import { SelectionFooter } from './SelectionFooter';
import { SkeletonCard } from './SkeletonCard';
import { Pagination } from './Pagination';
import { RefreshButton } from './RefreshButton';

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
  const { data, isLoading, error, refetch } = useGetPokemonsQuery({
    query: search,
    page,
  });
  const [localFading, setLocalFading] = useState(false);
  const totalPages = data ? data.total_pages : 1;

  useEffect(() => {
    setLocalFading(true);
    const timeout = setTimeout(() => {
      setLocalFading(false);
      setIsFading(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, [page, search, setIsFading]);

  if (error)
    return (
      <div className="p-4 text-red-500">Error: {JSON.stringify(error)}</div>
    );

  return (
    <div className="pb-24">
      <div className="flex justify-end p-4">
        <RefreshButton onRefresh={() => refetch()} />
      </div>
      <div className="min-h-[600px] p-4 flex flex-wrap gap-2 justify-center items-center relative">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))}
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
  transition-opacity duration-500
            ${localFading ? 'opacity-0' : 'opacity-100'}`}
          >
            {data?.results.map((pokemon) => (
              <CardLoader
                key={pokemon.name}
                name={pokemon.name}
                onClick={onCardClick}
              />
            ))}
          </div>
        )}
      </div>

      {!isLoading && totalPages > 1 && (
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
