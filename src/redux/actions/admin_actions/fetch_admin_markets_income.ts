import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AdminComponentProps } from 'types';

export const fetchAdminMarketsIncome = createAsyncThunk(
  'fetchAdminMarketsIncome',
  async ({ values }: { values?: AdminComponentProps }) => {
    const { data } = await axios('/admin/api/report-statistics', {
      params: values,
    });
    return data?.data;
  }
);
