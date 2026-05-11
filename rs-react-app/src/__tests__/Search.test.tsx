import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from '../components/Search';

describe('Search component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('renders input and button', () => {
    render(<Search onSearch={vi.fn()} />);

    expect(
      screen.getByPlaceholderText('Enter your query')
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /search/i })
    ).toBeInTheDocument();
  });

  it('loads value from localStorage on mount', () => {
    localStorage.setItem('searchQuery', 'pikachu');

    render(<Search onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText('Enter your query');

    expect(input).toHaveValue('pikachu');
  });

  it('updates input value on change', async () => {
    const user = userEvent.setup();

    render(<Search onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText('Enter your query');

    await user.type(input, 'charizard');

    expect(input).toHaveValue('charizard');
  });

  it('calls onSearch with trimmed value', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    const input = screen.getByPlaceholderText('Enter your query');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, '   pikachu   ');
    await user.click(button);

    expect(onSearch).toHaveBeenCalledWith('pikachu');
  });

  it('saves query to localStorage on search', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    render(<Search onSearch={onSearch} />);

    const input = screen.getByPlaceholderText('Enter your query');
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'bulbasaur');
    await user.click(button);

    expect(setItemSpy).toHaveBeenCalledWith(
      'searchQuery',
      'bulbasaur'
    );
  });

  it('does not call onSearch if query is same as lastQuery', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    localStorage.setItem('searchQuery', 'pikachu');

    render(<Search onSearch={onSearch} />);

    const button = screen.getByRole('button', { name: /search/i });

    await user.click(button);

    expect(onSearch).not.toHaveBeenCalled();
  });
});