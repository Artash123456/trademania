import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchMyBots = createAsyncThunk(
  'fetchMyBots',
  async (_, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { fetch_my_bots: true } });
    try {
      const { data } = await axios.get('/api/my-bots');
      return data?.data;
    } finally {
      dispatch({ type: 'LOADING', payload: { fetch_my_bots: false } });
    }
  }
);
