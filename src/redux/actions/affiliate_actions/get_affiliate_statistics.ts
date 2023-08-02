import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAffiliateStatistics = createAsyncThunk(
  'getAffiliateStatistics',
  async () => {
    const { data } = await axios('/api/get-referral-statistics');
    return data?.data;
  }
);
