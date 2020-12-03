import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import dateReducer from './dateSlice';


export default configureStore({
  reducer: {
    user: userReducer,
    date: dateReducer,
  }
});
