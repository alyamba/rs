import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { router } from './router';
import { ThemeProvider } from './utils';
import { store } from './store';
import { Provider } from 'react-redux';
import './index.css';

const rootElement = document.getElementById('root');
const browserRouter = createBrowserRouter(router);

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={browserRouter} />
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}
