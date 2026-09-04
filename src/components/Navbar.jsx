import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="w-full border-b bg-white text-black dark:border-gray-800 dark:bg-gray-950 dark:text-white transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Cosmos
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link to="/events">Events</Link>
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/team">Team</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/join">Join Us</Link>
          <Link to="/alumni">Alumni</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/admin/login">Admin</Link>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full border border-gray-300 bg-gray-100 px-3 py-2 text-lg transition-all duration-300 hover:scale-105 dark:border-gray-700 dark:bg-gray-800"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;