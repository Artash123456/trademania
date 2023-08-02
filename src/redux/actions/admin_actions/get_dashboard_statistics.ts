import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDashboardStatistics = createAsyncThunk(
  'getDashboardStatistics',
  async ({ range }: { range: string }) => {
    const { data } = await axios('/admin/api/dashboard-statistics', {
      params: {
        range,
      },
    });
    return data?.data;
  }
);
