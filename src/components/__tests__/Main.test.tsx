import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Main } from '../Main';
import { MemoryRouter } from 'react-router';

describe('Main', () => {
  it('Renders Main when loading is true', () => {
    const component = render(
      <MemoryRouter>
        <Main
          loading={true}
          queryResults={[]}
          totalPages={55}
          currentPage={1}
          onChangeCurrentPage={() => {}}
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
          error="Error"
          queryResults={[]}
          totalPages={55}
          currentPage={1}
          onChangeCurrentPage={() => {}}
        />
      </MemoryRouter>
    );

    const error = component.getByText(/error: Error/i);
    expect(error).toBeInTheDocument();
  });

  it('Renders CardList with queryResults', () => {
    const component = render(
      <MemoryRouter>
        <Main
          loading={false}
          queryResults={[]}
          totalPages={55}
          currentPage={1}
          onChangeCurrentPage={() => {}}
        />
      </MemoryRouter>
    );

    const cardList = component.getByTestId('cards-container') as HTMLDivElement;
    expect(cardList).toBeInTheDocument();
  });
});
