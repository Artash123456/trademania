import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const resendEmail = createAsyncThunk(
  'resendEmail',
  async (_, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { resend_email: true } });
    try {
      return await axios.post('/email/verification-notification');
    } finally {
      dispatch({ type: 'LOADING', payload: { resend_email: false } });
    }
  }
);
