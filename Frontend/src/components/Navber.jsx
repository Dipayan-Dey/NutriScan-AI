import { useState } from 'react';
import { Menu, X, Activity, LogIn, UserPlus, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authenticated, logout,isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-1 rounded-full group-hover:scale-110 transition-transform">
             <img src={logo} alt="" className='w-15'/>
            </div>
            <span className="text-2xl font-bold text-gray-900">
              NutriScan <span className="text-emerald-600">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Home
            </Link>
            <a 
              href="#features" 
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Features
            </a>
            <a 
              href="#about" 
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              About
            </a>
            <a 
              href="#pricing" 
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Pricing
            </a>
            
            {!isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link 
                  to="/login"
                  className="text-emerald-600 hover:text-emerald-700 font-semibold px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors flex items-center gap-2"
                >
                  <LogIn size={18} />
                  Login
                </Link>
                <Link 
                  to="/signup"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-md"
                >
                  <UserPlus size={18} />
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/dashboard"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-md"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors shadow-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-emerald-600 transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <a 
                href="#features" 
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
              <a 
                href="#about" 
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
              <a 
                href="#pricing" 
                className="text-gray-700 hover:text-emerald-600 font-medium transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </a>
              
              {!authenticated ? (
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                  <Link 
                    to="/login"
                    className="text-emerald-600 hover:text-emerald-700 font-semibold px-4 py-3 rounded-lg hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2 border-2 border-emerald-600"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn size={18} />
                    Login
                  </Link>
                  <Link 
                    to="/signup"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserPlus size={18} />
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                  <Link 
                    to="/dashboard"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-3 rounded-lg transition-colors shadow-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;