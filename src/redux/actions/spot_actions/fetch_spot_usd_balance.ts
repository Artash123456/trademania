import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSpotChartBalance = createAsyncThunk(
  'fetchSpotChartBalance',
  async (market: { name: string; id: number }) => {
    const { data } = await axios.post(
      `/api/spot-usd-balance-chart${
        market?.name === 'All' ? '' : '/' + market.id
      }`
    );
    const values: Array<
      Array<{
        date: string;
        date_time: string;
        id: string;
        time: string;
        total: number;
      }>
    > = Object.values(data?.data);
    return values.map((item) => item[0]);
  }
);
