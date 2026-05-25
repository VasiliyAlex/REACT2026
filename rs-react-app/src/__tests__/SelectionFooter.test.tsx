import { render, screen, fireEvent } from '@testing-library/react';
import { SelectionFooter } from '../components/SelectionFooter';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { saveAs } from 'file-saver';
import { clearSelected } from '../store/selectedSlice';

jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

jest.mock('../store/selectedSlice', () => ({
  clearSelected: jest.fn(),
}));

const mockStore = configureStore([]);
const mockPokemon = {
  id: 25,
  name: 'pikachu',
  types: [{ type: { name: 'electric' } }],
  height: 4,
  weight: 60,
};

describe('SelectionFooter', () => {
  it('does not render if no selected items', () => {
    const store = mockStore({
      selectedPokemons: { selected: [] },
    });

    const { container } = render(
      <Provider store={store}>
        <SelectionFooter />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders selected count and buttons', () => {
    const store = mockStore({
      selectedPokemons: { selected: [mockPokemon] },
    });

    render(
      <Provider store={store}>
        <SelectionFooter />
      </Provider>
    );

    expect(screen.getByText('1 item is selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('dispatches clearSelected on Unselect all click', () => {
    const store = mockStore({
      selectedPokemons: { selected: [mockPokemon] },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <SelectionFooter />
      </Provider>
    );

    fireEvent.click(screen.getByText('Unselect all'));
    expect(store.dispatch).toHaveBeenCalledWith(clearSelected());
  });

  it('calls saveAs on Download click', () => {
    const store = mockStore({
      selectedPokemons: { selected: [mockPokemon] },
    });

    render(
      <Provider store={store}>
        <SelectionFooter />
      </Provider>
    );

    fireEvent.click(screen.getByText('Download'));
    expect(saveAs).toHaveBeenCalledTimes(1);
    const blobArg = (saveAs as unknown as jest.Mock).mock.calls[0][0];
    expect(blobArg instanceof Blob).toBe(true);
    expect((saveAs as unknown as jest.Mock).mock.calls[0][1]).toBe(
      '1_items.csv'
    );
  });
});
