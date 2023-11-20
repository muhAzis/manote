import React, { useEffect, useState } from 'react';
import '../styles/UpdateAccount.css';
import { useCookies } from 'react-cookie';
import useUpdateAccount from '../hooks/useUpdateAccount';

const UpdateAccount = ({ updateAccount, type }) => {
  const [cookies, setCookies] = useCookies();
  const { updateData, isLoading, error, clearError } = useUpdateAccount();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);

  const [namePH, setNamePH] = useState('');
  const [emailPH, setEmailPH] = useState('');
  const [passPH, setPassPH] = useState('');
  const [newPassPH, setNewPassPH] = useState('');
  const [cPassPH, setCPassPH] = useState('');

  useEffect(() => {
    setName(cookies.user.name);
    setEmail(cookies.user.email);
  }, [cookies]);

  const renderForm = () => {
    switch (type) {
      case 'name':
        return (
          <>
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
              <input type={showPass ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <i className={showPass ? 'bi bi-eye' : 'bi bi-eye-slash'} onClick={() => setShowPass((prev) => !prev)}></i>
            </div>
          </>
        );
      case 'email':
        return (
          <>
            <div className="input-bar">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setEmailPH(true)} onBlur={() => setEmailPH(false)} pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required />
            </div>
            <p className="text-info" style={{ display: !emailPH && 'none' }}>
              e.g. user@gmail.com
            </p>
            <div className="input-bar">
              <input type={showPass ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <i className={showPass ? 'bi bi-eye' : 'bi bi-eye-slash'} onClick={() => setShowPass((prev) => !prev)}></i>
            </div>
          </>
        );
      case 'password':
        return (
          <>
            <div className="input-bar">
              <input type={showPass ? 'text' : 'password'} placeholder="Current password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <i className={showPass ? 'bi bi-eye' : 'bi bi-eye-slash'} onClick={() => setShowPass((prev) => !prev)}></i>
            </div>
            <div className="input-bar">
              <input
                type={showNewPass ? 'text' : 'password'}
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onFocus={() => setNewPassPH(true)}
                onBlur={() => setNewPassPH(false)}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                required
              />
              <i className={showNewPass ? 'bi bi-eye' : 'bi bi-eye-slash'} onClick={() => setShowNewPass((prev) => !prev)}></i>
            </div>
            <ul className="password-rules" style={{ display: !newPassPH && 'none' }}>
              <li className="rules rule-1" style={newPassword.length >= 8 ? { color: 'var(--clr-action)' } : {}}>
                Minimum of 8 characters
              </li>
              <li className="rules rule-2" style={/[A-Z]/.test(newPassword) ? { color: 'var(--clr-action)' } : {}}>
                At least one capital letter
              </li>
              <li className="rules rule-3" style={/\d/.test(newPassword) ? { color: 'var(--clr-action)' } : {}}>
                At least one numeric
              </li>
            </ul>
            <div className="input-bar">
              <input type={showCPass ? 'text' : 'password'} placeholder="Confirm new password" value={cPassword} onChange={(e) => setCPassword(e.target.value)} onFocus={() => setCPassPH(true)} onBlur={() => setCPassPH(false)} required />
              <i className={showCPass ? 'bi bi-eye' : 'bi bi-eye-slash'} onClick={() => setShowCPass((prev) => !prev)}></i>
            </div>
            <p className="confirm-password" style={{ display: !cPassPH && 'none', color: cPassword === newPassword ? 'var(--clr-action)' : '' }}>
              Confirm your password
            </p>
          </>
        );
      default:
        return;
    }
  };

  const onUpdateData = async (e) => {
    e.preventDefault();
    let data = {};
    switch (type) {
      case 'name':
        data = {
          newName: name,
          password,
        };
        break;
      case 'email':
        data = {
          newEmail: email,
          password,
        };
        break;
      case 'password':
        data = {
          newPassword,
          password,
        };
        break;
      default:
        break;
    }
    await updateData(type, data, updateAccount);
  };

  return (
    <>
      <div id="updateAccount">
        <div className="container">
          <div className="header">
            <h1>Update {type}</h1>
          </div>
          <div className="body">
            <form onSubmit={onUpdateData}>
              {renderForm()}
              <p className="error-message" style={error.length ? { display: 'block' } : { display: 'none' }}>
                {error}
              </p>
              <div className="action-buttons">
                <button
                  className="cancel-btn btn"
                  onClick={() => {
                    clearError();
                    updateAccount(false);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="loading-screen">
          <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#ffffff,secondary:#ffffff"></lord-icon>
        </div>
      )}
    </>
  );
};

export default UpdateAccount;
