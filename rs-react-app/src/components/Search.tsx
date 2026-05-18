import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Props {
  onSearch: (query: string) => void;
}

export const Search: React.FC<Props> = ({ onSearch }) => {
  const [search, setSearch] = useLocalStorage('searchQuery', '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClick = () => {
    const trimmed = search.trim();
    setSearch(trimmed);
    onSearch(trimmed);
  };

  return (
    <div className="flex gap-2 p-4 bg-gray-100">
      <input
        value={search}
        placeholder="Enter your query"
        onChange={handleChange}
        className="border p-2 text-gray-800 w-full"
      />
      <button
        type="button"
        onClick={handleClick}
        className="bg-blue-500 text-white p-2"
      >
        Search
      </button>
    </div>
  );
};
