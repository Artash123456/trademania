import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { openModal } from 'redux/actions/other_actions';

export const deleteBrowserSessions = createAsyncThunk(
  'deleteBrowserSessions',
  async (_, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { log_out_browser_sessions: true } });
    try {
      return await axios.post('/api/logout-sessions').then(() => {
        dispatch(openModal('log_out_from_other_browsers'));
        return true;
      });
    } finally {
      dispatch({
        type: 'LOADING',
        payload: { log_out_browser_sessions: false },
      });
    }
  }
);
