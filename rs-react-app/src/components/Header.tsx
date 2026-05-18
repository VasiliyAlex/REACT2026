import { Link } from 'react-router-dom';

export const Header = () => (
  <nav className="w-full flex flex-wrap items-center justify-center gap-4 p-4 bg-gray-200 text-center sm:justify-start">
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
  </nav>
);
