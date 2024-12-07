// src/api.js
import axios from 'axios';

// Create an Axios instance
const API = axios.create({
  baseURL: 'http://localhost:3003/api', // Your API base URL
});

// Add a request interceptor
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
}, (error) => {
  return Promise.reject(error);
});

export default API;
