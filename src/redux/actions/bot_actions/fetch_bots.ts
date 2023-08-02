import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchBots = createAsyncThunk('fetchBots', async () => {
  const { data } = await axios('/api/bots');
  return data?.data;
});
