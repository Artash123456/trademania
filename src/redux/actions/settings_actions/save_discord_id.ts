import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const saveDiscordId = createAsyncThunk(
  'saveDiscordId',
  async ({ discord_id }: { discord_id: string }, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { save_discord_id: true } });

    try {
      await axios.post('/api/save-discord-id', { discord_id });
      return discord_id;
    } finally {
      dispatch({ type: 'LOADING', payload: { save_discord_id: false } });
    }
  }
);
