import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTradeAccountDetails = createAsyncThunk(
  'getTradeAccountDetails',
  async () => {
    const { data } = await axios('/api/copy-trade-account-details');
    return data?.data;
  }
);
