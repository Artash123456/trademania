import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchAvailableBalance = createAsyncThunk(
  'fetchAvailableBalance',
  async ({ values, is_spot }: { values: FormData; is_spot?: boolean }) => {
    const { data } = await axios.post(
      `/api/available-${is_spot ? 'spot' : 'contract'}-balance`,
      values
    );
    return data?.data;
  }
);
