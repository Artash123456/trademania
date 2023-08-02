import { setToEditable } from 'redux/reducers/dashboard';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const storeDashboardWidgets = createAsyncThunk(
  'storeDashboardWidgets',
  async (
    { containers, items_to_add }: { containers: any; items_to_add: any },
    { dispatch }
  ) => {
    dispatch({
      type: 'LOADING',
      payload: { save_changes: true },
    });
    try {
      await axios
        .post('/api/save-dashboard-widgets', { containers, items_to_add })
        .then(() => dispatch(setToEditable(false)))
        .then(() => ({
          containers,
          items_to_add,
        }));
    } finally {
      dispatch({
        type: 'LOADING',
        payload: { save_changes: false },
      });
    }
  }
);
