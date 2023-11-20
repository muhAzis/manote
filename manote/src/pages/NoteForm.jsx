import React, { useState } from 'react';
import '../styles/NoteForm.css';
import TextArea from '../components/TextArea';
import useNotes from '../hooks/useNotes';
import { useLocation, useNavigate } from 'react-router-dom';

const NewNote = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { note, addNote, updateNote, emptyNotes } = useNotes();

  const [title, setTitle] = useState(location.pathname === '/notes/new-note' ? 'New Note' : note.title);
  const [notes, setNotes] = useState(
    location.pathname === '/notes/new-note'
      ? [
          {
            id: 1,
            code: false,
            body: '',
            lang: null,
          },
        ]
      : note.note
  );
  const [isLoading, setIsLoading] = useState(false);

  const onAddNote = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await addNote(title, notes, location.pathname === '/archive');
    setIsLoading(false);
    navigate('/notes');
  };

  const onEditNote = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      note_id: note.note_id,
      title: title,
      note: notes,
    };

    await updateNote(data, note.title);
    setIsLoading(false);
    navigate(`/notes/${note.note_id}`);
  };

  const onCancel = () => {
    if (location.pathname === '/notes/new-note') {
      emptyNotes();
      return navigate('/notes');
    } else {
      if (!note) {
        emptyNotes();
        return navigate('/notes');
      }

      return navigate(`/notes/${note.note_id}`);
    }
  };

  const setColor = () => {
    if (50 - title.length <= 0) {
      return { color: 'red' };
    } else if (50 - title.length > 0 && 50 - title.length <= 10) {
      return { color: 'yellow' };
    } else {
      return { color: 'var(--clr-text1)' };
    }
  };

  return (
    <div id="newNotePage">
      <h1 className="page-title">{location.pathname === '/notes/new-note' ? 'New Note Page' : 'Edit Note Page'}</h1>
      <form id="newNoteForm" onSubmit={location.pathname === '/notes/new-note' ? onAddNote : onEditNote}>
        <input className="title-input" type="text" value={title} onChange={(e) => setTitle(e.target.value.slice(0, 50))} placeholder="Note's title..." />
        <p className="title-limit" style={setColor()}>
          You have {50 - title.length} character(s) left
        </p>
        <div className="body">
          {notes.map((curNote) => (
            <TextArea key={curNote.id} code={curNote.code} id={curNote.id} body={curNote.body} language={curNote.lang} notes={notes} setNotes={setNotes} />
          ))}
          <button
            className="add-code-btn"
            onClick={(e) => {
              e.preventDefault();
              const newNote = [...notes];
              newNote.push(
                {
                  id: notes[notes.length - 1].id + 1,
                  code: true,
                  body: '',
                  lang: '',
                },
                {
                  id: notes[notes.length - 1].id + 2,
                  code: false,
                  body: '',
                  lang: null,
                }
              );
              setNotes(newNote);
            }}
          >
            <i className="bi bi-code-slash"></i>
            Add code
          </button>
        </div>
        <div className="action-buttons">
          <button className="cancel-btn" type="button" onClick={onCancel}>
            <i className="bi bi-x-lg"></i>
            Cancel
          </button>
          <button className="save-note-btn" type="submit">
            {isLoading ? <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#1d2d44,secondary:#1d2d44"></lord-icon> : <i className="bi bi-journal-plus"></i>}
            {!isLoading && 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewNote;
