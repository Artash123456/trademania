import { AdminComponentProps } from 'types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserBalance = createAsyncThunk(
  'getUserBalance',
  async ({ page, values }: { page: number; values?: AdminComponentProps }) => {
    const { data } = await axios('/admin/api/users/user-balances', {
      params: {
        page,
        ...values,
      },
    });
    return data?.data;
  }
);
