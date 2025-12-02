'use client';

import { store } from '@/store';
import { ThemeProvider } from '@/utils';
import React from 'react';
import { Provider } from 'react-redux';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default Providers;
