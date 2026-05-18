import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { DetailsPage } from '../pages/DetailsPage';
import { fetchPokemonDetails } from '../api/fetchPokemonDetails';
import type { PokemonDetails } from '../types/pokemon';

jest.mock('../api/fetchPokemonDetails');

const mockPokemon: PokemonDetails = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  sprites: {
    front_default: 'https://example.com/bulbasaur.png',
  },
  types: [{ slot: 1, type: { name: 'grass', url: '' } }],
};

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={['/details/1']}>
      <Routes>
        <Route path="/details/:detailsId" element={<DetailsPage />} />
      </Routes>
    </MemoryRouter>
  );

describe('DetailsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading initially', () => {
    (fetchPokemonDetails as jest.Mock).mockReturnValue(new Promise(() => {}));

    renderPage();

    expect(screen.getByTestId('skeleton-details')).toBeInTheDocument();
  });

  it('renders pokemon successfully', async () => {
    (fetchPokemonDetails as jest.Mock).mockResolvedValue(mockPokemon);

    renderPage();

    // 1. сначала есть skeleton
    expect(screen.getByTestId('skeleton-details')).toBeInTheDocument();

    // 2. ждём исчезновения skeleton (это ключ!)
    await waitFor(() => {
      expect(screen.queryByTestId('skeleton-details')).not.toBeInTheDocument();
    });

    // 3. теперь проверяем контент
    expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
  });

  it('renders error message on fetch failure', async () => {
    (fetchPokemonDetails as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch')
    );

    renderPage();

    await waitFor(() => {
      expect(screen.queryByTestId('skeleton-details')).not.toBeInTheDocument();
    });

    expect(await screen.findByText(/error/i)).toBeInTheDocument();
  });

  it('renders "No data available" if pokemon is null', async () => {
    (fetchPokemonDetails as jest.Mock).mockResolvedValue(null);

    renderPage();

    await waitFor(() => {
      expect(screen.queryByTestId('skeleton-details')).not.toBeInTheDocument();
    });

    expect(await screen.findByText(/no data available/i)).toBeInTheDocument();
  });
});
