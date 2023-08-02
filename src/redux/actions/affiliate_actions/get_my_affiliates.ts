import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMyAffiliates = createAsyncThunk(
  'getMyAffiliates',
  async ({ page, values }: { page?: number; values?: any }) => {
    const { data } = await axios('/api/my-affiliates', {
      params: {
        page,
        ...values,
      },
    });
    return data?.data;
  }
);
