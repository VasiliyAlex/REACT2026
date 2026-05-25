import { render, screen, waitFor } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import { router } from '../router/router';
import { Provider } from 'react-redux';
import { store } from '../store/index';
import { ThemeProvider } from '../context/ThemeContext';

describe('Main entry render', () => {
  it('renders App inside ErrorBoundary without crashing', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </ThemeProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /search/i })
      ).toBeInTheDocument();
    });
  });
});
