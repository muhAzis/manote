import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../styles/NoteDetail.css';
import dayjs from 'dayjs';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import useNotes from '../hooks/useNotes';
import { useConfirm } from '../hooks/useConfirm';
import { useSettings } from '../hooks/useSettings';
import NoteForm from './NoteForm';

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { settings } = useSettings();
  const { setDisplayConfirm, setNote } = useConfirm();
  const { note, getNoteById, archiveNote, deleteNote } = useNotes();

  const [isLoading, setIsLoading] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);

  const windowWidth = window.innerWidth;

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
    await archiveNote(id, note.title, note.isArchived, location.pathname === '/archive');
    setIsLoading(false);
  };

  const editNoteForm = () => {
    return displayForm ? <NoteForm setDisplay={setDisplayForm} formType={'edit'} /> : '';
  };

  return (
    <div id="noteDetailPage">
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
          <div className="title">
            <i className={note.isArchived ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'}></i>
            <h1 className="title-text">{note.title}</h1>
          </div>
          <h4 className="last-updated">{dayjs(note.last_updated).format('DD MMM, YYYY | HH:mm:ss')}</h4>
        </div>
        <div className="note">
          {note.note &&
            note.note.map((curNote) =>
              curNote.code ? (
                <SyntaxHighlighter
                  key={curNote.id}
                  language={curNote.lang}
                  style={atomDark}
                  customStyle={{
                    backgroundColor: 'var(--clr-bg-light2)',
                    textShadow: 'none',
                  }}
                >
                  {curNote.body}
                </SyntaxHighlighter>
              ) : (
                <p key={curNote.id}>{curNote.body}</p>
              )
            )}
        </div>
        <h5 className="issued">Created: {dayjs(note.issued_at).format('DD MMM, YYYY | HH:mm:ss')}</h5>
        <div className="action-buttons">
          <button className="bi bi-pencil-square edit-btn button archive-btn" onClick={() => navigate('/notes/edit-note')}>
            {windowWidth > 576 && 'Edit'}
          </button>
          <button className="bi bi-journal-bookmark-fill button edit-btn" onClick={onArchived}>
            {windowWidth > 576 ? (note.isArchived ? 'Unarchive' : 'Archive') : ''}
          </button>
          <button className="bi bi-trash3 delete-btn button delete-btn" onClick={onDelete}>
            {windowWidth > 576 && 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
