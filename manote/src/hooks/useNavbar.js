import { useContext } from 'react';
import { NavbarContext } from '../contexts/NavbarContext';

const useNavbar = () => {
  const context = useContext(NavbarContext);

  if (!context) {
    throw new Error('useNavbar must be used within a NavbarContextProvider');
  }

  return context;
};

export default useNavbar;
