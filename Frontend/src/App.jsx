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
  
  // Hide navbar on login and signup pages
  const hideNavFoot = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavFoot && <Navbar />}
      <Toaster position="top-right" />

      <Routes>
        {/* Landing page - redirect to dashboard if authenticated */}
        <Route 
          path="/" 
          element={ <LandingPage />} 
        />

        {/* Login - redirect to dashboard if already authenticated */}
        <Route 
          path="/login" 
          element={ <Login />} 
        />
        
        {/* Signup - redirect to dashboard if already authenticated */}
        <Route 
          path="/signup" 
          element={ <Signup />} 
        />

        {/* Protected Dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!hideNavFoot&& <Footer/>}
    </>
  );
}

export default App;