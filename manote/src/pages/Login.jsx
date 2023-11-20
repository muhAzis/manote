import React, { useEffect, useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, useGoogleLogin, hasGrantedAllScopesGoogle } from '@react-oauth/google';
import useLogin from '../hooks/useLogin';
import Clouds from '../components/Clouds';
import DescriptionPage from '../components/DescriptionPage';
import DarkModeButton from '../components/DarkModeButton';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { login, error, isLoading } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const refToken = document.cookie.includes('ref_token');
    if (refToken) {
      navigate('/notes');
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
    setEmail('');
    setPassword('');
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      console.log(response);
      const tokens = await axios.post();
    },
    flow: 'auth-code',
  });

  const onGoogleLogin = async (googleAccount) => {
    await login({ googleAccount });
  };

  return (
    <div id="loginPage">
      <DarkModeButton position="absolute" />
      <DescriptionPage location={'Login'} />
      <div className="form-container">
        <Clouds />
        <div className="contents">
          <h1 className="title">Login</h1>
          <form id="authForm" className="login-form" onSubmit={onSubmit}>
            <div className="input-bar">
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-bar">
              <input type={showPass ? 'text' : 'password'} placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
              <i className={showPass ? 'bi bi-eye' : 'bi bi-eye-slash'} onClick={() => setShowPass((prev) => !prev)}></i>
            </div>
            <p className="error-message" style={error.length ? { display: 'block' } : { display: 'none' }}>
              {error}
            </p>
            <p>
              {"Don't have account? "}
              <span onClick={() => navigate('/signin')}>Sign in</span>
              {' here!'}
            </p>
            <button type="submit">{isLoading ? <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#ffffff,secondary:#ffffff" style={{ width: '20px', height: '20px' }}></lord-icon> : 'Login'}</button>
          </form>
          <GoogleLogin onSuccess={(response) => onGoogleLogin(response.credential)} onError={() => console.log('Login Failed')} />
          {/* <button type="button" onClick={googleLogin}>
            Login with Google
          </button> */}
        </div>
      </div>
      <div className="background"></div>
    </div>
  );
};

export default Login;
