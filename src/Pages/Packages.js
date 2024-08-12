import { FaMapMarkerAlt, FaRegCalendarAlt, FaUserAlt, FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Content from "../Components/Content";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { MdArrowDropDown, MdSwapHoriz } from "react-icons/md";
import { locations } from "../Components/Locations";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main CSS file
import "react-date-range/dist/theme/default.css"; // Theme CSS
import format from "date-fns/format";

const Packages = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [travelers, setTravelers] = useState(1);
    const [selectedFlightType, setSelectedFlightType] = useState('Economy');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isOriginListVisible, setIsOriginListVisible] = useState(false);
    const [isDestinationListVisible, setIsDestinationListVisible] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState("");
    const [selectedOrigin, setSelectedOrigin] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);
    // const [add, setAdd] = useState(false);
    const [staySelected, setStaySelected] = useState(false);
    const [flightSelected, setFlightSelected] = useState(false);
    // const [added, setAdded] = useState(false);
    // const onAddClick = () => {
    //     if (add === false) {
    //         setAdd(true);
    //     } else setAdd(false);
    // }
    // const onAddedClick = () => {
    //     if (added === false) {
    //         setAdded(true);
    //     } else setAdded(false);
    // }

    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const originRef = useRef(null);
    const destinationRef = useRef(null);
    const dateRef = useRef(null);
    const dropdownRef = useRef(null);

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
        if (location.state && location.state.selectedSearch) {
            const { origin, destination, departureDate, travelers, flightType, staySelected, flightSelected } = location.state.selectedSearch;
            setOrigin(origin);
            setSelectedOrigin(origin);
            setDestination(destination);
            setSelectedDestination(destination);
            setDepartureDate(departureDate);
            setTravelers(travelers);
            setSelectedFlightType(flightType);
            setStaySelected(staySelected);
            setFlightSelected(flightSelected);
        } else {
            setOrigin('');
            setSelectedOrigin('');
            setDestination('');
            setSelectedDestination('');
            setDepartureDate('');
            setTravelers(1);
            setSelectedFlightType('Economy');
            setStaySelected(false);
            setFlightSelected(false);
        }
    }, [location.state]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSearch = {
            origin,
            destination,
            departureDate,
            travelers,
            flightType: selectedFlightType,
            staySelected,
            flightSelected,
            source: "packages",
        };
        const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        localStorage.setItem('recentSearches', JSON.stringify([newSearch, ...recentSearches]));
        
        navigate('/search', {
            state: newSearch,
        });
    };
  
    const handlePackageSelection = (type) => {
        if (type === 'stay') {
            setStaySelected(!staySelected);
        } else if (type === 'flight') {
            setFlightSelected(!flightSelected);
        }
    };
  
    const getSelectedPackagesText = () => {
        if (staySelected && flightSelected) {
            return '+ Flight + Stay';
        } else if (staySelected) {
            return '+ Stay';
        } else if (flightSelected) {
            return '+ Flight';
        } else {
            return '';
        }
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
                       <menu>
                            <button type="button" id="package-button" className={`flight-sections ${staySelected ? 'selected' : ''}`} onClick={() => handlePackageSelection('stay')}>
                                Stay {staySelected && "added"}
                            </button>
                            <button type="button" id="package-button"  className={`flight-sections ${flightSelected ? 'selected' : ''}`} onClick={() => handlePackageSelection('flight')}>
                                Flight {flightSelected && "added"}
                            </button>
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
                     {(flightSelected || staySelected) ?  <div className="searched-inputs">
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
                           {/* <button type="button" className="join package-join"><MdSwapHoriz className="change-text" /></button> */}
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
                               <input type="submit" value="Search" />
                           </div>
                       </div> : <p className="select-package">Kindly select a package to get started.</p>}


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

export default Packages