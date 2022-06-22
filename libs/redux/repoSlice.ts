import { createSlice } from '@reduxjs/toolkit';

export const repoSlice = createSlice({
  name: 'repo',
  initialState: {
    repo: -1
  },
  reducers: {
    switchRepo: (state, action) => {
      state.repo = action.payload
    }
  }
});

export const { switchRepo } = repoSlice.actions;

export default repoSlice.reducer;
