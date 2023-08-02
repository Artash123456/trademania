import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFilled = createAsyncThunk(
  'fetchFilled',
  async ({
    market,
    symbol,
    is_spot,
  }: {
    market: number;
    symbol: string;
    is_spot?: number | boolean;
  }) => {
    const { data } = await axios.post(
      `/api/get-${is_spot ? 'spot-' : ''}filled`,
      {
        market_id: market,
        symbol,
      }
    );
    return data?.data;
  }
);
