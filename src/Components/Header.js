import { Link } from "react-router-dom";
import { FaAngleDown, FaGlobe, FaTelegramPlane, FaHotel, FaBars, FaTimes } from "react-icons/fa";
import { MdAirplanemodeActive, MdBusinessCenter } from "react-icons/md";
import { IoAlbums } from "react-icons/io5";
import React, { useRef, useState, useEffect } from 'react';
// import SignUpLoginModal from './SignUpLoginModal';
import { useAuth } from '../AuthContext';

const Header = () => {
  const { user, signUpWithGoogle, logOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  const toggleOpenSideBar = () => {
    setOpenSideBar(!openSideBar);
  }

  const closeSideBar = () => {
    setOpenSideBar(false);
  }

  const sidebarRef = useRef(null);
  const travelRef = useRef(null);

  const toggleOpen = () => {
    setOpen(!open);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (travelRef.current && !travelRef.current.contains(event.target) && !event.target.classList.contains('nav')) {
        setOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenSideBar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="outer-container">
      <div className="right-container">
        <h2><FaTelegramPlane className="travel-icon" /> Travel</h2>
        <FaBars className="toggle-menu" onClick={toggleOpenSideBar} />
      </div>

      <div
        className={`left-container ${openSideBar ? 'show' : 'none'}`}
        ref={sidebarRef}
      >
        <FaTimes className="close-side-bar" onClick={closeSideBar} />
        <button type="button" className="nav" onClick={toggleOpen}>
          shop travel <FaAngleDown className="down" />
        </button>
        {open && (
          <div className="shop-travel-drop-down" ref={travelRef}>
            <ul>
              <li>
                <Link to="/stays" className="Link">
                  <FaHotel size={25} /> <p>Stays</p>
                </Link>
              </li>
              <li>
                <Link to="/flights/round" className="Link">
                  <MdAirplanemodeActive className="flight-icon" size={25} />{' '}
                  <p>Flights</p>
                </Link>
              </li>
              <li>
                <Link to="/packages" className="Link">
                  <MdBusinessCenter size={25} />
                  <p>Packages</p>
                </Link>
              </li>
              <li>
                <Link to="/things" className="Link">
                  <IoAlbums size={25} />
                  <p>Things to do</p>
                </Link>
              </li>
            </ul>
          </div>
        )}
        <h3 className="change-language">
          <FaGlobe /> English
        </h3>
        <h3 className="trips">
          <Link to="/trips">Trips</Link>
        </h3>
        {user ? (
          <div className="user-info">
            <span>{user.name}</span>
            <img src={user.photoURL} alt={user.name} />
            <button onClick={logOut} className="sign-up">Sign Out</button>
          </div>
        ) : (
          <button onClick={signUpWithGoogle} className="sign-up">
            Sign Up / Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
