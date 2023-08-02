import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSubAccountCustomers } from './fetch_subaccount_customers';

export const deleteSubAccount = createAsyncThunk(
  'deleteSubAccount',
  async ({ id, market }: { id: string; market: number }, { dispatch }) => {
    const { data } = await axios.post(`/api/delete-subaccount`, { id, market });
    dispatch(fetchSubAccountCustomers(market));
    if (data) return id;
    return '';
  }
);
