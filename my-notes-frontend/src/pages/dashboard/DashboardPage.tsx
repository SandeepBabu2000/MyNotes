import { useState } from "react";
import Header from "../../components/dashboard/Header";
import NoteModal from "../../components/dashboard/NoteModal";
import AddNoteModal from "../../components/dashboard/AddNoteModal";
import NotesList from "../../components/dashboard/NotesList";
import type { Note } from "../../types/CommonTypes";

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Welcome to MyNotes",
      content:
        "This is your first note. Click on any note to view it in full screen. Use the + button to add new notes.",
      updatedAt: new Date(),
    },
    {
      id: "2",
      title: "Getting Started",
      content:
        "Here are some tips to get started:\n\n1. Click the + icon to add new notes\n2. Click on any note to view it in full screen\n3. Your notes are automatically saved\n4. Use the search feature to find specific notes",
      updatedAt: new Date(),
    },
  ]);

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddNote = (title: string, content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      updatedAt: new Date(),
    };
    setNotes([newNote, ...notes]);
    setIsAddModalOpen(false);
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
  };

  const handleCloseModal = () => {
    setSelectedNote(null);
  };

  const handleDeleteNote = () => {
    setNotes(notes.filter((note) => note.id !== selectedNote?.id));
    setSelectedNote(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddNote={() => setIsAddModalOpen(true)} userName={"Sandeep"} />
      <main className="container mx-auto px-4 py-6">
        <NotesList notes={notes} onNoteClick={handleNoteClick} />
      </main>

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={handleCloseModal}
          onDelete={handleDeleteNote}
        />
      )}

      {isAddModalOpen && (
        <AddNoteModal
          onAdd={handleAddNote}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
}
