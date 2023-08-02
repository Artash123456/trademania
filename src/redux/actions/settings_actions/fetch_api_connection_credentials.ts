import { MarketTypes } from 'types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { openModal } from 'redux/actions/other_actions';
import axios from 'axios';

export const fetchCredentials = createAsyncThunk(
  'fetchCredentials',
  async (elem: MarketTypes, { dispatch }) => {
    const response = await axios(`/api/get-credentials/${elem.id}`);
    dispatch(openModal('exchanges'));
    return response.data.data;
  }
);
