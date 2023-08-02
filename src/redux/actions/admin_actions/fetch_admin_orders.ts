import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AdminComponentProps } from 'types';

export const getAdminOrders = createAsyncThunk(
  'getAdminOrders',
  async ({ page, values }: { page: number; values?: AdminComponentProps }) => {
    const { data } = await axios('/admin/api/orders', {
      params: {
        page,
        ...values,
      },
    });
    return data?.data;
  }
);
