import { render, screen } from '@testing-library/react';
import { AboutPage } from '../pages/AboutPages';

describe('AboutPage', () => {
  beforeEach(() => {
    render(<AboutPage />);
  });

  it('renders heading "Я создаю интерактивные"', () => {
    expect(
      screen.getByRole('heading', { name: /я создаю интерактивные/i })
    ).toBeInTheDocument();
  });

  it('renders heading "Личные качества"', () => {
    expect(
      screen.getByRole('heading', { name: /личные качества/i })
    ).toBeInTheDocument();
  });

  it('renders heading "Технические навыки"', () => {
    expect(
      screen.getByRole('heading', { name: /технические навыки/i })
    ).toBeInTheDocument();
  });

  it('renders heading "Недостатки"', () => {
    expect(
      screen.getByRole('heading', { name: /недостатки/i })
    ).toBeInTheDocument();
  });

  it('renders heading "Образование"', () => {
    expect(
      screen.getByRole('heading', { name: /образование/i })
    ).toBeInTheDocument();
  });

  it('renders heading "Контакты"', () => {
    expect(
      screen.getByRole('heading', { name: /контакты/i })
    ).toBeInTheDocument();
  });

  it('renders introduction text', () => {
    expect(screen.getByText(/привет! я василий/i)).toBeInTheDocument();
  });

  it('renders technical skill "HTML"', () => {
    expect(screen.getByText(/html/i)).toBeInTheDocument();
  });

  it('renders education item "PROWEB"', () => {
    expect(screen.getByText(/PROWEB/i)).toBeInTheDocument();
  });

  it('contains link to RS School React course with correct target', () => {
    const link = screen.getByRole('link', { name: /курс rs school react/i });
    expect(link).toHaveAttribute('href', expect.stringContaining('react'));
    expect(link).toHaveAttribute('target', '_blank');
  });
});
