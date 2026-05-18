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

describe('DetailsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    (fetchPokemonDetails as jest.Mock).mockResolvedValue(mockPokemon);

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:detailsId" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(
          screen.queryByTestId('skeleton-details')
        ).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    await waitFor(
      () => {
        expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('renders error message on fetch failure', async () => {
    (fetchPokemonDetails as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch')
    );

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:detailsId" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(
          screen.queryByTestId('skeleton-details')
        ).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    await waitFor(() => {
      expect(screen.getByText(/error: failed to fetch/i)).toBeInTheDocument();
    });
  });

  it('renders "No data available" if pokemon is null', async () => {
    (fetchPokemonDetails as jest.Mock).mockResolvedValue(null);

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:detailsId" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(screen.getByText(/no data available/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
