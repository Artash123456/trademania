import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
interface Props {
  page?: number;
  start_date?: Date;
  end_date?: Date;
  filter_type?: string;
  only_read?: boolean;
}

export const fetchAllNotifications = createAsyncThunk(
  'fetchAllNotifications',
  async ({ page, start_date, end_date, filter_type, only_read }: Props) => {
    const { data } = await axios('/api/notifications', {
      params: {
        start_date,
        end_date,
        page,
        only_read,
      },
    });
    return { data: data?.data, filter_type };
  }
);
