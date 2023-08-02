import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchMyBots } from 'redux/actions/bot_actions';
export const saveBot = createAsyncThunk(
  'saveBot',
  async (
    { data, is_spot }: { data: FormData; is_spot: boolean },
    { dispatch }
  ) => {
    return await axios
      .post(is_spot ? '/api/save-spot-grid-trading-bot' : '/api/save-bot', data)
      .then(({ data }) => {
        dispatch(fetchMyBots());
        return data?.data;
      });
  }
);
