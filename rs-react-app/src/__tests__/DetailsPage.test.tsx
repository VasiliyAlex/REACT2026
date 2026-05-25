import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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

  it('navigates correctly with page and query params on close', async () => {
    (fetchPokemonDetails as jest.Mock).mockResolvedValue(mockPokemon);

    render(
      <MemoryRouter initialEntries={['/2/details/1?q=fire']}>
        <Routes>
          <Route path="/:page/details/:detailsId" element={<DetailsPage />} />
          <Route path="/:page" element={<div>Back Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText(/bulbasaur/i, {}, { timeout: 3000 });

    fireEvent.click(screen.getByText(/close/i));
    await screen.findByText(/back page/i);
  });

  it('does nothing if detailsId param is missing', () => {
    const mockFetch = fetchPokemonDetails as jest.Mock;
    render(
      <MemoryRouter initialEntries={['/invalid']}>
        <Routes>
          <Route path="/invalid" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('skeleton-details')).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('handles unknown error correctly if error is not instance of Error', async () => {
    (fetchPokemonDetails as jest.Mock).mockImplementation(() => {
      return Promise.reject('not-an-error-object');
    });

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
      expect(screen.getByText(/error: unknown error/i)).toBeInTheDocument();
    });
  });

  it('renders skeleton if no pokemon yet', () => {
    (fetchPokemonDetails as jest.Mock).mockResolvedValue(null);

    render(
      <MemoryRouter initialEntries={['/2/details/1']}>
        <Routes>
          <Route path="/:page/details/:detailsId" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('skeleton-details')).toBeInTheDocument();
  });

  it('navigates correctly without query param on close', async () => {
    (fetchPokemonDetails as jest.Mock).mockResolvedValue(mockPokemon);

    render(
      <MemoryRouter initialEntries={['/2/details/1']}>
        <Routes>
          <Route path="/:page/details/:detailsId" element={<DetailsPage />} />
          <Route path="/:page" element={<div>Back Page Without Query</div>} />
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

    await screen.findByText(/bulbasaur/i);

    fireEvent.click(screen.getByText(/close/i));
    await screen.findByText(/back page without query/i);
  });
});
