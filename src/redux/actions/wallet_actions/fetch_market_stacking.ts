import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMarketStacking = createAsyncThunk(
  'fetchMarketStacking',
  async (
    market: { id: string | number; name: string },
    { dispatch }
  ): Promise<any> => {
    dispatch({ type: 'LOADING', payload: { fetch_market_stacking: true } });
    try {
      const { data } = await axios.post(`/api/stacking/${market.id}`);
      return { [market.name]: data?.data };
    } finally {
      dispatch({ type: 'LOADING', payload: { fetch_market_stacking: false } });
    }
  }
);
