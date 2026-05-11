import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import { ErrorBoundary } from '../components/ErrorBoundary';

import { fetchPokemons } from '../api/fetchPokemons';
import { fetchPokemonDetails } from '../api/fetchPokemonDetails';
import { fetchPokemonSpecies } from '../api/fetchPokemonSpecies';

vi.mock('../api/fetchPokemons');
vi.mock('../api/fetchPokemonDetails');
vi.mock('../api/fetchPokemonSpecies');

describe('App', () => {
  beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();

  vi.mocked(fetchPokemons).mockResolvedValue({
    results: [
      {
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25/',
      },
    ],
  });

  vi.mocked(fetchPokemonDetails).mockResolvedValue({
    id: 25,
    name: 'pikachu',
    height: 4,
    weight: 60,
    sprites: {
      front_default: '',
    },
    types: [],
  });

  vi.mocked(fetchPokemonSpecies).mockResolvedValue({
    flavor_text_entries: [
      {
        flavor_text: 'electric mouse',
        language: {
          name: 'en',
        },
      },
    ],
  });
});

  it('loads query from localStorage on mount', async () => {
    localStorage.setItem('searchQuery', 'pikachu');

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Enter your query')
      ).toHaveValue('pikachu');
    });
  });

  it('updates search results when user searches', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByPlaceholderText('Enter your query');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'pika');
    await user.click(button);

    expect(await screen.findByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('electric mouse')).toBeInTheDocument();
  });

 it('triggers error boundary when error is thrown', async () => {
  const user = userEvent.setup();

  render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );

  const button = await screen.findByRole('button', {
    name: /error button/i,
  });

  await user.click(button);

  expect(await screen.findByText(/test error/i)).toBeInTheDocument();
});
});