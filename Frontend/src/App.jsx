import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/pages/Dashboard";
import Navbar from "./components/Navber";
import { useAuth } from "./context/AuthContext";
import LandingPage from "./components/pages/LandingPage";
import Footer from "./components/Footer";
function App() {
  const { authenticated } = useAuth();
  const location = useLocation();

  // Navbar should hide ONLY on login & signup
  const hideNav = location.pathname === "/login" || location.pathname === "/signup";

  // Footer should hide on login, signup, AND dashboard
  const hideFooter = hideNav || location.pathname === "/dashboard";

  return (
    <>
      {!hideNav && <Navbar />}
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}


export default App;