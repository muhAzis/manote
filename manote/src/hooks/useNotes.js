import { useContext } from 'react';
import { NotesContext } from '../contexts/NotesContext';

const useNotes = () => {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error('useNotes must be used within a NotesContextProvider');
  }

  return context;
};

export default useNotes;
