import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { got401status } from 'redux/reducers/user';

export const handleLogout = createAsyncThunk(
  'handleLogout',
  async (_, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { logout: true } });
    try {
      localStorage.removeItem('state');
      const { data } = await axios.post('/logout');
      got401status();
      return data;
    } finally {
      delete axios.defaults.headers.common['Authorization'];
      dispatch({ type: 'LOADING', payload: { logout: false } });
    }
  }
);
