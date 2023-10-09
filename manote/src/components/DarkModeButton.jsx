import React from 'react';
import '../styles/DarkModeButton.css';
import { useSettings } from '../hooks/useSettings';

const DarkModeButton = ({ position = 'absolute' }) => {
  const { settings, setSettings } = useSettings();

  return (
    <div
      className="dark-mode-btn"
      style={position !== 'relative' ? { position: [position], top: '1.4rem', right: '3rem' } : {}}
      onClick={() =>
        setSettings((prev) => {
          return { ...prev, theme: !prev.theme };
        })
      }
    >
      <div className={settings.theme ? 'toggle-dark-mode dark-mode' : 'toggle-dark-mode'}>
        <span className="moon-hole hole1" style={settings.theme ? { transparency: 1 } : { transparency: 0 }} />
        <span className="moon-hole hole2" style={settings.theme ? { transparency: 1 } : { transparency: 0 }} />
        <span className="moon-hole hole3" style={settings.theme ? { transparency: 1 } : { transparency: 0 }} />
      </div>
    </div>
  );
};

export default DarkModeButton;
