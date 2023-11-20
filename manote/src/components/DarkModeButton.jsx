import React from 'react';
import '../styles/DarkModeButton.css';
import { useSettings } from '../hooks/useSettings';
import Cloud from './Cloud';
import Star from './Star';

const DarkModeButton = ({ position = 'absolute', top = '1rem', left = '1rem', bottom = 0, right = 0 }) => {
  const { settings, setSettings } = useSettings();

  return (
    <div
      className="dark-mode-btn"
      style={position !== 'relative' ? { position: [position], top, left, bottom, right } : {}}
      onClick={() =>
        setSettings((prev) => {
          return { ...prev, theme: !prev.theme };
        })
      }
    >
      <div className="clouds">
        <Cloud width={'100%'} color={'var(--clr-cloud1)'} className={settings.theme ? 'cloud cloud1 dark' : 'cloud cloud1'} />
        <Cloud width={'100%'} color={'var(--clr-cloud2)'} className={settings.theme ? 'cloud cloud2 dark' : 'cloud cloud2'} />
      </div>
      <div className="stars">
        <Star width={'16%'} className={settings.theme ? 'star star1 dark' : 'star star1'} />
        <Star width={'12%'} className={settings.theme ? 'star star2 dark' : 'star star2'} />
        <Star width={'10%'} className={settings.theme ? 'star star3 dark' : 'star star3'} />
      </div>
      <div className={settings.theme ? 'toggle-dark-mode dark-mode' : 'toggle-dark-mode'}>
        <span className="moon-hole hole1" style={settings.theme ? { transparency: 1 } : { transparency: 0 }} />
        <span className="moon-hole hole2" style={settings.theme ? { transparency: 1 } : { transparency: 0 }} />
        <span className="moon-hole hole3" style={settings.theme ? { transparency: 1 } : { transparency: 0 }} />
      </div>
    </div>
  );
};

export default DarkModeButton;
