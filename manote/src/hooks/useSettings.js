import { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsContextProvider');
  }

  return context;
};
