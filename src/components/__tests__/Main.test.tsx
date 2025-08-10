import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Main } from '../Main';
import { MemoryRouter } from 'react-router';
import { renderWithStore } from '../../utils';

const mockData = {
  data: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ],
  totalPages: 55,
};

describe('Main', () => {
  it('Renders Main when loading is true', () => {
    const component = render(
      <MemoryRouter>
        <Main
          loading={true}
          currentPage={1}
          onChangeCurrentPage={() => {}}
          data={mockData}
          error={undefined}
        />
      </MemoryRouter>
    );

    const loading = component.queryByTestId('loading');
    expect(loading).toBeInTheDocument();
  });

  it('Renders error message', () => {
    const component = render(
      <MemoryRouter>
        <Main
          loading={false}
          currentPage={1}
          onChangeCurrentPage={() => {}}
          data={undefined}
          error={{ status: 404, data: 'Do not exist' }}
        />
      </MemoryRouter>
    );

    const error = component.getByText('Something went wrong.');
    expect(error).toBeInTheDocument();
  });

  it('Renders CardList with queryResults', () => {
    const component = renderWithStore(
      <Main
        loading={false}
        currentPage={1}
        onChangeCurrentPage={() => {}}
        data={mockData}
        error={undefined}
      />
    );

    const cardList = component.getByTestId('cards-container') as HTMLDivElement;
    expect(cardList).toBeInTheDocument();
  });
});
