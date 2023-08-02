import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const markAsRead = createAsyncThunk(
  'markAsRead',
  async (notification_id: string): Promise<string> => {
    const { data } = await axios.post(
      `/api/notifications/${notification_id}/mark-as-read`
    );
    if (data) return notification_id;
    return '';
  }
);
