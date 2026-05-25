import {
  useSearchParams,
  Outlet,
  useNavigate,
  useParams,
  useMatch,
} from 'react-router-dom';
import { useState } from 'react';
import { CardList } from '../components/CardList';
import { Search } from '../components/Search';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const { page = '1' } = useParams();
  const match = useMatch('/:page/:detailsId');
  const id = match?.params.detailsId;
  const numericPage = parseInt(page, 10);
  const navigate = useNavigate();
  const [isFading, setIsFading] = useState(false);

  const buildUrlWithQuery = (path: string, q: string | null) => {
    if (q && q.trim() !== '') {
      return `${path}?q=${encodeURIComponent(q)}`;
    }
    return path;
  };

  const handleSearch = (newQuery: string) => {
    const trimmed = newQuery.trim();

    if (trimmed) {
      setSearchParams({ q: trimmed });
    } else {
      setSearchParams({});
    }

    setQuery(trimmed);
    navigate(buildUrlWithQuery('/1', trimmed));
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
        className={`p-4 border-b sm:border-b-0 sm:border-r ${id ? 'sm:w-1/2 w-full' : 'w-full'}`}
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
      {id && (
        <div className="w-full sm:w-1/2 p-4">
          <Outlet />
        </div>
      )}
    </div>
  );
};
