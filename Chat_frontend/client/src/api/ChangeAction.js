import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:3003' });
export const sendConnectionRequest = (userId, currentUser) =>
  API.post(`/api/${userId}/send-connection-request`, { currentUser });

export const cancelConnectionRequest = (userId, currentUser) =>
  API.post(`/api/${userId}/cancel-connection-request`, { currentUser });