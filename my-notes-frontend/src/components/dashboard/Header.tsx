import { useState } from "react";
import AddNoteIcon from "../../assets/icons/AddIcon.png";
import MyNotesIcon from "../../assets/icons/MyNotesIcon.png";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../assets/icons/LogoutIcon.png";

interface HeaderProps {
  userName: string;
  onAddNote: () => void;
}

export default function Header({ userName, onAddNote }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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
                {userName.charAt(0)}
              </div>
              {isProfileOpen && (
                <div className="absolute top-10 right-0 mt-2 w-48 p-2 z-50 gap-4 flex flex-col justify-center bg-gray-100 shadow-lg rounded-md border-2 border-gray-200">
                  <div className="text-gray-700 font-bold text-lg p-1 flex items-center justify-center gap-2">
                    Hi {userName}
                  </div>
                  <div
                    onClick={handleLogout}
                    className="text-gray-700 font-bold text-lg p-1 cursor-pointer flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 rounded-md border-1 border-gray-400 transition-colors duration-200"
                  >
                    Logout{" "}
                    <img src={LogoutIcon} alt="Logout" className="w-5 h-5" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
