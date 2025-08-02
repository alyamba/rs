import { fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockPokemonData, renderWithStore } from '../../utils';
import { Flyout } from '../Flyout';
import { removeAllPokemons } from '../../store';

globalThis.URL.createObjectURL = vi.fn(() => 'mocked-url');

const dispatchMock = vi.fn();

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => dispatchMock,
  };
});

describe('CardDetails', () => {
  it('Renders number of selected pokemons', () => {
    const component = renderWithStore(<Flyout />, {
      preloadedState: { app: { pokemons: [mockPokemonData] } },
    });

    const text = component.getByText('1 pokemon is selected');
    expect(text).toBeInTheDocument();
  });

  it('Dispatches removeAllPokemons on Unselect all click', () => {
    const component = renderWithStore(<Flyout />, {
      preloadedState: { app: { pokemons: [mockPokemonData] } },
    });

    const unselectedAllButton = component.getByTestId('unselect-all-button');

    fireEvent.click(unselectedAllButton);

    expect(dispatchMock).toHaveBeenCalledWith(removeAllPokemons());
  });

  it('Renders download link with correct href', () => {
    const component = renderWithStore(<Flyout />, {
      preloadedState: { app: { pokemons: [mockPokemonData] } },
    });

    const downloadLink = component.getByTestId(
      'download-button'
    ) as HTMLAnchorElement;

    expect(downloadLink).toBeInTheDocument();
    expect(downloadLink).toHaveAttribute('href', 'mocked-url');
    expect(downloadLink.href.startsWith('blob:')).toBe(false);
  });
});
