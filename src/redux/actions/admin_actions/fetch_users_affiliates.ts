import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsersAffiliates = createAsyncThunk(
  'fetchUsersAffiliates',
  async ({ page, search_query }: { page?: number; search_query?: string }) => {
    const { data } = await axios('/admin/api/users/affiliates', {
      params: {
        page,
        search_query,
      },
    });
    return { data: data?.data, search: Boolean(search_query) };
  }
);
