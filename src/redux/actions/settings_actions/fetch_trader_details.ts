import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTraderDetails = createAsyncThunk(
  'fetchTraderDetails',
  async (id: string) => {
    const response = await axios(`/api/trader/${id}/trade-details`);
    return response.data;
  }
);
