import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPokemonDetails } from '../api/fetchPokemonDetails';
import { type PokemonDetails } from '../types/pokemon';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { SkeletonDetails } from '../components/SkeletonDetails';

type DetailsParams = {
  page?: string;
  detailsId: string;
};

export const DetailsPage = () => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { page = '1', detailsId } = useParams<DetailsParams>();
  const [searchParams] = useSearchParams();

  const handleClose = () => {
    const q = searchParams.get('q') || '';
    navigate(`/${page}${q ? `?q=${q}` : ''}`);
  };

  useEffect(() => {
    if (!detailsId) return;

    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError('');
        const start = Date.now();
        const data = await fetchPokemonDetails(detailsId);
        setPokemon(data);

        const elapsed = Date.now() - start;
        const delay = Math.max(2000 - elapsed, 0);

        setTimeout(() => setLoading(false), delay);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'unknown error';
        setError(errorMessage);
        const elapsed = Date.now() - start;
        const delay = Math.max(2000 - elapsed, 0);
        setTimeout(() => setLoading(false), delay);
      }
    };
    const start = Date.now();
    loadPokemon();
  }, [detailsId]);

  if (loading) return <SkeletonDetails />;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
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
      <button
        className="ml-auto px-4 py-1 bg-blue-500 text-white p-2 "
        onClick={handleClose}
      >
        Close
      </button>
    </div>
  );
};
