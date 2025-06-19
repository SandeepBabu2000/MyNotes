import type { Note } from "../../types/CommonTypes";
import DateChip from "../chip/datechip";
import { getCurrentUserId } from "../../utils/tokenUtils";
import ConnectedIcon from "../../assets/icons/ConnectedIcon.png";

interface NoteTileProps {
  note: Note;
  onNoteClick: (note: Note) => void;
}

export default function NoteTile({ note, onNoteClick }: NoteTileProps) {
  const currentUserId = getCurrentUserId();
  const isSharedNote = currentUserId && note.ownerId !== currentUserId;
  const isOwnedByCurrentUser = currentUserId && note.ownerId === currentUserId;
  const isSharedWithOthers =
    isOwnedByCurrentUser && note.shared && note.shared.length > 0;

  return (
    <div
      key={note.id}
      onClick={() => onNoteClick(note)}
      className={`bg-white rounded-lg shadow-sm border min-h-[150px] p-4 pt-2 cursor-pointer hover:shadow-md transition-shadow duration-200 hover:border-gray-300 relative ${
        isSharedNote
          ? "border-blue-200 hover:border-blue-300"
          : "border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        {isSharedNote && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            Shared
          </span>
        )}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
          {note.title}
        </h3>
        {isSharedNote && (
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors duration-200 font-bold text-sm text-blue-600 ml-2 flex-shrink-0">
            {note.owner.email.charAt(0).toUpperCase()}
          </div>
        )}
        {isSharedWithOthers && (
          <img src={ConnectedIcon} alt="Shared Note" className="w-6 h-6" />
        )}
      </div>
      <div
        className="text-gray-700 leading-relaxed flex items-start h-full w-full"
        dangerouslySetInnerHTML={{ __html: note.content }}
      ></div>

      <DateChip date={note.lastEdited} />
    </div>
  );
}
