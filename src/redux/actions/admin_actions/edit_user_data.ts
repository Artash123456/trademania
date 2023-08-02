import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const editUserData = createAsyncThunk(
  'editUserData',
  async (
    {
      values,
      id,
      method,
    }: {
      values?: Record<string, any>;
      id: string;
      method: 'PUT' | 'DELETE';
    },
    { dispatch }
  ) => {
    dispatch({ type: 'LOADING', payload: { admin_edit_user_loading: true } });
    try {
      const { data } = await axios({
        method: method,
        url: `/admin/api/users/${id}`,
        data: values,
      });
      return data?.data;
    } finally {
      dispatch({
        type: 'LOADING',
        payload: { admin_edit_user_loading: false },
      });
    }
  }
);
