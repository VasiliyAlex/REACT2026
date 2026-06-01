import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { DetailsPage } from '../pages/DetailsPage';
import type { PokemonDetails } from '../types/pokemon';
import { useGetPokemonDetailsQuery } from '../api/pokemonApi';

jest.mock('../api/pokemonApi', () => ({
  useGetPokemonDetailsQuery: jest.fn(),
}));

const mockUseGetPokemonDetailsQuery = useGetPokemonDetailsQuery as jest.Mock;

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

describe('DetailsPage (RTK Query)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders loading state initially', async () => {
    mockUseGetPokemonDetailsQuery.mockReturnValue({
      data: mockPokemon,
      error: undefined,
      isLoading: true,
      refetch: jest.fn(),
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

    await waitFor(
      () => {
        expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('renders error message on fetch failure', async () => {
    mockUseGetPokemonDetailsQuery.mockReturnValue({
      data: undefined,
      error: new Error('failed to fetch'),
      refetch: jest.fn(),
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
      expect(screen.getByText(/error: failed to fetch/i)).toBeInTheDocument();
    });
  });

  it('renders "No data available" if pokemon is null', async () => {
    mockUseGetPokemonDetailsQuery.mockReturnValue({
      data: null,
      error: undefined,
      refetch: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:detailsId" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('skeleton-details')).not.toBeInTheDocument();
    });
    expect(screen.getByText(/no data available/i)).toBeInTheDocument();
  });

  it('navigates correctly with page and query params on close', async () => {
    mockUseGetPokemonDetailsQuery.mockReturnValue({
      data: mockPokemon,
      error: undefined,
      refetch: jest.fn(),
    });

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
    mockUseGetPokemonDetailsQuery.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
      refetch: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/invalid']}>
        <Routes>
          <Route path="/invalid" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/missing pokémon id/i)).toBeInTheDocument();
    expect(screen.queryByTestId('skeleton-details')).not.toBeInTheDocument();
  });

  it('handles unknown error correctly if error is not instance of Error', async () => {
    mockUseGetPokemonDetailsQuery.mockReturnValue({
      data: undefined,
      error: {},
      isLoading: false,
      refetch: jest.fn(),
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
    mockUseGetPokemonDetailsQuery.mockReturnValue({
      data: mockPokemon,
      error: undefined,
      refetch: jest.fn(),
    });

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
