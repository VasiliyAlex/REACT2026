import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPokemonDetails } from '../api/fetchPokemonDetails';
import { type PokemonDetails } from '../types/pokemon';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { SkeletonDetails } from '../components/SkeletonDetails';

export const DetailsPage = () => {
  const { detailsId, pageNumber } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = detailsId;

  const handleClose = () => {
    const q = searchParams.get('q') || '';
    const currentPage = pageNumber ?? '1';

    navigate(`/${currentPage}${q ? `?q=${q}` : ''}`);
  };

  useEffect(() => {
    if (!id) return;

    const loadPokemon = async () => {
      setLoading(true);
      setPokemon(null);
      setError('');

      try {
        const data = await fetchPokemonDetails(id);
        setPokemon(data); // даже null сюда можно
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [id]);

  if (loading) return <SkeletonDetails />;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!pokemon) return <div className="p-4">No data available</div>;

  return (
    <div>
      <div className="w-full max-w-[300px] mx-auto bg-white rounded-xl shadow-md space-y-4 px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-800 capitalize">
          {pokemon.name}
        </h2>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32 mx-auto"
        />
        <ul className="text-gray-700 text-sm space-y-1 text-center">
          <li>
            <strong>ID:</strong> {pokemon.id}
          </li>
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
      </div>
      <button onClick={handleClose}>Close</button>
    </div>
  );
};
