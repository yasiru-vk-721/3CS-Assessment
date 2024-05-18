import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Import local images
import image1 from '../assets/image1.jpeg';
import image2 from '../assets/image2.jpeg';
import image3 from '../assets/image3.jpeg';
import image4 from '../assets/image4.jpeg';
import image5 from '../assets/image5.jpeg';
import image6 from '../assets/image6.jpeg';

// Import Footer component
import Footer from './Footer';

const Content = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [additionalMovies, setAdditionalMovies] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchMovies = async (query) => {
    if (query.trim() === '') return;

    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=f8e2f17b`);
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=f8e2f17b`);
      setSelectedMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setSelectedMovie(null);
    }
  };

  const fetchAdditionalMovies = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=comedy&apikey=f8e2f17b`);
      if (response.data.Response === 'True') {
        setAdditionalMovies(response.data.Search.slice(0, 7));
      } else {
        setAdditionalMovies([]);
      }
    } catch (error) {
      console.error('Error fetching additional movies:', error);
      setAdditionalMovies([]);
    }
  };

  const handleMouseEnter = (imdbID) => {
    setShowDetails(false);
    setTimeout(() => {
      fetchMovieDetails(imdbID);
      setShowDetails(true);
    }, 100);
  };

  const handleMouseLeave = () => {
    setShowDetails(false);
    setSelectedMovie(null);
  };

  useEffect(() => {
    const defaultQuery = `kid`; 
    fetchMovies(defaultQuery);
    fetchAdditionalMovies(); // Fetch additional movies when component mounts
  }, []);

  useEffect(() => {
    if (searchQuery !== '') {
      fetchMovies(searchQuery);
    }
  }, [searchQuery]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true, // Add fade effect
    adaptiveHeight: true
  };

  // List of local images
  const slideshowImages = [image1, image3, image5, image6]; // Use unique images when uncommenting more

  return (
    <div className="flex flex-col min-h-screen px-20 md:px-20"> {/* Added horizontal padding */}
      {/* Main content */}
      <div className="flex-grow">
        {/* Slideshow component */}
        <div className="slideshow-container mb-8 h-96 w-full"> {/* Define height and width */}
          <Slider {...settings}>
            {slideshowImages.map((image, index) => (
              <div key={index} className="slideshow-slide h-full w-full flex justify-center items-center">
                <img 
                  src={image} // Ensure the src attribute is correctly set
                  alt={`Slide ${index + 1}`} 
                  className="object-cover object-center w-full h-full rounded-2xl" // Adjust height and width
                />
              </div>
            ))}
          </Slider>
        </div>
        
        {/* Search bar and movie cards */}
        <div className="flex flex-col items-center p-4 mt-24">
          <input
            type="text"
            className="w-full max-w-md p-2 pl-2 mt-96 mb-12  rounded-full border text-gray-700 border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {movies.slice(0, 9).map((movie, index) => (
              <motion.div 
                key={movie.imdbID}
                initial={{ opacity: 0, y: 50 }} // Initial state: hidden and moved down
                animate={{ opacity: 1, y: 0 }} // Animation when appearing
                transition={{ duration: 0.5, delay: index * 0.1 }} // Transition animation duration with stagger effect
                whileHover={{ scale: 1.1 }} // Zoom effect on hover
                className="relative max-w-xs rounded-xl overflow-hidden shadow-lg bg-gradient-to-r from-gray-800 to-fuchsia-950 p-4"
                onMouseEnter={() => handleMouseEnter(movie.imdbID)}
                onMouseLeave={handleMouseLeave}
              >
                <img className="w-full" src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'} alt={movie.Title} />
                {selectedMovie && selectedMovie.imdbID === movie.imdbID && showDetails && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-85 text-white p-4"
                  >
                    <h2 className="text-lg font-bold">{selectedMovie.Title}</h2>
                    <p>{selectedMovie.Plot}</p>
                    <p>Released: {selectedMovie.Released}</p>
                    <p>Runtime: {selectedMovie.Runtime}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
            {additionalMovies.map((movie, index) => (
              <motion.div 
                key={movie.imdbID}
                initial={{ opacity: 0, y: 50 }} // Initial state: hidden and moved down
                animate={{ opacity: 1, y: 0 }} // Animation when appearing
                transition={{ duration: 0.5, delay: index * 0.1 }} // Transition animation duration with stagger effect
                whileHover={{ scale: 1.1 }} // Zoom effect on hover
                className="relative max-w-xs rounded-xl overflow-hidden shadow-lg bg-gradient-to-r from-gray-800 to-fuchsia-950 p-4"
                onMouseEnter={() => handleMouseEnter(movie.imdbID)}
                onMouseLeave={handleMouseLeave}
              >
                <img className="w-full" src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'} alt={movie.Title} />
                {selectedMovie && selectedMovie.imdbID === movie.imdbID && showDetails && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-85 text-white p-4"
                  >
                    <h2 className="text-lg font-bold">{selectedMovie.Title}</h2>
                    <p>{selectedMovie.Plot}</p>
                    <p>Released: {selectedMovie.Released}</p>
                    <p>Runtime: {selectedMovie.Runtime}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
  
      {/* Footer */}
      <Footer />
    </div>
  );
  
};

export default Content;
