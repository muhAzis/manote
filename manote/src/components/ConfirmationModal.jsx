import React, { useState } from 'react';
import '../styles/ConfirmationModal.css';
import { useConfirm } from '../hooks/useConfirm';
import useNotes from '../hooks/useNotes';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmationModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { note, setNote, setDisplayConfirm } = useConfirm();
  const { deleteNote, getNotes } = useNotes();

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    await deleteNote(note.note_id);
    await getNotes(location.pathname === '/archive');
    setIsLoading(false);
    setDisplayConfirm(false);

    if (location.pathname === `/notes/${note.note_id}`) {
      navigate(note.isArchived ? '/archive' : '/notes', { replace: true });
    }
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-box">
        <i className="bi bi-exclamation-triangle"></i>
        <p className="note-title">"{note.title}"</p>
        <p className="text">Do you really want to delete this note?</p>
        <p className="text">Deleted note can't be restored!</p>
        <div className="option-box">
          <button className="option-btn yes-btn" onClick={onDelete}>
            {isLoading ? <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#ffffff,secondary:#ffffff" style={{ width: '14px', height: '14px' }}></lord-icon> : 'Delete'}
          </button>
          <button
            className="option-btn cancel-btn"
            onClick={() => {
              setDisplayConfirm(false);
              setNote('');
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
