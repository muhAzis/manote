import { createContext, useEffect, useState } from 'react';

export const SettingsContext = createContext(null);

const SettingsContextProvider = ({ children }) => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const localSettings = JSON.parse(localStorage.getItem('settings'));
    if (!localSettings) {
      const settingsOption = {
        notification: true,
        confirmation: true,
        theme: false,
      };

      localStorage.setItem('settings', JSON.stringify(settingsOption));
      return setSettings(settingsOption);
    }

    return setSettings(localSettings);
  }, []);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
    document.body.setAttribute('theme-type', settings.theme ? 'dark' : '');
  }, [settings]);

  const localSettings = JSON.parse(localStorage.getItem('settings'));
  if (localSettings) {
    document.body.setAttribute('theme-type', localSettings.theme ? 'dark' : '');
  }

  return <SettingsContext.Provider value={{ settings, setSettings }}>{children}</SettingsContext.Provider>;
};

export default SettingsContextProvider;
