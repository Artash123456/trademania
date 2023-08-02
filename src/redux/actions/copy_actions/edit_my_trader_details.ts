import { createAsyncThunk } from '@reduxjs/toolkit';

export const editMyTraderDetails = createAsyncThunk(
  'editMyTraderDetails',
  ({ data, step }: { data: Record<string, any>; step: number }) => {
    const { my_markets, my_market_pairs } = data.open_trader;
    return {
      data: {
        initial_investment: data.initial_investment,
        per_trade_amount: data.per_trade_amount,
        trade_type: data.trade_type,
        my_markets,
        my_market_pairs,
        market_pairs: my_market_pairs,
      },
      step,
    };
  }
);
