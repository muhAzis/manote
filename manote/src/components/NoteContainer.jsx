import React, { useEffect, useState } from 'react';
import '../styles/NoteContainer.css';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useConfirm } from '../hooks/useConfirm';
import { useSettings } from '../hooks/useSettings';
import useNotes from '../hooks/useNotes';

const Notes = ({ note_id, title, note, isArchived, last_updated }) => {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { setDisplayConfirm, setNote } = useConfirm();
  const { getNotes, archiveNote, deleteNote } = useNotes();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    if (settings.confirmation) {
      setDisplayConfirm(true);
      setNote({ note_id, title });
    } else {
      deleteNote(note_id);
      getNotes(location.pathname === '/archive');
    }
  };

  const onArchived = async () => {
    setIsLoading(true);
    await archiveNote(note_id, isArchived, location.pathname === '/archive');
    setIsLoading(false);
  };

  return (
    <div className="note-container">
      {isLoading ? (
        <div className="loading-container">
          <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#ffffff,secondary:#ffffff"></lord-icon>
        </div>
      ) : (
        ''
      )}
      <div className="row1 row">
        <h5 className="note-updated">{dayjs(last_updated).format('DD MMM, YYYY | HH:mm')}</h5>
        <h3 className="note-title" onClick={() => navigate(`/notes/${note_id}`)}>
          <div className="dot"></div>
          {title}
        </h3>
      </div>
      <div className="row2 row">
        <p className="note">{note}</p>
      </div>
      <div className="row3 row">
        <i className="bi bi-journal-bookmark-fill archive-btn" onClick={onArchived}></i>
        <div className="delete-container">
          <i className="bi bi-trash3 delete-btn" onClick={onDelete}></i>
        </div>
      </div>
    </div>
  );
};

export default Notes;
