import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe } from 'vitest';
import { ErrorPage, HomePage } from '../';
import type { ReactNode } from 'react';
import { ThemeContext } from '../../utils/hooks/useTheme/useTheme';

const MockThemeProvider = ({ children }: { children: ReactNode }) => (
  <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: vi.fn() }}>
    {children}
  </ThemeContext.Provider>
);

describe('ErrorPage', () => {
  it('Renders ErrorPage correctly', () => {
    const page = render(
      <MockThemeProvider>
        <MemoryRouter>
          <ErrorPage />
        </MemoryRouter>
      </MockThemeProvider>
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
      <MockThemeProvider>
        <MemoryRouter initialEntries={['/error']}>
          <Routes>
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </MemoryRouter>
      </MockThemeProvider>
    );

    const errorNumber = page.getByText('404');
    expect(errorNumber).toBeInTheDocument();

    const homeLink = page.getByRole('link', { name: /home/i });
    fireEvent.click(homeLink);

    const mainContainer = page.getByTestId('main-container');
    expect(mainContainer).toBeInTheDocument();
  });
});
