import React, { useState } from 'react';
import '../styles/Navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import DarkModeButton from './DarkModeButton';
import CustomLogo from './CustomLogo';
import useNavbar from '../hooks/useNavbar';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { closed, setClosed } = useNavbar();

  return (
    <nav className={closed ? 'closed' : ''}>
      <div className="col1">
        <div id="navLogo">
          <CustomLogo width="30px" color="var(--clr-text-second2)" close={setClosed} />
          <h3 className={closed ? 'closed' : ''}>Manote</h3>
          <i className="bi bi-caret-left-fill show-btn" onClick={() => setClosed(true)}></i>
        </div>
        <ul className="navbar-menu">
          <li>
            <span
              href=""
              className={location.pathname === '/notes' ? 'active' : 'inactive'}
              onClick={() => {
                setClosed(true);
                navigate('/notes');
              }}
            >
              <i className="bi bi-journal-text"></i>
              <p className={closed ? 'closed' : ''}> Notes</p>
            </span>
          </li>
          <li>
            <span
              href=""
              className={location.pathname === '/archive' ? 'active' : 'inactive'}
              onClick={() => {
                setClosed(true);
                navigate('/archive');
              }}
            >
              <i className="bi bi-journal-bookmark-fill"></i>
              <p className={closed ? 'closed' : ''}> Archive</p>
            </span>
          </li>
          <li>
            <span
              href=""
              className={location.pathname === '/profile' ? 'active' : 'inactive'}
              onClick={() => {
                setClosed(true);
                navigate('/profile');
              }}
            >
              <i className="bi bi-person"></i>
              <p className={closed ? 'closed' : ''}> Profile</p>
            </span>
          </li>
          <li>
            <span
              href=""
              className={location.pathname === '/settings' ? 'active' : 'inactive'}
              onClick={() => {
                setClosed(true);
                navigate('/settings');
              }}
            >
              <i className="bi bi-gear"></i>
              <p className={closed ? 'closed' : ''}> Settings</p>
            </span>
          </li>
        </ul>
      </div>
      <div className="col2">
        <DarkModeButton position="relative" />
      </div>
    </nav>
  );
};

export default Navbar;
