import { useState } from "react";
import { authService } from "../../services/authServices/authService";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    try {
      const response = await authService.register(email, password);
      if (response.id) {
        navigate("/");
      } else {
        setError("Signup failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred during signup. Please try again.");
      console.error("Signup error:", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col items-start">
          <label className="text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label className="text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label className="text-sm font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          type="submit"
          className="w-full p-2 bg-orange-300 text-black rounded-md mt-4"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
