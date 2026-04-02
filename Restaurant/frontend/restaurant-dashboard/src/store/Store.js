import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/auth/authSlice';
import { dashboardApi } from '../services/dashboardApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dashboardApi.middleware),
});
