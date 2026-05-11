import { render, screen } from '@testing-library/react';
import { Card } from '../components/Card';

describe('Card component', () => {
  const mockPokemon = {
    name: 'pikachu',
    description: 'electric mouse pokemon',
    sprites: {
      front_default: 'https://example.com/pikachu.png',
    },
  } as any;

  it('renders pokemon name', () => {
    render(<Card pokemon={mockPokemon} />);

    expect(screen.getByText('pikachu')).toBeInTheDocument();
  });

  it('renders pokemon description', () => {
    render(<Card pokemon={mockPokemon} />);

    expect(
      screen.getByText('electric mouse pokemon')
    ).toBeInTheDocument();
  });

  it('renders image when sprite exists', () => {
    render(<Card pokemon={mockPokemon} />);

    const img = screen.getByRole('img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      'src',
      'https://example.com/pikachu.png'
    );
    expect(img).toHaveAttribute('alt', 'pikachu');
  });

  it('does not render image when sprite is empty', () => {
    const noImagePokemon = {
      ...mockPokemon,
      sprites: {
        front_default: '',
      },
    };

    render(<Card pokemon={noImagePokemon} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});