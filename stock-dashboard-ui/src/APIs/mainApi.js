import axios from 'axios';

const api = axios.create();

api.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      const errorDetails = {
        status: response.status,
        data: response.data,
        headers: response.headers,
      };

      window.location.href = `/error?details=${encodeURIComponent(JSON.stringify(errorDetails))}`;
    }
    return response;
  },
  (error) => {
    const errorDetails = {
      status: error.response ? error.response.status : null,
      data: error.response ? error.response.data : null,
      headers: error.response ? error.response.headers : null,
      customizedMessage: "Fatal error"
    };

    window.location.href = `/error?details=${encodeURIComponent(JSON.stringify(errorDetails))}`;
    return Promise.reject(error);
  }
);

export default api;
