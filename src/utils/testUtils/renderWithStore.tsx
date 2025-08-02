import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import appReducer from '../../store/appReducer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { ThemeContext } from '../hooks/useTheme/useTheme';
import type { PokeData } from '../../api/types';

type RenderWithStoreOptions = {
  preloadedState?: { app: { pokemons: PokeData[] } };
  initialEntries?: string[];
};

export const renderWithStore = (
  children: ReactNode,
  options?: RenderWithStoreOptions
) => {
  const { preloadedState, initialEntries } = options || {};

  const store = configureStore({
    reducer: {
      app: appReducer,
    },
    preloadedState: preloadedState ?? { app: { pokemons: [] } },
  });

  const utils = render(
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: vi.fn() }}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </ThemeContext.Provider>
    </Provider>
  );

  return {
    store,
    ...utils,
  };
};
