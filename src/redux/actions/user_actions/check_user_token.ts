import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkByToken = createAsyncThunk(
  'checkByToken',
  async (
    { token, social_type }: { token: string; social_type: string },
    { dispatch }
  ) => {
    dispatch({ type: 'LOADING', payload: { login: true } });
    try {
      if (token) {
        const { data } = await axios.post('/api/check-by-token', {
          token,
          social_type,
        });
        return data.data;
      }
    } finally {
      dispatch({ type: 'LOADING', payload: { login: false } });
    }
  }
);
