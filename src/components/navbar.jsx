import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [top, setTop] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      setTop(window.pageYOffset <= 20);

      if (window.scrollY >= 20) {
        setTop(true);
      } else {
        setTop(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    scrollHandler();
  }, []);

  const navactive =
    "fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-blue-500 to-blue-900 text-white font-sans sm:px-4 sm:py-3 md:px-4 md:py-6 p-5 opacity-100 backdrop-blur bg-transparent shadow-md border-b border-gray-900 ";

  const nav =
    " fixed top-0 left-0 right-0 z-50 text-white font-sans sm:px-4 sm:py-3 md:px-4 md:py-6 p-5  bg-black backdrop-blur bg-transparent shadow-md border-b border-gray-900 ";

  // fixed top-0 left-0 right-0 z-10 bg-black text-white font-sans px-4 py-4 md:px-6 md:py-6 backdrop-filter backdrop-blur-3xl opacity-80

  return (
    <>
      <nav className={top ? nav : navactive}>
        <div className="flex items-center justify-between ">
          <div className="flex items-center">
            <ul>
              <li>
                <a href="/app" className="flex items-center space-x-1">
                <motion.h1 className="text-3xl font-bold font-extrabold text-center bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    Bookmark Sorter
                </motion.h1>
                </a>
              </li>
            </ul>
          </div>
          <div className="hidden lg:block">
            <Link
              to="/app"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-xl"
            >
              Home
            </Link>
            <span className="px-1.5"></span>
            {/* <a
              href="#our-projects"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-xl"
            >
              Projects
            </a> */}

            <Link
              to="/features"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-xl"
            >
              Features
            </Link>
            <Link
              to="/stats"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-xl"
            >
              Stats
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-xl"
            >
              About
            </Link>
            {/* <Link
              to="/thefest"
              className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-xl"
            >
              The Fest
            </Link> */}
            
            
          </div>
          <button
            type="button"
            className="lg:hidden text-white hover:text-gray-300"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`lg:hidden opacity-100 backdrop-blur-none bg-black	 ${showMobileMenu ? "" : "hidden"}`}
        >
          <div className=" pt-2 pb-3 space-y-1">
            <span className="px-1.5"></span>
            <a
              href="/app"
              className="block text-white hover:text-gray-300 px-3 py-2 rounded-md"
            >
              Home
            </a>

            <a
              href="/features"
              className="block text-white hover:text-gray-300 px-3 py-2 rounded-md"
            >
              Features
            </a>
            <a
              href="/stats"
              className="block text-white hover:text-gray-300 px-3 py-2 rounded-md"
            >
              Stats
            </a>
            <a
              href="/About"
              className="block text-white hover:text-gray-300 px-3 py-2 rounded-md"
            >
              About
            </a>
            
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
