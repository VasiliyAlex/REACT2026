import { createSlice } from '@reduxjs/toolkit';

interface CountriesState {
  countries: string[];
}

const initialState: CountriesState = {
  countries: [
    'Germany',
    'France',
    'Spain',
    'Italy',
    'Poland',
    'Portugal',
    'Netherlands',
    'Belgium',
    'Sweden',
    'Norway',
    'Finland',
    'Denmark',
    'Ukraine',
    'Uzbekistan',
    'Kazakhstan',
    'United Kingdom',
    'United States',
    'Canada',
  ],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;