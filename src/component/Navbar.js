import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Company Name */}
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-2xl font-bold"
        >
          CSTech Infosolutions Pvt. Ltd.
        </motion.h1>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-lg">
          <li>
            <Link to="/" className="hover:text-gray-300 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300 transition duration-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-gray-300 transition duration-300">
              Dashboard
            </Link>
          </li>

          {/* Dropdown for Login */}
          <li
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className="flex items-center gap-1 cursor-pointer">
              <FaUser />
              <span className="hover:text-gray-300 transition duration-300">
                Login
              </span>
            </div>
            {isDropdownOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 bg-white text-black shadow-md rounded-md overflow-hidden w-40"
              >
                <li>
                  <Link to="/login" className="block px-4 py-2 hover:bg-gray-200">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="block px-4 py-2 hover:bg-gray-200">
                    Signup
                  </Link>
                </li>
              </motion.ul>
            )}
          </li>

          {/* Logout Button */}
          <li>
            <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition">
              Logout
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          className="bg-blue-700 md:hidden overflow-hidden"
        >
          <ul className="flex flex-col text-center space-y-4 py-4">
            <li>
              <Link to="/" className="block py-2 hover:bg-blue-800" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 hover:bg-blue-800" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="block py-2 hover:bg-blue-800" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
            </li>

            {/* Login Dropdown in Mobile */}
            <li className="relative">
              <button
                className="w-full text-left px-4 py-2 hover:bg-blue-800 flex items-center justify-between"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              >
                Login <FaUser />
              </button>
              {isDropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white text-black text-center shadow-md rounded-md overflow-hidden"
                >
                  <li>
                    <Link
                      to="/login"
                      className="block py-2 hover:bg-gray-200"
                      onClick={() => {
                        setIsOpen(false);
                        setDropdownOpen(false);
                      }}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="block py-2 hover:bg-gray-200"
                      onClick={() => {
                        setIsOpen(false);
                        setDropdownOpen(false);
                      }}
                    >
                      Signup
                    </Link>
                  </li>
                </motion.ul>
              )}
            </li>

            {/* Logout */}
            <li>
              <button className="w-full bg-red-500 py-2 hover:bg-red-600 transition">
                Logout
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;