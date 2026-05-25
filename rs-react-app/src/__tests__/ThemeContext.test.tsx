import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

const Broken = () => {
  useTheme();
  return null;
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('uses default theme "light" if no theme in localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value').textContent).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(localStorage.getItem('app-theme')).toBe('light');
  });

  it('loads theme from localStorage', () => {
    localStorage.setItem('app-theme', 'dark');
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles theme between light and dark', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByText('Toggle');

    fireEvent.click(toggleButton);
    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('app-theme')).toBe('dark');

    fireEvent.click(toggleButton);
    expect(screen.getByTestId('theme-value').textContent).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(localStorage.getItem('app-theme')).toBe('light');
  });

  it('throws error if useTheme called outside ThemeProvider', () => {
    expect(() => render(<Broken />)).toThrow(
      'useTheme must be used within a ThemeProvider'
    );
  });
});
