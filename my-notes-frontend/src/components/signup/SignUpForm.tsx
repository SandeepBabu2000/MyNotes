import { useState } from "react";
import { authService } from "../../services/authServices/authService";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validateStrongPassword,
  validateConfirmPassword,
} from "../../utils/validationUtils";
import { toast } from "react-toastify";
import EyeOpenIcon from "../../assets/icons/EyeOpenIcon.png";
import EyeCloseIcon from "../../assets/icons/EyeCloseIcon.png";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(validateConfirmPassword(password, value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const emailValidation = validateEmail(email);
    const passwordValidation = validateStrongPassword(password);
    const confirmPasswordValidation = validateStrongPassword(confirmPassword);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);
    setConfirmPasswordError(confirmPasswordValidation);

    if (emailValidation || passwordValidation || confirmPasswordValidation) {
      return;
    }

    try {
      const response = await authService.register(email, password);
      if (response.status === 201) {
        navigate("/");
        toast.success(response.message || "Signup successful");
      } else {
        toast.error(response.message || "Signup failed");
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "An error occurred during signup. Please try again."
      );
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
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => setPasswordError(validateStrongPassword(password))}
              required
              className={`w-full p-2 pr-10 border rounded-md ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <img
                  src={EyeOpenIcon}
                  alt="Hide password"
                  className="w-5 h-5"
                />
              ) : (
                <img
                  src={EyeCloseIcon}
                  alt="Show password"
                  className="w-5 h-5"
                />
              )}
            </div>
          </div>
          {passwordError && (
            <div className="mt-1 text-red-500 text-xs">{passwordError}</div>
          )}
        </div>
        <div className="mb-4 flex flex-col items-start">
          <label className="text-sm font-medium mb-2">Confirm Password</label>
          <div className="relative w-full">
            <input
              type={"text"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={() =>
                setConfirmPasswordError(
                  validateConfirmPassword(password, confirmPassword)
                )
              }
              required
              className={`w-full p-2 pr-10 border rounded-md ${
                confirmPasswordError ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {confirmPasswordError && (
            <div className="mt-1 text-red-500 text-xs">
              {confirmPasswordError}
            </div>
          )}
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          type="submit"
          disabled={
            !!emailError ||
            !!passwordError ||
            !!confirmPasswordError ||
            !email ||
            !password ||
            !confirmPassword
          }
          className={`w-full p-2 rounded-md mt-4 ${
            emailError ||
            passwordError ||
            confirmPasswordError ||
            !email ||
            !password ||
            !confirmPassword
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-orange-300 text-black hover:bg-orange-400"
          }`}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
