import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Content from './Content';
import { FaArrowUp } from 'react-icons/fa'; // Import the up arrow icon
import image1 from '../assets/image1.jpeg';
import image2 from '../assets/image2.jpeg';
import image3 from '../assets/image3.jpeg';
import image4 from '../assets/image4.jpeg';
import image5 from '../assets/image5.jpeg';
import image6 from '../assets/image6.png';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 
  const images = [image1, image2, image3, image4, image5, image6]; 

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(nextIndex);
    }, 6000); 

    return () => clearInterval(interval); 
  }, [currentImageIndex, images]);

  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900 min-h-screen relative">
      <div className="fixed top-0 left-0 w-full h-full z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${image})`,
              opacity: currentImageIndex === index ? 1 : 0, 
              transition: 'opacity 1s ease-in-out'
            }}
          ></div>
        ))}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>

      <div className="container mx-auto px-12 relative z-10">
        <Navbar />
        <Content />
      </div>
    </div>
  );
};

export default Home;
