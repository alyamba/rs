import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import appReducer from '../../store/appReducer';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

export const renderWithStore = (
  children: ReactNode,
  preloadedState = { app: { pokemons: [] } }
) => {
  const store = configureStore({
    reducer: {
      app: appReducer,
    },
    preloadedState,
  });

  const utils = render(
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );

  return {
    store,
    ...utils,
  };
};
