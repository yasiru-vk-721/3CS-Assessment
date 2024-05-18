import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Content = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [slideshowMovies, setSlideshowMovies] = useState([]);

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

  const fetchSlideshowMovies = async () => {
    try {
      const response = await axios.get('NEW_API_URL'); // Replace NEW_API_URL with the URL of the new API
      setSlideshowMovies(response.data.results.slice(0, 10)); // Assuming the API returns an array of movies
    } catch (error) {
      console.error('Error fetching slideshow movies:', error);
      setSlideshowMovies([]);
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
    const defaultQuery = 'warrior'; 
    fetchMovies(defaultQuery);
    fetchSlideshowMovies(); // Fetch slideshow movies when component mounts
  }, []);

  useEffect(() => {
    if (searchQuery !== '') {
      fetchMovies(searchQuery);
    }
  }, [searchQuery]);

  return (
    <div>
      {/* Slideshow component */}
      <div className="slideshow-container">
        {/* Display slideshow movies */}
        {slideshowMovies.map((movie) => (
          <div key={movie.id} className="slideshow-slide">
            {/* Display movie details */}
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
      
      {/* Movie card container */}
      <div className="flex flex-col items-center p-4 -mt-8">
        <input
          type="text"
          className="w-full max-w-md p-2 pl-2 mb-12 rounded-full border text-gray-700 border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {movies.slice(0, 9).map((movie, index) => (
            <motion.div 
              key={movie.imdbID}
              initial={{ opacity: 0, y: 50 }} // Initial state: hidden and moved down
              animate={{ opacity: 1, y: 0 }} // Animation when appearing
              transition={{ duration: 0.5, delay: index * 0.1 }} // Transition animation duration with stagger effect
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
  );
};

export default Content;
