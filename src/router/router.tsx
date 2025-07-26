import { App } from '../App';
import { AboutPage, ErrorPage } from '../pages';

export const router = [
  { path: '/', element: <App />, errorElement: <ErrorPage /> },
  { path: '/about', element: <AboutPage /> },
];
