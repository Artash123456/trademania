import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createNewUser = createAsyncThunk(
  'createNewUser',
  async ({ values }: { values?: Record<string, any> }, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { admin_create_user: true } });
    try {
      const { data } = await axios({
        method: 'POST',
        url: `/admin/api/users`,
        data: values,
      });
      return data?.data;
    } finally {
      dispatch({ type: 'LOADING', payload: { admin_create_user: false } });
    }
  }
);
