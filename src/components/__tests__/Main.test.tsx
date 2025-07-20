import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Main } from '../Main';

describe('Main', () => {
  const mockProps = [
    {
      name: 'bulbasaur',
      data: {
        height: 7,
        weight: 69,
        imgUrl:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      },
      id: 1,
    },
  ];

  it('Renders Main when loading is true', () => {
    const component = render(<Main loading={true} queryResults={[]} />);

    const loading = component.queryByTestId('loading');
    expect(loading).toBeInTheDocument();
  });

  it('Renders error message', () => {
    const component = render(
      <Main loading={false} error="Error" queryResults={[]} />
    );

    const error = component.getByText(/error: Error/i);
    expect(error).toBeInTheDocument();
  });

  it('Renders CardList with queryResults', () => {
    const component = render(<Main loading={false} queryResults={mockProps} />);

    const cardList = component.getByTestId('cards-container') as HTMLDivElement;
    expect(cardList).toBeInTheDocument();

    const cards = component.getAllByTestId(
      'card-name'
    ) as HTMLParagraphElement[];
    expect(cards).toHaveLength(mockProps.length);

    const cardName = component.getByText('BULBASAUR') as HTMLParagraphElement;
    expect(cardName).toBeInTheDocument();
  });
});
