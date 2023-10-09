import React, { useEffect, useState } from 'react';
import '../styles/ControlBar.css';
import { useCookies } from 'react-cookie';
import SearchBar from './SearchBar';
import useNotes from '../hooks/useNotes';
import { useLocation, useNavigate } from 'react-router-dom';
import NoteForm from '../pages/NoteForm';
import useLogout from '../hooks/useLogout';

const ControlBar = () => {
  const [cookies, setCookies] = useCookies();
  const location = useLocation();
  const navigate = useNavigate();

  const { logout, error, isLoading } = useLogout();
  const { notes, sortNotes, getNotes } = useNotes();

  const [username, setUsername] = useState('User');
  const [email, setEmail] = useState('user@gmail.com');
  const [displayForm, setDisplayForm] = useState(false);
  const [checked, setChecked] = useState('last_updated');
  const [reverse, setReverse] = useState(false);
  const [showOption, setShowOption] = useState(false);

  const sortingOptions = [
    ['title', 'title'],
    ['last updated', 'last_updated'],
  ];

  useEffect(() => {
    (() => {
      if (!cookies.user) {
        return;
      }

      const { name, email } = cookies.user;
      setUsername(name.split(' ')[0]);
      setEmail(email);
    })();
  }, []);

  useEffect(() => {
    if (notes.length) {
      sortNotes(checked, reverse);
    }
  }, [reverse, checked]);

  const onLogout = async () => {
    await logout();
  };

  return (
    <>
      <div className="control-bar-container">
        <div className="col1">
          <SearchBar />
          <div className="account-info">
            <i className="bi bi-person-circle profile-pic"></i>
            <div className="profile-detail">
              <h3 className="username">Hello, {username}!</h3>
              <h5 className="email">{email}</h5>
            </div>
            <i className="bi bi-caret-down-fill option-btn" onClick={() => setShowOption((prev) => !prev)}></i>
            <div className={showOption ? 'option-menu active' : 'option-menu'}>
              {location.pathname !== '/profile' && (
                <a href="/profile" className="profile-btn">
                  Profile
                </a>
              )}
              <p className="logout-btn" onClick={onLogout}>
                Logout {isLoading ? <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#ffffff,secondary:#ffffff"></lord-icon> : <i className="bi bi-box-arrow-right"></i>}
              </p>
            </div>
          </div>
        </div>
        {location.pathname === '/archive' || location.pathname === '/notes' ? (
          <div className="col2">
            <div className="sorting-container">
              <div className={reverse ? 'sort-reverse active' : 'sort-reverse'} onClick={() => setReverse((prev) => !prev)}>
                <i className="bi bi-sort-down-alt"></i>
              </div>
              {sortingOptions.map((option, i) => (
                <div key={option[1] + i} className={option[1] === checked ? 'sort-menu active' : 'sort-menu'} onClick={() => setChecked(option[1])}>
                  {option[0]}
                </div>
              ))}
            </div>
            <button className="add-note-btn" onClick={() => setDisplayForm(true)}>
              <i className="bi bi-plus-circle"></i>Add new note
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
      {displayForm ? <NoteForm setDisplay={setDisplayForm} formType={'add'} /> : ''}
    </>
  );
};

export default ControlBar;
