import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex justify-between p-4 bg-black text-white h-[10vh] pr-8 pl-8 items-center">
      <div>
        <h2 className="text-2xl font-bold cursor-pointer">
          <Link to="/">
            Career <span className="text-purple-500">UP</span>
          </Link>
        </h2>
      </div>

      <div className="hidden md:flex">
        <ul className="flex gap-5">
          <li>
            <Link className="text-lg font-semibold" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="text-lg font-semibold" to="/application-list">
              Applications
            </Link>
          </li>
          <li>
            <Link className="text-lg font-semibold" to="/user-profile">
              Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-8 bg-black text-white w-40 py-4 px-2 rounded-md shadow-lg md:hidden">
          <ul className="flex flex-col gap-4">
            <li>
              <Link className="text-lg font-semibold" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-lg font-semibold" to="/application-list">
                Applications
              </Link>
            </li>
            <li>
              <Link className="text-lg font-semibold" to="/user-profile">
                Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
