import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { SkeletonDetails } from '../components/SkeletonDetails';
import { useGetPokemonDetailsQuery } from '../api/pokemonApi';
import { RefreshButton } from '../components/RefreshButton';

type DetailsParams = {
  page?: string;
  detailsId: string;
};

export const DetailsPage = () => {
  const navigate = useNavigate();
  const { page = '1', detailsId } = useParams<DetailsParams>();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  const {
    data: pokemon,
    error,
    refetch,
  } = useGetPokemonDetailsQuery(detailsId ?? '', {
    skip: !detailsId,
  });

  const handleClose = () => {
    const q = searchParams.get('q') || '';
    navigate(`/${page}${q ? `?q=${q}` : ''}`);
  };

  useEffect(() => {
    if (pokemon) {
      setLoading(true);
      const timeout = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timeout);
    } else {
      setLoading(false);
    }
  }, [pokemon, error]);

  if (!detailsId) {
    return <div className="p-4 text-red-500">Missing Pokémon ID</div>;
  }

  if (loading) return <SkeletonDetails />;
  if (error) {
    const errorMessage =
      error instanceof Error
        ? `Error: ${error.message}`
        : 'Error: unknown error';

    return <div className="p-4 text-red-500">{errorMessage}</div>;
  }

  if (!pokemon) return <div className="p-4">No data available</div>;

  return (
    <div className="w-full max-w-[300px] mx-auto bg-gray-100 dark:bg-gray-400 rounded-xl shadow-md space-y-4 px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white capitalize">
        {pokemon.name}
      </h2>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-32 h-32 mx-auto"
      />
      <ul className="text-gray-700 dark:text-white text-sm space-y-1 text-center">
        <li>
          <strong>Types:</strong>{' '}
          {pokemon.types.map((t) => t.type.name).join(', ')}
        </li>
        <li>
          <strong>Height:</strong> {pokemon.height}
        </li>
        <li>
          <strong>Weight:</strong> {pokemon.weight}
        </li>
      </ul>
      <div className="flex justify-end p-4 gap-2">
        <button
          className="ml-auto px-4 py-1 bg-blue-500 text-white p-2 "
          onClick={handleClose}
        >
          Close
        </button>
        <RefreshButton onRefresh={() => refetch()} />
      </div>
    </div>
  );
};
