import AddNoteIcon from "../../assets/icons/AddIcon.png";
import MyNotesIcon from "../../assets/icons/MyNotesIcon.png";
import ProfileCard from "./ProfileCard";
import useAuth from "../../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { openAndCloseProfileModal } from "../../store/slices/uiSlice";

interface HeaderProps {
  onAddNote: () => void;
}

export default function Header({ onAddNote }: HeaderProps) {
  const dispatch = useAppDispatch();
  const isProfileModalOpen = useAppSelector(
    (state) => state.ui.isProfileModalOpen
  );
  const { handleLogout, user } = useAuth();

  const handleProfileClick = () => {
    dispatch(openAndCloseProfileModal());
  };

  const userName = user?.email || "";

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
            <div className="relative">
              <div
                onClick={handleProfileClick}
                className="flex items-center cursor-pointer justify-center w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-200 font-bold text-2xl text-orange-500"
              >
                {userName.charAt(0).toUpperCase()}
              </div>
              {isProfileModalOpen && (
                <ProfileCard userName={userName} handleLogout={handleLogout} />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
