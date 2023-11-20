import express from 'express';
import {
  loginHandler,
  resgisterHandler,
  tokenHandler,
  logoutHandler,
  updateProfilePict,
  updateProfileAccount,
  userDataHandler,
  notesDataHandler,
  noteDataHandler,
  addNoteHandler,
  updateNoteHandler,
  deleteNoteHandler,
} from '../handlers/request-handler.js';
import { authenticateToken } from '../utils/middlewares.js';

const routes = express.Router();

routes.get('/api', (req, res) => {
  return res.status(200).send({
    maintainer: 'Muhamad Abdul Azis',
    'GitHub Repo': '',
    about: 'API server for "Manote" app',
  });
});

routes.post('/api/register', resgisterHandler);
routes.post('/api/login', loginHandler);
routes.post('/api/token', tokenHandler);
routes.delete('/api/logout', logoutHandler);

routes.use(authenticateToken);
routes.get('/api/user', userDataHandler);
routes.post('/api/user/profile/update-pict', updateProfilePict);
routes.post('/api/user/profile/update-account/:type', updateProfileAccount);
routes.get('/api/notes', notesDataHandler);
routes.get('/api/notes/:id', noteDataHandler);
routes.post('/api/add', addNoteHandler);
routes.put('/api/update/:id', updateNoteHandler);
routes.delete('/api/delete/:id', deleteNoteHandler);

export default routes;
