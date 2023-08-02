import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDailyPnl = createAsyncThunk('fetchDailyPnl', async () => {
  const response = await axios.get('/api/get-total-balance');
  return response?.data?.data;
});
