import axios from 'axios';

const api = axios.create();

api.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      window.location.href = '/error';
    }
    return response;
  },
  (error) => {
    console.error('Interceptor Error:', error);
    window.location.href = '/error';
    return Promise.reject(error);
  }
);

export default api;
