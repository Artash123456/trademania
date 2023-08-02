import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPortfolioChange = createAsyncThunk(
  'fetchPortfolioChange',
  async (market: { name: string; id: number }) => {
    const { data } = await axios(
      `/api/spot-balance-history${market.name === 'All' ? '' : '/' + market.id}`
    );
    return data?.data;
  }
);
