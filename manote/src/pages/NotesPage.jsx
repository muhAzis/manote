import React, { useEffect, useState } from 'react';
import '../styles/NotesPage.css';
import ControlBar from '../components/ControlBar';
import NoteContainer from '../components/NoteContainer';
import useNotes from '../hooks/useNotes';

const NotesPage = ({ isArchivePage }) => {
  const { renderNotes, getNotes } = useNotes();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await getNotes(isArchivePage);
      setIsLoading(false);
    })();
  }, []);

  const notesRender = () => {
    return renderNotes.length
      ? renderNotes.map((note, i) => {
          const { __v, _id, creator, ...data } = note;
          return <NoteContainer key={note.title + i} {...data} />;
        })
      : '';
  };

  return (
    <div className="dashboard-container">
      <ControlBar />
      <div className="notes-container" style={renderNotes.length ? {} : { height: '100%' }}>
        {isLoading ? (
          <div className="loading-container">
            <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#e0e0e0,secondary:#e0e0e0"></lord-icon>
          </div>
        ) : (
          notesRender()
        )}
      </div>
    </div>
  );
};

export default NotesPage;