import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaImdb } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-24 h-18 mb-4 flex flex-col items-center">
      <div className="text-center mb-2 flex justify-center items-center">
        <p className="text-sm">&copy; 2024 MovieHub. All rights reserved.</p>
      </div>
      <div className="text-center flex justify-center items-center">
        <div className="mr-4">
          <a href="https://facebook.com"><FaFacebook className="text-lg text-gray-400 hover:text-white" /></a>
        </div>
        <div className="mr-4">
          <a href="https://twitter.com"><FaTwitter className="text-lg text-gray-400 hover:text-white" /></a>
        </div>
        <div className="mr-4">
          <a href="https://instagram.com"><FaInstagram className="text-lg text-gray-400 hover:text-white" /></a>
        </div>
        <div className="mr-4">
          <a href="https://youtube.com"><FaYoutube className="text-lg text-gray-400 hover:text-white" /></a>
        </div>
        <div className="mr-4">
          <a href="https://imdb.com"><FaImdb className="text-lg text-gray-400 hover:text-white" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
