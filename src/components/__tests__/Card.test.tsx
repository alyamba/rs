import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card } from '../Card';

describe('Card', () => {
  const mockProps = {
    name: 'bulbasaur',
    data: {
      height: 7,
      weight: 69,
      imgUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    },
    id: 1,
  };

  it('Renders card image and name', () => {
    const component = render(<Card {...mockProps} />);

    expect(component.getByTestId('card-image')).toBeTruthy();

    const name = component.getByTestId('card-name') as HTMLParagraphElement;
    expect(name).toBeTruthy();
    expect(name.textContent).toBe('BULBASAUR');
  });

  it('Renders height and weight on card', () => {
    const component = render(<Card {...mockProps} />);

    expect(component.getByText('HEIGHT:')).toBeTruthy();
    const height = component.getByTestId('card-height') as HTMLDivElement;
    expect(height).toBeTruthy();
    expect(height.textContent).toBe('0.7M');

    expect(component.getByText('WEIGHT:')).toBeTruthy();
    const weight = component.getByTestId('card-weight') as HTMLDivElement;
    expect(weight).toBeTruthy();
    expect(weight.textContent).toBe('6.9KG');
  });

  it('Check the image loading and correct render of loading', () => {
    const component = render(<Card {...mockProps} />);

    const image = component.getByTestId('card-image') as HTMLImageElement;

    fireEvent.load(image);

    expect(image).toHaveClass('opacity-100');

    const loading = component.queryByText(/loading/i);
    expect(loading).not.toBeInTheDocument();
  });
});
