import { createContext, useReducer, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext(null);

const STORAGE_KEYS = {
  TOKEN: 'fs_token',
  USER: 'fs_user',
  LOGIN_AT: 'fs_login_at',
};

const initialToken =
  localStorage.getItem(STORAGE_KEYS.TOKEN) ||
  sessionStorage.getItem(STORAGE_KEYS.TOKEN);

const initialState = {
  user: null,
  token: initialToken,
  isAuthenticated: !!initialToken,
  isLoading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'FETCH_USER_START':
      return {
        ...state,
        isLoading: true,
      };

    case 'LOGIN_SUCCESS':
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };

    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case 'LOGIN_FAILURE':
    case 'FETCH_USER_FAILURE':
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const getToken = () => {
    return (
      localStorage.getItem(STORAGE_KEYS.TOKEN) ||
      sessionStorage.getItem(STORAGE_KEYS.TOKEN)
    );
  };

  const logoutSilently = () => {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });

    delete api.defaults.headers.common.Authorization;
  };

  const logout = () => {
    logoutSilently();
    dispatch({ type: 'LOGOUT' });

    window.location.replace('/auth');
  };

  useEffect(() => {
    const fetchUser = async () => {
      dispatch({ type: 'FETCH_USER_START' });

      const token = getToken();

      if (!token) {
        dispatch({ type: 'FETCH_USER_FAILURE' });
        return;
      }

      // Set header Authorization
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      // Cek expired hanya untuk Remember Me (localStorage)
      const localToken = localStorage.getItem(STORAGE_KEYS.TOKEN);

      if (localToken) {
        const loginAt = localStorage.getItem(STORAGE_KEYS.LOGIN_AT);

        if (loginAt) {
          const sevenDays = 7 * 24 * 60 * 60 * 1000;

          const isExpired =
            Date.now() - parseInt(loginAt, 10) > sevenDays;

          if (isExpired) {
            logoutSilently();
            dispatch({ type: 'LOGOUT' });
            window.location.replace('/auth');
            return;
          }
        }
      }

      try {
        const response = await api.get('/api/auth/me');

        dispatch({
          type: 'FETCH_USER_SUCCESS',
          payload: {
            user: response.data,
            token,
          },
        });
      } catch (error) {
        logoutSilently();
        dispatch({ type: 'FETCH_USER_FAILURE' });
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password, remember = false) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data.data;

      // Bersihkan storage lama
      logoutSilently();

      const storage = remember ? localStorage : sessionStorage;

      storage.setItem(STORAGE_KEYS.TOKEN, token);
      storage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      storage.setItem(STORAGE_KEYS.LOGIN_AT, Date.now().toString());

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user,
          token,
        },
      });

      return {
        success: true,
      };
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });

      throw new Error(
        error.response?.data?.message || 'Login failed'
      );
    }
  };

  const register = async (name, email, password) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await api.post('/api/auth/register', {
        name,
        email,
        password,
      });

      logoutSilently();

      dispatch({
        type: 'REGISTER_SUCCESS',
      });

      return {
        success: true,
        message:
          response.data?.message ||
          'Registrasi berhasil, silakan login untuk melanjutkan',
      };
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });

      throw new Error(
        error.response?.data?.message || 'Registration failed'
      );
    }
  };

  const value = {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};