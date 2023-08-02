import { createSlice } from '@reduxjs/toolkit';
import {
  deleteBrowserSessions,
  fetchBrowserSessions,
  fetchCredentials,
  fetchUserAvatars,
  getTradeAccountDetails,
  setMyProfilePublic,
  twoFactor,
  deleteSubAccount,
  fetchSubAccountCustomers,
} from 'redux/actions/settings_actions';
import { getUser } from 'redux/actions/user_actions';
import { SettingsState } from 'types';
import { loadStore } from 'context';

const initialState = {
  qr_svg: '',
  deviceSessions: [],
  open_for_subscription: 0,
  tradeAccountInitialValues: {
    nickname: '',
    description: '',
    trade_type: '',
    market_pairs: {},
  },
  showInModal: {
    id: 0,
    market_id: 0,
    user_id: 0,
    api_key: ' string',
    private_key: ' string',
    status: 0,
    created_at: '',
    updated_at: '',
    market: {},
  },
  avatars: [],
  customers: {
    subaccounts: [],
    my_credentials: {
      user: {
        first_name: '',
        last_name: '',
      },
      api_key: '',
    },
  },
};
const initial: SettingsState = loadStore('settings', initialState);

export const settings = createSlice({
  name: 'settings',
  initialState: initial,
  reducers: {
    changeCopyValues: (state, action) => {
      state.tradeAccountInitialValues = action.payload;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(getUser.fulfilled, (state, action) => {
      state.open_for_subscription = action.payload?.open_for_subscription;
    });
    builders.addCase(fetchCredentials.fulfilled, (state, action) => {
      state.showInModal = action.payload;
    });

    builders.addCase(setMyProfilePublic.fulfilled, (state, action) => {
      state.open_for_subscription = action.payload;
    });
    builders.addCase(getTradeAccountDetails.fulfilled, (state, action) => {
      if (action.payload) state.tradeAccountInitialValues = action.payload;
    });
    builders.addCase(twoFactor.fulfilled, (state, action) => {
      state.qr_svg = action.payload;
    });
    builders.addCase(fetchBrowserSessions.fulfilled, (state, action) => {
      state.deviceSessions = action.payload;
    });
    builders.addCase(deleteBrowserSessions.fulfilled, (state) => {
      state.deviceSessions = state.deviceSessions.filter(
        (elem) => elem.is_current_device
      );
    });
    builders.addCase(fetchUserAvatars.fulfilled, (state, action) => {
      state.avatars = action.payload;
    });
    builders.addCase(fetchSubAccountCustomers.fulfilled, (state, action) => {
      state.customers = action.payload.data;
    });
    builders.addCase(deleteSubAccount.fulfilled, (state, action) => {
      state.customers = {
        ...state.customers,
        subaccounts: state.customers.subaccounts.filter(
          (elem) => elem.id !== action.payload
        ),
      };
    });
  },
});

export const { changeCopyValues } = settings.actions;
