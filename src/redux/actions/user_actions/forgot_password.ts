import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async ({ email }: { email: string }, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { reset_password: true } });
    try {
      return await axios.post('/forgot-password', { email });
    } finally {
      dispatch({ type: 'LOADING', payload: { reset_password: false } });
    }
  }
);
