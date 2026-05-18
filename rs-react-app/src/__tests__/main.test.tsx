import { render, screen, waitFor } from '@testing-library/react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { App } from '../App';
import { BrowserRouter } from 'react-router-dom';

describe('Main entry render', () => {
  it('renders App inside ErrorBoundary without crashing', async () => {
    render(
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /search/i })
      ).toBeInTheDocument();
    });
  });
});
