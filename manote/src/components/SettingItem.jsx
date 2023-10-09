import React, { useState } from 'react';
import '../styles/SettingItem.css';
import { useSettings } from '../hooks/useSettings';

const SettingItem = ({ type, title, description }) => {
  const { settings, setSettings } = useSettings();

  return (
    <div className="setting-item-container">
      <div className="setting-info">
        <h3 className="setting-title">{title}</h3>
        <p className="setting-desc">{description}</p>
      </div>
      <div className="setting-action">
        <div
          className={settings[type] ? 'toggle-btn active' : 'toggle-btn'}
          onClick={() =>
            setSettings((prev) => {
              return { ...prev, [type]: !prev[type] };
            })
          }
        >
          <div className="toggler"></div>
        </div>
      </div>
    </div>
  );
};

export default SettingItem;
