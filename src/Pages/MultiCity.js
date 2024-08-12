import { FaMapMarkerAlt, FaRegCalendarAlt, FaUserAlt, FaSearch, FaPlus } from "react-icons/fa";
import Content from "../Components/Content";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { MdArrowDropDown, MdSwapHoriz } from "react-icons/md";
import React, { useState, useEffect, useRef } from "react";
import { locations } from "../Components/Locations";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main CSS file
import "react-date-range/dist/theme/default.css"; // Theme CSS
import format from "date-fns/format";

const MultiCity = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [origin, setOrigin] = useState(['']);  // Array for origin inputs
    const [destination, setDestination] = useState(['']);  // Array for destination inputs
    const [departureDate, setDepartureDate] = useState(['']);  // Array for date inputs
    const [travelers, setTravelers] = useState(1);
    const [selectedFlightType, setSelectedFlightType] = useState('Economy');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOrigin, setSelectedOrigin] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState();
    const [isOriginListVisible, setIsOriginListVisible] = useState([false]);  // Array to track visibility
    const [isDestinationListVisible, setIsDestinationListVisible] = useState([false]);  // Array to track visibility
    const [openDate, setOpenDate] = useState([false]);
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
      // Retrieve searches from local storage
      const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
      setRecentSearches(storedSearches);
    }, []);

    const handleChange = (ranges, index) => {
      const newDates = [...date];
      newDates[index] = ranges.selection;
      setDate(newDates);
    };

    const handleDateRange = (index) => {
      const newOpenDate = [...openDate];
      newOpenDate[index] = !newOpenDate[index];
      setOpenDate(newOpenDate);
    };

    const toggleDropdown = () => {
      setDropdownVisible(!isDropdownVisible);
    };

    const selectFlightType = (type) => {
      setSelectedFlightType(type);
      setDropdownVisible(false);
    };

    const toggleOriginList = (index) => {
      const newVisibility = [...isOriginListVisible];
      newVisibility[index] = !newVisibility[index];
      setIsOriginListVisible(newVisibility);

    };

    const selectOrigin = (origin, index) => {
      const newOrigins = [...selectedOrigin];
      newOrigins[index] = origin;
      setSelectedOrigin(newOrigins);

      const newVisibility = [...isOriginListVisible];
      newVisibility[index] = false;
      setIsOriginListVisible(newVisibility);
    };

    const toggleDestinationList = (index) => {
      const newVisibility = [...isDestinationListVisible];
      newVisibility[index] = !newVisibility[index];
      setIsDestinationListVisible(newVisibility);
    };

    const selectDestination = (destination, index) => {
      const newDestinations = [...selectedDestination];
      newDestinations[index] = destination;
      setSelectedDestination(newDestinations);

      const newVisibility = [...isDestinationListVisible];
      newVisibility[index] = false;
      setIsDestinationListVisible(newVisibility);
    };

    const originRef = useRef(null);
    const destinationRef = useRef(null);
    const dateRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
          if (originRef.current && !originRef.current.contains(event.target)) {
              setIsOriginListVisible(false);
          }
          if (destinationRef.current && !destinationRef.current.contains(event.target)) {
              setIsDestinationListVisible(false);
          }
          if (dateRef.current && !dateRef.current.contains(event.target)) {
              setOpenDate(false);
          }
          if (dropdownRef.current &&!dropdownRef.current.contains(event.target)) {
              setDropdownVisible(false);
          }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);

    useEffect(() => {
      // Check if we have a selectedSearch state from Trips.js
      if (location.state && location.state.selectedSearch) {
          const { origin, destination, departureDate, travelers, flightType } = location.state.selectedSearch;
          setOrigin(origin);
          setSelectedOrigin(origin);
          setDestination(destination);
          setSelectedDestination(destination);
          setDepartureDate(departureDate);
          setTravelers(travelers);
          setSelectedFlightType(flightType);
      } else {
          // Clear the search state
          setOrigin('');
          setSelectedOrigin('');
          setDestination('');
          setSelectedDestination('');
          setDepartureDate('');
          setTravelers(1);
          setSelectedFlightType('Economy');
      }
  }, [location.state]); // Dependency array includes location.state

  const handleSubmit = (e) => {
      e.preventDefault();
      // Save the search to localStorage
      const newSearch = {
          origin,
          destination,
          departureDate,
          travelers,
          flightType: selectedFlightType,
          source: 'multi',
      };
      const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
      localStorage.setItem('recentSearches', JSON.stringify([newSearch, ...recentSearches]));
      
      // Navigate to Search Results
      navigate('/search', {
          state: newSearch,
      });
  };

    const [flights, setFlights] = useState([{ id: 1 }, { id: 2 }]);
    const [date, setDate] = useState(Array(flights.length).fill({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }));

    const addFlight = () => {
      if (flights.length < 5) {
        const newFlight = { id: flights.length + 1 };
        setFlights([...flights, newFlight]);
        setOrigin([...origin, '']);
        setDestination([...destination, '']);
        setIsOriginListVisible([...isOriginListVisible, false]);
        setIsDestinationListVisible([...isDestinationListVisible, false]);
      }
    };

    const removeFlight = (id) => {
      setFlights(flights.filter((flight) => flight.id !== id));
      setOrigin(origin.filter((_, i) => i !== id - 1));
      setDestination(destination.filter((_, i) => i !== id - 1));
      setIsOriginListVisible(isOriginListVisible.filter((_, i) => i !== id - 1));
      setIsDestinationListVisible(isDestinationListVisible.filter((_, i) => i !== id - 1));
    };

  return (
    <>
      <Header />
      <div className="outside">
        <div className="container multi-container">
          <nav>
            <NavLink to="/stays" className="tablinks">Stays</NavLink>
            <NavLink to="/flights/round" className="tablinks active">Flights</NavLink>
            <NavLink to="/packages" className="tablinks">Packages</NavLink>
            <NavLink to="/things" className="tablinks">Things to do</NavLink>
          </nav>
          <form onSubmit={handleSubmit}>
            <menu>
              <div className="flight-type">
                <NavLink to="/flights/round" className="tablinks active-link">Round Trip</NavLink>
                <NavLink to="/flights/oneway" className="tablinks">One-way</NavLink>
                <NavLink to="/flights/multi" className="tablinks">Multi-city</NavLink>
              </div>
              <div className="flight-box">
                <button type="button" className="flight-sections" onClick={toggleDropdown}>
                  <p>{selectedFlightType}</p>
                  <MdArrowDropDown />
                </button>
                {isDropdownVisible && (
                  <div className="drop-down" ref={dropdownRef}>
                    <ul>
                      <li onClick={() => selectFlightType('Economy')}>Economy</li>
                      <li onClick={() => selectFlightType('Premium Economy')}>Premium Economy</li>
                      <li onClick={() => selectFlightType('Business Class')}>Business Class</li>
                      <li onClick={() => selectFlightType('First Class')}>First Class</li>
                    </ul>
                  </div>
                )}
              </div>
            </menu>
            <div className="multi-travel">
              <div className="input-container" id="travel">
                <FaUserAlt size={18} />
                <input
                  type="number"
                  id="travellers"
                  value={travelers} min="1"
                  onChange={(e) => setTravelers(e.target.value)}
                  required
                />
                <label htmlFor="travellers" className="placeholder">Travellers</label>
              </div>
              {flights.map((flight, index) => (
                <div className="search-item" key={flight.id}>
                  <div className="flight-text">
                    <p>Flight {index + 1}</p>
                    {index >= 2 && (
                      <p onClick={() => removeFlight(flight.id)} style={{ cursor: 'pointer', color: 'red' }}>
                        Remove
                      </p>
                    )}
                  </div>
                  <div className="searched-inputs">
                    <div className="input-container" ref={originRef}>
                      <FaMapMarkerAlt size={18} />
                      <input
                        type="text"
                        id={`origin-${index}`}
                        value={selectedOrigin[index]}
                        onFocus={() => toggleOriginList(index)}
                        onChange={(e) => {
                          const newOrigins = [...origin];
                          newOrigins[index] = e.target.value;
                          setOrigin(newOrigins);
                          setIsOriginListVisible((prev) => {
                            const newVisibility = [...prev];
                            newVisibility[index] = true;
                            return newVisibility;
                          });
                        }}
                        required
                      />
                      <label htmlFor={`origin-${index}`} className="placeholder">Leaving from?</label>
                      {isOriginListVisible[index] && (
                        <div className="location-origin-box">
                          <ul>
                            {locations.filter(location => location.origin.toLowerCase().includes(origin[index])).map((location) => (
                              <li onClick={() => selectOrigin(location.origin, index)} key={location.id}>{location.origin}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    {/* <button type="button" className="join swap-box mutli-join"><MdSwapHoriz className="change-text" /></button> */}
                    <div className="input-container" ref={destinationRef}>
                      <FaMapMarkerAlt size={18} />
                      <input
                        type="text"
                        id={`destination-${index}`}
                        value={destination[index]}
                        onFocus={() => toggleDestinationList(index)}
                        onChange={(e) => {
                          const newDestinations = [...destination];
                          newDestinations[index] = e.target.value;
                          setDestination(newDestinations);
                          setIsDestinationListVisible((prev) => {
                            const newVisibility = [...prev];
                            newVisibility[index] = true;
                            return newVisibility;
                          });
                        }}
                        required
                      />
                      <label htmlFor={`destination-${index}`} className="placeholder">Going to?</label>
                      {isDestinationListVisible[index] && (
                        <div className="location-destination-box">
                          <ul>
                            {locations.filter(location => location.destination.toLowerCase().includes(destination[index])).map((location) => (
                              <li onClick={() => selectDestination(location.destination, index)} key={location.id}>
                              {location.destination}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="input-container" ref={dateRef}>
                    <FaRegCalendarAlt size={18} />
                    <input
                      type="text"
                      id={`date-${index}`}
                      value={date[index] ? `${format(date[index].startDate, 'MMM, dd')} - ${format(date[index].endDate, 'MMM, dd')}` : ''}
                      onChange={(e) => {
                        const newDepartureDates = [...departureDate];
                        newDepartureDates[index] = e.target.value;
                        setDepartureDate(newDepartureDates);
                      }}
                      required
                      onFocus={() => handleDateRange(index)}
                    />
                    <label htmlFor={`date-${index}`} className="placeholder">Date</label>
                    {openDate[index] && (
                      <DateRangePicker
                        className="date-range"
                        ranges={[date[index]]}
                        onChange={(ranges) => handleChange(ranges, index)}
                        minDate={new Date()}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
            {flights.length < 5 && (
              <div className="add-search-item" onClick={addFlight} style={{ cursor: 'pointer' }}>
                <FaPlus className="FaPlus" />
                <p>Add Flight</p>
              </div>
            )}
          </div>
            <div className="search-box search-multiple-flights">
              <FaSearch size={18} />
              <input type="submit" value="search" />
            </div>
        </form>
      </div>

            {/* Recent Searches Section */}
            {recentSearches.length > 0 && (
            <section className="recent-searches">
                <h2>Your recent searches</h2>
                <ul>
                    {recentSearches.map((search, index) => (
                        <li key={index} onClick={() => navigate('/trips', { state: {selectedSearch: search}})}>
                            <p>{search.origin ? `${search.origin} to ${search.destination}` : search.destination}</p>
                            <p>{search.departureDate}</p>
                            <p>{search.travelers} Traveler(s), {search.flightType}</p>
                        </li>
                    ))}
                </ul>
            </section>
        )}

      <Content />
    </div>
    <Footer />
  </>
);
};

export default MultiCity;