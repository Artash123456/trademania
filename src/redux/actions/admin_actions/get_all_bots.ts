import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AdminComponentProps } from 'types';

export const getAllBots = createAsyncThunk(
  'getAllBots',
  async ({ page, values }: { page: number; values?: AdminComponentProps }) => {
    const { data } = await axios('/admin/api/bots', {
      params: {
        page,
        ...values,
      },
    });
    return data?.data;
  }
);
