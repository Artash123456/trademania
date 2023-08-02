import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMarketLeverage = createAsyncThunk(
  'getMarketLeverage',
  async ({
    values,
    is_spot,
    market_id,
  }: {
    values: FormData;
    is_spot?: number | boolean;
    market_id?: number | string;
  }) => {
    const { data } = await axios.post(
      `/api/get-${is_spot ? 'spot-' : ''}pnl`,
      values
    );
    return { data: data?.data, market_id, is_spot };
  }
);
