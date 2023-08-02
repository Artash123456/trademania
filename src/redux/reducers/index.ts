import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
//----------------------------------------------------------------------------------------
import { dashboard } from './dashboard';
import { translation } from './translations';
import { settings } from './settings';
import { styles } from './styles';
import { modal } from './modal';
import { signal } from './signal';
import { markets } from './markets';
import { bot } from './bot';
import { admin } from './admin';
import { manual } from './manual';
import { spot } from './spot';
import { copy } from './copy';
import { loading } from './loading';
import { wallet } from './wallet';
import { notifications } from './notifications';
import { affiliate } from './affiliate';
import { user } from './user';
import { navigation } from './navigation';
import { EncriptionService } from 'context';

const combinedReducer = combineReducers({
  admin: admin.reducer,
  affiliate: affiliate.reducer,
  bot: bot.reducer,
  copy: copy.reducer,
  dashboard: dashboard.reducer,
  loading: loading.reducer,
  manual: manual.reducer,
  markets: markets.reducer,
  modal: modal.reducer,
  navigation: navigation.reducer,
  notifications: notifications.reducer,
  settings: settings.reducer,
  signal: signal.reducer,
  spot: spot.reducer,
  styles: styles.reducer,
  translation: translation.reducer,
  wallet: wallet.reducer,
  user: user.reducer,
});

const reducer = (state: any, action: any) => {
  if (action.type === 'handleLogout/fulfilled') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({ reducer });
store.subscribe(() => {
  const state = store.getState();
  if (state) {
    localStorage.setItem(
      'state',
      EncriptionService.encrypt(JSON.stringify(state))
    );
  }
});
