import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    `${process.env.PUBLIC_URL}/images/carousel/view1.jpeg`,
    `${process.env.PUBLIC_URL}/images/carousel/view2.jpeg`,
    `${process.env.PUBLIC_URL}/images/carousel/view3.jpeg`,
    `${process.env.PUBLIC_URL}/images/carousel/view4.jpeg`,
    `${process.env.PUBLIC_URL}/images/carousel/view5.jpeg`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length]);

  return (
    <div className="carousel-container">
      <div className="carousel">
        <div className="carousel-inner">
          {images.map((src, index) => (
            <div
              key={index}
              className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
            >
              <img src={src} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;