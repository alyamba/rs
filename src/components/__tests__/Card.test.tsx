import { fireEvent } from '@testing-library/react';
import { describe, expect, it, type Mock } from 'vitest';
import { mockPokemonData, renderWithStore } from '../../utils';
import { Card } from '../Card';
import * as api from '../../store/api/pokemonsApi';

vi.mock('../../store/api/pokemonsApi', async (importOriginal) => {
  const actual =
    (await importOriginal()) as typeof import('../../store/api/pokemonsApi');

  return {
    ...actual,
    useGetPokemonDetailsQuery: vi.fn(),
  };
});

describe('Card', () => {
  const mockedUseGetPokemonDetailsQuery = api.useGetPokemonDetailsQuery as Mock;

  beforeEach(() => {
    mockedUseGetPokemonDetailsQuery.mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      error: undefined,
      refetch: vi.fn(),
    });
  });

  it('Renders card image and name', () => {
    const component = renderWithStore(<Card pokemonName="bulbasaur" />);

    expect(component.getByTestId('card-image')).toBeTruthy();

    const name = component.getByTestId('card-name') as HTMLParagraphElement;
    expect(name).toBeTruthy();
    expect(name.textContent).toBe('BULBASAUR');
  });

  it('Check the image loading and correct render of loading', () => {
    const component = renderWithStore(<Card pokemonName="bulbasaur" />);

    const image = component.getByTestId('card-image') as HTMLImageElement;

    fireEvent.load(image);

    expect(image).toHaveClass('opacity-100');

    const loading = component.queryByTestId('loading');
    expect(loading).not.toBeInTheDocument();
  });
});
