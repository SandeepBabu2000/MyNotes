import LogoutIcon from "../../assets/icons/LogoutIcon.png";

interface ProfileCardProps {
  userName: string;
  handleLogout: () => void;
}

export default function ProfileCard({
  userName,
  handleLogout,
}: ProfileCardProps) {
  return (
    <div className="absolute top-10 right-0 mt-2 w-auto p-2 z-50 gap-4 flex flex-col justify-center bg-gray-100 shadow-lg rounded-md border-2 border-gray-200">
      <div className="text-gray-700 font-bold text-lg p-1 flex items-center justify-center gap-2">
        Hi {userName}
      </div>
      <div
        onClick={handleLogout}
        className="text-gray-700 font-bold text-lg p-1 cursor-pointer flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 rounded-md border-1 border-gray-400 transition-colors duration-200"
      >
        Logout <img src={LogoutIcon} alt="Logout" className="w-5 h-5" />
      </div>
    </div>
  );
}
