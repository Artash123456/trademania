import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUnreadNotifications = createAsyncThunk(
  'fetchUnreadNotifications',
  async () => {
    const { data } = await axios('/api/notifications/unread');
    return { data: data?.data, count: data.count };
  }
);
