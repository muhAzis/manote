import React, { useEffect, useState } from 'react';
import '../styles/Settings.css';
import { SettingGeneralItem, SettingAccountItem } from '../components/SettingItem';
import { useCookies } from 'react-cookie';
import UpdateAccount from '../components/UpdateAccount';

const Settings = () => {
  const [cookies, setCookies] = useCookies();

  const [account, setAccount] = useState({
    name: 'username',
    email: 'username@gmail.com',
  });
  const [updateAccount, setUpdateAccount] = useState(false);
  const [updateType, setUpdateType] = useState('');

  useEffect(() => {
    if (cookies.user) {
      const { name, email } = cookies.user;
      setAccount({ name, email });
    }
  }, [cookies]);

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
    <div id="settingsPage">
      <div className="settings">
        <div className="general-settings">
          <h2 className="page-title">General Settings</h2>
          {settingsOption.map((setting, i) => (
            <SettingGeneralItem key={i} {...setting} />
          ))}
        </div>
        <div id="accountSettings" className="account-settings">
          <h2 className="page-title">Account Settings</h2>
          <SettingAccountItem title={'Username'} value={account.name} update={setUpdateAccount} setType={setUpdateType} type={'name'} />
          <SettingAccountItem title={'User email'} value={account.email} update={setUpdateAccount} setType={setUpdateType} type={'email'} />
          <SettingAccountItem title={'User password'} value={account.email} update={setUpdateAccount} setType={setUpdateType} type={'password'} />
        </div>
      </div>
      {updateAccount && <UpdateAccount updateAccount={setUpdateAccount} type={updateType} />}
    </div>
  );
};

export default Settings;
