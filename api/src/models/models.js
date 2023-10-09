import mongoose from 'mongoose';

export const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const RefreshToken = mongoose.model('Token', {
  token: {
    type: String,
    required: true,
  },
});

export const Note = mongoose.model('Note', {
  note_id: {
    type: Number,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  isArchived: {
    type: Boolean,
    required: true,
  },
  issued_at: {
    type: String,
    required: true,
  },
  last_updated: {
    type: String,
    required: true,
  },
});
