import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchCopyCurrentPositions = createAsyncThunk(
  'fetchCopyCurrentPositions',
  async (
    { trade_id, market_id }: { trade_id: number; market_id: number },
    { dispatch }
  ) => {
    dispatch({ type: 'LOADING', payload: { copy_table_loading: true } });
    try {
      return await axios(
        `/api/copy-trade/${trade_id}/fetch-current-positions`,
        {
          params: {
            market_id,
          },
        }
      ).then(({ data }) => {
        return data?.data.positions;
      });
    } finally {
      dispatch({ type: 'LOADING', payload: { copy_table_loading: false } });
    }
  }
);
