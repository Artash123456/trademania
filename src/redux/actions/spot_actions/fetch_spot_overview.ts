import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSpotOverview = createAsyncThunk(
  'fetchSpotOverview',
  async (market: { id: number | ''; name: string }) => {
    const { data } = await axios.post(
      `/api/spot-overview${market.name === 'All' ? '' : '/' + market.id}`
    );
    return data?.data;
  }
);
