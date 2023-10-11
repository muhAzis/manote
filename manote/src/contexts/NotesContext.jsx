import { createContext, useReducer, useState } from 'react';
import notesReducer, { notesState } from '../reducers/notesReducer';
import { toast } from 'react-toastify';
import axios from 'axios';
import dayjs from 'dayjs';

export const NotesContext = createContext(notesState);

const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, notesState);

  const getNotes = async (isArchived) => {
    try {
      const response = await axios.get('/notes', { params: { isArchived: isArchived } });

      if (response.status !== 200) {
        return console.log(response.message);
      }

      const sortedNotes = response.data.payload.length ? [...response.data.payload].sort((note_a, note_b) => (note_a['last_updated'] < note_b['last_updated'] ? 1 : -1)) : [];

      dispatch({
        type: 'GET_NOTES',
        payload: {
          notes: sortedNotes,
          renderNotes: sortedNotes,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getNoteById = async (note_id) => {
    state.note = '';
    try {
      const response = await axios.get(`/notes/${note_id}`);

      if (response.status !== 200) {
        return console.log(response.message);
      }

      dispatch({
        type: 'GET_NOTE_BY_ID',
        payload: {
          note: response.data.payload,
        },
      });
      console.log('new note: ', state.note);
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async (title, note, isArchivePage) => {
    try {
      const response = await axios.post('/add', {
        title,
        note,
      });

      if (response.status !== 200) {
        return console.log(response.error);
      }

      await getNotes(isArchivePage);
    } catch (error) {
      console.log(error);
    }
  };

  const archiveNote = async (note_id, isArchived, isArchivePage) => {
    try {
      const response = await axios.put(`/update/${note_id}`, { isArchived: !isArchived });

      if (response.status !== 201) {
        return console.log(response.message);
      }

      await getNoteById(note_id);
      toast.success(`Note "${state.note.title}" has been ${isArchived ? 'unarchived' : 'archived'}!`);
      await getNotes(isArchivePage);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async ({ note_id, title, note }) => {
    try {
      const response = await axios.put(`/update/${note_id}`, {
        title,
        note,
        last_updated: dayjs().format('DD-MMM-YYYY HH:mm:ss'),
      });

      if (response.status !== 201) {
        return console.log(response.message);
      }

      await getNoteById(note_id);
      const updatedNote = state.note;
      toast.success(`Note "${updatedNote.title}" updated!`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (note_id, title) => {
    try {
      const response = await axios.delete(`/delete/${note_id}`);

      if (response.status !== 200) {
        return console.log(response.message);
      }

      toast.success(`Note "${title}" has been deleted!`);
    } catch (error) {
      console.log(error);
    }
  };

  const sortNotes = (option, reverse) => {
    if (state.notes.length) {
      const sortedNotes = [...state.notes].sort((note_a, note_b) => (note_a[option] < note_b[option] ? 1 : -1));
      if (reverse) {
        sortedNotes.reverse();
      }

      dispatch({
        type: 'SORT_NOTES',
        payload: {
          renderNotes: sortedNotes,
        },
      });
    }
  };

  const filterNotes = (title) => {
    if (state.notes.length) {
      const filteredNotes = [...state.notes].filter((note) => note.title.toLowerCase().includes(title.toLowerCase()));

      dispatch({
        type: 'FILTER_NOTES',
        payload: {
          renderNotes: filteredNotes,
        },
      });
    }
  };

  const values = {
    notes: state.notes,
    renderNotes: state.renderNotes,
    note: state.note,
    getNotes,
    getNoteById,
    addNote,
    archiveNote,
    updateNote,
    deleteNote,
    sortNotes,
    filterNotes,
  };

  return <NotesContext.Provider value={values}>{children}</NotesContext.Provider>;
};

export default NotesContextProvider;
