import { render, screen } from '@testing-library/react';
import { NotFoundPage } from '../pages/NotFoundPage';

describe('NotFoundPage', () => {
  it('renders 404 page message', () => {
    render(<NotFoundPage />);
    const heading = screen.getByRole('heading', {
      name: /404 - page not found/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
