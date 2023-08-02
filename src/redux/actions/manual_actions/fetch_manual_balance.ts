import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
type Data = {
  base: string;
  value: string;
  quote: string;
};

export const fetchManualBalance = createAsyncThunk(
  'fetchManualBalance',
  async ({ values, market_id }: { values: Data; market_id: number }) => {
    const { data } = await axios.post(`/api/get-balance`, {
      currency: values.base,
      symbol: values.value,
      quote: values.quote,
      market_id,
    });
    return data?.data;
  }
);
