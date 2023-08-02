import { changeSymbol } from 'redux/actions/spot_actions';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SpotMarket, PairTypes } from 'types';

export const fetchSpotPairs = createAsyncThunk(
  'fetchSpotPairs',
  async ({ market }: { market: SpotMarket }, { dispatch }) => {
    const { data } = await axios.post('/api/get-pairs', {
      market_id: market.id,
      slug: market.slug,
      is_spot: 1,
    });
    const { usr } = window.history?.state;
    if (usr) {
      const state = data.data.find((item: PairTypes) => item.base === usr);
      dispatch(changeSymbol({ value: state, market: market }));
    } else {
      dispatch(changeSymbol({ value: data?.data[0], market: market }));
    }
    return data.data;
  }
);
