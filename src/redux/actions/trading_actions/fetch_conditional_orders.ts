import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchConditionalOrders = createAsyncThunk(
  'fetchConditionalOrders',
  async ({
    market,
    is_spot,
  }: {
    market: number;
    is_spot?: number | boolean;
  }) => {
    const { data } = await axios.post(
      `/api/get-${is_spot ? 'spot-' : ''}conditionals`,
      {
        market_id: market,
      }
    );
    return data?.data || [];
  }
);
