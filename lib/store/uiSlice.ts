import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UiState = {
  demoBannerDismissed: boolean;
  mobileNavOpen: boolean;
};

const initialState: UiState = {
  demoBannerDismissed: false,
  mobileNavOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDemoBannerDismissed(state, action: PayloadAction<boolean>) {
      state.demoBannerDismissed = action.payload;
    },
    setMobileNavOpen(state, action: PayloadAction<boolean>) {
      state.mobileNavOpen = action.payload;
    },
    toggleMobileNav(state) {
      state.mobileNavOpen = !state.mobileNavOpen;
    },
  },
});

export const { setDemoBannerDismissed, setMobileNavOpen, toggleMobileNav } =
  uiSlice.actions;

export default uiSlice.reducer;
