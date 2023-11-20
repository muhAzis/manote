import React, { useState } from 'react';
import '../styles/SettingItem.css';
import { useSettings } from '../hooks/useSettings';
import { useWindowSize } from '../hooks/useWindowSize';

export const SettingGeneralItem = ({ type, title, description }) => {
  const { settings, setSettings } = useSettings();

  return (
    <div className="setting-item-container">
      <div className="setting-info">
        <h4 className="setting-title">{title}</h4>
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

export const SettingAccountItem = ({ title, value, update, setType, type }) => {
  const { windowWidth } = useWindowSize();

  return (
    <div className="setting-item-container">
      <div className="setting-info">
        <h4 className="setting-title">{title}</h4>
        {title === 'User password' ? (
          <p
            className="change-password-btn"
            onClick={() => {
              update(true);
              setType(type);
            }}
          >
            change my password
          </p>
        ) : (
          <p className="account-setting-desc">"{value}"</p>
        )}
      </div>
      {title !== 'User password' && (
        <div className="setting-action">
          <button
            className="bi bi-pencil-square edit-btn"
            onClick={() => {
              update(true);
              setType(type);
            }}
          >
            {windowWidth <= 576 && 'Edit'}
          </button>
        </div>
      )}
    </div>
  );
};
