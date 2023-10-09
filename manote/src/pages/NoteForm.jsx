import React, { useState } from 'react';
import '../styles/NoteForm.css';
import useNotes from '../hooks/useNotes';
import { useLocation } from 'react-router-dom';

const NoteForm = ({ setDisplay, formType }) => {
  const location = useLocation();
  const { note, addNote, updateNote } = useNotes();

  const [rTitle, setRTitle] = useState(formType === 'add' ? 'New note' : note.title);
  const [rNote, setRNote] = useState(formType === 'add' ? '' : note.note);
  const [isLoading, setIsLoading] = useState(false);

  const onAddNote = async () => {
    setIsLoading(true);
    await addNote(rTitle, rNote, location.pathname === '/archive');
    setRTitle('');
    setRNote('');
    setIsLoading(false);
    setDisplay(false);
  };

  const onEditNote = async () => {
    setIsLoading(true);
    const data = {
      note_id: note.note_id,
      title: rTitle,
      note: rNote,
    };

    await updateNote(data);
    setIsLoading(false);
    setDisplay(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    formType === 'add' ? onAddNote() : onEditNote();
  };

  const setColor = () => {
    if (50 - rTitle.length <= 0) {
      return { color: 'red' };
    } else if (50 - rTitle.length > 0 && 50 - rTitle.length <= 10) {
      return { color: 'yellow' };
    } else {
      return { color: 'white' };
    }
  };

  return (
    <div className="add-note-form-container">
      <div className="form-container">
        <i className="bi bi-x-circle-fill close-btn" onClick={() => setDisplay(false)}></i>
        <h1>{formType === 'add' ? 'New Note' : 'Edit Note'}</h1>
        <form className="add-note-form" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="title"
            value={rTitle}
            onChange={(e) => {
              return setRTitle(e.target.value.slice(0, 50));
            }}
            required
          />
          <p className="title-limit" style={setColor()}>
            You have {50 - rTitle.length} character(s) left
          </p>
          <textarea cols="30" rows="10" placeholder="write your note here..." value={rNote} onChange={(e) => setRNote(e.target.value)} required autoFocus></textarea>
          <button type="submit">{isLoading ? <lord-icon src="https://cdn.lordicon.com/xjovhxra.json" trigger="loop" colors="primary:#1f1f1f,secondary:#1f1f1f" style={{ width: '20px', height: '20px' }}></lord-icon> : 'Submit'}</button>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
