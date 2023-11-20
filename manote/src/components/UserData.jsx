import React, { useEffect, useState } from 'react';
import '../styles/UserData.css';
import { useCookies } from 'react-cookie';
import dayjs from 'dayjs';

const UserData = () => {
  const [cookies, setCookies] = useCookies();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState('');

  useEffect(() => {
    const { name, email, issued_at } = cookies.user;
    setName(name);
    setEmail(email);
    setJoined(dayjs(issued_at).format('DD MMMM YYYY'));
  }, [cookies]);

  return (
    <div id="userData">
      <h3 className="title bi bi-person-fill">User Data</h3>
      <div className="data data-name">
        <p className="tag">Username</p>
        <p className="double-dot">:</p>
        <p className="value">{name}</p>
      </div>
      <div className="data data-name">
        <p className="tag">Email</p>
        <p className="double-dot">:</p>
        <p className="value">{email}</p>
      </div>
      <div className="data data-name">
        <p className="tag">Joined</p>
        <p className="double-dot">:</p>
        <p className="value">{joined}</p>
      </div>
    </div>
  );
};

export default UserData;
