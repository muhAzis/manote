import axios from 'axios';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signin = async (name, email, password) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await axios.post('/register', {
        name,
        email,
        password,
      });

      if (response.status !== 201) {
        setIsLoading(false);
        const { message } = response.response.data;
        setError(message);
        toast.error(message);
        return console.log(message);
      }

      setIsLoading(false);
      toast.success('Account created successfully!');

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async ({ email = '', password = '', googleAccount = '' }) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await axios.post('/login', {
        email,
        password,
        googleAccount,
      });

      if (response.status !== 201) {
        setIsLoading(false);
        const { message } = response.response.data;
        setError(message);
        toast.error(message);
        return console.log(message);
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.payload}`;

      setIsLoading(false);
      toast.success(response.data.message);

      navigate('/notes');
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete('/logout');

      if (response.status !== 200) {
        setIsLoading(false);
        const { message } = response.response.data;
        setError(message);
        toast.error(message);
        return console.log(message);
      }

      setIsLoading(false);
      toast.success('Logout successful!');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const updatePicture = async (file) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/user/profile/update-pict', { file });

      if (response.status !== 201) {
        setIsLoading(false);
        const { message } = response.response.data;
        setError(message);
        toast.error(message);
        return console.log(message);
      }

      setIsLoading(false);
      toast.success('Profile picture updated!');
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (type, data, form) => {
    try {
      setIsLoading(true);
      setError('');
      const response = await axios.post(`/user/profile/update-account/${type}`, data);

      if (response.status !== 201) {
        setIsLoading(false);
        const { message } = response.response.data;
        setError(message);
        toast.error(message);
        return console.log(message);
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.payload}`;

      setIsLoading(false);
      toast.success(response.data.message);
      form(false);
    } catch (error) {
      console.log(error);
    }
  };

  const clearError = () => {
    setError('');
  };

  const values = {
    error,
    isLoading,
    signin,
    login,
    logout,
    updatePicture,
    updateData,
    clearError,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
