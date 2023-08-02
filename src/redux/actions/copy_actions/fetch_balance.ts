import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBalance = createAsyncThunk(
  'fetchBalance',
  async ({ market_id }: { market_id: number }) => {
    const { data } = await axios.post('/api/get-balance', {
      market_id,
      currency: 'BTC',
      symbol: 'BTCUSDT',
    });
    return data?.data;
  }
);
