import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Content from './Content';
// Import the images
import image1 from '../assets/image1.jpeg';
import image2 from '../assets/image2.jpeg';
import image3 from '../assets/image3.jpeg';
import image4 from '../assets/image4.jpeg';
import image5 from '../assets/image5.jpeg';
import image6 from '../assets/image6.png';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Initial image index
  const images = [image1, image2, image3, image4, image5, image6]; // List of images

  useEffect(() => {
    const interval = setInterval(() => {
      // Get the index of the next image in the array
      const nextIndex = (currentImageIndex + 1) % images.length;
      // Set the next image index as the current image index
      setCurrentImageIndex(nextIndex);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentImageIndex, images]);

  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 min-h-screen relative">
      {/* Full-screen background images */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${image})`,
              // Apply fade effect using opacity
              opacity: currentImageIndex === index ? 1 : 0, // Only show current image
              // Smooth transition for the fade effect
              transition: 'opacity 1s ease-in-out'
            }}
          ></div>
        ))}
        {/* Black overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>

      <div className="container mx-auto px-12 relative z-10">
        <Navbar />
        {/* <Hero /> */}
        <Content />
      </div>
    </div>
  );
};

export default Home;
