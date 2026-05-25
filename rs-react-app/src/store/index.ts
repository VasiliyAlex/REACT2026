import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from './selectedSlice';

export const store = configureStore({
  reducer: {
    selectedPokemons: selectedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
