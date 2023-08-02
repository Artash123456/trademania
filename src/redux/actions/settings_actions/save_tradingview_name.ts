import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const saveTradingViewName = createAsyncThunk(
  'saveTradingViewName',
  async ({ tradingview_name }: { tradingview_name: string }, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { save_traidng_view_name: true } });

    try {
      await axios.post('/api/save-tradingview-name', { tradingview_name });
      return tradingview_name;
    } finally {
      dispatch({ type: 'LOADING', payload: { save_traidng_view_name: false } });
    }
  }
);
