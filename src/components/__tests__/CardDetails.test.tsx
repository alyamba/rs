import { fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockPokemonData, renderWithStore } from '../../utils';
import { Route, Routes } from 'react-router';
import { CardDetails } from '../CardDetails';
import { useGetPokemonDetailsQuery } from '../../store/api/pokemonsApi';

vi.mock('react-router-dom');
vi.mock('../../store/api/pokemonsApi', async () => {
  const originalModule = await vi.importActual('../../store/api/pokemonsApi');
  return {
    ...originalModule,
    useGetPokemonDetailsQuery: vi.fn(),
  };
});

describe('CardDetails', () => {
  beforeEach(() => {
    vi.mocked(useGetPokemonDetailsQuery).mockReturnValue({
      data: mockPokemonData,
      isLoading: false,
      error: undefined,
      refetch: vi.fn(),
    });
  });

  it('Renders loading', () => {
    const component = renderWithStore(
      <Routes>
        <Route path="/pokemon/:id" element={<CardDetails />} />
      </Routes>,
      { initialEntries: ['/pokemon/1/?page=1'] }
    );

    const loading = component.getByTestId('loading');
    expect(loading).toBeInTheDocument();
  });

  it('Renders pokemon image correctly', async () => {
    const component = renderWithStore(
      <Routes>
        <Route path="/pokemon/:id" element={<CardDetails />} />
      </Routes>,
      { initialEntries: ['/pokemon/1/?page=1'] }
    );

    await waitFor(() => {
      const image = component.getByTestId('card-image');
      expect(image).toBeTruthy();
    });
  });

  it('Renders pokemon data correctly', async () => {
    const component = renderWithStore(
      <Routes>
        <Route path="/pokemon/:id" element={<CardDetails />} />
      </Routes>,
      { initialEntries: ['/pokemon/1/?page=1'] }
    );

    await waitFor(() => {
      const name = component.getByTestId('card-name');
      expect(name).toHaveTextContent('BULBASAUR');
    });
  });

  it('Renders pokemon data is failed', async () => {
    vi.mocked(useGetPokemonDetailsQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { message: 'Something went wrong.' },
      refetch: vi.fn(),
    });

    const component = renderWithStore(
      <Routes>
        <Route path="/pokemon/:id" element={<CardDetails />} />
      </Routes>,
      { initialEntries: ['/pokemon/1/?page=1'] }
    );

    await waitFor(() => {
      const error = component.getByText('Something went wrong.');
      expect(error).toBeInTheDocument();
    });
  });

  it('Closes details', async () => {
    const component = renderWithStore(
      <Routes>
        <Route path="/pokemon/:id" element={<CardDetails />} />
      </Routes>,
      { initialEntries: ['/pokemon/1/?page=1'] }
    );

    await waitFor(() => {
      const name = component.getByTestId('card-name');
      expect(name).toHaveTextContent('BULBASAUR');
    });

    fireEvent.click(component.getByText('×'));

    await waitFor(() => {
      const closeIcon = component.queryByTestId('close-details-icon');
      expect(closeIcon).not.toBeInTheDocument();
    });
  });

  it('Sets imageLoaded to true after image load', async () => {
    const component = renderWithStore(
      <Routes>
        <Route path="/pokemon/:id" element={<CardDetails />} />
      </Routes>,
      { initialEntries: ['/pokemon/1/?page=1'] }
    );

    const image = await component.findByTestId('card-image');
    expect(image).toBeInTheDocument();

    fireEvent.load(image);
    expect(image).toHaveClass('opacity-100');
  });
});
