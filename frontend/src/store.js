import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import authReducer from './slices/authenticatedSlice';

// Custom middleware to check for 401 errors and redirect
const redirectOn401Middleware = () => (next) => (action) => {
  if (action.payload?.status === 401) {
    // Redirect to homepage if the response status is 401
    // Clear local storage
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(redirectOn401Middleware),
  devTools: true,
});

export default store;
