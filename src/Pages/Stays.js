import { FaMapMarkerAlt, FaRegCalendarAlt, FaUserAlt, FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Content from "../Components/Content";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import { locations } from "../Components/Locations";
import { DateRangePicker } from "react-date-range";
import format from "date-fns/format";
import Footer from "../Components/Footer";

const Stays = () => {
    const [show, setShow] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [travelers, setTravelers] = useState(1);
    const [isDestinationListVisible, setIsDestinationListVisible] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState('');
    const [openDate, setOpenDate] = useState(false);
    const [isOriginListVisible, setIsOriginListVisible] = useState(false);
    const [selectedOrigin, setSelectedOrigin] = useState();
    const [origin, setOrigin] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const [recentSearches, setRecentSearches] = useState([]);
    const onShowClick = () => {
        if (show === false) {
            setShow(true);
        } else setShow(false);
    }
    
    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const toggleOriginList = () => {
        setIsOriginListVisible(!isOriginListVisible);
      }
    
      
    const selectOrigin = (origin) => {
        setSelectedOrigin(origin);
        setIsOriginListVisible(false);
        setOrigin(origin); // Set the origin input value to the selected location
    }
        
    const destinationRef = useRef(null);
    const originRef = useRef(null);
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
            if (originRef.current && !originRef.current.contains(event.target)) {
                setIsOriginListVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (location.state && location.state.selectedSearch) {
            const { origin, destination, departureDate, travelers } = location.state.selectedSearch;
            if (origin) {
                setOrigin(origin);
                setIsChecked(true);
            }
            setDestination(destination);
            setDepartureDate(departureDate);
            setTravelers(travelers);
        }
    }, [location.state]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newSearch = {
            origin: isChecked ? origin : '',
            destination,
            departureDate,
            travelers,
            source: 'stays',
        };

        const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        localStorage.setItem('recentSearches', JSON.stringify([newSearch, ...recentSearches]));

        const message = isChecked 
            ? "Congratulations, your chosen flight is available and your stay has been reserved."
            : "Your stay has been reserved.";

        navigate('/search-stays', {
            state: {
                searchDetails: newSearch,
                message: message,
            },
        });
    };

    // const handleDeleteSearch = (index) => {
    //     const updatedSearches = recentSearches.filter((_, i) => i !== index);
    //     setRecentSearches(updatedSearches);
    //     localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    // };

    // const handleEditSearch = (search) => {
    //     setDestination(search.destination);
    //     setDepartureDate(search.departureDate);
    //     setTravelers(search.travelers);
    // };

    return (
        <>
            <Header />
            <div className="outside">
                <div className="container  stays-container">
                    <nav>
                        <NavLink to="/stays" className="tablinks active-link active">Stays</NavLink>
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
                                    value={`${format(date.startDate, 'MMM, dd')} - ${format(date.endDate, 'MMM, dd')}`}
                                    onChange={(e) => setDepartureDate(e.target.value)}
                                    required
                                    onFocus={handleDateRange}
                                />
                                <label htmlFor="departure-date" className="placeholder">Date</label>
                                {openDate && <DateRangePicker
                                    className="date-range"
                                    ranges={[date]}
                                    onChange={handleChange}
                                    minDate={new Date()}
                                />}
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
                        <div className="check">
                            <label id="first">
                                <input
                                    type="checkbox"
                                    onChange={() => {
                                        setIsChecked(!isChecked);
                                        onShowClick()
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
                                Add a Flight
                            </label>
                        </div>
                        {show && <div className="input-container" id="reveal" ref={originRef}>
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
                            required={isChecked}
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
                    </div>}
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
                <Footer />
            </div>
        </>
    );
}

export default Stays;