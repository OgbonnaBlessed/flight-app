import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Trips = () => {
    const [recentSearches, setRecentSearches] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { searchDetails } = location.state || {};

    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        setRecentSearches(storedSearches);
    }, []);

    const handleDelete = (index) => {
        const updatedSearches = recentSearches.filter((_, i) => i !== index);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    };

    const handleEdit = (search) => {
        if (search && search.source === 'stays') {
            navigate('/stays', { state: { selectedSearch: searchDetails}})
        } else if (search && search.source === 'oneway') {
            // Navigate to OneWay.js with the selected search details as state
            navigate('/flights/oneway', { state: { selectedSearch: search } });
        } else if (search && search.source === 'RoundTrip') {
            navigate('/flights/round', { state: { selectedSearch: search } });
        } else if (search && search.source === 'Things') {
            navigate("/things", { state: { selectedSearch: search } });
        } else if (search && search.source === 'packages') {
            navigate('/packages', { state: { selectedSearch: search } });
        } else if (search && search.source === 'multi') {
            navigate('/flights/multi', { state: { selectedSearch: search } });
        }
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
        <div className="trips-container">
            <div className="trips-box">
                <h1>Recent Searches</h1>
                {recentSearches.length === 0 ? (
                    <p className='no-recent-searches'>No recent searches found.</p>
                ) : (
                    <ul>
                        {recentSearches.map((search, index) => (
                            <li key={index}>
                                <div className="search-details">
                                    <p>{search.origin ? `${search.origin} to ${search.destination}` : search.destination}</p>
                                    <p>{search.departureDate}</p>
                                    <p>{search.travelers} Traveler(s), {search.flightType}</p>
                                </div>
                                <div className="actions">
                                    <button className='add-to-favorites-btn'
                                        onClick={() => { handleEdit(search);
                                                        handleDelete(index)}}> Edit
                                    </button>
                                    <button className='book-now-btn' onClick={() => handleDelete(index)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        <Footer />
    </>
    );
};

export default Trips;