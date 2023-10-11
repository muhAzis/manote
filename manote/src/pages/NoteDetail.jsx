import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../styles/NoteDetail.css';
import dayjs from 'dayjs';
import useNotes from '../hooks/useNotes';
import { useConfirm } from '../hooks/useConfirm';
import { useSettings } from '../hooks/useSettings';
import NoteForm from './NoteForm';
import ControlBar from '../components/ControlBar';

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { settings } = useSettings();
  const { setDisplayConfirm, setNote } = useConfirm();
  const { note, getNoteById, archiveNote, deleteNote } = useNotes();

  const [isLoading, setIsLoading] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);

  useEffect(() => {
    (async () => {
      await getNoteById(id);
    })();
  }, []);

  const onDelete = async () => {
    if (settings.confirmation) {
      setDisplayConfirm(true);
      setNote({ note_id: id, title: note.title });
    } else {
      setIsLoading(true);
      await deleteNote(id);
      setIsLoading(false);
      navigate(note.isArchived ? '/archive' : '/notes', { replace: true });
    }
  };

  const onArchived = async () => {
    setIsLoading(true);
    await archiveNote(id, note.isArchived, location.pathname === '/archive');
    setIsLoading(false);
  };

  const editNoteForm = () => {
    return displayForm ? <NoteForm setDisplay={setDisplayForm} formType={'edit'} /> : '';
  };

  return (
    <div className="note-detail-page">
      <ControlBar />
      <div className="note-detail-container">
        {editNoteForm()}
        {isLoading ? (
          <div className="loading-container">
            <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#ffffff,secondary:#ffffff"></lord-icon>
          </div>
        ) : (
          ''
        )}
        <div className="note-detail">
          <div className="header">
            <div className="col1">
              <h1 className="title">{note.title}</h1>
              <h4 className="last-updated">{dayjs(note.last_updated).format('DD MMM, YYYY | HH:mm:ss')}</h4>
            </div>
            <div className="col2">
              <i className={note.isArchived ? 'bi bi-journal-bookmark-fill archive-btn active' : 'bi bi-journal-bookmark-fill archive-btn'} onClick={onArchived}></i>
              <h5 className="archived">{note.isArchived ? 'Archived' : 'Unarchived'}</h5>
            </div>
          </div>
          <p className="note">{note.note}</p>
          <h5 className="issued">Created: {dayjs(note.issued_at).format('DD MMM, YYYY | HH:mm:ss')}</h5>
          <div className="action-tab">
            <i className="bi bi-pencil-square edit-btn" onClick={() => setDisplayForm(true)}></i>
            <i className="bi bi-trash3 delete-btn" onClick={onDelete}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
