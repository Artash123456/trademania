import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSpotWidgets = createAsyncThunk(
  'fetchSpotWidgets',
  async () => {
    const { data } = await axios.post('/api/get-spot-widgets');
    return {
      data: data?.data?.containers,
      items: data?.data?.items_to_add,
    };
  }
);
