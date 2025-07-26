import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe } from 'vitest';
import { router } from '../';

describe('Router', () => {
  it('AboutPage', () => {
    const route = createMemoryRouter(router, {
      initialEntries: ['/about'],
    });

    const page = render(<RouterProvider router={route} />);

    const title = page.getByText('ABOUT US');
    expect(title).toBeInTheDocument();
  });
});
