import { createSlice } from '@reduxjs/toolkit';
import {
  changeUsingMode,
  fetchDailyPnl,
  getMarketplaces,
} from 'redux/actions/market_actions';
import { loadStore } from 'context';
import { MarketState } from 'types';

const initialState = {
  markets: [],
  storeMarkets: [],
  dailyPnl: {
    balance: 0,
    percent: 0,
  },
  isDemo: false,
};

const initial: MarketState = loadStore('markets', initialState);

export const markets = createSlice({
  name: 'markets',
  initialState: initial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeUsingMode, (state, action) => {
      const { isDemo, markets } = action.payload;
      state.markets = markets;
      state.isDemo = isDemo;
    });
    builder.addCase(getMarketplaces.fulfilled, (state, action) => {
      const { nonDemoMarkets, demoMarket, markets } = action.payload;

      if (state.isDemo) {
        state.markets = demoMarket;
        state.storeMarkets = markets;
      } else {
        state.markets = nonDemoMarkets;
        state.storeMarkets = markets;
      }
    });
    builder.addCase(fetchDailyPnl.fulfilled, (state, action) => {
      state.dailyPnl = action.payload;
    });
  },
});
