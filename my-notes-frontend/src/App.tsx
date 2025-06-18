import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUpPage from "./pages/loginPage/SignUpPage.tsx";
import LoginPage from "./pages/loginPage/LoginPage.tsx";
import DashboardPage from "./pages/dashboard/DashboardPage.tsx";
import { isTokenExpired } from "./utils/tokenUtils";
import type { ReactElement } from "react";

function PrivateRoute({ children }: { children: ReactElement }) {
  const token = localStorage.getItem("token");
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
