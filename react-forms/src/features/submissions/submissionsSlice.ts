import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Submission } from '../../types/form';

interface SubmissionsState {
  submissions: Submission[];
}

const initialState: SubmissionsState = {
  submissions: [],
};

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    addSubmission: (
      state,
      action: PayloadAction<Submission>,
    ) => {
      state.submissions.unshift(action.payload);
    },
  },
});

export const { addSubmission } =
  submissionsSlice.actions;

export default submissionsSlice.reducer;