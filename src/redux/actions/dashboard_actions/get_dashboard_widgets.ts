import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDashboardWidgets = createAsyncThunk(
  'getDashboardWidgets',
  async (_, { dispatch }) => {
    dispatch({
      type: 'LOADING',
      payload: { get_dashboard_widgets: true },
    });
    try {
      const { data } = await axios.post('/api/get-dashboard-settings');
      return {
        data: data?.data?.containers,
        items: data?.data?.items_to_add,
        categories: data?.data?.categories,
      };
    } finally {
      dispatch({
        type: 'LOADING',
        payload: { get_dashboard_widgets: false },
      });
    }
  }
);
