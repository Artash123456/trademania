import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSpotList = createAsyncThunk(
  'fetchSpotList',
  async (props: { ids: string | number; name: string }, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { spot_list_loading: true } });
    try {
      const { data } = await axios({
        method: 'get',
        url: '/api/spot-list',
        params: { ids: props.ids },
      });
      return { value: data[0], name: props.name };
    } finally {
      dispatch({ type: 'LOADING', payload: { spot_list_loading: false } });
    }
  }
);
