import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NavBar({ setCurrentUser, currentUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [exploreOpen, setExploreOpen] = useState(false);

  // Check if user is logged in when component mounts
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    // If no token and trying to access protected routes, redirect to login
    if (
      !token &&
      !currentUser &&
      !window.location.pathname.includes("/login") &&
      !window.location.pathname.includes("/signup")
    ) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleExplore = () => {
    setExploreOpen(!exploreOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the JWT
    setCurrentUser(null); // Clear user state
    navigate("/"); // Redirect to login
  };

  return (
    <nav className="mx-auto flex items-center justify-around py-4">
      {/* Logo */}
      <a
        href="/"
        class="text-3xl font-bold tracking-wider text-[#023047] font-['Montserrat',_sans-serif] relative inline-block hover:scale-105 transition-transform duration-300 no-underline"
      >
        <span class="text-[#FB8500] font-extrabold">X</span>plorr
        <span class="absolute -bottom-1 left-0 w-0 h-1 bg-[#FB8500] hover:w-full transition-all duration-300 rounded-full"></span>
        <div class="absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-[#FB8500] rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </a>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-700 focus:outline-none"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex md:items-center gap-6">
        {currentUser ? (
          // Only show these navigation links when logged in
          <>
            <NavLink
              exact="true"
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "mr-5 font-bold text-[#023047] decoration-[#FB8500] underline underline-offset-4 decoration-2"
                  : "mr-5 font-bold text-[#979797] hover:text-[#023047] relative"
              }
            >
              Home
            </NavLink>

            {/* Dropdown */}
            <div className="relative group mr-5">
              <span className="font-bold text-[#979797] hover:text-[#023047] cursor-pointer">
                Explore
              </span>
              <div className="hidden group-hover:block absolute left-0 top-full min-w-40 bg-[#f9f9f9] shadow-lg z-10">
                <NavLink
                  to="/explore/cities"
                  className="block px-4 py-3 text-black hover:bg-[#f1f1f1]"
                >
                  Cities
                </NavLink>
                <NavLink
                  to="/explore/beaches"
                  className="block px-4 py-3 text-black hover:bg-[#f1f1f1]"
                >
                  Beaches
                </NavLink>
                <NavLink
                  to="/explore/snowmountains"
                  className="block px-4 py-3 text-black hover:bg-[#f1f1f1]"
                >
                  Snow Mountains
                </NavLink>
                <NavLink
                  to="/explore/forests"
                  className="block px-4 py-3 text-black hover:bg-[#f1f1f1]"
                >
                  Forests
                </NavLink>
              </div>
            </div>

            <NavLink
              to="/goals"
              className={({ isActive }) =>
                isActive
                  ? "mr-5 font-bold text-[#023047] decoration-[#FB8500] underline underline-offset-4 decoration-2"
                  : "mr-5 font-bold text-[#979797] hover:text-[#023047] relative"
              }
            >
              Goals
            </NavLink>
          </>
        ) : null}

        {/* Authentication Links */}
        {currentUser ? (
          // Show logout button when user is logged in
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            Logout
          </button>
        ) : (
          // Show login/signup links when user is not logged in
          <div className="flex items-center">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "mr-8 font-bold text-[#023047] decoration-[#FB8500] underline underline-offset-4 decoration-2"
                  : "mr-8 font-bold text-[#979797] hover:text-[#023047]"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-[#FB8500] hover:bg-[#e67a00] text-white px-4 py-2 rounded transition"
            >
              Sign Up
            </NavLink>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md z-20 md:hidden">
          {currentUser ? (
            // Only show these navigation links when logged in
            <>
              <NavLink
                exact="true"
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-5 font-bold text-[#023047] decoration-[#FB8500] underline underline-offset-4 decoration-2"
                    : "block py-3 px-5 font-bold text-[#979797]"
                }
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>

              {/* Mobile Dropdown - Clickable */}
              <div className="relative">
                <div
                  className="flex justify-between items-center py-3 px-5 font-bold text-[#979797]"
                  onClick={toggleExplore}
                >
                  <span>Explore</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      exploreOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>

                {exploreOpen && (
                  <div className="bg-[#f9f9f9] shadow-inner">
                    <NavLink
                      to="/explore/cities"
                      className="block py-3 px-8 text-black hover:bg-[#f1f1f1]"
                      onClick={() => {
                        setExploreOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      Cities
                    </NavLink>
                    <NavLink
                      to="/explore/beaches"
                      className="block py-3 px-8 text-black hover:bg-[#f1f1f1]"
                      onClick={() => {
                        setExploreOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      Beaches
                    </NavLink>
                    <NavLink
                      to="/explore/snowmountains"
                      className="block py-3 px-8 text-black hover:bg-[#f1f1f1]"
                      onClick={() => {
                        setExploreOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      Snow Mountains
                    </NavLink>
                    <NavLink
                      to="/explore/forests"
                      className="block py-3 px-8 text-black hover:bg-[#f1f1f1]"
                      onClick={() => {
                        setExploreOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      Forests
                    </NavLink>
                  </div>
                )}
              </div>

              <NavLink
                to="/goals"
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-5 font-bold text-[#023047] decoration-[#FB8500] underline underline-offset-4 decoration-2"
                    : "block py-3 px-5 font-bold text-[#979797]"
                }
                onClick={() => setIsOpen(false)}
              >
                Goals
              </NavLink>
            </>
          ) : null}

          {/* Mobile Authentication Links */}
          {currentUser ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full text-left py-3 px-5 font-bold text-red-500 hover:bg-red-50"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-5 font-bold text-[#023047] decoration-[#FB8500] underline underline-offset-4 decoration-2"
                    : "block py-3 px-5 font-bold text-[#979797]"
                }
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="block py-3 px-5 font-bold text-[#FB8500]"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
