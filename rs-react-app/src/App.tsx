import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPages';
import { NotFoundPage } from './pages/NotFoundPage';
import { DetailsPage } from './pages/DetailsPage';
import { Header } from './components/Header';

export const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Navigate to="/1" />} />
      <Route path="/:pageNumber" element={<HomePage />}>
        <Route path=":pokemonId" element={<DetailsPage />} />
      </Route>
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
);
