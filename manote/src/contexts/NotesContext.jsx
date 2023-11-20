import { createContext, useReducer, useState } from 'react';
import notesReducer, { notesState } from '../reducers/notesReducer';
import { toast } from 'react-toastify';
import axios from 'axios';
import dayjs from 'dayjs';

export const NotesContext = createContext(notesState);

const NotesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, notesState);

  const getNotes = async (isArchived = 'all') => {
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

  const archiveNote = async (note_id, title, isArchived, isArchivePage) => {
    try {
      const response = await axios.put(`/update/${note_id}`, { isArchived: !isArchived });

      if (response.status !== 201) {
        return console.log(response.message);
      }

      await getNoteById(note_id);
      toast.success(`Note "${title}" has been ${isArchived ? 'unarchived' : 'archived'}!`);
      await getNotes(isArchivePage);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async ({ note_id, title, note }, oldTitle) => {
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
      toast.success(`Note "${oldTitle}" updated!`);
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
      const sortedNotes = [...state.notes];

      switch (option) {
        case 'last_updated':
          sortedNotes.sort((note_a, note_b) => {
            const time1 = new Date(note_a[option]).getTime();
            const time2 = new Date(note_b[option]).getTime();
            return time1 < time2 ? 1 : -1;
          });
          break;
        case 'title':
          sortedNotes.sort((note_a, note_b) => (note_a[option] > note_b[option] ? 1 : -1));
          break;
      }

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

  const emptyNotes = () => {
    dispatch({
      type: 'EMPTY_NOTE',
      payload: {
        note: {},
        notes: [],
        renderNotes: [],
      },
    });
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
    emptyNotes,
  };

  return <NotesContext.Provider value={values}>{children}</NotesContext.Provider>;
};

export default NotesContextProvider;
