import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe } from 'vitest';
import { ErrorPage } from '../';
import { App } from '../../App';

describe('ErrorPage', () => {
  it('Renders ErrorPage correctly', () => {
    const page = render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );

    const errorNumber = page.getByText('404');
    expect(errorNumber).toBeInTheDocument();

    const errorText = page.getByText('Page Not Found');
    expect(errorText).toBeInTheDocument();

    const button = page.getByTestId('go-home-button');
    expect(button).toBeInTheDocument();
  });

  it('Navigate to HomePage from ErrorPage when HOME button was clicked', () => {
    const page = render(
      <MemoryRouter initialEntries={['/error']}>
        <Routes>
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/" element={<App />} />
        </Routes>
      </MemoryRouter>
    );

    const errorNumber = page.getByText('404');
    expect(errorNumber).toBeInTheDocument();

    const homeLink = page.getByRole('link', { name: /home/i });
    fireEvent.click(homeLink);

    const homeTitleText = page.getByText('API');
    expect(homeTitleText).toBeInTheDocument();
  });
});
