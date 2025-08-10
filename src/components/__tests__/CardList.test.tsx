import { describe, it } from 'vitest';
import { CardList } from '../CardList';
import { mockPokemonData, renderWithStore } from '../../utils';
import { useGetPokemonDetailsQuery } from '../../store';

const mockPokemons = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
];

vi.mock('../../store/api/pokemonsApi', async () => {
  const originalModule = await vi.importActual('../../store/api/pokemonsApi');
  return {
    ...originalModule,
    useGetPokemonDetailsQuery: vi.fn(),
  };
});

describe('CardList', () => {
  beforeEach(() => {
    vi.mocked(useGetPokemonDetailsQuery).mockImplementation(() => ({
      data: mockPokemonData,
      isLoading: false,
      error: undefined,
      refetch: vi.fn(),
    }));
  });

  it('Renders cards', () => {
    const component = renderWithStore(<CardList pokemons={mockPokemons} />);

    const container = component.getByTestId(
      'cards-container'
    ) as HTMLDivElement;
    expect(container).toBeInTheDocument();

    expect(component.getAllByTestId('card-name')).toHaveLength(
      mockPokemons.length
    );
  });

  it('Renders card image and name', () => {
    const component = renderWithStore(<CardList pokemons={mockPokemons} />);

    const container = component.getByTestId(
      'cards-container'
    ) as HTMLDivElement;
    expect(container).toBeInTheDocument();

    expect(component.getByTestId('card-image')).toBeTruthy();
    expect(component.getByTestId('card-name')).toHaveTextContent('BULBASAUR');
  });
});
