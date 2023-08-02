import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchSpotActiveOrders } from 'redux/actions/spot_actions';
import { SpotLimitValues } from 'types';

export const fetchLimitFormSpot = createAsyncThunk(
  'fetchLimitFormSpot',
  async (
    { values, resetForm }: { values: SpotLimitValues; resetForm: Function },
    { dispatch }
  ) => {
    const { data } = await axios.post('/api/order-spot', values);
    resetForm();
    dispatch(
      fetchSpotActiveOrders({ market: values.market, symbol: values.symbol })
    );
    return data;
  }
);
