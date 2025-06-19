import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Note } from "../../types/CommonTypes";

interface UIState {
  isAddNoteModalOpen: boolean;
  isNoteModalOpen: boolean;
  isEditNoteModalOpen: boolean;
  isShareModalOpen: boolean;
  isProfileModalOpen: boolean;
  selectedNote: Note | null;
}

const initialState: UIState = {
  isAddNoteModalOpen: false,
  isNoteModalOpen: false,
  isEditNoteModalOpen: false,
  isShareModalOpen: false,
  isProfileModalOpen: false,
  selectedNote: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAddNoteModal: (state) => {
      state.isAddNoteModalOpen = true;
    },
    closeAddNoteModal: (state) => {
      state.isAddNoteModalOpen = false;
    },
    openNoteModal: (state, action: PayloadAction<Note>) => {
      state.isNoteModalOpen = true;
      state.selectedNote = action.payload;
    },
    closeNoteModal: (state) => {
      state.isNoteModalOpen = false;
      state.selectedNote = null;
    },
    openEditNoteModal: (state, action: PayloadAction<Note>) => {
      state.isEditNoteModalOpen = true;
      state.selectedNote = action.payload;
    },
    closeEditNoteModal: (state) => {
      state.isEditNoteModalOpen = false;
      state.selectedNote = state.selectedNote ?? null;
    },
    openShareModal: (state) => {
      state.isShareModalOpen = true;
    },
    closeShareModal: (state) => {
      state.isShareModalOpen = false;
    },
    openAndCloseProfileModal: (state) => {
      state.isProfileModalOpen = !state.isProfileModalOpen;
    },
  },
});

export const {
  openAddNoteModal,
  closeAddNoteModal,
  openNoteModal,
  closeNoteModal,
  openShareModal,
  closeShareModal,
  openAndCloseProfileModal,
  openEditNoteModal,
  closeEditNoteModal,
} = uiSlice.actions;

export default uiSlice.reducer;
