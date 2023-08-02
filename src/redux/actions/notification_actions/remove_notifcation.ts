import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const removeNotification = createAsyncThunk(
  'removeNotification',
  async (notification_id: string): Promise<string> => {
    const { data } = await axios.post(
      `/api/notifications/${notification_id}/delete`
    );
    if (data) return notification_id;
    return '';
  }
);
