import { createSlice } from '@reduxjs/toolkit';

export const dateSlice = createSlice({
  name: 'date',
  initialState: {
    currentDate: null
  },
  reducers: {
    setCurrentDate: (state, action) => {
      // set by the login and logout functions. currentUser is the username.
      state.currentDate = action.payload;
    }
  }
});

export const selectCurrentDate = state => state.date.currentDate;

export const { setCurrentDate } = dateSlice.actions

export default dateSlice.reducer;