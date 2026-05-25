import { type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../context/ThemeContext';
import { store } from '../store';

type AllProvidersProps = {
  children: ReactNode;
};

export const AllProviders = ({ children }: AllProvidersProps) => (
  <Provider store={store}>
    <ThemeProvider>{children}</ThemeProvider>
  </Provider>
);
