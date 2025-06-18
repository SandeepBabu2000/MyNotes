import { useState } from "react";
import { authService } from "../../services/authServices/authService";
import useAuth from "../../hooks/useAuth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { handleLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const response = await authService.login(email, password);
      if (response.token && response.user) {
        handleLogin(response.token, response.user);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full">
        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
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
        <div className=" flex flex-col items-start">
          <label className="w-20 text-sm font-medium text-left">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-orange-300 text-black rounded-md mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
}
