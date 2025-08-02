import { fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockPokemonData, renderWithStore } from '../../utils';
import { Card } from '../Card';

describe('Card', () => {
  it('Renders card image and name', () => {
    const component = renderWithStore(<Card pokemonData={mockPokemonData} />);

    expect(component.getByTestId('card-image')).toBeTruthy();

    const name = component.getByTestId('card-name') as HTMLParagraphElement;
    expect(name).toBeTruthy();
    expect(name.textContent).toBe('BULBASAUR');
  });

  it('Check the image loading and correct render of loading', () => {
    const component = renderWithStore(<Card pokemonData={mockPokemonData} />);

    const image = component.getByTestId('card-image') as HTMLImageElement;

    fireEvent.load(image);

    expect(image).toHaveClass('opacity-100');

    const loading = component.queryByTestId('loading');
    expect(loading).not.toBeInTheDocument();
  });
});
