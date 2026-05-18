import {
  useSearchParams,
  Outlet,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CardList } from '../components/CardList';
import { Search } from '../components/Search';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryFromUrl = searchParams.get('q') || '';

  const [query, setQuery] = useState(queryFromUrl);

  const { pageNumber = '1', pokemonId } = useParams();

  const numericPage = Number(pageNumber);

  const navigate = useNavigate();

  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    setQuery(queryFromUrl);
  }, [queryFromUrl]);

  const buildUrlWithQuery = (path: string, q: string | null) => {
    if (q && q.trim() !== '') {
      return `${path}?q=${encodeURIComponent(q)}`;
    }

    return path;
  };

  const handleSearch = (newQuery: string) => {
    const trimmed = newQuery.trim();

    setQuery(trimmed);

    if (trimmed) {
      setSearchParams({ q: trimmed });
      navigate(`/1?q=${encodeURIComponent(trimmed)}`);
    } else {
      setSearchParams({});
      navigate('/1');
    }
  };

  const handlePageChange = (newPage: number) => {
    const q = searchParams.get('q');

    navigate(buildUrlWithQuery(`/${newPage}`, q));
  };

  const handleCardClick = (id: string) => {
    const q = searchParams.get('q');

    navigate(buildUrlWithQuery(`/${numericPage}/${id}`, q));
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <div
        className={`p-4 border-b sm:border-b-0 sm:border-r ${
          pokemonId ? 'sm:w-1/2 w-full' : 'w-full'
        }`}
      >
        <Search onSearch={handleSearch} />

        <CardList
          setIsFading={setIsFading}
          isFading={isFading}
          search={query}
          page={numericPage}
          onPageChange={handlePageChange}
          onCardClick={handleCardClick}
        />
      </div>

      {pokemonId && (
        <div className="w-full sm:w-1/2 p-4">
          <Outlet />
        </div>
      )}
    </div>
  );
};
