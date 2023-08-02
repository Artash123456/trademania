import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SpotState } from 'types';

export const saveSpotWidgets = createAsyncThunk(
  'saveSpotWidgets',
  async (_, { getState }) => {
    const { spot } = getState() as { spot: SpotState };
    const { containers, items_to_add } = spot;
    await axios.post('/api/save-spot-widgets', {
      containers,
      items_to_add,
    });
    return { containers, items_to_add };
  }
);
