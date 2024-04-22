import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  foccussed: false,
  focusText: "",
  searchResult: null,
  resultCompleted: false,
  titleVisible: true,
  paramsVisible: true,
  searchBtnPos: "down",
  isLoading: false,
  isError: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialAuthState,
  reducers: {
    focusAction(state) {
      state.foccussed = !state.foccussed;
    },

    focusItemSelected(state, action) {
      const payload = action.payload;
      if (payload) {
        state.focusItemNumber = payload.focusItemNumber;
      }
    },

    initiateSearch(state) {
      state.searchResult = null;
      state.resultCompleted = false;
      state.titleVisible = true;
      state.paramsVisible = true;
      state.searchBtnPos = "down";
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    },

    setLoading(state) {
      state.isLoading = true;
      state.isError = false;
      state.searchResult = null;
    },

    setSearchResult(state, action) {
      const payload = action.payload;
      state.searchResult = payload.result;
      state.resultCompleted = payload.resultCompleted;

      state.isLoading = false;
      state.foccussed = false;
      state.titleVisible = false;
      state.paramsVisible = false;
      state.searchBtnPos = "right";
    },

    markResultsCompleted(state) {
      state.resultCompleted = true;
    },

    setError(state, action) {
      const payload = action.payload;
      state.error = payload.error;

      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
