import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useSignin = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useSignin must be used within a AuthContextProvider');
  }

  const { signin, error, isLoading } = context;

  return { signin, error, isLoading };
};

export default useSignin;
