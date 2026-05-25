import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full flex flex-wrap items-center justify-center gap-4 p-4 bg-gray-200 dark:bg-gray-400 text-center sm:justify-start">
      <Link className="bg-blue-500 text-white p-2" to="/">
        Home
      </Link>
      <Link className="bg-blue-500 text-white p-2" to="/about">
        About
      </Link>
      <button
        onClick={toggleTheme}
        className="ml-auto px-4 py-1 bg-blue-500 text-white p-2 "
      >
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </button>
    </nav>
  );
};
