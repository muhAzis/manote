import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import NoteDetail from './pages/NoteDetail';
import { useSettings } from './hooks/useSettings';
import ConfirmationModal from './components/ConfirmationModal';
import { useConfirm } from './hooks/useConfirm';
import NotesContextProvider from './contexts/NotesContext';
import NotesPage from './pages/NotesPage';

const Default = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/notes');
  }, []);

  return;
};

const App = () => {
  const location = useLocation();
  const { settings } = useSettings();
  const { displayConfirm } = useConfirm();

  const renderNavbar = () => {
    if (location.pathname === '/login' || location.pathname === '/signin') {
      return '';
    }

    return <Navbar />;
  };

  return (
    <>
      <NotesContextProvider>
        {renderNavbar()}
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Signin />} path="/signin" />

          <Route element={<ProtectedRoutes />}>
            <Route element={<Default />} path="/" />
            <Route element={<NotesPage isArchivePage={false} />} path="/notes" />
            <Route element={<NotesPage isArchivePage={true} />} path="/archive" />
            <Route element={<NoteDetail />} path="/notes/:id" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<Settings />} path="/settings" />
          </Route>
        </Routes>
        {settings.notification && <ToastContainer />}
        {settings.confirmation && displayConfirm && <ConfirmationModal />}
      </NotesContextProvider>
    </>
  );
};

export default App;