import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, it } from 'vitest';
import { AboutPage, HomePage } from '../';
import type { ReactNode } from 'react';
import { ThemeContext } from '../../utils/hooks/useTheme/useTheme';

const MockThemeProvider = ({ children }: { children: ReactNode }) => (
  <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: vi.fn() }}>
    {children}
  </ThemeContext.Provider>
);

describe('AboutPage', () => {
  it('Renders About correctly', () => {
    const page = render(
      <MockThemeProvider>
        <MemoryRouter>
          <AboutPage />
        </MemoryRouter>
      </MockThemeProvider>
    );

    const courseLink = page.getByText('RSschool React course');
    expect(courseLink).toBeInTheDocument();

    const githubLink = page.getByText('my GitHub');
    expect(githubLink).toBeInTheDocument();

    const title = page.getByText('ABOUT US');
    expect(title).toBeInTheDocument();
  });

  it('Navigate to HomePage from AboutPage when HOME button was clicked', async () => {
    const page = render(
      <MockThemeProvider>
        <MemoryRouter initialEntries={['/about']}>
          <Routes>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </MemoryRouter>
      </MockThemeProvider>
    );

    const title = page.getByText('ABOUT US');
    expect(title).toBeInTheDocument();

    const homeLink = page.getByRole('link', { name: /home/i });
    fireEvent.click(homeLink);

    const mainContainer = page.getByTestId('main-container');
    expect(mainContainer).toBeInTheDocument();
  });

  it('Renders external links correctly', () => {
    const page = render(
      <MockThemeProvider>
        <MemoryRouter>
          <AboutPage />
        </MemoryRouter>
      </MockThemeProvider>
    );

    const courseLink = page.getByText('RSschool React course');
    expect(courseLink).toBeInTheDocument();
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(courseLink).toHaveAttribute('target', '_blank');
    expect(courseLink).toHaveAttribute('rel', 'noopener noreferrer');

    const githubLink = page.getByText('my GitHub');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/alyamba');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
