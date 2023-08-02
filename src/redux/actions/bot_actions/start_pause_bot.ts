import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const startPauseBot = createAsyncThunk(
  'startPauseBot',
  async (
    { grid, id }: { grid?: boolean; id: number | string },
    { dispatch }
  ) => {
    dispatch({ type: 'LOADING', payload: { start_pause_bot: true } });
    try {
      await axios.post(`/api/change-status${grid ? '-grid' : ''}-bot/${id}`);
      return id;
    } finally {
      dispatch({ type: 'LOADING', payload: { start_pause_bot: false } });
    }
  }
);
