import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchAllActivePositions = createAsyncThunk(
  'fetchAllActivePositions',
  async () => {
    const { data } = await axios.post(`/api/get-all-positions`);
    return data?.data;
  }
);
