import axios from 'axios';

const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://tasktracker-system-7l7k.onrender.com/api';

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
      message = error.response.data?.message || message;

      if (error.response.data?.errors?.length) {
        message = error.response.data.errors.join(', ');
      }
    } else if (error.request) {
      message = 'Unable to reach the server. Check your connection and try again.';
    }

    return Promise.reject(new Error(message));
  }
);

export default api;