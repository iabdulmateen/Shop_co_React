import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api', // Hamare Express backend ka URL
});

// Agar user logged in ho to token automatically har request ke sath jaye
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;