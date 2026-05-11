import { render, screen, waitFor } from '@testing-library/react';
import { CardList } from '../components/CardList';

import { fetchPokemons } from '../api/fetchPokemons';
import { fetchPokemonDetails } from '../api/fetchPokemonDetails';
import { fetchPokemonSpecies } from '../api/fetchPokemonSpecies';

vi.mock('../api/fetchPokemons');
vi.mock('../api/fetchPokemonDetails');
vi.mock('../api/fetchPokemonSpecies');

describe('CardList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

it('shows loading skeleton initially', () => {
  vi.mocked(fetchPokemons).mockReturnValue(
    new Promise(() => {}) // бесконечный pending → loading state
  );

  render(<CardList search="" />);

  const skeletons = screen.getAllByTestId('skeleton-card');

  expect(skeletons).toHaveLength(12);
});

  it('renders pokemons after successful fetch', async () => {
    vi.mocked(fetchPokemons).mockResolvedValue({
      results: [{ name: 'pikachu' }],
    } as any);

    vi.mocked(fetchPokemonDetails).mockResolvedValue({
      id: 25,
      name: 'pikachu',
      sprites: { front_default: '' },
    } as any);

    vi.mocked(fetchPokemonSpecies).mockResolvedValue({
      flavor_text_entries: [
        {
          flavor_text: 'electric mouse',
          language: { name: 'en' },
        },
      ],
    } as any);

    render(<CardList search="" />);

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });

    expect(screen.getByText('electric mouse')).toBeInTheDocument();
  });

  it('filters pokemons by search prop', async () => {
    vi.mocked(fetchPokemons).mockResolvedValue({
      results: [
        { name: 'pikachu' },
        { name: 'charmander' },
      ],
    } as any);

    vi.mocked(fetchPokemonDetails).mockResolvedValue({
      id: 1,
      name: 'pikachu',
      sprites: { front_default: '' },
    } as any);

    vi.mocked(fetchPokemonSpecies).mockResolvedValue({
      flavor_text_entries: [
        {
          flavor_text: 'desc',
          language: { name: 'en' },
        },
      ],
    } as any);

    render(<CardList search="pika" />);

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
    });

    expect(screen.queryByText('charmander')).not.toBeInTheDocument();
  });

  it('shows error message when API fails', async () => {
    vi.mocked(fetchPokemons).mockRejectedValue(
      new Error('API failed')
    );

    render(<CardList search="" />);

    await waitFor(() => {
      expect(
        screen.getByText(/error/i)
      ).toBeInTheDocument();
    });
  });
});