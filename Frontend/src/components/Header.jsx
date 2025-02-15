import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "../redux/user/userSlice";
import { Menu, X, User } from "react-feather";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const desktopMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSignOut = async () => {
    try {
      await fetch("/backend/auth/signout");
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopMenuRef.current && !desktopMenuRef.current.contains(event.target)) {
        setDesktopMenuOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <header className="bg-gradient-to-b from-purple-100 to-blue-50 shadow-md sticky top-0 backdrop-blur-md bg-opacity-70 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link 
              to={currentUser ? "/dashboard" : "/"} 
              className="text-2xl md:text-3xl font-extrabold text-purple-700 hover:text-purple-800 transition-colors"
            >
              NexusEvents
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-4">
              {!currentUser ? (
                <Link to="/" className="nav-link">
                  Home
                </Link>
              ) : (
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              )}
              <Link to="/events" className="nav-link">
                Events
              </Link>
              <Link to="/about" className="nav-link">
                About
              </Link>
              <Link to="/contactus" className="nav-link">
                Contact
              </Link>
            </nav>

            {/* Desktop Profile Dropdown */}
            {currentUser ? (
              <div className="relative ml-4" ref={desktopMenuRef}>
                <button
                  onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
                  className="flex items-center focus:outline-none"
                  aria-label="User menu"
                >
                  {currentUser.profilePicture ? (
                    <img
                      src={currentUser.profilePicture}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover border-2 border-purple-700"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center border-2 border-purple-700">
                      <User className="h-4 w-4 text-purple-700" />
                    </div>
                  )}
                </button>

                {desktopMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <DropdownItem 
                      onClick={() => navigate("/profile")}
                      label="View Profile"
                    />
                    <DropdownItem 
                      onClick={() => navigate("/settings")}
                      label="Settings"
                    />
                    <DropdownItem 
                      onClick={handleSignOut}
                      label="Sign Out"
                      isRed
                    />
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/sign-in"
                className="ml-4 bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            ref={mobileMenuRef} 
            className="md:hidden absolute w-full bg-white shadow-lg z-40 left-0 right-0"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {!currentUser ? (
                <MobileNavItem to="/" onClick={toggleMobileMenu}>
                  Home
                </MobileNavItem>
              ) : (
                <MobileNavItem to="/dashboard" onClick={toggleMobileMenu}>
                  Dashboard
                </MobileNavItem>
              )}
              <MobileNavItem to="/events" onClick={toggleMobileMenu}>
                Events
              </MobileNavItem>
              <MobileNavItem to="/about" onClick={toggleMobileMenu}>
                About
              </MobileNavItem>
              <MobileNavItem to="/contactus" onClick={toggleMobileMenu}>
                Contact
              </MobileNavItem>

              {/* Mobile Profile Section */}
              {currentUser && (
                <div className="border-t pt-2 mt-2">
                  <MobileNavItem to="/profile" onClick={toggleMobileMenu}>
                    Profile
                  </MobileNavItem>
                  <MobileNavItem to="/settings" onClick={toggleMobileMenu}>
                    Settings
                  </MobileNavItem>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// Reusable Dropdown Item Component
const DropdownItem = ({ onClick, label, isRed = false }) => (
  <button
    onClick={onClick}
    className={`block w-full text-left px-4 py-2 text-sm ${
      isRed ? 'text-red-600 hover:bg-red-50' : 'text-gray-700 hover:bg-purple-50'
    } transition-colors`}
  >
    {label}
  </button>
);

// Reusable Mobile Nav Item Component
const MobileNavItem = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-3 py-2 text-gray-700 hover:bg-purple-50 rounded-md"
  >
    {children}
  </Link>
);

// CSS-in-JS for repeated styles
const navLinkStyle = "text-gray-700 hover:text-purple-700 px-3 py-2 transition-colors";

