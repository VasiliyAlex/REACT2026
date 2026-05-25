import { render, screen } from '@testing-library/react';
import { AboutPage } from '../pages/AboutPages';

describe('AboutPage', () => {
  it('renders page with expected headings and content', () => {
    render(<AboutPage />);
    expect(
      screen.getByRole('heading', { name: /я создаю интерактивные/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /личные качества/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /технические навыки/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /недостатки/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /образование/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /контакты/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/привет! я василий/i)).toBeInTheDocument();
    expect(screen.getByText(/html/i)).toBeInTheDocument();
    expect(screen.getByText(/PROWEB/i)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /курс rs school react/i });
    expect(link).toHaveAttribute('href', expect.stringContaining('react'));
    expect(link).toHaveAttribute('target', '_blank');
  });
});
