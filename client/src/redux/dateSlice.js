import { createSlice } from '@reduxjs/toolkit';

export const dateSlice = createSlice({
  name: 'date',
  initialState: {
    currentDate: {},      // currentDate is set in Home.js
    changeHours: true     // changeHours triggers a re-render of Hour.js columns
  },
  reducers: {
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    setChangeHours: (state) => {
      state.changeHours = !state.changeHours;
    }
  }
});

export const selectCurrentDate = state => state.date.currentDate;
export const selectChangeHours = state => state.date.changeHours;

export const { setCurrentDate, setChangeHours } = dateSlice.actions;

export default dateSlice.reducer;