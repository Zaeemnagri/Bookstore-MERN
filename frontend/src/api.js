import axios from 'axios';
const API = process.env.REACT_APP_API || 'http://localhost:5000';
const instance = axios.create({ baseURL: API, timeout: 15000 });
instance.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if(token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
export default instance;
