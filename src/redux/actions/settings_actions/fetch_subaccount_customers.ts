import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSubAccountCustomers = createAsyncThunk(
  'fetchSubAccountCustomers',
  async (id: number) => {
    const { data } = await axios(`/api/sub-accounts/${id}`);
    return data;
  }
);
