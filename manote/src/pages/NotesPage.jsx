import React, { useEffect, useState } from 'react';
import '../styles/NotesPage.css';
import NoteCard from '../components/NoteCard';
import useNotes from '../hooks/useNotes';
import EmptyShelf from '../components/EmptyShelf';
import EmptySearch from '../components/EmptySearch';

const NotesPage = ({ isArchivePage }) => {
  const { notes, renderNotes, getNotes, emptyNote } = useNotes();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await getNotes(isArchivePage);
      setIsLoading(false);
    })();
  }, []);

  const notesRender = () => {
    return renderNotes.length ? (
      renderNotes.map((note, i) => {
        const { __v, _id, creator, ...data } = note;
        return <NoteCard key={note.title + i} {...data} />;
      })
    ) : (
      <EmptySearch />
    );
  };

  return (
    <div className="notes-container" style={!renderNotes.length || isLoading ? { display: 'flex', height: '100%' } : {}}>
      {isLoading ? (
        <div className="loading-container">
          <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#e0e0e0,secondary:#e0e0e0"></lord-icon>
        </div>
      ) : notes.length ? (
        notesRender()
      ) : (
        <EmptyShelf />
      )}
    </div>
  );
};

export default NotesPage;
