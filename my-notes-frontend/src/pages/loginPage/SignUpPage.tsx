import {} from "react";
import { Link } from "react-router-dom";
import MyNotesIcon from "../../assets/icons/MyNotesIcon.png";
import SignUpForm from "../../components/signup/SignUpForm.tsx";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-orange-500 mb-10 flex items-center justify-center">
        My Notes <img src={MyNotesIcon} className="w-12 h-12 ml-5" />
      </h1>
      <div className="max-w-lg w-full mx-4 p-6 bg-white rounded-lg shadow-md border-2 border-orange-500">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <SignUpForm />
        <p className="mt-4 text-center">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
}
