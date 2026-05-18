import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '../components/Card';
import '@testing-library/jest-dom';
import { type PokemonDetails } from '../types/pokemon';

const mockPokemon: PokemonDetails = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  sprites: {
    front_default: 'https://example.com/pikachu.png',
  },
  types: [
    {
      slot: 1,
      type: {
        name: 'electric',
        url: 'https://pokeapi.co/api/v2/type/13/',
      },
    },
  ],
};

describe('Card Component', () => {
  it('renders the pokemon name', () => {
    render(<Card pokemon={mockPokemon} onClick={() => {}} />);
    expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
  });

  it('renders the pokemon image with correct src and alt', () => {
    render(<Card pokemon={mockPokemon} onClick={() => {}} />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(mockPokemon.sprites.front_default);
    expect(img.alt).toBe(mockPokemon.name);
  });

  it('calls onClick when the card is clicked', () => {
    const handleClick = jest.fn();
    render(<Card pokemon={mockPokemon} onClick={handleClick} />);
    const card = screen.getByRole('img').closest('div');
    if (card) fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not render image if src is missing', () => {
    const brokenPokemon = {
      ...mockPokemon,
      sprites: { front_default: '' },
    };
    render(<Card pokemon={brokenPokemon} onClick={() => {}} />);
    const img = screen.queryByRole('img');
    expect(img).not.toBeInTheDocument();
  });
});
