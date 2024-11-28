import http from '@/services/http';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import router from './../router';

export const useAuth = defineStore('authentication', () => {
  // Reactive references with localStorage integration
  const token = ref(localStorage.getItem('token'));
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
  const authenticated = ref(!!token.value);

  // Clear authentication state
  const clear = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    token.value = null;
    user.value = null;
    authenticated.value = false;
  };

  const isAuthenticated = () => !!token.value;

  const login = async input => {
    try {
      const response = await http.post('/login', input);

      if (response.data?.token) {
        token.value = response.data.token;
        authenticated.value = true;
        localStorage.setItem('token', response.data.token);
      }

      if (response.data?.user) {
        user.value = response.data.user;
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      //
      router.push({ name: 'dashboard' });

      return response;
    } catch (error) {
      clear();
      console.log(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (isAuthenticated()) await http.post('/logout');
    } catch (error) {
      console.log(error);
    } finally {
      clear();
      console.log('logout');
      router.push({ name: 'login' });
    }
  };

  return {
    login,
    logout,
    clear,
    token,
    user,
    isAuthenticated
  };
});
