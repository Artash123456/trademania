import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const becomeAffiliate = createAsyncThunk(
  'becomeAffiliate',
  async (_, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { become_affiliate: true } });
    try {
      await axios.post('/api/accept-affiliate');
      return true;
    } finally {
      dispatch({ type: 'LOADING', payload: { become_affiliate: false } });
    }
  }
);
