import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    // const [favorite, setFavorite] = useState([]);

    useEffect(() => {
        // Load favorites from localStorage
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const handleDeleteFavorite = (index) => {
        const updatedFavorites = favorites.filter((_, i) => i !== index);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const [activeIndex, setActiveIndex] = useState(0);
    const images = [
      `${process.env.PUBLIC_URL}/images/search/view1.jpeg`,
      `${process.env.PUBLIC_URL}/images/search/view2.jpeg`,
      `${process.env.PUBLIC_URL}/images/search/view3.jpeg`,
      `${process.env.PUBLIC_URL}/images/search/view4.jpeg`,
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000); // Change slide every 3 seconds

      return () => clearInterval(interval); // Clear interval on component unmount
    }, [images.length]);

    return (
       <>
       <Header />
       <div className="carousel-container">
          <div className="carousel carousel2">
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

        {/* Add your favorite flight here to render them in the Favorites component. For example: */}
        <div className="fav-container">
            <div className="fav-box">
                <h2>Your Favorites</h2>
                {favorites.length > 0 ? (
                    <ul>
                        {favorites.map((flight, index) => (
                            <li key={index} className='fav-item'>
                                {flight.origin && <p><strong>Origin:</strong> {flight.origin}</p>}
                                <p><strong>Destination:</strong> {flight.destination}</p>
                                <p><strong>Departure Date:</strong> {flight.departureDate}</p>
                                <p><strong>Travelers:</strong> {flight.travelers}</p>
                                {flight.flightType && <p><strong>Flight Type:</strong> {flight.flightType}</p>}
                                <button className='book-now-btn' onClick={() => handleDeleteFavorite(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='no-fav-flight'>No favorite flights saved yet.</p>
                )}
            </div>
        </div>
        <Footer />
    </>
    );
};

export default Favorites;