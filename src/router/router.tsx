import { CardDetails } from '../components';
import { AboutPage, ErrorPage, HomePage } from '../pages';

export const router = [
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/pokemon/:id',
        element: <CardDetails />,
      },
    ],
  },
  { path: '/about', element: <AboutPage /> },
];
