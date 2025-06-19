import { useState } from "react";
import { authService } from "../../services/authServices/authService";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import {
  validateEmail,
  validateStrongPassword,
} from "../../utils/validationUtils";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { handleLogin } = useAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validateStrongPassword(value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const emailValidation = validateEmail(email);
    const passwordValidation = validateStrongPassword(password);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    if (emailValidation || passwordValidation) {
      return;
    }

    try {
      const response = await authService.login(email, password);
      if (response.data?.token && response.data?.user) {
        handleLogin(response.data.token, response.data.user);
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (err: unknown) {
      toast.error(
        err instanceof Error
          ? err.message
          : "An error occurred, Try again later"
      );
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
            onChange={handleEmailChange}
            onBlur={() => setEmailError(validateEmail(email))}
            required
            className={`w-full p-2 border rounded-md ${
              emailError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {emailError && (
            <div className="mt-1 text-red-500 text-xs">{emailError}</div>
          )}
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label className="text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => setPasswordError(validateStrongPassword(password))}
            required
            className={`w-full p-2 border rounded-md ${
              passwordError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {passwordError && (
            <div className="mt-1 text-red-500 text-xs">{passwordError}</div>
          )}
        </div>
        <button
          type="submit"
          disabled={!!emailError || !!passwordError || !email || !password}
          className={`w-full p-2 rounded-md mt-4 ${
            emailError || passwordError || !email || !password
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-orange-300 text-black hover:bg-orange-400"
          }`}
        >
          Login
        </button>
      </form>
    </div>
  );
}
