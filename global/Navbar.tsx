'use client';
import React, { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-green-600">Green On Energy</h1>

          {/* Desktop Navigation (Visible on Medium Screens and Above) */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-green-600 transition duration-300">
              Home
            </a>
            <a href="/Blog" className="text-gray-700 hover:text-green-600 transition duration-300">
              Blog
            </a>
            <a
              href="/"
              className="bg-green-600 text-white px-6 py-2 rounded-md shadow-lg hover:bg-green-700 transition duration-300"
            >
              Power Calculator
            </a>
          </nav>

          {/* Mobile Menu Button (Visible on Small Screens Only) */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-green-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu (Visible on Small Screens Only) */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 pt-4 pb-6 space-y-4">
              <a
                href="#"
                className="block text-gray-700 hover:text-green-600 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a
                href="/Blog"
                className="block text-gray-700 hover:text-green-600 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </a>
              <a
                href="/"
                className="block bg-green-600 text-white px-6 py-2 rounded-md text-center shadow-lg hover:bg-green-700 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;