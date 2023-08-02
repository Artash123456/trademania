import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchOrderHistory = createAsyncThunk(
  'fetchOrderHistory',
  async ({
    market,
    symbol,
    is_spot,
    currency,
    quote,
  }: {
    market: number;
    symbol: string;
    is_spot?: number | boolean;
    currency: string;
    quote: string;
  }) => {
    const { data } = await axios.post(
      `/api/get-${is_spot ? 'spot-' : ''}order-history`,
      {
        market_id: market,
        symbol,
        currency,
        quote,
      }
    );
    return data?.data || [];
  }
);
