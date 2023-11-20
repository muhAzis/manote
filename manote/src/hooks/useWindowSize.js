import { useContext } from 'react';
import { WindowSizeContext } from '../contexts/WindowSizeContext';

export const useWindowSize = () => {
  const context = useContext(WindowSizeContext);
  if (!context) {
    throw new Error('useWindowSize must be used within a WindowSizeContextProvider');
  }

  return context;
};
