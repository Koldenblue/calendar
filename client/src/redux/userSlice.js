import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null
  },
  reducers: {
    setCurrentUser: (state, action) => {
      console.log(action.payload)
      state.currentUser = action.payload;
    }
  }
});

export const selectCurrentUser = state => state.user.currentUser;

export const { setCurrentUser } = userSlice.actions

export default userSlice.reducer;