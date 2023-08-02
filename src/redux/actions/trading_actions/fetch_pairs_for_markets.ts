import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchPairs = createAsyncThunk(
  'fetchPairs',
  async ({
    formData,
    market,
    bot_id,
  }: {
    formData: FormData;
    market: string;
    bot_id?: number;
  }) => {
    const { data } = await axios.post('/api/get-pairs', formData);
    return { data: data.data, market, bot_id };
  }
);
