import { configureStore } from '@reduxjs/toolkit';
import materialsReducer from './materials-slice';
import productsReducer from './products-slice';

export const store = configureStore({
  reducer: {
    materials: materialsReducer,
    products: productsReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;