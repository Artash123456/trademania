import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchClosedPositions = createAsyncThunk(
  'fetchClosedPositions',
  async ({
    market,

    is_spot,
  }: {
    market: number;
    is_spot?: number | boolean;
  }) => {
    const response = await axios.post(
      `/api/get-${is_spot ? 'spot-' : ''}closed-positions`,
      {
        market_id: market,
      }
    );
    return response.data.data || [];
  }
);
