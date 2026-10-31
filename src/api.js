import axios from 'axios';
// 1. Agar local machine par hain to localhost:3000 use karega
// 2. Agar Vercel par live hain to live backend cloud URL use karega
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

const API = axios.create({
  baseURL: isLocalhost
    ? 'http://localhost:3000/api'
    : 'https://ais-dev-geynvtiflfsjoiww63vmvl-105721519656.asia-southeast1.run.app/api',
});

// Agar user login ho to token automatically attach ho jaye
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;