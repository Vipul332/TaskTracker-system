import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Normalize errors so calling code always gets a readable message
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'Something went wrong. Please try again.';

    if (error.response) {
      // Server responded with an error status
      message = error.response.data?.message || message;
      if (error.response.data?.errors?.length) {
        message = error.response.data.errors.join(', ');
      }
    } else if (error.request) {
      // Request was made but no response received
      message = 'Unable to reach the server. Check your connection and try again.';
    }

    return Promise.reject(new Error(message));
  }
);

export default api;
