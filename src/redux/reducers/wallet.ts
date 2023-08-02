import { createSlice } from '@reduxjs/toolkit';
import nextId from 'react-id-generator';
import {
  fetchLiquidSwap,
  fetchMarketSavings,
  fetchMarketStacking,
} from 'redux/actions/wallet_actions';
import { WalletNavigation, WalletNavigationNames, WalletState } from 'types';
import { loadStore } from 'context';
const initialState = {
  navigation: [
    {
      name: 'Savings',
      id: nextId(),
      active: true,
    },
    {
      name: 'Stacking',
      id: nextId(),
      active: false,
    },
    {
      name: 'Liquid Swap',
      id: nextId(),
      active: false,
    },
  ],
  savings_navigation: [
    {
      name: 'Flexible',
      id: nextId(),
      active: true,
    },
    {
      name: 'Locked',
      id: nextId(),
      active: false,
    },
  ],
  stacking_navigation: [
    {
      name: 'Flexible DeFi Stacking',
      id: nextId(),
      active: true,
    },
    {
      name: 'Locked Stacking',
      id: nextId(),
      active: false,
    },
  ],
  savings: {},
  stacking: {},
  liquid_swap: {},
  navigationActive: 'Savings',
  savings_navigationActive: 'Flexible',
  stacking_navigationActive: 'Flexible DeFi Stacking',
};

const initial: WalletState = loadStore('wallet', initialState);

export const wallet = createSlice({
  name: 'wallet',
  initialState: initial,
  reducers: {
    changeNavigation: (state, action) => {
      const {
        item,
        type,
      }: {
        type: WalletNavigationNames;
        item: WalletNavigation;
      } = action.payload;
      const name = [...state[type]];
      for (let i of name) {
        i.active = i.id === item.id;
      }
      state[type] = name;
      state[`${type}Active`] = item.name;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMarketSavings.fulfilled, (state, action) => {
      state.savings = {
        ...state.savings,
        ...action.payload,
      };
    });
    builder.addCase(fetchMarketStacking.fulfilled, (state, action) => {
      state.stacking = {
        ...state.stacking,
        ...action.payload,
      };
    });
    builder.addCase(fetchLiquidSwap.fulfilled, (state, action) => {
      state.liquid_swap = {
        ...state.liquid_swap,
        ...action.payload,
      };
    });
  },
});
export const { changeNavigation } = wallet.actions;
