import nextId from 'react-id-generator';
import { ManualState, WalletsItemType } from 'types';
import { createSlice } from '@reduxjs/toolkit';
import {
  cancelOrder,
  changeSymbol,
  fetchManualBalance,
  fetchManualOverview,
  fetchManualPairs,
  setLeverage,
} from 'redux/actions/manual_actions';
import {
  fetchActiveOrders,
  fetchActivePositions,
  fetchClosedPositions,
  fetchConditionalOrders,
  fetchFilled,
  fetchOrderHistory,
} from 'redux/actions/trading_actions';
import { loadStore } from 'context';
const initialState: ManualState = {
  leverage: 0,
  pairs: [],
  symbol: {
    value: '',
    currency: '',
    base: '',
    quote: '',
    id: '',
    is_spot: 0,
    label: '',
    market_id: '',
    name: '',
    order: '',
    status: '',
    value_charts: '',
  },
  balance: {
    coin: 0,
    usd: 0,
    price: '',
  },
  menu: [
    { name: 'Limit', active: true },
    { name: 'Market', active: false },
    { name: 'Conditional', active: false },
  ],
  timeInForce: [
    { label: 'GoodTillCancel', value: 'GoodTillCancel' },
    { label: 'ImmediateOrCancel', value: 'ImmediateOrCancel' },
    { label: 'FillOrKill', value: 'FillOrKill' },
  ],
  timeInForceBinance: [
    { label: 'GTC', value: 'GTC' },
    { label: 'IOC', value: 'IOC' },
    { label: 'FOK', value: 'FOK' },
  ],
  marketLimitLabels: [
    { label: 'Limit', value: 'Limit', name: 'order_type', isActive: true },
    { label: 'Market', value: 'Market', name: 'order_type', isActive: false },
  ],
  activeMenu: 'Limit',
  refresh: 0,
  footer: [
    { name: 'open_positions', id: nextId() },
    { name: 'closed_positions', id: nextId() },
    { name: 'active_orders', id: nextId() },
    { name: 'conditional_orders', id: nextId() },
    { name: 'fills', id: nextId() },
    { name: 'order_history', id: nextId() },
  ],
  activeFooter: 'open_positions',
  table: {
    openTbody: [],
    closedTbody: [],
    activeTbody: [],
    conditionalTbody: [],
    filledTbody: [],
    orderHistoryTbody: [],
  },
  limitMarketModal: { type: null, data: null },
  take_profit_modal_drop_down: {
    bybit: [
      { value: 'LastPrice', label: 'LastPrice' },
      { value: 'IndexPrice', label: 'IndexPrice' },
      { value: 'MarkPrice', label: 'MarkPrice' },
    ],
    binance: [
      { value: 'MARK_PRICE', label: 'MARK_PRICE' },
      { value: 'CONTRACT_PRICE', label: 'CONTRACT_PRICE' },
    ],
    phemex: [
      { value: 'ByMarkPrice', label: 'ByMarkPrice' },
      { value: 'ByLastPrice', label: 'ByLastPrice' },
    ],
    demo: [
      { value: 'MARK PRICE', label: 'MARK PRICE' },
      { value: 'CONTRACT PRICE', label: 'CONTRACT PRICE' },
    ],
    bitget: [
      { value: 'market_price', label: 'MARKET PRICE' },
      { value: 'fill_price', label: 'FILL PRICE' },
    ],
    kraken: [
      { value: 'last', label: 'Last Price' },
      { value: 'index', label: 'Index Price' },
    ],
    okx: [
      { value: 'last', label: 'Last Price' },
      { value: 'index', label: 'Index Price' },
      { value: 'mark', label: 'Market Price' },
    ],
  },
  takeProfitLabels: [
    { label: 'Last', value: 'ByLastPrice', name: 'tpTrigger' },
    { label: 'Mark', value: 'ByMarkPrice', name: 'tpTrigger' },
  ],
  stopLossLabels: [
    { label: 'Last', value: 'ByLastPrice', name: 'slTrigger' },
    { label: 'Mark', value: 'ByMarkPrice', name: 'slTrigger' },
  ],
  byTypeLabels: [
    { label: 'ByMarkPrice', value: 'ByMarkPrice', name: 'trigger_by' },
    { label: 'ByLastPrice', value: 'ByLastPrice', name: 'trigger_by' },
  ],
  socket_price: 0,
  orderCount: {
    name: '',
    count: 0,
  },
  wallets: {},
  takeProfit: {
    trailing_stop: null,
    new_trailing_active: null,
    tp_trigger_by: 0,
    sl_trigger_by: 0,
  },
  totalBalance: 0,
};
const initial: ManualState = loadStore('manual', initialState);

