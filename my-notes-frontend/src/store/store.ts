import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import noteReducer from "./slices/noteSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    notes: noteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "ui/openAddNoteModal"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
