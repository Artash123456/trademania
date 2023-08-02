import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBrowserSessions = createAsyncThunk(
  'fetchBrowserSessions',
  async () => {
    return await axios('/api/sessions').then((res) => res.data);
  }
);
