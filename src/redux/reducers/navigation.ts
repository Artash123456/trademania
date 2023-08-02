import { createSlice } from '@reduxjs/toolkit';
import { loadStore } from 'context';
import { NavigationState } from 'types';

const initialState = {
  menu: [
    {
      name: 'MENU',
      children: [
        { name: 'Dashboard', path: '/', icon: 'Dashboard' },
        { name: 'Manual Trading', path: '/manual', icon: 'Manual' },
        { name: 'Spot Trading', path: '/spot', icon: 'Spot' },
        {
          name: 'Copy Trading',
          path: '/copy',
          icon: 'Copy',
          ready: import.meta.env.VITE_DEPLOY_MODE === 'development' ? '' : 'no',
        },
        { name: 'Bot Trading', path: '/bot-trading', icon: 'Bot' },
        {
          name: 'Signal trading',
          path: '/signal',
          icon: 'Signal',
          ready: 'no',
        },
        { name: 'Launchpad', path: '/launch', icon: 'Launch', ready: 'no' },
      ],
    },
    {
      name: 'ACCOUNT',
      children: [
        { name: 'Affiliate', path: '/affiliate', icon: 'Affiliate' },
        {
          name: 'Notifications',
          path: '/notifications',
          icon: 'Notification',
          className: 'notifications',
        },
        {
          name: 'Wallet',
          path: '/wallets',
          icon: 'Wallet',
        },
        {
          name: 'Portfolio',
          path: '/portfolio',
          icon: 'Portfolio',
          ready: 'no',
        },
        { name: 'History', ready: 'no', icon: 'History', path: '/history' },
      ],
    },
  ],
  menu_responsive: [
    {
      name: 'Menu',
      icon: 'Burger',
      children: [
        {
          name: 'Account',
          icon: 'Account',
          children: [
            { name: 'Account', path: '/settings/account' },
            { name: 'Security', path: '/settings/safety' },
          ],
        },
        {
          name: 'Administrator',
          icon: 'Admin',
          children: [
            { path: '/admin/dashboard', name: 'dashboard' },
            { path: '/admin/settings', name: 'settings' },
            { path: '/admin/markets', name: 'markets' },
            { path: '/admin/positions', name: 'positions' },
            { path: '/admin/orders', name: 'orders' },
            { path: '/admin/reports', name: 'reports' },
            { path: '/admin/affiliate', name: 'affiliate' },
            { path: '/admin/bots', name: 'bots' },
            { path: '/admin/copy', name: 'copy' },
            { path: '/admin/users', name: 'users' },
          ],
        },
        { name: 'Affiliate', path: '/affiliate', icon: 'Affiliate' },
        { name: 'History', path: '/history', icon: 'History', ready: 'no' },
        {
          name: 'Portfolio',
          path: '/portfolio',
          icon: 'Portfolio',
          ready: 'no',
        },
        {
          name: 'Settings',
          icon: 'Settings',
          children: [
            { name: 'Api Connections', path: '/settings/api-connections' },
            { name: 'Subaccounts', path: '/settings/subaccounts' },
            { name: 'Copy Trading', path: '/settings/copy-trading' },
          ],
        },
      ],
    },
    { name: 'Dashboard', icon: 'Dashboard', path: '/' },
    { name: 'Wallet', icon: 'Wallet', path: '/wallets' },
    {
      name: 'Trade',
      icon: 'Trade',
      children: [
        { name: 'Manual Trading', path: '/manual', icon: 'Manual' },
        {
          name: 'Spot Trading',
          icon: 'Spot',
          children: [
            { name: 'Dashboard', path: '/spot/dashboard' },
            { name: 'Marketplace', path: '/spot/marketplace' },
          ],
        },
        { name: 'Copy Trading', path: '/copy', icon: 'Copy' },
        { name: 'Bot Trading', path: '/bot-trading', icon: 'Bot' },
        {
          name: 'Signal trading',
          path: '/signal',
          icon: 'Signal',
          ready: 'no',
        },
        { name: 'Launchpad', path: '/launch', icon: 'Launch', ready: 'no' },
      ],
    },
    { name: 'Notifications', icon: 'Notification', path: '/notifications' },
  ],
  spot: [
    { name: 'Dashboard', path: '/spot/dashboard' },
    { name: 'Marketplace', path: '/spot/marketplace' },
  ],
  settings: [
    { name: 'Account', path: '/settings/account' },
    { name: 'Security', path: '/settings/safety' },
    { name: 'Api Connections', path: '/settings/api-connections' },
    { name: 'Subaccounts', path: '/settings/subaccounts' },
    { name: 'Copy Trading', path: '/settings/copy-trading' },
  ],
  admin: [
    { path: '/admin/dashboard', name: 'dashboard' },
    { path: '/admin/settings', name: 'settings' },
    { path: '/admin/markets', name: 'markets' },
    { path: '/admin/positions', name: 'positions' },
    { path: '/admin/orders', name: 'orders' },
    { path: '/admin/reports', name: 'reports' },
    { path: '/admin/affiliate', name: 'affiliate' },
    { path: '/admin/bots', name: 'bots' },
    { path: '/admin/copy', name: 'copy' },
    { path: '/admin/users', name: 'users' },
    { path: '/admin/user-balances', name: 'user balance' },
  ],
  is_open: true,
};
const initial: NavigationState = loadStore('navigation', initialState);

export const navigation = createSlice({
  name: 'navigation',
  initialState: initial,
  reducers: {
    openNavigation: (state) => {
      state.is_open = !state.is_open;
    },
  },
});
export const { openNavigation } = navigation.actions;
