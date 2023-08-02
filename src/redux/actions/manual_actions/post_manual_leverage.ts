import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const setLeverage = createAsyncThunk(
  'setLeverage',
  async ({
    market,
    symbol,
    leverage,
    currency,
    quote,
  }: {
    market: number | string;
    symbol: string;
    leverage: number | string;
    currency: string;
    quote: string;
  }) => {
    await axios.post('/api/set-leverage', {
      market,
      symbol,
      leverage,
      currency,
      quote,
    });
    return leverage;
  }
);
