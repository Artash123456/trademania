import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const saveFirebaseToken = createAsyncThunk(
  'saveFirebaseToken',
  async ({ token, user_id }: { token: string; user_id: number }) => {
    const { data } = await axios.post('/api/save-firebase-token', {
      device_token: token,
      user_id,
      type: navigator.platform,
    });
    return data;
  }
);
