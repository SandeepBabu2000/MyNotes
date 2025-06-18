import AddNoteIcon from "../../assets/icons/AddIcon.png";
import MyNotesIcon from "../../assets/icons/MyNotesIcon.png";

interface HeaderProps {
  userName: string;
  onAddNote: () => void;
}

export default function Header({ userName, onAddNote }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-orange-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={MyNotesIcon} alt="MyNotes" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-orange-500">My Notes</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div
              onClick={onAddNote}
              className="cursor-pointer hover:scale-110 transition-transform duration-200"
            >
              <img src={AddNoteIcon} alt="Add Note" className="w-10 h-10" />
            </div>
            <button className="flex items-center justify-center w-10 h-10 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full transition-colors duration-200 font-bold text-lg text-orange-500">
              {userName.charAt(0)}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
