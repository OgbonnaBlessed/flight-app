import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

const Search = () => {
    const location = useLocation();
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
        const updatedFavorites = [...favorites, flightDetails];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        alert('Flight added to your favorites.');
    };

    const handleViewFavorites = () => {
        navigate('/favorites');
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
        <div className="search-results-container">
          <div className="search-results">
              <h2>Congratulations, your selected flight is available!</h2>
              <div className="flight-details">
                  {flightDetails.origin && <p><strong>Origin:</strong> {flightDetails.origin}</p>}
                  <p><strong>Destination:</strong> {flightDetails.destination}</p>
                  {flightDetails.departureDate && <p><strong>Departure Date:</strong> {flightDetails.departureDate}</p>}
                  <p><strong>Travelers:</strong> {flightDetails.travelers}</p>
                  {flightDetails.flightType && <p><strong>Flight Type:</strong> {flightDetails.flightType}</p>}
              </div>
              <div className="buttons">
                <button onClick={handleBookFlight} className="book-now-btn">Book Now</button>
                <button onClick={handleAddToFavorites} className="add-to-favorites-btn">Add to Favorites</button>
                <button onClick={handleViewFavorites} className="view-favorites-btn">View Favorites</button>
              </div>
          </div>
        </div>
      </div>
  </>
    );
};

export default Search;