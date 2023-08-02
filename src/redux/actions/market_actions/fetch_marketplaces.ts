import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MarketTypes } from 'types';

export const getMarketplaces = createAsyncThunk(
  'getMarketplaces',
  async (_, { dispatch }) => {
    try {
      dispatch({ type: 'LOADING', payload: { fetch_marketplaces: true } });
      const response = await axios('/api/marketplaces');
      const markets = response?.data?.data;
      const onlyMarketsHaveCredentials = markets.filter(
        (item: MarketTypes) => item?.has_credential?.market_id
      );
      const nonDemoMarkets = markets.filter(
        (item: MarketTypes) => item.name !== 'demo'
      );
      const demoMarket = markets.filter(
        (item: MarketTypes) => item.name === 'demo'
      );
      return {
        nonDemoMarkets,
        demoMarket,
        markets: markets,
        onlyMarketsHaveCredentials,
      };
    } finally {
      dispatch({ type: 'LOADING', payload: { fetch_marketplaces: false } });
    }
  }
);
