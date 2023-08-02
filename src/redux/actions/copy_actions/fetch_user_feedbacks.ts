import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchUserFeedbacks = createAsyncThunk(
  'fetchUserFeedbacks',
  async ({ user_id }: { user_id: string }) => {
    const { data } = await axios(`/api/get-feedback?user_id=${user_id}`);
    return data?.data;
  }
);
