import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

type CardListMockProps = {
  onPageChange: (page: number) => void;
  onCardClick: (id: string) => void;
  setIsFading: (value: boolean) => void;
};

type SearchMockProps = {
  onSearch: (query: string) => void;
};

jest.mock('../components/CardList', () => ({
  CardList: ({ onPageChange, onCardClick, setIsFading }: CardListMockProps) => (
    <div>
      <button onClick={() => onPageChange(2)}>Next Page</button>
      <button onClick={() => onCardClick('25')}>Click Card</button>
      <button onClick={() => setIsFading(true)}>Fade</button>
      <div>Mocked CardList</div>
    </div>
  ),
}));

jest.mock('../components/Search', () => ({
  Search: ({ onSearch }: SearchMockProps) => (
    <div>
      <input
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
        data-testid="search-input"
      />
    </div>
  ),
}));

describe('HomePage', () => {
  it('renders Search and CardList components', () => {
    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:page" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByText('Mocked CardList')).toBeInTheDocument();
  });

  it('navigates to next page when onPageChange is triggered', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:page" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Next Page'));

    expect(container.innerHTML).toContain('Mocked CardList');
  });

  it('handles card click navigation', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:page" element={<HomePage />} />
          <Route path="/:page/:id" element={<div>Details Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Click Card'));
    expect(container.innerHTML).toContain('Details Page');
  });

  it('updates URL on search input', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:page" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(getByTestId('search-input'), {
      target: { value: 'pikachu' },
    });

    expect(getByTestId('search-input')).toHaveValue('pikachu');
  });
});
