import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getData, updateData } from "@/components/features/habits/db/habits";

import { IHabitData } from "@/schema";

export interface HabitState {
  habitData: IHabitData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: HabitState = {
  habitData: null,
  status: "idle",
  error: null,
};

// Async thunk to fetch habit data
export const fetchHabitData = createAsyncThunk(
  "habit/fetchHabitData",
  async (id: number) => {
    const data = await getData(id);
    return data;
  },
);

// Async thunk to update habit data
export const editHabitData = createAsyncThunk(
  "habit/editHabitData",
  async (updatedHabit: IHabitData) => {
    await updateData(updatedHabit);
    return updatedHabit;
  },
);

const habitSlice = createSlice({
  name: "habit",
  initialState,
  reducers: {
    resetHabitData(state) {
      state.habitData = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabitData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchHabitData.fulfilled,
        (state, action: PayloadAction<IHabitData>) => {
          state.status = "succeeded";
          state.habitData = action.payload;
        },
      )
      .addCase(fetchHabitData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch data";
      })
      .addCase(
        editHabitData.fulfilled,
        (state, action: PayloadAction<IHabitData>) => {
          state.habitData = action.payload;
        },
      );
  },
});

export const { resetHabitData } = habitSlice.actions;
export default habitSlice.reducer;
