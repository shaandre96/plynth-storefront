import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore, type TypedUseSelectorHook } from 'react-redux';
import cartReducer from './cartSlice';
import configuratorReducer from './configuratorSlice';
import uiReducer from './uiSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      cart: cartReducer,
      configurator: configuratorReducer,
      ui: uiReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore as () => AppStore;
