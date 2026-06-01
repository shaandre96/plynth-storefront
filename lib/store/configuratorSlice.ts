import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AiSuggestion, ITunesTrack } from '@/lib/types';

export type ConfiguratorStep = 1 | 2 | 3 | 4;

export type ConfiguratorState = {
  step: ConfiguratorStep;
  searchQuery: string;
  searchResults: ITunesTrack[];
  selectedTrack: ITunesTrack | null;
  isPlaying: boolean;
  aiSuggestion: AiSuggestion | null;
  uploadedPhoto: string | null;
  vinylPreview: string | null;
};

const initialState: ConfiguratorState = {
  step: 1,
  searchQuery: '',
  searchResults: [],
  selectedTrack: null,
  isPlaying: false,
  aiSuggestion: null,
  uploadedPhoto: null,
  vinylPreview: null,
};

const configuratorSlice = createSlice({
  name: 'configurator',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<ConfiguratorStep>) {
      state.step = action.payload;
    },
    nextStep(state) {
      if (state.step < 4) state.step = (state.step + 1) as ConfiguratorStep;
    },
    prevStep(state) {
      if (state.step > 1) state.step = (state.step - 1) as ConfiguratorStep;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSearchResults(state, action: PayloadAction<ITunesTrack[]>) {
      state.searchResults = action.payload;
    },
    selectTrack(state, action: PayloadAction<ITunesTrack | null>) {
      state.selectedTrack = action.payload;
      state.aiSuggestion = null;
      state.isPlaying = false;
    },
    setPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
    setAiSuggestion(state, action: PayloadAction<AiSuggestion | null>) {
      state.aiSuggestion = action.payload;
    },
    setUploadedPhoto(state, action: PayloadAction<string | null>) {
      state.uploadedPhoto = action.payload;
    },
    setVinylPreview(state, action: PayloadAction<string | null>) {
      state.vinylPreview = action.payload;
    },
    resetConfigurator() {
      return initialState;
    },
  },
});

export const {
  setStep,
  nextStep,
  prevStep,
  setSearchQuery,
  setSearchResults,
  selectTrack,
  setPlaying,
  setAiSuggestion,
  setUploadedPhoto,
  setVinylPreview,
  resetConfigurator,
} = configuratorSlice.actions;

export default configuratorSlice.reducer;
