import {} from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/login/LoginForm.tsx";
import MyNotesIcon from "../../assets/icons/MyNotesIcon.png";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-orange-500 mb-10 flex items-center justify-center">
        My Notes <img src={MyNotesIcon} className="w-12 h-12 ml-5" />
      </h1>
      <div className="max-w-lg mx-4 p-6 bg-white rounded-lg shadow-md border-2 border-orange-500">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <LoginForm />
        <p className="mt-4 text-center">
          New user? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}
