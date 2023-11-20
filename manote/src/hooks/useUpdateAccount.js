import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useUpdateAccount = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useUpdateAccount must be used within a AuthContextProvider');
  }

  const { updateData, error, isLoading, clearError } = context;

  return { updateData, error, isLoading, clearError };
};

export default useUpdateAccount;
