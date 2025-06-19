import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Note, AddNote } from "../../types/CommonTypes";
import { noteService } from "../../services/notesServices/NoteServices";

// Types
interface NotesState {
  notes: Note[];
  currentNote: Note | null;
  isLoading: boolean;
  error: string | null;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
}

// Initial state
const initialState: NotesState = {
  notes: [],
  currentNote: null,
  isLoading: false,
  error: null,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
};

// Async thunks
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await noteService.getNotes();
      return response.data as Note[];
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch notes");
    }
  }
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  async (noteData: AddNote, { rejectWithValue }) => {
    try {
      const response = await noteService.createNote(noteData);
      return response.data as Note;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create note");
    }
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async (
    { id, noteData }: { id: string; noteData: Partial<AddNote> },
    { rejectWithValue }
  ) => {
    try {
      const response = await noteService.updateNote(id, noteData);
      return response.data as Note;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update note");
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id: string, { rejectWithValue }) => {
    try {
      await NoteServices.deleteNote(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to delete note");
    }
  }
);

// Slice
const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setCurrentNote: (state, action: PayloadAction<Note | null>) => {
      state.currentNote = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    addNoteToState: (state, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload);
    },
    updateNoteInState: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    removeNoteFromState: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notes
      .addCase(fetchNotes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = action.payload;
        state.error = null;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create note
      .addCase(createNote.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isCreating = false;
        state.notes.unshift(action.payload);
        state.error = null;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      })
      // Update note
      .addCase(updateNote.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.isUpdating = false;
        const index = state.notes.findIndex(
          (note) => note.id === action.payload.id
        );
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
        if (state.currentNote?.id === action.payload.id) {
          state.currentNote = action.payload;
        }
        state.error = null;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as string;
      })
      // Delete note
      .addCase(deleteNote.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.notes = state.notes.filter((note) => note.id !== action.payload);
        if (state.currentNote?.id === action.payload) {
          state.currentNote = null;
        }
        state.error = null;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentNote,
  clearError,
  addNoteToState,
  updateNoteInState,
  removeNoteFromState,
} = notesSlice.actions;

export default notesSlice.reducer;
