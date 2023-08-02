import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchActiveOrders = createAsyncThunk(
  'fetchActiveOrders',
  async ({
    market,
    is_spot,
  }: {
    market: number;
    is_spot?: number | boolean;
  }) => {
    const response = await axios.post(
      `/api/get-${is_spot ? 'spot-' : ''}actives`,
      { market_id: market }
    );
    return response.data.data;
  }
);
