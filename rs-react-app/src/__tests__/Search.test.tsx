import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '../components/Search';

describe('<Search />', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders input and button', () => {
    render(<Search onSearch={mockOnSearch} />);
    expect(
      screen.getByPlaceholderText(/enter your query/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('loads search query from localStorage on mount', () => {
    localStorage.setItem('searchQuery', 'saved term');
    render(<Search onSearch={mockOnSearch} />);
    expect(screen.getByDisplayValue('saved term')).toBeInTheDocument();
  });

  test('updates input value on user typing', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/enter your query/i);
    fireEvent.change(input, { target: { value: 'test input' } });
    expect(screen.getByDisplayValue('test input')).toBeInTheDocument();
  });

  test('trims, saves and submits search query on button click', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/enter your query/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: '   hello   ' } });
    fireEvent.click(button);

    expect(localStorage.getItem('searchQuery')).toBe('hello');
    expect(mockOnSearch).toHaveBeenCalledWith('hello');
  });

  test('submits empty string if input is only spaces', () => {
    render(<Search onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/enter your query/i);
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button'));

    expect(localStorage.getItem('searchQuery')).toBe('');
    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
