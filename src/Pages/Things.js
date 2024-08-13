import { FaMapMarkerAlt, FaRegCalendarAlt, FaUserAlt, FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Content from "../Components/Content";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { locations } from "../Components/Locations";
import { DateRangePicker } from "react-date-range";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import format from "date-fns/format";

const Things = () => {
        const [destination, setDestination] = useState('');
        const [departureDate, setDepartureDate] = useState('');
        const [travelers, setTravelers] = useState(1);
        const [isDestinationListVisible, setIsDestinationListVisible] = useState(false);
        const [selectedDestination, setSelectedDestination] = useState();
        const [openDate, setOpenDate] = useState(false);
        const location = useLocation();
        const navigate = useNavigate();
        const [recentSearches, setRecentSearches] = useState([]);

        const [date, setDate] = useState({
                                            startDate: new Date(),
                                            endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
                                            key: 'selection',
                                        });
                                

    const destinationRef = useRef(null);
    const dateRef = useRef(null);

    const handleChange = (ranges) => {
        setDate(ranges.selection);
        setDepartureDate(format(ranges.selection.startDate, 'MMM dd, yyyy'));
    };

    useEffect(() => {
        // Retrieve searches from local storage
        const storedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        setRecentSearches(storedSearches);
    }, []);

    const handleDateRange = () => {
        setOpenDate(true);
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
            if (destinationRef.current && !destinationRef.current.contains(event.target)) {
                setIsDestinationListVisible(false);
            }
            if (dateRef.current && !dateRef.current.contains(event.target)) {
                setOpenDate(false);
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
            const { destination, departureDate, travelers } = location.state.selectedSearch;
            setDestination(destination);
            setSelectedDestination(destination);
            setDepartureDate(departureDate);
            setTravelers(travelers);
        } else {
            // Clear the search state
            setDestination('');
            setSelectedDestination('');
            setDepartureDate('');
            setTravelers(1);
        }
    }, [location.state]); // Dependency array includes location.state

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save the search to localStorage
        const newSearch = {
            destination,
            departureDate: `${format(date.startDate, 'MMM, dd')} - ${format(date.endDate, 'MMM, dd')}`,
            travelers,
            source: 'Things',
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
        <div className="container things-container">
            <nav>
                <NavLink to="/stays" className="tablinks active-link">Stays</NavLink>
                <NavLink to="/flights/round" className="tablinks">Flights</NavLink>
                <NavLink to="/packages" className="tablinks">Packages</NavLink>
                <NavLink to="/things" className="tablinks">Things to do</NavLink>
            </nav>
            <form onSubmit={handleSubmit}>
                <div className="searched-inputs">
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
                            required
                            onFocus={handleDateRange}
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
                                    // direction="horizontal"
                                    preventSnapRefocus={true}
                                />
                        </div>}
                    </div>
                    <div className="input-container">
                        <FaUserAlt size={18} />
                        <input type="number" value={travelers} min="1" onChange={(e) => setTravelers(e.target.value)} required />
                        <label htmlFor="adults" className="placeholder">Travellers</label>
                    </div>
                    <div className="search-box">
                        <FaSearch size={18} />
                        <input type="submit" value="search" />
                    </div>
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

export default Things