import router from '@/router';
import { useAuth } from '@/stores/auth';
import axios from 'axios';
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    withCredentials: true,
    withXSRFToken: true
  }
});

http.interceptors.request.use(value => {
  const auth = useAuth();
  if (auth?.token) value.headers.setAuthorization(`Bearer ${auth.token}`);
  console.log('http.interceptors.request.use');
  return value;
});

http.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      const auth = useAuth();

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      http.defaults.headers.common['Authorization'] = null;

      //
      // auth.clear();
      //
      console.log('http.interceptors.response.use');
      console.log(error);
      router.push({ name: 'login' });
    }
    return Promise.reject(error);
  }
);

export default http;
