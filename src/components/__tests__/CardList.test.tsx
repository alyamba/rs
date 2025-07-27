import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { CardList } from '../CardList';
import { MemoryRouter } from 'react-router';

describe('CardList', () => {
  const mockProps = {
    items: [
      {
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
    ],
  };

  it('Renders cards', () => {
    const component = render(
      <MemoryRouter>
        <CardList {...mockProps} />
      </MemoryRouter>
    );

    const container = component.getByTestId(
      'cards-container'
    ) as HTMLDivElement;
    expect(container).toBeInTheDocument();

    expect(component.getAllByTestId('card-name')).toHaveLength(
      mockProps.items.length
    );
  });

  it('Renders card image and name', () => {
    const component = render(
      <MemoryRouter>
        <CardList {...mockProps} />
      </MemoryRouter>
    );

    const container = component.getByTestId(
      'cards-container'
    ) as HTMLDivElement;
    expect(container).toBeInTheDocument();

    expect(component.getByTestId('card-image')).toBeTruthy();
    expect(component.getByTestId('card-name')).toHaveTextContent('BULBASAUR');
  });
});
