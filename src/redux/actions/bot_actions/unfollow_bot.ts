import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchMyBots } from 'redux/actions/bot_actions';

export const deleteBot = createAsyncThunk(
  'deleteBot',
  async (
    {
      id,
      botType,
      cancel_all,
    }: { id: string | number; botType: string; cancel_all?: number },
    { dispatch }
  ) => {
    try {
      const url =
        botType === 'cash'
          ? `/api/disable-bot/${id}`
          : `/api/disable-grid-bot/${id}`;
      dispatch({ type: 'LOADING', payload: { delete_bot: true } });
      return await axios.post(url, { cancel_all }).then(({ data }) => {
        dispatch(fetchMyBots());
        return data?.data;
      });
    } finally {
      dispatch({ type: 'LOADING', payload: { delete_bot: false } });
    }
  }
);
