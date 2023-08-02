import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMarketSavings = createAsyncThunk(
  'fetchMarketSavings',
  async (
    market: { id: string | number; name: string },
    { dispatch }
  ): Promise<any> => {
    dispatch({ type: 'LOADING', payload: { fetch_market_savings: true } });
    try {
      const { data } = await axios.post(`/api/savings/${market.id}`);
      return { [market.name]: data?.data };
    } finally {
      dispatch({ type: 'LOADING', payload: { fetch_market_savings: false } });
    }
  }
);
