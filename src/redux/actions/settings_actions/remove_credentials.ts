import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getMarketplaces } from 'redux/actions/market_actions';
import { openModal } from 'redux/actions/other_actions';
export const removeCredential = createAsyncThunk(
  'removeCredential',
  async ({ market_id }: { market_id: number }, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { remove_credentials: true } });
    try {
      return await axios
        .post(`api/delete-credential/${market_id}`)
        .then((res) => {
          dispatch(getMarketplaces());
          dispatch(openModal('exchanges'));
          return res;
        });
    } finally {
      dispatch({ type: 'LOADING', payload: { remove_credentials: false } });
    }
  }
);
