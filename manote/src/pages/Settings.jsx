import React from 'react';
import '../styles/Settings.css';
import ControlBar from '../components/ControlBar';
import SettingItem from '../components/SettingItem';

const Settings = () => {
  const settingsOption = [
    {
      type: 'notification',
      title: 'Notification action',
      description: 'Shows notification everytime an action is triggered, including add, update, or deleting notes.',
    },
    {
      type: 'confirmation',
      title: 'Confirmation pop-up on "Delete"',
      description: 'Shows pop-up of confirmation window whenever deleting note action is triggered.',
    },
    {
      type: 'theme',
      title: 'Dark-mode',
      description: 'Switch the app theme to dark-mode.',
    },
  ];

  return (
    <div className="settings-page">
      <ControlBar />
      <div className="settings-container">
        <h1 className="page-title">Settings</h1>
        <div className="system-settings">
          {settingsOption.map((setting, i) => (
            <SettingItem key={i} {...setting} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
