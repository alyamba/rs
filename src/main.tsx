import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { router } from './router';

const rootElement = document.getElementById('root');
const browserRouter = createBrowserRouter(router);

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <RouterProvider router={browserRouter} />
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}
