import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLiquidSwap = createAsyncThunk(
  'fetchLiquidSwap',
  async (
    market: { id: string | number; name: string },
    { dispatch }
  ): Promise<any> => {
    dispatch({ type: 'LOADING', payload: { fetch_liquid_swap: true } });
    try {
      const { data } = await axios.post(`/api/liquid-swap/${market.id}`);
      return { [market.name]: data?.data };
    } finally {
      dispatch({ type: 'LOADING', payload: { fetch_liquid_swap: false } });
    }
  }
);
