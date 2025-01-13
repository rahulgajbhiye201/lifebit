import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  setSetting,
  getAllSettings,
} from "@/components/features/settings/db/settings";

// Async thunk to load settings from IndexedDB
export const loadSettings = createAsyncThunk("settings/load", async () => {
  return await getAllSettings();
});

// Async thunk to save a specific setting to IndexedDB
export const saveSetting = createAsyncThunk(
  "settings/save",
  async ({ key, value }, { dispatch }) => {
    await setSetting(key, value);
    return { key, value };
  },
);

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    theme: "light", // default setting
    language: "en", // default setting
    status: "idle", // to track loading status
  },
  reducers: {
    updateSetting: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSettings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadSettings.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload); // merge settings from IndexedDB
      })
      .addCase(loadSettings.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(saveSetting.fulfilled, (state, action) => {
        state[action.payload.key] = action.payload.value;
      });
  },
});

export const { updateSetting } = settingsSlice.actions;

export default settingsSlice.reducer;
