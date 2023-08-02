import { createSlice } from '@reduxjs/toolkit';
import { openModal } from 'redux/actions/other_actions';
import { handleLogout } from 'redux/actions/user_actions';
import { ModalState } from 'types';
import { deepCopy } from '../../context';
const initialState: ModalState = {
  types: {
    exchanges: false,
    dashboard_items: false,
    signal_follow: false,
    copy_warning: false,
    create_bot_trading: false,
    follow_settings: false,
    confirm_password: false,
    activate_qr_code: false,
    log_out_from_other_browsers: false,
    delete_account: false,
    manual_limit_market: false,
    take_profit_stop_loss: false,
    copy_follow: false,
    copy_user_info: false,
    copy_rate_user: false,
    bot_info_modal: false,
    spot_bot_info_modal: false,
    spot_items: false,
    show_trading_chart: false,
    view_trader_positions: false,
    copy_unfollow_warning: false,
    settings_become_private: false,
    admin_edit_user: false,
    admin_create_user: false,
    admin_copy_followers: false,
    admin_show_trader_info: false,
    admin_followers: false,
    admin_delete_user: false,
    admin_restore_user: false,
    admin_verify_user: false,
    add_subaccount: false,
    add_balance: false,
    bot_positions: false,
  },
  isOpen: false,
};

export const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeAllModals: (state) => {
      const types = deepCopy(state.types);
      for (let item in types) {
        types[item] = false;
      }
      state.types = types;
      state.isOpen = false;
    },
  },
  extraReducers: (builders) => {
    builders.addCase(handleLogout.fulfilled, (state) => {
      state = initialState;
    });
    builders.addCase(openModal, (state, action) => {
      if (action.payload.type === 'openModal') {
        const obj = { ...state.types };
        for (let i in obj) {
          if (i === action.payload.data) {
            obj[i] = !obj[i];
          }
        }
        const isOpen = Object.keys(obj).some(
          (item) => item !== 'copy_warning' && obj[item]
        );
        state.types = obj;
        state.isOpen = isOpen;
      }
    });
  },
});
export const { closeAllModals } = modal.actions;
