import { createSlice } from '@reduxjs/toolkit';
import { loadStore } from 'context';
import nextId from 'react-id-generator';
import {
  acceptCopy,
  editMyTraderDetails,
  fetchBalance,
  fetchUserFeedbacks,
  followTrader,
  getMyTraders,
  getOpenTraders,
} from 'redux/actions/copy_actions';
import { getUser } from 'redux/actions/user_actions';

import { CopyState } from 'types';
import { changeUsingMode } from '../actions/market_actions';
const initialState: CopyState = {
  copy_ratings: [],
  balance: {},
  become_public_data: {},
  copy_accepted: false,
  user_data: {},
  my_traders: [],
  user_feedbacks: [],
  rate_trader: {
    trade_type: '',
    market_pairs: [],
    my_markets: [],
    initial_investment: '',
    per_trade_amount: '',
    my_market_pairs: [],
  },
  edit_follow_details: {
    initialStep: 1,
    initialValues: {
      market_pairs: {},
      my_markets: [],
      trade_type: '',
      initial_investment: '',
      per_trade_amount: '',
      my_market_pairs: {},
    },
  },
  view_trader_positions: {},

  tableHead: [
    { name: 'open_positions', id: nextId(), active: true, text: 'Positions' },
    {
      name: 'active_orders',
      id: nextId(),
      active: false,
      text: 'Order History',
    },
  ],
  unfollow_info: {},
  revenue: { count: 0, investment: 0 },
  pnl: {
    annual: { sum: 0, percent: 0 },
    daily: { sum: 0, percent: 0 },
    monthly: { sum: 0, percent: 0 },
  },
};
const initial: CopyState = loadStore('copy', initialState);

export const copy = createSlice({
  name: 'copy',
  initialState: initial,
  reducers: {
    saveTrader: (state, action) => {
      state.rate_trader = action.payload;
    },
    storeUnfollowInformation: (state, action) => {
      state.unfollow_info = action.payload;
    },
    storeUserDataModal: (state, action) => {
      state.user_data = action.payload;
      state.edit_follow_details = initialState.edit_follow_details;
    },
    viewTraderPositions: (state, action) => {
      state.view_trader_positions = action.payload;
    },
    changePositionActiveHeader: (state, action) => {
      for (let item of state.tableHead)
        item.active = item.name === action.payload;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(followTrader.fulfilled, (state, action) => {
      state.copy_ratings = state.copy_ratings.filter(
        (item) => item.id !== action.payload
      );
    });
    builders.addCase(getUser.fulfilled, (state, action) => {
      state.copy_accepted = action.payload?.copy_accepted;
    });
    builders.addCase(fetchBalance.fulfilled, (state, action) => {
      state.balance = action.payload;
    });
    builders.addCase(getMyTraders.fulfilled, (state, action) => {
      state.my_traders = action.payload.traders;
      state.revenue = action.payload.revenue;
      state.pnl = action.payload.revenueData;
    });
    builders.addCase(getOpenTraders.fulfilled, (state, action) => {
      state.copy_ratings = action.payload;
    });
    builders.addCase(acceptCopy.fulfilled, (state, action) => {
      state.copy_accepted = action.payload;
    });
    builders.addCase(fetchUserFeedbacks.fulfilled, (state, action) => {
      state.user_feedbacks = action.payload;
    });
    builders.addCase(editMyTraderDetails.fulfilled, (state, action) => {
      const { step, data } = action.payload;
      state.edit_follow_details = {
        initialStep: step,
        initialValues: data,
      };
    });
    builders.addCase(changeUsingMode, (state) => {
      state.my_traders = [];
      state.copy_ratings = [];
    });
  },
});

export const {
  saveTrader,
  storeUnfollowInformation,
  storeUserDataModal,
  viewTraderPositions,
  changePositionActiveHeader,
} = copy.actions;
