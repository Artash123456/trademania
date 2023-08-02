import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchManualOverview = createAsyncThunk(
  'fetchManualOverview',
  async (market: { id: number | string; name: string }) => {
    const { data } = await axios.post(
      `/api/leverage-overview${market.name === 'All' ? '' : '/' + market.id}`
    );
    return data?.data;
  }
);
