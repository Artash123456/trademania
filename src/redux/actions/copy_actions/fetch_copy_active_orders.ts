import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCopyActiveOrders = createAsyncThunk(
  'fetchCopyActiveOrders',
  async (
    {
      trade_id,
      my_markets,
      date,
      isDemo
    }: {
      trade_id: number;
      my_markets: string;
      date: string;
      isDemo?: boolean
    },
    { dispatch }
  ) => {
    dispatch({ type: 'LOADING', payload: { copy_table_loading: true } });
    try {
      const { data } = await axios(`/api/copy-trade/${trade_id}/actives`, {
        params: {
          markets: my_markets,
          date,
          is_demo: isDemo ? isDemo : undefined
        },
      });
      return data?.data;
    } finally {
      dispatch({ type: 'LOADING', payload: { copy_table_loading: false } });
    }
  }
);
