import React, { useEffect, useState } from 'react';
import '../styles/Navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';
import DarkModeButton from './DarkModeButton';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { settings, setSettings } = useSettings();

  return (
    <nav>
      <div className="col1">
        <h3 id="navLogo">Manote</h3>
        <ul className="navbar-menu">
          <li>
            <a href="" className={location.pathname === '/notes' ? 'active' : 'inactive'} onClick={() => navigate('/notes')}>
              <i className="bi bi-journal-text"></i> Notes
            </a>
          </li>
          <li>
            <a href="" className={location.pathname === '/archive' ? 'active' : 'inactive'} onClick={() => navigate('/archive')}>
              <i className="bi bi-journal-bookmark-fill"></i> Archive
            </a>
          </li>
          <li>
            <a href="" className={location.pathname === '/profile' ? 'active' : 'inactive'} onClick={() => navigate('/profile')}>
              <i className="bi bi-person"></i> Profile
            </a>
          </li>
          <li>
            <a href="" className={location.pathname === '/settings' ? 'active' : 'inactive'} onClick={() => navigate('/settings')}>
              <i className="bi bi-gear"></i> Settings
            </a>
          </li>
        </ul>
      </div>
      <div className="col2">
        {/* <div
          className="dark-mode-btn"
          onClick={() =>
            setSettings((prev) => {
              return { ...prev, theme: !prev.theme };
            })
          }
        >
          <div className={settings.theme ? 'toggle-dark-mode dark-mode' : 'toggle-dark-mode'}>
            <span className="moon-hole hole1" style={settings.theme ? { transparency: 1 } : { transparency: 0 }} />
            <span className="moon-hole hole2" style={settings.theme ? { transparency: 1 } : { transparency: 0 }} />
            <span className="moon-hole hole3" style={settings.theme ? { transparency: 1 } : { transparency: 0 }} />
          </div>
        </div> */}
        <DarkModeButton position="relative" />
      </div>
    </nav>
  );
};

export default Navbar;
