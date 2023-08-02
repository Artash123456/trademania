import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const becomePrivateUserPositions = createAsyncThunk(
  'becomePrivateUser',
  async (_, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { copy_table_loading: true } });
    try {
      const { data } = await axios.get('/api/my-subscribers/positions');
      return data?.data;
    } finally {
      dispatch({ type: 'LOADING', payload: { copy_table_loading: false } });
    }
  }
);
