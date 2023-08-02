import { AdminComponentProps } from 'types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllUsers = createAsyncThunk(
  'getAllUsers',
  async ({ page, values }: { page: number; values?: AdminComponentProps }) => {
    const { data } = await axios('/admin/api/users', {
      params: {
        page,
        ...values,
      },
    });
    return data?.data;
  }
);
