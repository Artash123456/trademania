import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const refreshTransactionBalance = createAsyncThunk(
  'refreshTransactionBalance',
  async (_, { dispatch }) => {
    dispatch({
      type: 'LOADING',
      payload: { refresh_transaction_balance: true },
    });
    try {
      const { data } = await axios.post('/api/refresh-transaction-balance');
      return data.data;
    } finally {
      dispatch({
        type: 'LOADING',
        payload: { refresh_transaction_balance: false },
      });
    }
  }
);
