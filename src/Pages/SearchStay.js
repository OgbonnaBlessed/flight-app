import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

const SearchStay = () => {
    const location = useLocation();  // Get the current location state from the Search component
    const { searchDetails, message } = location.state || {}; // Destructure the searchDetails and message
    const navigate = useNavigate();
    const [flightDetails, setFlightDetails] = useState({});
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const { origin, destination, departureDate, travelers, flightType } = location.state || {};
        
        // Set flight details
        const details = { origin, destination, departureDate, travelers, flightType };
        setFlightDetails(details);

        // Save search details to localStorage
        localStorage.setItem('lastSearch', JSON.stringify(details));
    }, [location.state]);

    useEffect(() => {
        // Load favorites from localStorage
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const handleBookFlight = () => {
        alert('Congratulations, your flight has been booked.');
    };

    const handleAddToFavorites = () => {
        const updatedFavorites = [...favorites, searchDetails];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        alert('Flight added to your favorites.');
    };

    const handleViewFavorites = () => {
        navigate('/favorites');
    };

    const [activeIndex, setActiveIndex] = useState(0);
    const images = [
      '../../images/search/view1.jpeg',
      '../../images/search/view2.jpeg',
      '../../images/search/view3.jpeg',
      '../../images/search/view4.jpeg',
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
      <div className="search-container">
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
        <div className="search-results">
            {message && <h2>{message}</h2>}
            {searchDetails && (
                <div className='flight-details'>
                    {searchDetails.origin && <p><strong>Origin:</strong> {searchDetails.origin}</p>}
                    <p><strong>Destination</strong> {searchDetails.destination}</p>
                   {searchDetails.departureDate && <p><strong>Departure Date:</strong> {searchDetails.departureDate}</p>}
                    <p><strong>Travelers:</strong> {searchDetails.travelers}</p>
                </div>
            )}
            <div className="buttons">
              <button onClick={handleBookFlight} className="book-now-btn">Book Now</button>
              <button onClick={handleAddToFavorites} className="add-to-favorites-btn">Add to Favorites</button>
              <button onClick={handleViewFavorites} className="view-favorites-btn">View Favorites</button>
            </div>
        </div>
      </div>
  </>
    );
};

export default SearchStay;