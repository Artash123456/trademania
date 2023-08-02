import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { openModal } from '../other_actions';

export const setMyProfilePublic = createAsyncThunk(
  'setMyProfilePublic',
  async (
    { status, is_close }: { status: number; is_close?: boolean },
    { dispatch }
  ) => {
    await axios.post('/api/set-subscription-status', {
      open_for_subscription: status,
      is_close,
    });
    if (status === 0) dispatch(openModal('settings_become_private'));
    return status;
  }
);
