import { createSlice } from '@reduxjs/toolkit';

export const dateSlice = createSlice({
  name: 'date',
  initialState: {
    currentDate: {},        // currentDate is set in Home.js
    changeHours: 0,      // arbitrary value that triggers a re-render of Hour.js columns
    handlePost: 0           // arbitrary value that triggers a re-render of Calendar.js after an event is posted to calendar
  },
  reducers: {
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    setChangeHours: (state) => {
      console.log('hours changing')
      state.changeHours = ++state.changeHours;
    },
    setHandlePost: (state) => {
      console.log('handling post', state.handlePost)
      state.handlePost = ++state.handlePost;
    }
  }
});

export const selectCurrentDate = state => state.date.currentDate;
export const selectChangeHours = state => state.date.changeHours;
export const selectHandlePost = state => state.date.handlePost;

export const { setCurrentDate, setChangeHours, setHandlePost } = dateSlice.actions;

export default dateSlice.reducer;