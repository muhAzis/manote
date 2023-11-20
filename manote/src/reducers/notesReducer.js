export const notesState = {
  notes: [],
  renderNotes: [],
  note: {},
  error: false,
};

const notesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_NOTES':
      return {
        ...state,
        notes: payload.notes,
        renderNotes: payload.renderNotes,
      };
    case 'GET_NOTE_BY_ID':
      return {
        ...state,
        note: payload.note,
      };
    case 'SORT_NOTES':
      return {
        ...state,
        renderNotes: payload.renderNotes,
      };
    case 'FILTER_NOTES':
      return {
        ...state,
        renderNotes: payload.renderNotes,
      };
    case 'EMPTY_NOTE':
      return {
        ...state,
        note: payload.note,
        notes: payload.notes,
        renderNotes: payload.renderNotes,
      };

    default:
      throw new Error(`No case for type "${type}" in notesReducer!`);
  }
};

export default notesReducer;
