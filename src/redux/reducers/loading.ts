import { createSlice } from '@reduxjs/toolkit';
import { LoadingState } from 'types';
import { loadStore } from 'context';
import { isElectron } from 'redux/actions/user_actions';
const initialState: LoadingState = {
  save_changes: false,
  get_dashboard_widgets: false,
  logout: false,
  two_factor_login: false,
  reset_password: false,
  resend_email: false,
  post_feedback: false,
  stop_loss: false,
  post_credentials: false,
  browser_sessions: false,
  profile_information: false,
  update_password: false,
  copy_warning: false,
  two_factor_activate: false,
  log_out_browser_sessions: false,
  verify_qr: false,
  remove_credentials: false,
  get_user: false,
  fetch_market_savings: false,
  fetch_market_stacking: false,
  copy_table_loading: false,
  spot_list_loading: false,
  my_subscriber_positions: false,
  admin_edit_user_loading: false,
  admin_create_user: false,
  fetch_my_bots: false,
  pending: false,
  tradingview_name_loading: false,
  save_discord_id_loading: false,
  fetch_marketplaces: false,
  check_by_token_loading: false,
  tron_private_key_loading: false,
  refresh_transaction_balance: false,
};
const initial: LoadingState = loadStore('loading', initialState);

export const loading = createSlice({
  name: 'loading',
  initialState: initial,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(
      'LOADING',
      (
        state,
        action: { type: 'LOADING'; payload: { [key: string]: boolean } }
      ) => {
        const key = Object.keys(action.payload)[0];
        state[key] = action.payload[key];
      }
    );
  },
});
