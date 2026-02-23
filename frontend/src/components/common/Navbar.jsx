import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img src="/assets/logo.jpeg"
                className="md:w-full h-15 w-3/4 h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {[
              { path: "/", label: "Home" },
              { path: "/about", label: "About" },
              { path: "/listings", label: "Listings" },
              { path: "/faq", label: "FAQs"},
              { path: "/contact", label: "Contact Us"}, 
              
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? "text-[#3BC0E9] "
                    : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <>
                {(user.role === "lister" || user.role === "admin") && (
                  <Link
                    to={`/${user.role}/dashboard`}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(`/${user.role}/dashboard`)
                        ? "text-[#3BC0E9] bg-blue-50"
                        : "text-gray-700 hover:text-[#3BC0E9] hover:bg-gray-50"
                    }`}
                  >
                    {user.role === "admin" ? "Admin" : "Dashboard"}
                  </Link>
                )}

                <div className="relative group ml-4">
                  <button className="flex items-center space-x-2 focus:outline-none">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#3BC0E9] to-[#95BDCB] flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                    <svg
                      className="w-4 h-4 text-gray-400 transition-transform group-hover:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white border border-gray-100">
                    <div className="p-4 border-b border-gray-100">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                      <span className="inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-[#3BC0E9]">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm border border-gray-200 rounded-sm font-medium text-gray-700 hover:text-[#3BC0E9] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] rounded-lg hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  
                  List Your Sublet
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 my-1 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-white border-t border-gray-100`}
      >
        <div className="px-4 py-4 space-y-1">
          {[
            { path: "/", label: "Home" },
            { path: "/about", label: "About" },
            { path: "/listings", label: "Listings" },
            { path: "/faq", label: "FAQs"},
            { path: "/contact", label: "Contact Us"}
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMobileMenu}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                isActive(item.path)
                  ? "text-[#3BC0E9] bg-blue-50"
                  : "text-gray-700 hover:text-[#3BC0E9] hover:bg-gray-50"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {user ? (
            <>
              {(user.role === "lister" || user.role === "admin") && (
                <Link
                  to={`/${user.role}/dashboard`}
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(`/${user.role}/dashboard`)
                      ? "text-[#3BC0E9] bg-blue-50"
                      : "text-gray-700 hover:text-[#3BC0E9] hover:bg-gray-50"
                  }`}
                >
                  {user.role === "admin" ? "Admin" : "Dashboard"}
                </Link>
              )}

              <div className="px-4 py-3 mt-2 border-t border-gray-100">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                <span className="inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-50 text-[#3BC0E9]">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>

              <button
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-red-500 hover:bg-red-50 transition-colors flex items-center space-x-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Log Out</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-[#3BC0E9] hover:bg-gray-50 transition-colors border border-gray-200 text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="block px-4 py-3 rounded-lg text-base font-medium text-white bg-gradient-to-r from-[#3BC0E9] to-[#95BDCB] hover:shadow-md transition-all text-center"
              >
                Become a Lister
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}