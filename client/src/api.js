import axios from 'axios';

const API = axios.create({
  // Vite-ல் environment variable-ஐ அணுகும் முறை இது
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});

export default API;