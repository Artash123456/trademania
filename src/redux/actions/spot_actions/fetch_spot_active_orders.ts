import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSpotActiveOrders = createAsyncThunk(
  'fetchSpotActiveOrders',
  async ({ market, symbol }: { market: number | string; symbol: string }) => {
    const { data } = await axios.post('/api/get-spot-actives', {
      market_id: market,
      symbol,
    });
    return data?.data;
  }
);
