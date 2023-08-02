import { createSlice } from '@reduxjs/toolkit';
import { customizeDate, loadStore } from 'context';
import {
  generateLink,
  getAffiliateStatistics,
  getMyAffiliateOrdersAndEarnings,
  getMyAffiliates,
} from 'redux/actions/affiliate_actions';

import { AffiliateState } from 'types';
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

const initialState: AffiliateState = {
  referrer_link: '',
  my_affiliates: initialData,
  my_affiliate_orders: initialData,
  filters: {
    search: '',
    market: {
      label: '',
      value: '',
    },
    date: [null, null],
    user: {
      label: '',
      value: '',
    },
  },
  statistics: { referrals_count: 0, refer_bonus_rate: 0 },
  request_body: '{}',
};
const initial: AffiliateState = loadStore('affiliate', initialState);

export const affiliate = createSlice({
  name: 'affiliate',
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
      const { date, search, market, user } = state.filters;
      const map = new Map();
      if (action.payload === 'referrals') {
        if (search) map.set('search_query', search);
        if (date[0]) map.set('start_date', customizeDate(date[0]));
        if (date[1]) map.set('end_date', customizeDate(date[1]));
      }
      if (action.payload === 'orders-earnings') {
        if (search) map.set('search_query', search);
        if (date[0]) map.set('start_date', customizeDate(date[0]));
        if (date[1]) map.set('end_date', customizeDate(date[1]));
        if (market.value) map.set('market', market.value);
        if (user.value) map.set('user_id', user.value);
      }
      state.request_body = JSON.stringify(Object.fromEntries(map));
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getMyAffiliates.fulfilled, (state, action) => {
      state.my_affiliates = action.payload;
    });

    builders.addCase(
      getMyAffiliateOrdersAndEarnings.fulfilled,
      (state, action) => {
        if (action.payload) state.my_affiliate_orders = action.payload;
      }
    );
    builders.addCase(getAffiliateStatistics.fulfilled, (state, action) => {
      state.statistics = action.payload;
    });
    builders.addCase(generateLink.fulfilled, (state, action) => {
      state.referrer_link =
        window.location.origin + `/register?affiliate_token=${action.payload}`;
    });
  },
});
export const { changeFilters, createRequestBody } = affiliate.actions;
