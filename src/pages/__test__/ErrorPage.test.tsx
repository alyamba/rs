import { fireEvent } from '@testing-library/react';
import { Route, Routes } from 'react-router';
import { describe } from 'vitest';
import { ErrorPage, HomePage } from '../';
import { renderWithStore } from '../../utils';

describe('ErrorPage', () => {
  it('Renders ErrorPage correctly', () => {
    const page = renderWithStore(<ErrorPage />);

    const errorNumber = page.getByText('404');
    expect(errorNumber).toBeInTheDocument();

    const errorText = page.getByText('Page Not Found');
    expect(errorText).toBeInTheDocument();

    const button = page.getByTestId('go-home-button');
    expect(button).toBeInTheDocument();
  });

  it('Navigate to HomePage from ErrorPage when HOME button was clicked', () => {
    const page = renderWithStore(
      <Routes>
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>,
      { initialEntries: ['/error'] }
    );

    const errorNumber = page.getByText('404');
    expect(errorNumber).toBeInTheDocument();

    const homeLink = page.getByRole('link', { name: /home/i });
    fireEvent.click(homeLink);

    const mainContainer = page.getByTestId('main-container');
    expect(mainContainer).toBeInTheDocument();
  });
});
