import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSetupKey = createAsyncThunk(
  'fetchSetupKey',
  async (_, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { get_qr_code: true } });
    try {
      return await axios
        .post('/api/show-two-factor-setup-key')
        .then(({ data }) => {
          return data?.data.code;
        });
    } finally {
      dispatch({ type: 'LOADING', payload: { get_qr_code: false } });
    }
  }
);
