import type { Note } from "../../types/CommonTypes";
import CloseIcon from "../../assets/icons/CloseIcon.png";

interface NoteModalProps {
  note: Note;
  onClose: () => void;
  onDelete: () => void;
}

export default function NoteModal({ note, onClose, onDelete }: NoteModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden p-3">
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{note.title}</h2>
          <div
            onClick={onClose}
            className="cursor-pointer hover:scale-110 transition-transform duration-200"
          >
            <img src={CloseIcon} alt="Close" className="w-8 h-8" />
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {note.content}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            <span>
              Last Updated: {note.updatedAt.toLocaleDateString()} at{" "}
              {note.updatedAt.toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onDelete}
              className="px-4 py-2 border border-red-500 hover:bg-red-100 text-red-500 rounded-md transition-colors duration-200"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
