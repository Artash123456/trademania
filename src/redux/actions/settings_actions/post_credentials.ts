import { openModal } from 'redux/actions/other_actions';
import axios from 'axios';
import { getMarketplaces } from 'redux/actions/market_actions';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface Data {
  market_id: number | string;
  api_key: string;
  private_key: string;
}

export const postCredentials = createAsyncThunk(
  'postCredentials',
  async (
    { data, market_id }: { data: Data; market_id: number },
    { dispatch }
  ) => {
    dispatch({ type: 'LOADING', payload: { post_credentials: true } });
    try {
      return await axios.post(`/api/save-credentials`, data).then((res) => {
        if (res) {
          dispatch(openModal('exchanges'));
          dispatch(getMarketplaces());
          return market_id;
        }
      });
    } finally {
      dispatch({ type: 'LOADING', payload: { post_credentials: false } });
    }
  }
);
