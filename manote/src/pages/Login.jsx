import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { useSettings } from '../hooks/useSettings';
import DarkModeButton from '../components/DarkModeButton';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const navigate = useNavigate();
  const { settings, setSettings } = useSettings();
  const { login, error, isLoading } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const refToken = document.cookie.includes('ref_token');
    if (refToken) {
      navigate('/notes');
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <DarkModeButton position="absolute" />
      <div className="form-container">
        <h1 className="title">Login</h1>
        <form className="login-form" onSubmit={onSubmit}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <p className="error-message" style={error.length ? { display: 'block' } : { display: 'none' }}>
            {error}
          </p>
          <p>
            {"Don't have account? "}
            <a href="/signin">Sign in</a>
            {' here!'}
          </p>
          <button type="submit">{isLoading ? <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#ffffff,secondary:#ffffff" style={{ width: '20px', height: '20px' }}></lord-icon> : 'Login'}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
