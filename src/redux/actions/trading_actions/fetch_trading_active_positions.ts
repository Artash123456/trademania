import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchActivePositions = createAsyncThunk(
  'fetchActivePositions',
  async ({ market }: { market: number }) => {
    const { data } = await axios.post(`/api/get-positions`, {
      market_id: market,
    });
    return data?.data;
  }
);
