import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const generateLink = createAsyncThunk('generateLink', async () => {
  const { data } = await axios('/api/generate-refer-link');
  return data?.data;
});
