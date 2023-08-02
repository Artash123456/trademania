import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { openModal } from '../other_actions';
import { fetchSubAccountCustomers } from './fetch_subaccount_customers';

export const postSubaccount = createAsyncThunk(
  'postSubaccount',
  async ({ values }: { values: any }, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { sub_accounts: true } });
    try {
      return await axios.post('/api/add-subaccount', values).then(() => {
        dispatch(openModal('add_aubaccount'));
        dispatch(fetchSubAccountCustomers(values.market_id));
      });
    } finally {
      dispatch({ type: 'LOADING', payload: { sub_accounts: false } });
    }
  }
);
