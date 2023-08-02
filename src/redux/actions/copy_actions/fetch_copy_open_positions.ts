import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCopyOpenPositions = createAsyncThunk(
  'fetchCopyOpenPositions',
  async (
    {
      trade_id,
      markets,
      for_close,
      isDemo
    }: {
      trade_id: number;
      markets: string;
      for_close?: boolean;
      isDemo?: boolean;
    },
    { dispatch }
  ) => {
    dispatch({ type: 'LOADING', payload: { copy_table_loading: true } });
    try {
      const { data } = await axios(
        `/api/copy-trade/${trade_id}/positions${for_close ? '-for-close' : ''}`,
        {
          params: {
            markets,
            is_demo: isDemo ? isDemo : undefined
          },
        }
      );
      return data?.data;
    } finally {
      dispatch({ type: 'LOADING', payload: { copy_table_loading: false } });
    }
  }
);
