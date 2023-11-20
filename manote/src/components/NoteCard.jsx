import React, { useEffect, useState } from 'react';
import '../styles/NoteCard.css';
import dayjs from 'dayjs';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useLocation, useNavigate } from 'react-router-dom';
import { useConfirm } from '../hooks/useConfirm';
import { useSettings } from '../hooks/useSettings';
import useNotes from '../hooks/useNotes';

const NoteCard = ({ note_id, title, note, isArchived, last_updated, disable = false }) => {
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
    await archiveNote(note_id, title, isArchived, location.pathname === '/archive');
    setIsLoading(false);
  };

  return (
    <div className="note-container" onClick={() => navigate(`/notes/${note_id}`)}>
      {!disable && (
        <i
          className="bi bi-x delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        ></i>
      )}
      {isLoading ? (
        <div className="loading-container">
          <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#ffffff,secondary:#ffffff"></lord-icon>
        </div>
      ) : (
        ''
      )}
      <div className="row1 row">
        <h5 className="note-updated">{dayjs(last_updated).format('DD MMM, YYYY | HH:mm')}</h5>
        <div className="note-title">
          <span className="dot"></span>
          <h3 className="title-text">{title}</h3>
        </div>
      </div>
      <div className="row2 row">
        <div className="note">
          {note.map((curNote) =>
            curNote.code ? (
              <SyntaxHighlighter
                key={curNote.id}
                language={curNote.lang}
                style={atomDark}
                customStyle={{
                  flex: 'none',
                  backgroundColor: 'var(--clr-bg-syntax-highlight)',
                  textShadow: 'none',
                }}
              >
                {curNote.body}
              </SyntaxHighlighter>
            ) : (
              <p key={curNote.id} className="note-text-type">
                {curNote.body}
              </p>
            )
          )}
        </div>
      </div>
      <div className="row3 row">
        {!disable && (
          <button
            className="bi bi-journal-bookmark-fill archive-btn"
            onClick={(e) => {
              e.stopPropagation();
              onArchived();
            }}
          ></button>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
