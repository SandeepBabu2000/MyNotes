import { useEffect } from "react";
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
import { setNotes, setLoading, setError } from "../../store/slices/noteSlice";

export default function DashboardPage() {
  const dispatch = useAppDispatch();

  const { notes, loading, error } = useAppSelector((state) => state.notes);
  const { isAddNoteModalOpen, isNoteModalOpen } = useAppSelector(
    (state) => state.ui
  );
  const selectedNote = useAppSelector((state) => state.ui.selectedNote);

  useAuthGuard();

  const fetchNotes = async () => {
    try {
      dispatch(setLoading(true));
      const fetchedNotes = await noteService.getNotes();
      dispatch(setNotes(fetchedNotes));
    } catch (err) {
      dispatch(
        setError(err instanceof Error ? err.message : "Failed to fetch notes")
      );
    }
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

  const handleDeleteNote = () => {
    fetchNotes();
    dispatch(closeNoteModal());
  };

  const handleEditNote = () => {
    fetchNotes();
  };

  const handleShareNote = () => {
    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddNote={() => dispatch(openAddNoteModal())} />
      <main className="container mx-auto px-4 py-6">
        {loading && <div className="text-center py-4">Loading notes...</div>}
        {error && <div className="text-center py-4 text-red-600">{error}</div>}
        <NotesList notes={notes} onNoteClick={handleNoteClick} />
      </main>

      {isNoteModalOpen && (
        <NoteModal
          note={selectedNote}
          onDelete={handleDeleteNote}
          onEdit={handleEditNote}
          onShare={handleShareNote}
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
