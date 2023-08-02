import nextId from 'react-id-generator';
import { DashboardState } from 'types';
import phemex from 'assets/images/phemex.svg';
import bybit from 'assets/images/bybit.svg';
import binance from 'assets/images/binance.svg';
import demo from 'assets/images/demo_icon.svg';
import bitget from 'assets/images/bitget.svg';
import kraken from 'assets/images/kraken.svg';
import okx from 'assets/images/okx.svg';
import bitmex from 'assets/images/bitmex.svg';
import kucoin from 'assets/images/kucoin.svg';
import { createSlice } from '@reduxjs/toolkit';
import {
  getDashboardWidgets,
  getMarketLeverage,
  storeDashboardWidgets,
} from 'redux/actions/dashboard_actions';
import { changeUsingMode } from 'redux/actions/market_actions';
import { deepCopy, loadStore } from 'context';

const initialState = {
  grid: {
    small: {
      x: 0,
      y: 0,
      w: 1,
      h: 0.8,
      isResizable: false,
      maxW: 1.001,
      minW: 0.999,
      minH: 0.7999,
      maxH: 0.8001,
    },
    long: {
      x: 0,
      y: 0,
      w: 3,
      maxW: 8,
      minW: 2,
      h: 1.2,
      minH: 1.19,
      maxH: 2.4,
      isResizable: true,
    },
    chart: {
      w: 2,
      maxW: 8,
      minW: 1,
      h: 1.2,
      minH: 1,
      maxH: 3.6,
      x: 0,
      y: 0,
      isResizable: true,
    },
    economic_calendar: {
      x: 0,
      y: 0,
      w: 1,
      maxW: 2,
      minW: 1.5,
      h: 3.6,
      minH: 1.8,
      maxH: 3.61,
      isResizable: true,
    },
    ticker_tape: {
      x: 0,
      y: 0,
      w: 4,
      maxW: 8,
      minW: 2,
      h: 0.6,
      maxH: 0.61,
      minH: 0.59,
      isResizable: true,
    },
    single_ticker: {
      x: 0,
      y: 0,
      w: 1,
      maxW: 1.01,
      minW: 0.99,
      h: 0.8,
      maxH: 0.81,
      minH: 0.79,
      isResizable: false,
    },
    technical_analysis: {
      x: 0,
      y: 0,
      w: 1,
      h: 1.5,
      isResizable: false,
    },
    forex_heat_map: {
      x: 0,
      y: 0,
      w: 2,
      maxW: 4,
      minW: 1.8,
      h: 1.8,
      minH: 1.79,
      maxH: 3,
      isResizable: true,
    },
    cryptocurrency_market: {
      x: 0,
      y: 0,
      w: 1,
      maxW: 3,
      minW: 0.99,
      h: 1.5,
      maxH: 3.6,
      minH: 1.4,
      isResizable: true,
    },
    market_overview: {
      x: 0,
      y: 0,
      w: 1,
      h: 1.8,
      isResizable: false,
    },
  },
  layouts: {},
  containers: [],
  default_containers: '',
  items_to_add: [],
  default_items_to_add: '',
  categories: [],
  editable: '',
  zoomed: '',
  images: {
    bybit,
    phemex,
    binance,
    demo,
    bitget,
    kraken,
    okx,
    bitmex,
    kucoin,
  },

  tableHead: [
    { name: 'open_positions', id: nextId(), active: true, text: 'positions' },
    {
      name: 'closed_positions',
      id: nextId(),
      active: false,
      text: 'closedIncome',
    },
    { name: 'active_orders', id: nextId(), active: false, text: 'active' },
    {
      name: 'conditional_orders',
      id: nextId(),
      active: false,
      text: 'Conditional',
    },
    { name: 'fills', id: nextId(), active: false, text: 'filled' },
    {
      name: 'order_history',
      id: nextId(),
      active: false,
      text: 'order_history',
    },
  ],
  pairs: [],
  totalIncomeData: {},
  activeCategory: 'none',
  pnl: {},
};
const initial: DashboardState = loadStore('dashboard', initialState);

export const dashboard = createSlice({
  name: 'dashboard',
  initialState: initial,
  reducers: {
    dragAndDrop: (state, action) => {
      state.layouts = {
        ...deepCopy(state.layouts),
        ...deepCopy(action.payload.layouts),
      };
      const containers = deepCopy(state.containers);
      for (let [index, item] of deepCopy(containers).entries()) {
        for (let elem of action.payload.layout) {
          if (String(item.id) === String(elem.i)) {
            containers[index].grid = elem;
          }
        }
      }
      state.containers = containers;
    },
    addItemsToDashboard: (state, action) => {
      const { id, type } = action.payload;
      const obj = {
        ...action.payload,
        grid: state.grid[type],
      };
      state.containers.push(obj);
      state.items_to_add = state.items_to_add.filter((elem) => elem.id !== id);
    },
    setToEditable: (state, action) => {
      state.editable = action.payload;
    },
    removeItem: (state, action) => {
      state.containers = state.containers.filter(
        (elem) => elem.id !== action.payload.id
      );
      state.items_to_add.push(action.payload);
    },
    zoomItem: (state, action) => {
      state.zoomed = state.zoomed === action.payload ? '' : action.payload;
    },
    cancelChanges: (state) => {
      state.containers = JSON.parse(state.default_containers);
      state.items_to_add = JSON.parse(state.default_items_to_add);
      state.layouts = {};
    },
    selectCategories: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(storeDashboardWidgets.fulfilled, (state) => {
      state.default_containers = JSON.stringify(state.containers);
      state.default_items_to_add = JSON.stringify(state.items_to_add);
    });
    builders.addCase(getDashboardWidgets.fulfilled, (state, action) => {
      state.containers = action.payload.data;
      state.items_to_add = action.payload.items;
      state.categories = action.payload.categories;
      state.default_containers = JSON.stringify(action.payload.data);
      state.default_items_to_add = JSON.stringify(action.payload.items);
    });
    builders.addCase(changeUsingMode, (state) => {
      state.totalIncomeData = {};
    });
    builders.addCase(getMarketLeverage.fulfilled, (state, action) => {
      if (action.payload) {
        const obj = { ...state.totalIncomeData };
        const { data, market_id, is_spot } = action.payload;
        obj[`${market_id}-${is_spot}`] = data;
        state.totalIncomeData = obj;
      }
    });
  },
});
export const {
  dragAndDrop,
  addItemsToDashboard,
  setToEditable,
  removeItem,
  zoomItem,
  cancelChanges,
  selectCategories,
} = dashboard.actions;
