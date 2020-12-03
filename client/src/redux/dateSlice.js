import { createSlice } from '@reduxjs/toolkit';

export const dateSlice = createSlice({
  name: 'date',
  initialState: {
    currentDate: {},
    changeHours: true
  },
  reducers: {
    setCurrentDate: (state, action) => {
      // set by the login and logout functions. currentUser is the username.
      state.currentDate = action.payload;
    },
    setChangeHours: (state) => {
      state.changeHours = !state.changeHours
    }
  }
});

export const selectCurrentDate = state => state.date.currentDate;
export const selectChangeHours = state => state.date.changeHours;

export const { setCurrentDate, setChangeHours } = dateSlice.actions

export default dateSlice.reducer;