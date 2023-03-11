import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from '../Redux/productsSlice';
import cartReducer from '../Redux/cartSlice';
import authReducer from '../Redux/authSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
