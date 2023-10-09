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

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await axios.post('/login', {
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

      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.payload}`;

      setIsLoading(false);
      toast.success('Login successful!');

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

  const values = {
    error,
    isLoading,
    signin,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
