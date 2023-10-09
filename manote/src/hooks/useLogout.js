import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useLogout = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useLogout must be used within a AuthContextProvider');
  }

  const { logout, error, isLoading } = context;

  return { logout, error, isLoading };
};

export default useLogout;
