import { createBrowserRouter, type LoaderFunctionArgs } from 'react-router-dom';
import { App } from '../App';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPages';
import { NotFoundPage } from '../pages/NotFoundPage';
import { DetailsPage } from '../pages/DetailsPage';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: ':page',
        loader: ({ params }: LoaderFunctionArgs) => {
          const page = Number(params.page);
          if (Number.isNaN(page) || page < 1) {
            throw new Response('Not Found', { status: 404 });
          }
          return null;
        },
        element: <HomePage />,
        errorElement: <NotFoundPage />,
        children: [
          {
            path: ':detailsId',
            loader: ({ params }: LoaderFunctionArgs) => {
              const id = Number(params.detailsId);
              if (Number.isNaN(id) || id < 1) {
                throw new Response('Not Found', { status: 404 });
              }
              return null;
            },
            element: <DetailsPage />,
          },
        ],
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
export { routes };
