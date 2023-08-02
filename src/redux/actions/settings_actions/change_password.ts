import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Data {
  new_password?: string;
  current_password?: string;
  new_password_confirmation?: string;
}

export const setNewPassword = createAsyncThunk(
  'setNewPassword',
  async (
    { data, setErrors }: { data: Data; setErrors: Function },
    { dispatch }
  ) => {
    dispatch({ type: 'LOADING', payload: { update_password: true } });
    return await axios
      .post('/api/change-password', data)
      .then((response) => response)
      .catch((error) => setErrors(error?.response?.data?.errors))
      .finally(() =>
        dispatch({ type: 'LOADING', payload: { update_password: false } })
      );
  }
);
