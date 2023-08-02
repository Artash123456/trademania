import { BotState, PairTypes } from 'types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchPairs } from 'redux/actions/trading_actions';
import nextId from 'react-id-generator';

import {
  fetchAvailableBalance,
  fetchBots,
  fetchMyBots,
  startPauseBot,
} from 'redux/actions/bot_actions';
import { deepCopy, loadStore } from 'context';
const initialState: BotState = {
  my_bots: [],
  my_grid_bots: [],
  bots: [],
  revenue: { sum: 0, count: 0 },
  revenueData: {},
  balance: {},
  pairs: [],
  botInfoModal: {
    id: 0,
    bot_id: 0,
    market_id: 0,
    user_id: 0,
    pair_id: 0,
    reinvest: 0,
    amount: 0,
    created_at: '',
    updated_at: '',
    deleted_at: null,
  },
  tableHead: [
    {
      name: 'active_orders',
      id: nextId(),
      active: true,
      text: 'Active Orders',
    },
    {
      name: 'filled_orders',
      id: nextId(),
      active: false,
      text: 'Filled Orders',
    },
  ],
};
const initial: BotState = loadStore('bot', initialState);

export const bot = createSlice({
  name: 'bot',
  initialState: initial,
  reducers: {
    showBotInfo: (state, action) => {
      state.botInfoModal = action.payload;
    },
    changePositionActiveHeader: (state, action) => {
      for (let item of state.tableHead)
        item.active = item.name === action.payload;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(fetchPairs.fulfilled, (state, action) => {
      const { bot_id, data, market } = action.payload;
      if (bot_id !== 2) {
        const includesNumber = new RegExp(/^([^0-9]*)$/);

        if (market === 'kraken') {
          const arr = [];
          for (let elem of data)
            if (elem.quote === 'USD' && includesNumber.test(elem.value))
              arr.push(elem);
          state.pairs = arr;
        } else if (market === 'okx') {
          state.pairs = data;
        } else {
          const arr = [];
          for (let elem of data) {
            if (market === 'phemex') {
              if (elem.quote === 'USD' && elem.base !== 'USD') {
                arr.push(elem);
              }
            } else {
              if (
                (elem.quote === 'USD' || elem.quote === 'PERP') &&
                includesNumber.test(elem.value)
              ) {
                arr.push(elem);
              }
            }
          }
          state.pairs = arr;
        }
      } else {
        state.pairs = data?.filter(
          (item: PairTypes) => item.quote.toLowerCase() === 'usdt'
        );
      }
    });
    builders.addCase(fetchAvailableBalance.fulfilled, (state, action) => {
      state.balance = action.payload;
    });
    builders.addCase(fetchMyBots.fulfilled, (state, action) => {
      state.my_bots = [...action.payload.bots, ...action.payload.gridBots];
      state.my_grid_bots = action.payload.gridBots;
      state.revenue = action.payload.revenue;
      state.revenueData = action.payload.revenueData;
    });
    builders.addCase(fetchBots.fulfilled, (state, action) => {
      state.bots = action.payload;
    });
    builders.addCase(startPauseBot.fulfilled, (state, action) => {
      const bots = deepCopy(state.my_bots);
      for (let item of bots) {
        if (item.id === action.payload) {
          item.status = item.status === 1 ? 0 : 1;
        }
      }
      state.my_bots = bots;
    });
  },
});

export const { showBotInfo, changePositionActiveHeader } = bot.actions;
