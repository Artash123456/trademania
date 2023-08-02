import nextId from 'react-id-generator';
import {
  AcitveTradingMenu,
  MarketTypes,
  SpotState,
  WalletsItemType,
} from 'types';
import { createSlice } from '@reduxjs/toolkit';
import {
  addOrRemoveFromFavorites,
  cancelOrder,
  changeSymbol,
  fetchPortfolioChange,
  fetchSpotActiveOrders,
  fetchSpotBalance,
  fetchSpotChartBalance,
  fetchSpotList,
  fetchSpotOverview,
  fetchSpotPagePairs,
  fetchSpotPairs,
  fetchSpotWidgets,
  saveSpotWidgets,
} from 'redux/actions/spot_actions';
import { changeUsingMode, getMarketplaces } from 'redux/actions/market_actions';
import { storeSocketPrice } from 'redux/actions/trading_actions';
import { handleLogout } from 'redux/actions/user_actions';
import {
  postCredentials,
  removeCredential,
} from 'redux/actions/settings_actions';
import { DateC } from 'context';
import { loadStore } from 'context';

const initialState: SpotState = {
  spot_overview: [],
  spot_list: {},
  activeMarket: { name: 'bybit', id: 1 },
  markets: [],
  pie_chart_data: [],
  wallets: {},
  pairs: [],
  pending: false,
  storeMarkets: [],
  totalBalance: 0,
  total_pnl: 0,
  pairsTable: {},
  balance_chart_data: [],
  balance_chart_default: [],
  active_orders: [],
  menu: [
    { name: 'Limit', active: true },
    { name: 'Market', active: false },
  ],
  side: [
    { name: 'Buy', active: true },
    { name: 'Sell', active: false },
  ],
  activeMenu: AcitveTradingMenu.LIMIT,
  activeSide: 'Buy',
  symbol: {
    base: '',
    id: '',
    is_spot: 0,
    label: '',
    market_id: '',
    name: '',
    order: '',
    quote: '',
    status: '',
    value: '',
    value_charts: '',
    currency: '',
  },
  balance: { coin: 0, usd: 0, price: 0 },
  grid: {
    active_orders: {
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      minW: 1,
      minH: 1,
      maxW: 2,
      maxH: 2,
      i: nextId(),
    },
    chart: { w: 3, h: 3, x: 0, y: 0, minW: 2, minH: 1, maxH: 4, i: nextId() },
    menu: {
      w: 1.5,
      h: 1.75,
      x: 0,
      y: 0,
      isResizable: false,
      i: nextId(),
    },
    wallet: {
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      minW: 1,
      minH: 1,
      maxW: 2,
      maxH: 2,
      i: nextId(),
    },
    filled: {
      w: 2,
      h: 2.7,
      x: 0,
      y: 0,
      minW: 1.5,
      minH: 1,
      maxH: 4,
      maxW: 3,
      i: nextId(),
    },
  },
  default_containers: [],
  default_items_to_add: [],
  containers: [],
  editable: false,
  items_to_add: [],
  portfolio_change: {},
  trading_chart_info: { market: '', symbol: '' },
  socket_price: 0,
  layouts: {},
  chart_filter: [
    { name: 'All', active: true },
    { name: 'Week', active: false },
    { name: 'Month', active: false },
    { name: 'Year', active: false },
  ],
  isDemo: false,
};

const initial: SpotState = loadStore('spot', initialState);

