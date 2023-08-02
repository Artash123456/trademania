import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchManualBalance,
  fetchManualMarketPrice,
} from 'redux/actions/manual_actions';
import { PairTypes } from 'types';

export const changeSymbol = createAsyncThunk(
  'changeSymbol',
  async (
    { value, market_id }: { value: PairTypes; market_id: number },
    { dispatch }
  ) => {
    await dispatch(fetchManualBalance({ values: value, market_id }));
    await dispatch(
      fetchManualMarketPrice({ market_id: market_id, symbol: value.value })
    );
    return {
      name: value.name,
      value: value.value,
      currency: value.base,
      base: value.base,
      quote: value.quote,
      chart: value.value_charts,
      id: value.id,
      is_spot: value.is_spot,
      label: value.label,
      market_id: value.market_id,
      order: value.order,
      status: value.status,
      value_charts: value.value_charts,
    };
  }
);
