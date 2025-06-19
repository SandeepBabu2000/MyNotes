import { useEffect, useState } from "react";
import Header from "../../components/dashboard/Header";
import NoteModal from "../../components/dashboard/NoteModal";
import AddNoteModal from "../../components/dashboard/AddNoteModal";
import NotesList from "../../components/dashboard/NotesList";
import type { Note } from "../../types/CommonTypes";
import { noteService } from "../../services/notesServices/NoteServices";
import useAuthGuard from "../../hooks/useAuthGuard";

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
    setIsAddModalOpen(false);
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleCloseModal = () => {
    setSelectedNote(null);
  };

  const handleDeleteNote = () => {
    fetchNotes();
    setSelectedNote(null);
  };

  const handleEditNote = () => {
    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddNote={() => setIsAddModalOpen(true)} />
      <main className="container mx-auto px-4 py-6">
        <NotesList notes={notes} onNoteClick={handleNoteClick} />
      </main>

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={handleCloseModal}
          onDelete={handleDeleteNote}
          onEdit={handleEditNote}
        />
      )}

      {isAddModalOpen && (
        <AddNoteModal
          onAdd={handleAddNote}
          onClose={() => setIsAddModalOpen(false)}
          isOpen={isAddModalOpen}
        />
      )}
    </div>
  );
}
