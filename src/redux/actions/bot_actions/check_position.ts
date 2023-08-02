import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const checkPosition = createAsyncThunk(
  'checkPosition',
  async ({ values }: { values: FormData }) => {
    const { data } = await axios.post('/api/check-position', values);
    return data?.data;
  }
);
