import React from 'react';
import { fetchPokemons } from '../api/fetchPokemons';
import { fetchPokemonDetails } from '../api/fetchPokemonDetails';
import { fetchPokemonSpecies } from '../api/fetchPokemonSpecies';
import type { PokemonDetails } from '../types/pokemon';
import { Card } from './Card';
import { SkeletonCard } from './SkeletonCard';

interface State {
  pokemons: PokemonDetails[];
  loading: boolean;
  error: string;
}

interface Props {
  search: string;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}

export class CardList extends React.Component<Props, State> {
  state: State = {
    pokemons: [],
    loading: false,
    error: '',
  };
  private requestId = 0;


  componentDidUpdate(prevProps: Props) {
  if (prevProps.search !== this.props.search) {
    this.loadPokemons();
  }
}


componentDidMount() {
  this.loadPokemons();
}

  async loadPokemons() {
     const currentRequest = ++this.requestId;
    this.setState({ loading: true, error: '' });


    try {
      const data = await fetchPokemons();
        if (currentRequest !== this.requestId) return;
      const list = data.results;
      const filtered = list
        .filter((pokemon) =>
          pokemon.name.toLowerCase().includes(this.props.search.toLowerCase())
        )
        .slice(0, 12);

      const details = await Promise.all(
        filtered.map(async (pokemon) => {
          const [detail, species] = await Promise.all([
            fetchPokemonDetails(pokemon.name),
            fetchPokemonSpecies(pokemon.name),
          ]);

          const description = species.flavor_text_entries.find(
            (entry: FlavorTextEntry) => entry.language.name === 'en'
          )?.flavor_text;

          return {
            ...detail,
            description,
          };
        })
      );

      this.setState({
        pokemons: details,
        loading: false,
      });
    } catch (e) {
      this.setState({
        error: e instanceof Error ? e.message : 'Unknown error',
        loading: false,
      });
    }
  }

  render() {
    const { pokemons, loading, error } = this.state;

    if (loading) {
      return (
      <div className="p-4 flex flex-wrap gap-4 justify-center items-center border border-black">
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      );
    }
    if (error) return <div className="p-4">Error: {error}</div>;

    return (
      <div className="p-4 mt-20 flex flex-wrap gap-4 justify-center items-center border border-black">
         {pokemons.map((pokemon) => (
      <Card key={pokemon.id} pokemon={pokemon} />
    ))}
      </div>
    );
  }
}
