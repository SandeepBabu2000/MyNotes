import EmptyNotesIcon from "../../assets/icons/EmptyNotesIcon.png";
import AddNoteIcon from "../../assets/icons/AddIcon.png";
import type { Note } from "../../types/CommonTypes";

interface NotesListProps {
  notes: Note[];
  onNoteClick: (note: Note) => void;
}

export default function NotesList({ notes, onNoteClick }: NotesListProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4 flex justify-center items-center">
          <img src={EmptyNotesIcon} alt="No Notes" className="w-16 h-16" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
        <p className="text-gray-500">
          Create your first note by clicking the
          <img
            src={AddNoteIcon}
            alt="Add Note"
            className="w-6 h-6 inline-block mb-1 mr-1"
          />
          button
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {notes.map((note) => (
        <div
          key={note.id}
          onClick={() => onNoteClick(note)}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow duration-200 hover:border-gray-300 relative"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {note.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {note.content}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500 absolute bottom-4 right-4 gap-2">
            <span>{note.updatedAt.toLocaleDateString()}</span>
            <span>
              {note.updatedAt.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
