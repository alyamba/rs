import { describe, it } from 'vitest';
import { CardList } from '../CardList';
import { mockPokemonData, renderWithStore } from '../../utils';

const mockPokemons = { pokemons: [mockPokemonData] };

describe('CardList', () => {
  it('Renders cards', () => {
    const component = renderWithStore(<CardList {...mockPokemons} />);

    const container = component.getByTestId(
      'cards-container'
    ) as HTMLDivElement;
    expect(container).toBeInTheDocument();

    expect(component.getAllByTestId('card-name')).toHaveLength(
      mockPokemons.pokemons.length
    );
  });

  it('Renders card image and name', () => {
    const component = renderWithStore(<CardList {...mockPokemons} />);

    const container = component.getByTestId(
      'cards-container'
    ) as HTMLDivElement;
    expect(container).toBeInTheDocument();

    expect(component.getByTestId('card-image')).toBeTruthy();
    expect(component.getByTestId('card-name')).toHaveTextContent('BULBASAUR');
  });
});
