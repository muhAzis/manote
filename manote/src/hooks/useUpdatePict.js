import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useUpdatePict = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useUpdatePict must be used within a AuthContextProvider');
  }

  const { updatePicture, error, isLoading } = context;

  return { updatePicture, error, isLoading };
};

export default useUpdatePict;
