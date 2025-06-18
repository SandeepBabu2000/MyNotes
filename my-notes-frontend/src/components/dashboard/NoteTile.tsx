import type { Note } from "../../types/CommonTypes";
import DateChip from "../chip/datechip";

interface NoteTileProps {
  note: Note;
  onNoteClick: (note: Note) => void;
}

export default function NoteTile({ note, onNoteClick }: NoteTileProps) {
  return (
    <div
      key={note.id}
      onClick={() => onNoteClick(note)}
      className="bg-white rounded-lg shadow-sm border min-h-[150px] border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow duration-200 hover:border-gray-300 relative"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {note.title}
      </h3>
      <div
        className="text-gray-700 leading-relaxed flex items-start h-full w-full"
        dangerouslySetInnerHTML={{ __html: note.content }}
      ></div>
      <DateChip date={note.lastEdited} />
    </div>
  );
}
