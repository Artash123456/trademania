import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMyAffiliateOrdersAndEarnings = createAsyncThunk(
  'getMyAffiliateOrdersAndEarnings',
  async ({ page, values }: { page?: number; values?: any }) => {
    const { data } = await axios('/api/my-affiliate-orders', {
      params: {
        page,
        ...values,
      },
    });
    return data?.data;
  }
);
