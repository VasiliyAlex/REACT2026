import { render, screen, waitFor } from '@testing-library/react';
import { CardList } from '../components/CardList';
import * as api from '../api/fetchPokemons';
import { type PokemonDetails } from '../types/pokemon';
import { Provider } from 'react-redux';
import { store } from '../store';

jest.mock('../components/Card', () => ({
  Card: ({ pokemon }: { pokemon: PokemonDetails }) => (
    <div data-testid="card">{pokemon.name}</div>
  ),
}));

jest.mock('../components/SkeletonCard', () => ({
  SkeletonCard: () => <div data-testid="skeleton" />,
}));

jest.mock('../api/fetchPokemons');
jest.mock('../api/fetchPokemonDetails');

const mockedFetchPokemons = api.fetchPokemons as jest.Mock;

describe('CardList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const baseProps = {
    search: '',
    page: 1,
    onPageChange: jest.fn(),
    onCardClick: jest.fn(),
    setIsFading: jest.fn(),
    isFading: false,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading skeletons while fetching', async () => {
    (api.fetchPokemons as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    render(
      <Provider store={store}>
        <CardList
          search=""
          page={1}
          onPageChange={() => {}}
          onCardClick={() => {}}
          setIsFading={() => {}}
          isFading={false}
        />
      </Provider>
    );

    const skeletons = await screen.findAllByTestId('skeleton');
    expect(skeletons.length).toBe(12);
  });

  it('shows error message if fetch fails', async () => {
    mockedFetchPokemons.mockRejectedValueOnce(new Error('API Error'));

    render(
      <Provider store={store}>
        <CardList {...baseProps} />
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText(/Error: API Error/)).toBeInTheDocument()
    );
  });
});
