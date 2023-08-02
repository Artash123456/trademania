import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { refreshTable } from 'redux/reducers/manual';
import { ManualOrderType } from 'types';
import { deepCopy } from 'context';
export const fetchLimitForm = createAsyncThunk(
  'fetchLimitForm',
  async (
    {
      data,
      market,
      resetForm,
    }: {
      data: ManualOrderType;
      resetForm: Function;
      market: string;
    },
    { dispatch }
  ) => {
    dispatch({ type: 'LOADING', payload: { limit_market: true } });
    try {
      const sendData = deepCopy(data);
      if (market === 'binance') {
        const { price = 1, qty } = sendData;
        sendData.qty = (Number(qty) / Number(price))?.toString();
      }
      sendData.post_only = sendData.post_only?.toString();
      sendData.reduce_only = sendData.reduce_only?.toString();
      return await axios.post('/api/order', sendData).then(() => {
        resetForm();
        dispatch(refreshTable());
      });
    } finally {
      dispatch({ type: 'LOADING', payload: { limit_market: false } });
    }
  }
);
