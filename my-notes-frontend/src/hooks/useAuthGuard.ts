import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/tokenUtils";

export default function useAuthGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      navigate("/");
    }
  }, [navigate]);
}
