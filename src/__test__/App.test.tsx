import { describe, vi } from 'vitest';
import { App } from '../App';
import { fireEvent, render, waitFor } from '@testing-library/react';
import * as api from '../api/pokeAPI';

describe('App', () => {
  const mockPokeData = [
    {
      name: 'bulbasaur',
      data: {
        height: 7,
        weight: 69,
        imgUrl: 'https://example.com/bulbasaur.png',
      },
      id: 1,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
    });
  });

  afterEach(() => {
    vi.resetModules();
  });

  it('Renders App when searchQuery is empty', async () => {
    vi.spyOn(localStorage, 'getItem').mockReturnValue('');
    vi.spyOn(api, 'getAllPokeData').mockResolvedValue(mockPokeData);

    const component = render(<App />);

    const cardsContainer = await component.findByTestId('cards-container');
    expect(cardsContainer).toBeInTheDocument();

    const cardName = await component.findByTestId('card-name');
    expect(cardName).toBeInTheDocument();
  });

  it('Renders App when searchQuery was from localStorage', async () => {
    vi.spyOn(localStorage, 'getItem').mockReturnValue('bulbasaur');
    vi.spyOn(api, 'getPokeData').mockResolvedValue(mockPokeData);

    const component = render(<App />);

    const cardName = await component.findByTestId('card-name');
    expect(cardName).toBeInTheDocument();
  });

  it('Renders App when input has value (click Search button)', async () => {
    vi.spyOn(api, 'getPokeData').mockResolvedValue(mockPokeData);

    const component = render(<App />);

    const input = component.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'bulbasaur' } });

    const button = component.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      const cardName = component.getByTestId('card-name');
      expect(cardName).toBeInTheDocument();
    });
  });

  it('Renders App when input empty (click Search button)', async () => {
    vi.spyOn(api, 'getAllPokeData').mockResolvedValue(mockPokeData);

    const component = render(<App />);

    const input = component.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });

    const button = component.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      const cardName = component.getByTestId('card-name');
      expect(cardName).toBeInTheDocument();
    });
  });

  it('Renders App when fetchAllData fails', async () => {
    vi.spyOn(api, 'getAllPokeData').mockRejectedValue(new Error('Error'));

    const component = render(<App />);

    await waitFor(() => {
      const error = component.getByText(/error: error/i);
      expect(error).toBeInTheDocument();
    });
  });

  it('Renders App when fetchSearchData fails', async () => {
    vi.spyOn(api, 'getPokeData').mockRejectedValue(new Error('Error'));

    const component = render(<App />);

    const input = component.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    const button = component.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      const error = component.getByText(/error: error/i);
      expect(error).toBeInTheDocument();
    });
  });
});
