import React from 'react';
import '../styles/SearchBar.css';
import useNotes from '../hooks/useNotes';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const location = useLocation();
  const { filterNotes } = useNotes();

  return (
    <div className="searchbar-container" style={location.pathname === '/notes' || location.pathname === '/archive' ? {} : { display: 'none' }}>
      <i className="bi bi-search"></i>
      <input type="text" placeholder="Find notes..." onChange={(e) => filterNotes(e.target.value)} />
    </div>
  );
};

export default SearchBar;
