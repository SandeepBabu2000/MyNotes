import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Note } from "../../types/CommonTypes";

interface NoteState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}

const initialState: NoteState = {
  notes: [],
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setNotes, setLoading, setError } = noteSlice.actions;

export default noteSlice.reducer;
