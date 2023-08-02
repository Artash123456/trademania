import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AdminComponentProps } from '../../../types';

export const fetchAdminAffiliates = createAsyncThunk(
  'fetchAdminAffiliates',
  async ({ page, values }: { values?: AdminComponentProps; page?: number }) => {
    const { data } = await axios('/admin/api/all/affiliates', {
      params: {
        page,
        ...values,
      },
    });
    return data?.data;
  }
);
