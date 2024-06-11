// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './authSlice';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export default store;

import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

