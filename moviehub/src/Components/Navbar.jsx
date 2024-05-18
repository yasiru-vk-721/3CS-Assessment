import React, { useState } from 'react';
import { FaBars, FaChevronCircleRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
  };

  return (
    <>
      <nav className="relative z-10 mb-4  flex flex-col md:flex-row items-center justify-between py-2 md:py-6">
        <div className="flex items-center justify-between w-full md:w-auto">
          <h2 className="md:text-8xl font-extrabold bg-gradient-to-r from-blue-600 via-emerald-800 to-purple-700 bg-clip-text text-4xl tracking-tight text-transparent " style={{ fontFamily: 'Cookie' }}>MovieHub</h2>
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <FaBars className="w-6 h-8 fill-current text-white hover:text-gray-400" />
          </button>
        </div>
        <div
          className={`${
            isOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row items-center justify-center gap-16 w-full md:w-auto mt-8   md:mt-0`}
        >
          <a href="#" className="text-white text-4xl hover:text-gray-300">
            Dive Into a World of Movies and More...
          </a>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black z-20"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              transition={{ duration: 0.3 }}
              style={{ backdropFilter: 'blur(5px)' }}
            />
            <motion.div
              className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-slate-900 text-white p-4 "
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ staggerChildren: 0.1 }}
            >
              <motion.a
                href="#"
                className="text-2xl my-2 hover:text-gray-300"
                variants={menuVariants}
              >
                Home
              </motion.a>
              <motion.button
                className="mt-4 text-xl underline flex items-center"
                onClick={toggleMenu}
                aria-label="Close Menu"
                variants={menuVariants}
              >
                <FaChevronCircleRight />
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
