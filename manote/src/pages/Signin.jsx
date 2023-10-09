import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signin.css';
import DarkModeButton from '../components/DarkModeButton';
import useSignin from '../hooks/useSignin';

const Signin = () => {
  const navigate = useNavigate();

  const { signin, error, isLoading } = useSignin();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    await signin(name, email, password);
    setName('');
    setEmail('');
    setPassword('');
    setCPassword('');
  };

  return (
    <div className="signin-container">
      <DarkModeButton position="absolute" />
      <div className="form-container">
        <h1 className="title">Register</h1>
        <form className="signin-form" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              return setName(e.target.value.slice(0, 50));
            }}
            pattern="[A-Za-z' ]{1,}"
            required
          />
          <p className="text-info" style={name.length === 50 ? { color: 'var(--clr-danger)' } : {}}>
            You have {50 - name.length} character(s) left
          </p>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required />
          <p className="text-info">e.g. user@gmail.com</p>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required />
          <ul className="password-rules">
            <li className="rules rule-1" style={password.length >= 8 ? { color: 'var(--clr-text-second)' } : {}}>
              Minimum of 8 characters
            </li>
            <li className="rules rule-2" style={/[A-Z]/.test(password) ? { color: 'var(--clr-text-second)' } : {}}>
              At least one capital letter
            </li>
            <li className="rules rule-3" style={/\d/.test(password) ? { color: 'var(--clr-text-second)' } : {}}>
              At least one numeric
            </li>
          </ul>
          <input type="password" placeholder="Confirm password" value={cPassword} onChange={(e) => setCPassword(e.target.value)} required />
          <p className="confirm-password" style={cPassword === password ? { color: 'var(--clr-text-second)' } : {}}>
            Confirm your password
          </p>
          <p>
            {'Already have account? '}
            <a href="/login">Login</a>
            {' here!'}
          </p>
          <button type="submit">{isLoading ? <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#ffffff,secondary:#ffffff" style={{ width: '20px', height: '20px' }}></lord-icon> : 'Submit'}</button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
