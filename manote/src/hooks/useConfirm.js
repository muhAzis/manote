import { useContext } from 'react';
import { ConfirmationContext } from '../contexts/ConfrrmationContext';

export const useConfirm = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsContextProvider');
  }

  return context;
};
