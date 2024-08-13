import { FaMapMarkerAlt, FaRegCalendarAlt, FaUserAlt, FaSearch } from "react-icons/fa";
import Content from "../Components/Content";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { MdArrowDropDown } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { locations } from "../Components/Locations";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main CSS file
import "react-date-range/dist/theme/default.css"; // Theme CSS
import format from "date-fns/format";
// import FlightResults from "./FlightResults";

const RoundTrip = () => {
    // const useHistory = [];
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [travelers, setTravelers] = useState(1);
    const [selectedFlightType, setSelectedFlightType] = useState('Economy');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isOriginListVisible, setIsOriginListVisible] = useState(false);
    const [selectedOrigin, setSelectedOrigin] = useState();
    const [isDestinationListVisible, setIsDestinationListVisible] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState();
    const [isChecked, setIsChecked] = useState('');
    const [openDate, setOpenDate] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [recentSearches, setRecentSearches] = useState([]);

    const [date, setDate] = useState({
                                        startDate: new Date(),
                                        endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
                                        key: 'selection',
                                    });

    const originRef = useRef(null);
    const destinationRef = useRef(null);
    const dateRef = useRef(null);
    const dropdownRef = useRef(null);

    const handleChange = (ranges) => {
        setDate(ranges.selection);
        setDepartureDate(`${format(ranges.selection.startDate, 'MMM, dd')} - ${format(ranges.selection.endDate, 'MMM, dd')}`);
    };

    useEffect(() => {
        // Retrieve searches from local storage
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        setRecentSearches(storedSearches);
    }, []);

    const handleDateRange = () => {
        setOpenDate(true);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const selectFlightType = (type) => {
        setSelectedFlightType(type);
        setDropdownVisible(false);
    };

    const toggleOriginList = () => {
        setIsOriginListVisible(true);
    };

    const selectOrigin = (origin) => {
        setSelectedOrigin(origin);
        setIsOriginListVisible(false);
        setOrigin(origin); // Set the origin input value to the selected location
    };

    const toggleDestinationList = () => {
        setIsDestinationListVisible(true);
    };

    const selectDestination = (destination) => {
        setSelectedDestination(destination);
        setIsDestinationListVisible(false);
        setDestination(destination); // Set the destination input value to the selected location
    };

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
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
                departureDate: `${format(date.startDate, 'MMM, dd')} - ${format(date.endDate, 'MMM, dd')}`,
                travelers,
                flightType: selectedFlightType,
                source: 'RoundTrip',
            };
            const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
            localStorage.setItem('recentSearches', JSON.stringify([newSearch, ...recentSearches]));
            
            // Navigate to Search Results
            navigate('/search', {
                state: newSearch,
            });

    };

  return (
    <>
        <Header />
        <div className="outside">
           
            <div className="container">
            <nav>
                <NavLink to="/stays" className="tablinks">Stays</NavLink>
                <NavLink to="/flights" className="tablinks">Flights</NavLink>
                <NavLink to="/packages" className="tablinks">Packages</NavLink>
                <NavLink to="/things" className="tablinks">Things to do</NavLink>
            </nav>
            <form onSubmit={handleSubmit}>
            <menu>
                <div className="flight-type">
                    <NavLink to="/flights/round" className="tablinks active-link active">Round Trip</NavLink>
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
                <div className="searched-inputs">
                <div className="input-container" ref={originRef}>
                        <FaMapMarkerAlt size={18} />
                        <input
                            type="text"
                            id="origin"
                            value={selectedOrigin}
                            onFocus={toggleOriginList}
                            onChange={(e) => {
                                setSelectedOrigin(e.target.value);
                                setOrigin(e.target.value);
                                setIsOriginListVisible(true);
                            }}
                            required
                        />
                        <label htmlFor="origin" className="placeholder">Leaving from?</label>
                        {isOriginListVisible && (
                            <div className="location-origin-box">
                                <ul>
                                    {locations.filter(location => location.origin.toLowerCase().includes(origin.toLowerCase())).length ? 
                                    locations.filter(location => location.origin.toLowerCase().includes(origin.toLowerCase())).map((location) => (
                                        <li onClick={() => {
                                                    selectOrigin(location.origin)
                                                }} 
                                                key={location.id}>
                                                {location.origin}
                                        </li>
                                    )) : <li className="no-location">No Location Found</li>}
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* <button type="button" className="join"><MdSwapHoriz className="change-text" /></button> */}
                    <div className="input-container" ref={destinationRef}>
                        <FaMapMarkerAlt size={18} />
                        <input
                            type="text"
                            id="destination"
                            value={selectedDestination}
                            onFocus={toggleDestinationList}
                            onChange={(e) => {
                                setSelectedDestination(e.target.value);
                                setDestination(e.target.value);
                                setIsDestinationListVisible(true);
                            }}
                            required
                        />
                        <label htmlFor="destination" className="placeholder">Going to?</label>
                        {isDestinationListVisible && (
                            <div className="location-destination-box">
                                <ul>
                                    {locations.filter(location => location.destination.toLowerCase().includes(destination.toLowerCase())).length ? 
                                    locations.filter(location => location.destination.toLowerCase().includes(destination.toLowerCase())).map((location) => (
                                        <li onClick={() => selectDestination(location.destination)} key={location.id}>{location.destination}</li>
                                    )) : <li className="no-location">No Location Found</li>}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="input-container" ref={dateRef}>
                        <FaRegCalendarAlt size={18} />
                        <input
                            value={departureDate ? departureDate : `${format(date.startDate, 'MMM, dd')} - ${format(date.endDate, 'MMM, dd')}`}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            onFocus={handleDateRange}
                            required
                        />
                        <label htmlFor="departure-date" className="placeholder">Date</label>
                        {openDate && 
                            <div className="date-range-picker-container">
                                <DateRangePicker
                                    className="date-range"
                                    ranges={[date]}
                                    onChange={handleChange}
                                    minDate={new Date()}
                                    staticRanges={[]}
                                    inputRanges={[]}
                                    calendarFocus="forwards"
                                    preventSnapRefocus={true}
                                />
                            </div>}
                    </div>
                    <div className="input-container travel-sm-container">
                        <FaUserAlt size={18} />
                        <input type="number" value={travelers} min="1" onChange={(e) => setTravelers(e.target.value)} required />
                        <label htmlFor="adults" className="placeholder">Travellers</label>
                    </div>
                    <div className="search-box">
                        <FaSearch size={18} />
                        <input type="submit" value="search" />
                    </div>

                </div>
                <div className="check check-sm">
                    <label id="first">
                        <input 
                            type="checkbox" 
                            onChange={() => {
                                setIsChecked(!isChecked);
                            }}
                        />
                        <svg
                            className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
                            aria-hidden="true"
                            viewBox="0 0 15 11"
                            fill="none"
                        >
                            <path 
                                d="M1 4.5L5 9L14 1"
                                strokeWidth="2"
                                stroke={isChecked ? "#fff" : "none"}
                            />
                        </svg>
                        Add a place to stay
                    </label>
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
  )
}

export default RoundTrip
