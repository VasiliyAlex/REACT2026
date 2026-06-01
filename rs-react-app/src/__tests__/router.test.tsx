import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { routes } from '../router/router';
import { useGetPokemonDetailsQuery } from '../api/pokemonApi';
import { AllProviders } from '../test-utils/AllProviders';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { DetailsPage } from '../pages/DetailsPage';
import { NotFoundPage } from '../pages/NotFoundPage';

const renderWithRouter = (initialEntries: string[]) => {
  const testRouter = createMemoryRouter(routes, {
    initialEntries,
    hydrationData: {},
  });

  return render(
    <AllProviders>
      <RouterProvider router={testRouter} />
    </AllProviders>
  );
};

jest.mock('../api/pokemonApi', () => ({
  ...jest.requireActual('../api/pokemonApi'),
  useGetPokemonDetailsQuery: jest.fn(),
}));

beforeEach(() => {
  (useGetPokemonDetailsQuery as jest.Mock).mockReturnValue({
    data: undefined,
    error: undefined,
    isLoading: false,
    refetch: jest.fn(),
  });
});

describe.skip('Router nested routes', () => {
  it('renders HomePage for valid /2 route', async () => {
    renderWithRouter(['/2']);
    expect(
      await screen.findByPlaceholderText('Enter your query')
    ).toBeInTheDocument();
  });

  it('renders NotFoundPage for invalid /0 route', async () => {
    renderWithRouter(['/0']);
    expect(await screen.findByText('404 - Page Not Found')).toBeInTheDocument();
  });

  it('renders DetailsPage for valid route /:page/:detailsId', async () => {
    const mockPokemon = {
      name: 'pikachu',
      height: 4,
      weight: 60,
      sprites: { front_default: 'pikachu.png' },
      types: [{ type: { name: 'electric' } }],
    };

    (useGetPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: mockPokemon,
      error: undefined,
      isLoading: false,
      refetch: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/2/3']}>
        <AllProviders>
          <Routes>
            <Route path="/:page/:detailsId" element={<DetailsPage />} />
          </Routes>
        </AllProviders>
      </MemoryRouter>
    );
    jest.advanceTimersByTime(2000);
    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
      expect(screen.getByText(/height/i)).toBeInTheDocument();
      expect(screen.getByText(/weight/i)).toBeInTheDocument();
      expect(screen.getByText(/electric/i)).toBeInTheDocument();
    });
  });

  it('renders NotFoundPage for invalid /2/0 route', async () => {
    renderWithRouter(['/2/0']);
    expect(
      await screen.findByText(/404 - Page Not Found/i)
    ).toBeInTheDocument();
  });

  it('renders NotFoundPage for non-numeric page param', async () => {
    renderWithRouter(['/abc']);
    expect(await screen.findByText('404 - Page Not Found')).toBeInTheDocument();
  });

  it('renders NotFoundPage for non-numeric detailsId param', async () => {
    renderWithRouter(['/2/abc']);
    expect(await screen.findByText('404 - Page Not Found')).toBeInTheDocument();
  });

  it('calls errorElement if detailsId is 0', async () => {
    const testRouter = createMemoryRouter(routes, {
      initialEntries: ['/2/0'],
      hydrationData: {},
    });

    render(
      <AllProviders>
        <RouterProvider router={testRouter} />
      </AllProviders>
    );

    expect(
      await screen.findByText(/404 - Page Not Found/i)
    ).toBeInTheDocument();
  });

  it('renders NotFoundPage when detailsId is invalid (loader)', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/:page',
          children: [
            {
              path: ':detailsId',
              loader: ({ params }) => {
                const id = Number(params.detailsId);
                if (Number.isNaN(id) || id < 1) {
                  throw new Response('Not Found', { status: 404 });
                }
                return null;
              },
              element: <DetailsPage />,
              errorElement: <NotFoundPage />,
            },
          ],
        },
      ],
      {
        initialEntries: ['/2/0'],
        hydrationData: {},
      }
    );

    render(<RouterProvider router={router} />);
    expect(
      await screen.findByRole('heading', { name: /404 - Page Not Found/i })
    ).toBeInTheDocument();
  });

  it('loader throws error when page param is missing or empty', () => {
    const pageLoader = routes[0].children?.[1]?.loader;

    if (!pageLoader) {
      throw new Error('Page loader is undefined');
    }

    const fakeArgsMissing = {
      params: {},
      request: new Request('http://localhost'),
      context: {},
    } as LoaderFunctionArgs;

    expect(() => pageLoader(fakeArgsMissing)).toThrow();

    const fakeArgsEmpty = {
      params: { page: '' },
      request: new Request('http://localhost'),
      context: {},
    } as LoaderFunctionArgs;

    expect(() => pageLoader(fakeArgsEmpty)).toThrow();
  });

  it('loader throws error when page param is undefined', () => {
    const pageLoader = routes[0].children?.[1]?.loader;

    if (!pageLoader) {
      throw new Error('Page loader is undefined');
    }

    const fakeArgsUndefined = {
      params: { page: undefined },
      request: new Request('http://localhost'),
      context: {},
    } as unknown as LoaderFunctionArgs;

    expect(() => pageLoader(fakeArgsUndefined)).toThrow();
  });

  it('loader returns null for valid page param', () => {
    const pageLoader = routes[0].children?.[1]?.loader;

    if (!pageLoader) {
      throw new Error('Page loader is undefined');
    }

    const validArgs = {
      params: { page: '2' },
      request: new Request('http://localhost'),
      context: {},
    } as LoaderFunctionArgs;

    expect(pageLoader(validArgs)).toBeNull();
  });

  it('detailsId loader returns null for valid detailsId', () => {
    const detailsLoader = routes[0].children?.[1]?.children?.[0]?.loader;

    if (!detailsLoader) {
      throw new Error('Details loader is undefined');
    }

    const validArgs = {
      params: { detailsId: '3' },
      request: new Request('http://localhost'),
      context: {},
    } as LoaderFunctionArgs;

    expect(detailsLoader(validArgs)).toBeNull();
  });
});
