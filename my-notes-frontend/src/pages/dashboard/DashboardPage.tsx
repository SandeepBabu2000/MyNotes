import { useEffect, useState } from "react";
import Header from "../../components/dashboard/Header";
import NoteModal from "../../components/dashboard/NoteModal";
import AddNoteModal from "../../components/dashboard/AddNoteModal";
import NotesList from "../../components/dashboard/NotesList";
import type { Note } from "../../types/CommonTypes";
import { noteService } from "../../services/notesServices/NoteServices";
import useAuthGuard from "../../hooks/useAuthGuard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  closeAddNoteModal,
  closeNoteModal,
  openAddNoteModal,
  openNoteModal,
} from "../../store/slices/uiSlice";

export default function DashboardPage() {
  const dispatch = useAppDispatch();

  const [notes, setNotes] = useState<Note[]>([]);
  const { isAddNoteModalOpen, isNoteModalOpen } = useAppSelector(
    (state) => state.ui
  );
  const selectedNote = useAppSelector((state) => state.ui.selectedNote);

  useAuthGuard();

  const fetchNotes = async () => {
    const fetchedNotes = await noteService.getNotes();
    setNotes(fetchedNotes);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = () => {
    fetchNotes();
    dispatch(closeAddNoteModal());
  };

  const handleNoteClick = (note: Note) => {
    dispatch(openNoteModal(note));
  };

  const handleCloseModal = () => {
    dispatch(closeNoteModal());
  };

  const handleDeleteNote = () => {
    fetchNotes();
    dispatch(closeNoteModal());
  };

  const handleEditNote = () => {
    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddNote={() => dispatch(openAddNoteModal())} />
      <main className="container mx-auto px-4 py-6">
        <NotesList notes={notes} onNoteClick={handleNoteClick} />
      </main>

      {isNoteModalOpen && (
        <NoteModal
          note={selectedNote}
          onClose={handleCloseModal}
          onDelete={handleDeleteNote}
          onEdit={handleEditNote}
        />
      )}

      {isAddNoteModalOpen && (
        <AddNoteModal
          onAdd={handleAddNote}
          onClose={() => dispatch(closeAddNoteModal())}
          isOpen={isAddNoteModalOpen}
        />
      )}
    </div>
  );
}
