import { createAsyncThunk } from '@reduxjs/toolkit';
import { PairTypes } from 'types';
import { fetchSpotBalance } from './fetch_spot_balance';

export const changeSymbol = createAsyncThunk(
  'changeSymbol',
  (
    {
      value,
      market,
    }: {
      value: PairTypes;
      market: { id: number | string; name: string };
    },
    { dispatch }
  ) => {
    dispatch(fetchSpotBalance({ values: value, market_id: market.id }));
    return value;
  }
);
