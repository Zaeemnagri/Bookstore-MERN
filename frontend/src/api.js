import axios from 'axios';
const API = process.env.REACT_APP_API || 'https://bookstore-mern-git-main-zaeem-hussains-projects-a1b46ee1.vercel.app';
const instance = axios.create({ baseURL: API, timeout: 15000 });
instance.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if(token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
export default instance;
