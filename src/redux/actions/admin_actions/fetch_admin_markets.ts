import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAdminMarkets = createAsyncThunk(
  'fetchAdminMarkets',
  async () => {
    const { data } = await axios('/admin/api/get-market-fees');
    return data?.data;
  }
);
