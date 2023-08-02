import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTopTraders = createAsyncThunk(
  'fetchTopTraders',
  async ({ range }: { range: string }) => {
    const { data } = await axios(`/admin/api/top-traders`, {
      params: {
        count: 20,
        range,
      },
    });
    return data?.data;
  }
);
