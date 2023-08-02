import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AdminComponentProps } from 'types';

export const getAdminOpenTraders = createAsyncThunk(
  'getAdminOpenTraders',
  async ({ page, values }: { page: number; values?: AdminComponentProps }) => {
    const { data } = await axios('/admin/api/open-traders', {
      params: {
        page,
        ...values,
      },
    });
    return data?.data;
  }
);
