import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTronPrivateKey = createAsyncThunk(
  'getTronPrivateKey',
  async () => {
    const { data } = await axios.post('/admin/api/get-tron-private-key');
    return data?.data;
  }
);
