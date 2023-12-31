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
import NotFound from './pages/NotFound';
import NavbarContextProvider from './contexts/NavbarContext';
import WindowSizeContextProvider from './contexts/WindowSizeContext';
import ControlBar from './components/ControlBar';
import NoteForm from './pages/NoteForm';

const Default = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/notes');
  }, []);

  return;
};

const Notes = ({ isArchivePage }) => {
  return <NotesPage isArchivePage={isArchivePage} />;
};

const Archive = ({ isArchivePage }) => {
  return <NotesPage isArchivePage={isArchivePage} />;
};

const App = () => {
  const location = useLocation();
  const { settings } = useSettings();
  const { displayConfirm } = useConfirm();

  const urls = ['', 'notes', 'archive', 'profile', 'settings'];

  const renderNavbar = () => {
    if (!urls.includes(location.pathname.split('/')[1])) {
      return '';
    }

    return <Navbar />;
  };

  const renderControlBar = () => {
    if (!urls.includes(location.pathname.split('/')[1])) {
      return '';
    }

    return <ControlBar />;
  };

  return (
    <>
      <NotesContextProvider>
        <NavbarContextProvider>
          <WindowSizeContextProvider>
            {renderNavbar()}
            <div className="main-contents">
              {renderControlBar()}
              <Routes>
                <Route element={<Login />} path="/login" />
                <Route element={<Signin />} path="/signin" />
                <Route element={<NotFound />} path="/*" />

                <Route element={<ProtectedRoutes />}>
                  <Route element={<Default />} path="/" />
                  <Route element={<Notes isArchivePage={false} />} path="/notes" />
                  <Route element={<Archive isArchivePage={true} />} path="/archive" />
                  <Route element={<NoteDetail />} path="/notes/:id" />
                  <Route element={<NoteForm />} path="/notes/new-note" />
                  <Route element={<NoteForm />} path="/notes/edit-note" />
                  <Route element={<Profile />} path="/profile" />
                  <Route element={<Settings />} path="/settings" />
                </Route>
              </Routes>
            </div>
          </WindowSizeContextProvider>
        </NavbarContextProvider>
        {settings.notification && <ToastContainer />}
        {settings.confirmation && displayConfirm && <ConfirmationModal />}
      </NotesContextProvider>
    </>
  );
};

export default App;