export const manual = createSlice({
  name: 'manual',
  initialState: initial,
  reducers: {
    refreshTable: (state) => {
      state.refresh = ++state.refresh;
    },
    changeMenu: (state, action) => {
      for (let i of state.menu) {
        i.name === action.payload ? (i.active = true) : (i.active = false);
      }
      state.activeMenu = action.payload;
    },
    changeFooterActive: (state, action) => {
      state.activeFooter = action.payload;
    },
    handleOpenLimitMarketModal: (state, action) => {
      state.limitMarketModal = action.payload;
    },
    storeTpslData: (state, action) => {
      const elem = action.payload;
      const data = {
        side: elem.side,
        currency: elem.currency,
        symbol: elem.symbol,
        entry_price: elem.entry_price,
        liquidation_price: elem.liquidation_price,
        take_profit: elem.take_profit,
        stop_loss: elem.stop_loss,
        trailing_stop: 0,
        new_trailing_active: 0,
        tp_trigger_by: 0,
        sl_trigger_by: 0,
      };
      state.takeProfit = data;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(setLeverage.fulfilled, (state, action) => {
      state.leverage = action.payload;
    });
    builders.addCase(fetchManualBalance.fulfilled, (state, action) => {
      state.balance = {
        coin: action.payload.balance_coin,
        usd: action.payload.balance_usd,
        price: action.payload.price,
      };
      if (Number(action.payload.leverage) < 1) {
        state.leverage = 0;
      } else state.leverage = action.payload.leverage;
    });
    builders.addCase(fetchManualPairs.fulfilled, (state, action) => {
      state.pairs = action.payload;
    });
    builders.addCase(changeSymbol.fulfilled, (state, action) => {
      state.symbol = action.payload;
    });
    builders.addCase(fetchActivePositions.fulfilled, (state, action) => {
      state.table = {
        ...state.table,
        openTbody: action.payload.positions,
      };
    });
    builders.addCase(fetchClosedPositions.fulfilled, (state, action) => {
      state.table = {
        ...state.table,
        closedTbody: action.payload,
      };
    });
    builders.addCase(fetchActiveOrders.fulfilled, (state, action) => {
      state.table = {
        ...state.table,
        activeTbody: action.payload,
      };
      state.orderCount = {
        name: 'active_orders',
        count: action.payload.length,
      };
    });
    builders.addCase(fetchFilled.fulfilled, (state, action) => {
      state.table = {
        ...state.table,
        filledTbody: action.payload,
      };
    });
    builders.addCase(fetchConditionalOrders.fulfilled, (state, action) => {
      state.table = {
        ...state.table,
        conditionalTbody: action.payload,
      };
    });
    builders.addCase(fetchOrderHistory.fulfilled, (state, action) => {
      state.table = {
        ...state.table,
        orderHistoryTbody: action.payload,
      };
    });
    builders.addCase(cancelOrder.fulfilled, (state, action) => {
      state.table = {
        ...state.table,
        activeTbody: state.table.activeTbody.filter(
          (elem) => elem.order_no !== action.payload
        ),
      };
      if (state.activeFooter === 'active_orders')
        state.orderCount = {
          name: 'active_orders',
          count: state.orderCount.count - 1,
        };
    });
    builders.addCase(fetchManualOverview.fulfilled, (state, action) => {
      interface WalletObj {
        [key: string]: string | number | undefined;
        value: number;
        title?: string;
        color?: string;
      }
      let totalBalance = 0;
      const arr: WalletObj[] = [];
      const arr1: { [key: string]: WalletsItemType[] } = {};
      for (let item of action.payload) {
        totalBalance += +item.total;
        for (let e = 0; e < item.wallets?.length; e++) {
          const hasKey = Object.keys(arr1).find(
            (key) => key === item.wallets[e].coin
          );
          if (hasKey) {
            arr1[item.wallets[e].coin].push(item.wallets[e]);
          } else {
            arr1[item.wallets[e].coin] = [item.wallets[e]];
          }
          const obj: WalletObj = {
            value: 0,
          };
          const hasProp = arr.find((i) =>
            i.hasOwnProperty(item.wallets[e].coin)
          );
          if (hasProp) {
            if (item.wallets[e].price) {
              hasProp.value +=
                Number(item.wallets[e].free) * Number(item.wallets[e].price);
            } else {
              hasProp.value += Number(item.wallets[e].free) * 0;
            }
          } else {
            if (item.wallets[e].price) {
              obj.value =
                Number(item.wallets[e].free) * Number(item.wallets[e].price);
            } else {
              obj.value += Number(item.wallets[e].free) * 0;
            }
            obj.title = item.wallets[e].coin;
            obj[item.wallets[e].coin] = item.wallets[e].coin;
            obj.color = item.wallets[e].color;
            arr.push(obj);
          }
        }
      }
      state.wallets = arr1;
      state.totalBalance = totalBalance;
    });
  },
});
export const {
  refreshTable,
  changeMenu,
  changeFooterActive,
  handleOpenLimitMarketModal,
  storeTpslData,
} = manual.actions;
