import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const showAddress = createAsyncThunk(
  'showAddress',
  async (value: string) => {
    const { data } = await axios.post('/api/show-address', { value });
    return data.data;
  }
);