export const spot = createSlice({
  name: 'spot',
  initialState: initial,
  reducers: {
    changeSpotLayout: (state, action) => {
      const { layout, layouts } = action.payload;
      for (let item of state.containers) {
        for (let elem of layout) {
          if (+item.id === +elem.i) {
            item.grid = elem;
          }
        }
      }
      state.layouts = { ...state.layouts, ...layouts };
    },
    changeSpotActiveHeader: (state, action) => {
      const { name, id } = action.payload;
      state.activeMarket = { name, id };
    },
    handleSetActive: (state, action) => {
      const { name, type } = action.payload;
      if (type === 'menu') {
        for (let i of state.menu) {
          i.name === name ? (i.active = true) : (i.active = false);
        }
        state.activeMenu = name;
      } else {
        for (let i of state.side) {
          i.name === name ? (i.active = true) : (i.active = false);
        }
        state.activeSide = name;
      }
    },
    cancelChanges: (state) => {
      state.containers = JSON.parse(state.default_containers);
      state.items_to_add = JSON.parse(state.default_items_to_add);
      state.layouts = {};
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
    addWidget: (state, action) => {
      const { id, type } = action.payload;
      state.containers.push({ ...action.payload, grid: state.grid[type] });
      state.items_to_add = state.items_to_add.filter((elem) => elem.id !== id);
    },
    storeChartInfo: (state, action) => {
      const data = action.payload;
      if (data.symbol.startsWith('s')) {
        data.symbol = data.symbol.replace('s', '');
      }
      state.trading_chart_info = data;
    },
    changeChartFilter: (state, action) => {
      const data = [...state.balance_chart_default];
      const name = action.payload;
      for (let i of state.chart_filter) {
        i.active = i.name === name;
      }
      const filterd = data.filter((item) => {
        if (name === 'Week' && DateC.CountDate(item.date_time) <= 7) {
          return item;
        }
        if (name === 'Month' && DateC.CountDate(item.date_time) <= 30) {
          return item;
        }
        if (name === 'Year' && DateC.CountDate(item.date_time) <= 365) {
          return item;
        }
        return '';
      });
      state.balance_chart_data = name === 'All' ? data : filterd;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(fetchSpotOverview.fulfilled, (state, action) => {
      interface WalletObj {
        [key: string]: any;
        value: number;
        title: string;
        color: string;
      }
      const arr: WalletObj[] = [];
      const arr1: { [key: string]: WalletsItemType[] } = {};
      let totalBalance = 0;
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
          const obj: WalletObj = { value: 0, title: '', color: '' };
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
      state.spot_overview = action.payload;
      state.pie_chart_data = arr;
      state.totalBalance = totalBalance;
    });
    builders.addCase(fetchSpotList.fulfilled, (state, action) => {
      const { name, value } = action.payload;
      state.spot_list = { ...state.spot_list, [name]: value ? value : [] };
    });
    builders.addCase(fetchSpotPagePairs.fulfilled, (state, action) => {
      const { data, search, favorites } = action.payload;
      if (!search && !favorites) {
        state.pairsTable = { ...state.pairsTable, ...data };
      } else {
        state.pairsTable = data;
      }
    });
    builders.addCase(changeUsingMode, (state, action) => {
      const { isDemo, markets } = action.payload;
      const marketsWithCredentials = markets.filter(
        (item) => item.has_credential
      );
      const marketIds = marketsWithCredentials.map(
        (item) => item.has_credential?.market_id
      );
      const data_map = [
        ...marketsWithCredentials,
        {
          name: 'All',
          id: marketIds.join(','),
          icon: '',
        },
      ];
      state.activeMarket = {
        name: marketsWithCredentials?.[0]?.name,
        id: marketsWithCredentials?.[0]?.id,
      };
      state.isDemo = isDemo;
      state.markets = isDemo ? markets : data_map;
    });
    builders.addCase(getMarketplaces.fulfilled, (state, action) => {
      const { nonDemoMarkets, demoMarket, onlyMarketsHaveCredentials } =
        action.payload;
      const withCredentials = nonDemoMarkets.filter(
        (item: MarketTypes) => item?.has_credential?.market_id
      );
      const nonDemoMarketIds = withCredentials.map(
        (item: MarketTypes) => item?.has_credential?.market_id
      );
      const data_map = [
        ...withCredentials,
        { name: 'All', id: nonDemoMarketIds.join(',') },
      ];
      const defaultActive =
        state.isDemo && demoMarket.length
          ? { name: demoMarket[0].name, id: demoMarket[0].id }
          : data_map?.length
          ? { name: data_map[0].name, id: data_map[0].id }
          : { name: '', id: '' };
      if (state.isDemo) {
        state.markets = demoMarket;
        state.activeMarket = defaultActive;
        state.storeMarkets = onlyMarketsHaveCredentials;
      } else {
        state.markets = data_map;
        state.activeMarket = defaultActive;
        state.storeMarkets = onlyMarketsHaveCredentials;
      }
    });
    builders.addCase(fetchSpotChartBalance.fulfilled, (state, action) => {
      state.balance_chart_data = action.payload;
      state.balance_chart_default = action.payload;
    });

    builders.addCase(fetchSpotActiveOrders.fulfilled, (state, action) => {
      state.active_orders = action.payload;
    });
    builders.addCase(fetchSpotPairs.pending, (state) => {
      state.pending = true;
    });
    builders.addCase(fetchSpotPairs.fulfilled, (state, action) => {
      state.pending = false;
      state.pairs = action.payload;
    });
    builders.addCase(changeSymbol.fulfilled, (state, action) => {
      state.symbol = action.payload;
    });
    builders.addCase(fetchSpotBalance.fulfilled, (state, action) => {
      state.balance = {
        coin: action.payload.balance_coin,
        usd: action.payload.balance_usd,
        price: action.payload.price,
      };
    });
    builders.addCase(cancelOrder.fulfilled, (state, action) => {
      state.active_orders = state.active_orders.filter(
        (elem) => elem.order_no !== action.payload
      );
    });
    builders.addCase(fetchSpotWidgets.fulfilled, (state, action) => {
      state.containers = action.payload.data;
      state.items_to_add = action.payload.items;
      state.default_containers = JSON.stringify(action.payload.data);
      state.default_items_to_add = JSON.stringify(action.payload.items);
    });
    builders.addCase(fetchPortfolioChange.fulfilled, (state, action) => {
      state.portfolio_change = action.payload;
    });
    builders.addCase(storeSocketPrice, (state, action) => {
      state.socket_price = action.payload;
    });
    builders.addCase(addOrRemoveFromFavorites.fulfilled, (state, action) => {
      const { base, market } = action.payload;
      for (let i of state.spot_list[market.toString()]) {
        if (i.base === base) {
          i.isFavorite = !i.isFavorite;
        }
      }
    });
    builders.addCase(saveSpotWidgets.fulfilled, (state, action) => {
      const { containers, items_to_add } = action.payload;
      state.containers = containers;
      state.items_to_add = items_to_add;
      state.default_containers = JSON.stringify(containers);
      state.default_items_to_add = JSON.stringify(items_to_add);
    });
    builders.addCase(handleLogout.fulfilled, (state) => {
      state = initialState;
    });
    builders.addCase(removeCredential.fulfilled, (state, action) => {
      if (state.spot_list.All?.length) {
        state.spot_list.All = state.spot_list?.All?.filter(
          (item) => +item.market_id !== +action.payload
        );
      }
    });
    builders.addCase(postCredentials.fulfilled, (state) => {
      state.spot_list = {};
      state.activeMarket = { name: '', id: 0 };
    });
  },
});

export const {
  changeSpotLayout,
  changeSpotActiveHeader,
  handleSetActive,
  cancelChanges,
  setToEditable,
  removeItem,
  addWidget,
  storeChartInfo,
  changeChartFilter,
} = spot.actions;
