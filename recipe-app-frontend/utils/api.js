import axios from 'axios';
import { Platform } from 'react-native';

const RENDER_BACKEND_URL = 'https://myrecipeapp-489g.onrender.com/api';


const LOCAL_BACKEND_URL = Platform.OS === 'android' ? 'http://192.168.1.100:5001/api' : 'http://localhost:5001/api';


const API_BASE_URL = process.env.NODE_ENV === 'production' || Platform.OS === 'web'
  ? RENDER_BACKEND_URL
  : LOCAL_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
