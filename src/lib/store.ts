import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "../components/features/habits/habitsSlice";
import settingsReducer from "@/components/features/settings/settingsSlice";

export const store = configureStore({
  reducer: {
    habit: habitReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types

export default store;
