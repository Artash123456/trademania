import { loadStore } from 'context';
import { createSlice } from '@reduxjs/toolkit';
import {
  checkByToken,
  createAddress,
  getAddress,
  getUser,
  handleLogout,
  fetchTransactions,
  refreshTransactionBalance,
  loginWithFacebook,
  loginWithGoogle,
  handleLogin,
  loginForTwoFactorUsers,
} from 'redux/actions/user_actions';
import { becomeAffiliate } from 'redux/actions/affiliate_actions';
import { changeNameEmail } from 'redux/actions/settings_actions';
import axios from 'axios';
let initialState = {
  is_authenticated: false,
  data: {
    affiliate_accepted: false,
    two_factor_confirmed: false,
    picture: '',
    first_name: '',
    last_name: '',
    email: '',
    id: '',
    tradingview_name: '',
    discord_id: '',
    copy_accepted: false,
  },
  device_token: '',
  access_token: '',
  two_step_login: false,
  social_token: '',
  social_type: '',
  balance: 0,
  transaction_address: '',
  transactions: {
    data: [],
    current_page: 0,
    next_page_url: '',
    path: '',
    per_page: 0,
    prev_page_url: '',
    to: 0,
    total: 0,
    last_page: 0,
  },
  next_refresh_balance: 0,
};
const initial = loadStore('user', initialState);

export const user = createSlice({
  name: 'user',
  initialState: initial,
  reducers: {
    countDownRefreshBalance: (state) => {
      if (state.next_refresh_balance > 0)
        state.next_refresh_balance = state.next_refresh_balance - 1;
    },
    got401status(state) {
      delete axios.defaults.headers.common['Authorization'];
      state.is_authenticated = false;
      state.access_token = null;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(handleLogout.pending, (state) => {
      state.is_authenticated = false;
      state.access_token = null;
    });
    builders.addCase(handleLogout.fulfilled, (state) => {
      state.is_authenticated = false;
      state.access_token = null;
    });

    builders.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.access_token = action.payload?.access_token;
        state.data = action.payload;
        state.is_authenticated = true;
      }
    });

    builders.addCase(handleLogin.fulfilled, (state, action) => {
      if (
        action.payload &&
        !action.payload?.two_factor_confirmed &&
        action.payload?.email_verified
      ) {
        state.access_token = action.payload?.access_token;
        state.data = action.payload;
        state.is_authenticated = true;
      }
    });
    builders.addCase(loginWithFacebook.fulfilled, (state, action) => {
      if (action.payload) {
        state.access_token = action.payload?.access_token;
        state.is_authenticated = true;
        state.data = action.payload;
      }
    });
    builders.addCase(loginWithGoogle.fulfilled, (state, action) => {
      if (action.payload) {
        state.access_token = action.payload?.access_token;
        state.is_authenticated = true;
        state.data = action.payload;
      }
    });
    builders.addCase(becomeAffiliate.fulfilled, (state) => {
      state.data.affiliate_accepted = true;
    });
    builders.addCase(changeNameEmail.fulfilled, (state, action) => {
      if (action.payload) state.data = action.payload;
    });
    builders.addCase(checkByToken.fulfilled, (state, action) => {
      if (action.payload) {
        state.social_token = action.payload?.token;
        state.social_type = action.payload?.social_type;
      }
    });
    builders.addCase(createAddress.fulfilled, (state, action) => {
      state.balance = action.payload.balance;
      state.data.transaction_address = action.payload.address;
      state.transaction_address = action.payload.address;
    });
    builders.addCase(getAddress.fulfilled, (state, action) => {
      state.balance = action.payload.balance;
      state.transaction_address = action.payload.address;
    });
    builders.addCase(fetchTransactions.fulfilled, (state, action) => {
      if (action.payload) state.transactions = action.payload;
    });
    builders.addCase(refreshTransactionBalance.fulfilled, (state, action) => {
      state.next_refresh_balance = action.payload?.next
        ? action.payload?.next
        : 0;
    });
  },
});
export const { got401status, countDownRefreshBalance } = user.actions;
