import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUser } from '../user_actions';

export const loginAsUser = createAsyncThunk(
  'loginAsUser',
  async ({ id, admin_id }: { id: number; admin_id?: string }, { dispatch }) => {
    localStorage.clear();
    const { data } = await axios.post(`/admin/api/login-as/${id}`);
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${data.data.token}`;
    if (data) {
      dispatch(getUser());
    }
    return {
      admin_id,
      token: data.data.token,
      back_token: data.data.back_token,
    };
  }
);
