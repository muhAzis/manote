import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';
// axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;

let refresh = false;

axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    try {
      if (error.response.status === 401 && !refresh) {
        refresh = true;
        const response = await axios.post('/token', {});

        if (response.status === 201) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.payload}`;
          error.config.headers['Authorization'] = `Bearer ${response.data.payload}`;
          return axios(error.config);
        }

        return await axios.delete('/logout');
      }
    } catch (error) {
      console.log(error);
    }

    refresh = false;
    return error;
  }
);
