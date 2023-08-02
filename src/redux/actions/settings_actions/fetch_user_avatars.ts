import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserAvatars = createAsyncThunk(
  'fetchUserAvatars',
  async () => {
    const { data } = await axios('/api/default-avatars');
    return data.data;
  }
);
