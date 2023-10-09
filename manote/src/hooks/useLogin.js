import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useLogin = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useLogin must be used within a AuthContextProvider');
  }

  const { login, error, isLoading } = context;

  return { login, error, isLoading };
};

export default useLogin;
