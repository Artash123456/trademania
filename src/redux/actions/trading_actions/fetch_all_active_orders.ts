import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchAllActiveOrders = createAsyncThunk(
  'fetchAllActiveOrders',
  async ({ is_spot }: { is_spot?: number | boolean }) => {
    const { data } = await axios.post(
      `/api/get-all-${is_spot ? 'spot-' : ''}actives`
    );
    return data?.data;
  }
);
