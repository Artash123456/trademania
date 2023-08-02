import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTraderFollowers = createAsyncThunk(
  'getTraderFollowers',
  async ({ id }: { id: number }) => {
    const { data } = await axios(`/admin/api/open-trader/${id}/followers`);
    return data?.data.data;
  }
);
