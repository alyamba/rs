import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from '../Card';
import { MemoryRouter } from 'react-router';

describe('Card', () => {
  const mockProps = {
    item: {
      name: 'bulbasaur',
      data: {
        height: 7,
        weight: 69,
        imgUrl:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        isDefault: true,
        types: ['grass', 'poison'],
      },
      id: 1,
    },
    selectedPokemons: [],
    setSelectedPokemons: () => {},
  };

  it('Renders card image and name', () => {
    const component = render(
      <MemoryRouter>
        <Card {...mockProps} />
      </MemoryRouter>
    );

    expect(component.getByTestId('card-image')).toBeTruthy();

    const name = component.getByTestId('card-name') as HTMLParagraphElement;
    expect(name).toBeTruthy();
    expect(name.textContent).toBe('BULBASAUR');
  });

  it('Check the image loading and correct render of loading', () => {
    const component = render(
      <MemoryRouter>
        <Card {...mockProps} />
      </MemoryRouter>
    );

    const image = component.getByTestId('card-image') as HTMLImageElement;

    fireEvent.load(image);

    expect(image).toHaveClass('opacity-100');

    const loading = component.queryByTestId('loading');
    expect(loading).not.toBeInTheDocument();
  });
});
