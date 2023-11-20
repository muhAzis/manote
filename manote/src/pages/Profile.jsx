import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { useCookies } from 'react-cookie';
import dayjs from 'dayjs';
import CropImage from '../components/CropImage';
import useLogout from '../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import UserData from '../components/UserData';
import NotesData from '../components/NotesData';
import useNotes from '../hooks/useNotes';
import NoteCard from '../components/NoteCard';

const Profile = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();
  const { logout, error, isLoading } = useLogout();
  const { notes, getNotes } = useNotes();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState({});
  const [issuedAt, setIssuedAt] = useState('');
  const [settings, setSettings] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [changePict, setChangePict] = useState(false);
  const [recentNotes, setRecentNotes] = useState([]);

  useEffect(() => {
    (() => {
      if (!cookies.user) {
        return console.log('user not found!');
      }

      const { name, email, picture, issued_at } = cookies.user;
      setName(name);
      setEmail(email);
      setPicture(picture);
      setIssuedAt(issued_at);
    })();
  }, [cookies]);

  useEffect(() => {
    (async () => {
      await getNotes();
    })();
  }, []);

  useEffect(() => {
    if (notes.length) {
      const sortedNotes = [...notes];

      sortedNotes.sort((note_a, note_b) => {
        const time1 = new Date(note_a.last_updated).getTime();
        const time2 = new Date(note_b.last_updated).getTime();
        return time1 < time2 ? 1 : -1;
      });

      setRecentNotes(sortedNotes.slice(0, 2));
    }
  }, [notes]);

  const onLogout = async () => {
    await logout();
  };

  return (
    <div id="profilePage">
      <div className="header">
        <div className="profile-image">
          {picture.secure_url !== 'created' ? <img className="profile-picture" src={picture.secure_url} /> : <i className="bi bi-person-circle profile-picture"></i>}
          <i className="bi bi-pencil-square edit-profile-pict" onClick={() => setChangePict(true)}></i>
        </div>
        <div className="profile-info">
          <h1 className="username">{name}</h1>
          <h3 className="email">{email}</h3>
          <p className="issued">Since {dayjs(issuedAt).format('MMMM YYYY')}</p>
        </div>
        <div className="profile-settings">
          <div
            className={isActive ? 'setting-btn active' : 'setting-btn'}
            onClick={() => {
              setSettings((prev) => !prev);
              setIsActive((prev) => !prev);
            }}
          >
            <i className="bi bi-gear-fill"></i>
          </div>
          <div className={settings ? 'settings active' : 'settings'}>
            <p className="edit-btn" onClick={() => navigate('/settings/#accountSettings')}>
              Edit profile
            </p>
            <p className="logout-btn" onClick={onLogout}>
              Logout {isLoading ? <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#ffffff,secondary:#ffffff"></lord-icon> : <i className="bi bi-box-arrow-right"></i>}
            </p>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="cols col1">
          <UserData />
          <div className="recent-notes">
            <h3 className="recent-notes-title">Recent notes</h3>
            {recentNotes.map((note, i) => {
              const { __v, _id, creator, ...data } = note;
              return <NoteCard key={note.title + i} {...data} disable={true} />;
            })}
          </div>
        </div>
        <div className="cols col2">
          <NotesData notes={notes} />
        </div>
      </div>
      {changePict && <CropImage changePict={setChangePict} />}
    </div>
  );
};

export default Profile;
