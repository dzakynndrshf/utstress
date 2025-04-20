"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll"; // ✅ Pakai react-scroll

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["about", "skills", "portfolio", "contact"];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-sm py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <ScrollLink to="about" smooth={true} duration={500} offset={-80} className="cursor-pointer">
          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            Dzaky<span className="text-gray-800 dark:text-white">Dev</span>
          </span>
        </ScrollLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <ScrollLink
              key={item}
              to={item}
              smooth={true}
              duration={500}
              offset={-80}
              spy={true}
              activeClass="text-purple-600 dark:text-purple-400 font-bold"
              className="cursor-pointer text-gray-700 dark:text-gray-200 font-medium hover:text-purple-600 dark:hover:text-purple-400 transition"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </ScrollLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-gray-800 shadow-lg"
        >
          <div className="flex flex-col px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <ScrollLink
                key={item}
                to={item}
                smooth={true}
                duration={500}
                offset={-80}
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer text-gray-700 dark:text-gray-200 font-medium hover:text-purple-600 dark:hover:text-purple-400 transition py-2"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </ScrollLink>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
