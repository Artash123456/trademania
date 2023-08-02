import { changeSymbol } from 'redux/actions/manual_actions';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const fetchManualPairs = createAsyncThunk(
  'fetchManualPairs',
  async (market: { id: number; slug: string }, { dispatch }) => {
    const { data } = await axios.post('/api/get-pairs', {
      market_id: market.id,
      slug: market.slug,
      is_spot: 0,
    });
    dispatch(changeSymbol({ value: data?.data[0], market_id: market.id }));
    return data?.data;
  }
);
