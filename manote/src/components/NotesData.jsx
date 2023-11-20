import React from 'react';
import '../styles/NotesData.css';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import useNotes from '../hooks/useNotes';

const NotesData = ({ notes }) => {
  const navigate = useNavigate();
  const { emptyNotes } = useNotes();

  return (
    <div id="notesData">
      <h3 className="title bi bi-file-text-fill">Notes Data</h3>
      <div className="stats">
        <div
          className="main-stat"
          style={{
            background: `
              radial-gradient(closest-side, var(--clr-bg-light) 79%, transparent 80% 100%),
              radial-gradient(closest-side, var(--clr-action) 94%, transparent 95% 100%),
              conic-gradient(var(--clr-accent) ${(notes.filter((note) => note.isArchived === true).length / notes.length) * 100}%, transparent 0)
            `,
          }}
        >
          <h1 className="total">{notes.length}</h1>
          <p>Notes</p>
          <p className="archived-notes">{notes.filter((note) => note.isArchived === true).length} archived</p>
        </div>
        <div className="legend">
          <div className="legend-container">
            <div className="box box1"></div>
            <p className="legend-name">All notes</p>
          </div>
          <div className="legend-container">
            <div className="box box2"></div>
            <p className="legend-name">Archived notes</p>
          </div>
        </div>
      </div>
      <div className="notes-list">
        <h4>Current notes</h4>
        <div className="list-container">
          {notes.map(
            (note, i) =>
              i + 1 < 9 && (
                <div className="note-item" key={note.title + i}>
                  <h3 className="number">{i + 1}</h3>
                  <div className="content">
                    <p
                      className="note-title"
                      onClick={() => {
                        emptyNotes();
                        navigate(`/notes/${note.note_id}`);
                      }}
                    >
                      {note.title}
                    </p>
                    <h5 className="issued">{dayjs(note.issued_at).format('DD MMMM, YYYY')}</h5>
                  </div>
                </div>
              )
          )}
          {notes.length > 8 && (
            <h5 className="to-notes" onClick={() => navigate('/notes')}>
              Show all...
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesData;
