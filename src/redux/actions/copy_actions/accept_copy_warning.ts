import axios from 'axios';
import { openModal } from 'redux/actions/other_actions';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const acceptCopy = createAsyncThunk(
  'acceptCopy',
  async (_, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { copy_warning: true } });
    try {
      await axios.post('/api/accept-copy');
      dispatch(openModal('copy_warning'));
      return true;
    } finally {
      dispatch({ type: 'LOADING', payload: { copy_warning: false } });
    }
  }
);
