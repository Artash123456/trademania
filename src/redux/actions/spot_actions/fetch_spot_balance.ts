import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchSpotBalance = createAsyncThunk(
  'fetchSpotBalance',
  async ({
    values,
    market_id,
  }: {
    values: { base: string; value: string };
    market_id: number | string;
  }) => {
    const { data } = await axios.post('/api/get-spot-balance', {
      currency: values.base,
      symbol: values.value,
      market_id: market_id,
    });
    return data?.data;
  }
);
