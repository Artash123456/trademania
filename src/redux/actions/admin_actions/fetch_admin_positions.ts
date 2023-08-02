import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AdminComponentProps } from 'types';

export const fetchAdminPositions = createAsyncThunk(
  'fetchAdminPositions',
  async ({ page, values }: { page: number; values?: AdminComponentProps }) => {
    const { data } = await axios('/admin/api/positions', {
      params: {
        page,
        ...values,
      },
    });
    return data?.data;
  }
);
