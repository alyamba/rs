import { fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { mockPokemonData, renderWithStore } from '../../utils';
import * as api from '../../api/pokeAPI';
import { Route, Routes } from 'react-router';
import { CardDetails } from '../CardDetails';

vi.mock('../../api/pokeAPI');

describe('CardDetails', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('Renders loading', () => {
    (api.getPokeData as ReturnType<typeof vi.fn>).mockImplementation(
      () => new Promise(() => {})
    );
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
    (api.getPokeData as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: [mockPokemonData],
    });

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
    (api.getPokeData as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: [mockPokemonData],
    });

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
    (api.getPokeData as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Error')
    );

    const component = renderWithStore(
      <Routes>
        <Route path="/pokemon/:id" element={<CardDetails />} />
      </Routes>,
      { initialEntries: ['/pokemon/1/?page=1'] }
    );

    await waitFor(() => {
      const error = component.getByText('Error');
      expect(error).toBeInTheDocument();
    });
  });

  it('Closes details', async () => {
    (api.getPokeData as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: [mockPokemonData],
    });

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
    (api.getPokeData as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: [mockPokemonData],
    });

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
