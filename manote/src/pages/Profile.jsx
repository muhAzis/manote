import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ControlBar from '../components/ControlBar';
import useLogout from '../hooks/useLogout';

const Profile = () => {
  const navigate = useNavigate();

  const [cookies, setCookies] = useCookies();
  const { logout, error, isLoading } = useLogout();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [settings, setSettings] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    (() => {
      const { name, email } = cookies.user;
      setName(name);
      setEmail(email);
    })();
  });

  const onLogout = async () => {
    await logout();
  };

  return (
    <div className="profile-container">
      <ControlBar />
      <div className="profile-page-detail">
        <div className="header">
          <div className="profile-image">
            <i className="bi bi-person-circle"></i>
          </div>
          <div className="profile-info">
            <h1 className="username">{name}</h1>
            <h3 className="email">{email}</h3>
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
              <h4 className="edit-btn">Edit profile</h4>
              <h4 className="logout-btn" onClick={onLogout}>
                Logout {isLoading ? <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#ffffff,secondary:#ffffff"></lord-icon> : <i className="bi bi-box-arrow-right"></i>}
              </h4>
            </div>
          </div>
        </div>
        <div className="body">body</div>
      </div>
    </div>
  );
};

export default Profile;
