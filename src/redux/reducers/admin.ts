import { createSlice } from '@reduxjs/toolkit';
import { customizeDate, loadStore } from 'context';
import {
  fetchAdminPositions,
  getAllUsers,
  getAllBots,
  getAdminOpenTraders,
  getDashboardStatistics,
  fetchTopTraders,
  getAdminOrders,
  fetchUsersAffiliates,
  fetchAdminAffiliates,
  fetchAdminMarkets,
  fetchAdminMarketsIncome,
  getUserBalance,
  returnAdminBack,
  loginAsUser,
} from 'redux/actions/admin_actions';
import { AdminState } from 'types';

const initialData = {
  data: [],
  current_page: 0,
  next_page_url: '',
  path: '',
  per_page: 0,
  prev_page_url: '',
  to: 0,
  total: 0,
  last_page: 0,
};

const initialState = {
  users: initialData,
  open_traders: initialData,
  affiliates: initialData,
  bots: initialData,
  positions: initialData,
  orders: initialData,
  affiliate_users_drop_down: initialData,
  user_balance: initialData,
  statistics: {
    affiliates_count: 0,
    cash_flow_bots_count: 0,
    deletions_count: 0,
    open_traders_count: 0,
    registrations_count: 0,
    spot_grid_bots_count: 0,
    leverage_cash_turnover: 0,
    spot_cash_turnover: 0,
    leverage_income: 0,
    spot_income: 0,
    income_and_turnover_per_day: [],
  },
  top_traders: [],
  filters: {
    search: '',
    market: {
      label: '',
      value: '',
    },
    date: [null, null],
    range: {
      value: 'all_time',
      label: 'All Time',
    },
    status: { label: '', value: '' },
    bot_type: { label: '', value: '' },
    user: { label: '', value: '' },
    is_affiliate: { label: '', value: '' },
    source: { label: '', value: '' },
    users_drop_down: 1,
  },
  repeat_request: 0,
  request_body: '{}',
  markets: [],
  reports: {
    income_by_markets: [],
    orders_count_by_markets: [],
    users_count_by_markets: [],
    orders_count_by_source: [],
  },
  logged_in_as: false,
  back_token: '',
  admin_id: '',
};
const initial: AdminState = loadStore('admin', initialState);

export const admin = createSlice({
  name: 'admin',
  initialState: initial,
  reducers: {
    changeFilters: (state, action) => {
      if (action.payload.name === 'reset') {
        state.filters = initialState.filters;
        state.request_body = '{}';
      } else {
        state.filters[action.payload.name] = action.payload.value;
      }
    },

    createRequestBody: (state, action) => {
      const {
        date,
        range,
        search,
        market,
        status,
        bot_type,
        user,
        is_affiliate,
        source,
      } = state.filters;
      const map = new Map();

      if (action.payload === 'dashboard') {
        if (range.value) map.set('range', range.value);
      }
      if (action.payload === 'copy') {
        if (search) map.set('search_query', search);
        if (date[0]) map.set('start_date', customizeDate(date[1]));
        if (date[1]) map.set('end_date', customizeDate(date[1]));
        if (market.value) map.set('market', market.value);
      }
      if (action.payload === 'bots') {
        if (search) map.set('search_query', search);
        if (date[0]) map.set('start_date', customizeDate(date[0]));
        if (date[1]) map.set('end_date', customizeDate(date[1]));
        if (market.value) map.set('market', market.value);
        if (bot_type.value) map.set('bot_type', bot_type.value);
      }
      if (action.payload === 'users') {
        if (search) map.set('search_query', search);
        if (date[0]) map.set('start_date', customizeDate(date[0]));
        if (date[1]) map.set('end_date', customizeDate(date[1]));
        if (status.value) map.set('status', status.value);
        if (is_affiliate.label) map.set('is_affiliate', is_affiliate.value);
      }
      if (action.payload === 'orders') {
        if (search) map.set('search_query', search);
        if (date[0]) map.set('start_date', customizeDate(date[0]));
        if (date[1]) map.set('end_date', customizeDate(date[1]));
        if (user.value) map.set('affiliate_id', user.value);
        if (market.value) map.set('market', market.value);
        if (source.label) map.set('source', source.value);
      }
      if (action.payload === 'positions') {
        if (search) map.set('search_query', search);
        if (date[0]) map.set('start_date', customizeDate(date[0]));
        if (date[1]) map.set('end_date', customizeDate(date[1]));
        if (market.value) map.set('market', market.value);
        map.set('date_filled', 'updated_at');
      }
      if (action.payload === 'affiliate') {
        if (search) map.set('search_query', search);
        if (date[0]) map.set('start_date', customizeDate(date[0]));
        if (date[1]) map.set('end_date', customizeDate(date[1]));
      }
      if (action.payload === 'reports') {
        if (range.value) map.set('range', range.value);
      }
      state.request_body = JSON.stringify(Object.fromEntries(map));
    },
    resetAffiliateUsers: (state) => {
      state.affiliate_users_drop_down = initialData;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getAllBots.fulfilled, (state, action) => {
      state.bots = action.payload;
    });
    builders.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builders.addCase(getUserBalance.fulfilled, (state, action) => {
      state.user_balance = action.payload;
    });
    builders.addCase(getAdminOpenTraders.fulfilled, (state, action) => {
      state.open_traders = action.payload;
    });
    builders.addCase(fetchAdminPositions.fulfilled, (state, action) => {
      state.positions = action.payload;
    });
    builders.addCase(getDashboardStatistics.fulfilled, (state, action) => {
      state.statistics = action.payload;
    });
    builders.addCase(fetchTopTraders.fulfilled, (state, action) => {
      state.top_traders = action.payload;
    });
    builders.addCase(getAdminOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builders.addCase(fetchAdminAffiliates.fulfilled, (state, action) => {
      state.affiliates = action.payload;
    });
    builders.addCase(fetchAdminMarkets.fulfilled, (state, action) => {
      state.markets = action.payload;
    });
    builders.addCase(fetchAdminMarketsIncome.fulfilled, (state, action) => {
      state.reports = action.payload;
    });
    builders.addCase(fetchUsersAffiliates.fulfilled, (state, action) => {
      if (action.payload.search) {
        state.affiliate_users_drop_down = action.payload.data;
      } else {
        state.affiliate_users_drop_down = {
          ...action.payload.data,
          data: [
            ...state.affiliate_users_drop_down.data,
            ...action.payload.data.data,
          ],
        };
      }
    });
    builders.addCase(returnAdminBack.fulfilled, (state, action) => {
      state.logged_in_as = false;
      state.back_token = '';
    });
    builders.addCase(loginAsUser.fulfilled, (state, action) => {
      state.logged_in_as = action.payload.token;
      state.back_token = action.payload.back_token;
      state.admin_id = action.payload.admin_id;
    });
  },
});

export const { changeFilters, createRequestBody, resetAffiliateUsers } =
  admin.actions;
