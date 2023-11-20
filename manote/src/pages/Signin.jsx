import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signin.css';
import useSignin from '../hooks/useSignin';
import DescriptionPage from '../components/DescriptionPage';
import Clouds from '../components/Clouds';
import DarkModeButton from '../components/DarkModeButton';

const Signin = () => {
  const navigate = useNavigate();

  const { signin, error, isLoading } = useSignin();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);

  const [namePH, setNamePH] = useState(false);
  const [emailPH, setEmailPH] = useState(false);
  const [passPH, setPassPH] = useState(false);
  const [cPassPH, setCPassPH] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    await signin(name, email, password);
    setName('');
    setEmail('');
    setPassword('');
    setCPassword('');
  };

  return (
    <div id="signinPage">
      <DarkModeButton position="absolute" />
      <DescriptionPage location={'Sign in'} />
      <div className="form-container">
        <Clouds />
        <div className="contents">
          <h1 className="title">Register</h1>
          <form id="authForm" className="signin-form" onSubmit={onSubmit}>
            <div className="input-bar">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  return setName(e.target.value.slice(0, 50));
                }}
                onFocus={() => setNamePH(true)}
                onBlur={() => setNamePH(false)}
                pattern="[A-Za-z' ]{1,}"
                required
              />
            </div>
            <p className="text-info" style={{ display: !namePH && 'none', color: name.length === 50 ? 'var(--clr-danger)' : '' }}>
              You have {50 - name.length} character(s) left
            </p>
            <div className="input-bar">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setEmailPH(true)} onBlur={() => setEmailPH(false)} pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required />
            </div>
            <p className="text-info" style={{ display: !emailPH && 'none' }}>
              e.g. user@gmail.com
            </p>
            <div className="input-bar">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPassPH(true)}
                onBlur={() => setPassPH(false)}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                required
              />
              <i className={showPass ? 'bi bi-eye' : 'bi bi-eye-slash'} onClick={() => setShowPass((prev) => !prev)}></i>
            </div>
            <ul className="password-rules" style={{ display: !passPH && 'none' }}>
              <li className="rules rule-1" style={password.length >= 8 ? { color: 'var(--clr-action)' } : {}}>
                Minimum of 8 characters
              </li>
              <li className="rules rule-2" style={/[A-Z]/.test(password) ? { color: 'var(--clr-action)' } : {}}>
                At least one capital letter
              </li>
              <li className="rules rule-3" style={/\d/.test(password) ? { color: 'var(--clr-action)' } : {}}>
                At least one numeric
              </li>
            </ul>
            <div className="input-bar">
              <input type={showCPass ? 'text' : 'password'} placeholder="Confirm password" value={cPassword} onChange={(e) => setCPassword(e.target.value)} onFocus={() => setCPassPH(true)} onBlur={() => setCPassPH(false)} required />
              <i className={showCPass ? 'bi bi-eye' : 'bi bi-eye-slash'} onClick={() => setShowCPass((prev) => !prev)}></i>
            </div>
            <p className="confirm-password" style={{ display: !cPassPH && 'none', color: cPassword === password ? 'var(--clr-action)' : '' }}>
              Confirm your password
            </p>
            <p className="to-login">
              {'Already have account? '}
              <span onClick={() => navigate('/login')}>Login</span>
              {' here!'}
            </p>
            <button type="submit">{isLoading ? <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#ffffff,secondary:#ffffff" style={{ width: '20px', height: '20px' }}></lord-icon> : 'Submit'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
