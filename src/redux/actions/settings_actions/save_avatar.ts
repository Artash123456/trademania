import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {getUser} from "../user_actions";

export const saveAvatar = createAsyncThunk(
  'saveAvatar',
  async ({ path }: { path: string }, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { save_avatar: true } });
    try {
      return await axios.post('/api/default-avatars', { path }).then(()=>dispatch(getUser()));
    } finally {
      dispatch({ type: 'LOADING', payload: { save_avatar: false } });
    }
  }
);
