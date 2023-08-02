import { createSlice } from '@reduxjs/toolkit';
import { NotificationState } from 'types';
import {
  fetchAllNotifications,
  fetchUnreadNotifications,
  markAsRead,
  openNotifications,
  removeNotification,
} from 'redux/actions/notification_actions';
import { loadStore, DateC } from 'context';

const initialState: NotificationState = {
  notifications: [],
  notifications_default: [],
  unread_notifications: [],
  count: 0,
  notifications_opened: false,
  filter: [
    { name: 'View all', active: true },
    { name: 'Viewed', active: false },
    { name: 'Not viewed', active: false },
  ],
};
const initial: NotificationState = loadStore('notifications', initialState);

export const notifications = createSlice({
  name: 'notifications',
  initialState: initial,
  reducers: {
    filterNotifications: (state, action) => {
      for (let i of state.filter) {
        i.active = i.name === action.payload;
      }
      if (action.payload === 'View all') {
        state.notifications = state.notifications_default;
      } else if (action.payload === 'Viewed') {
        state.notifications = state.notifications_default.filter(
          (item) => item.read_at
        );
      } else {
        state.notifications = state.notifications_default.filter(
          (item) => !item.read_at
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUnreadNotifications.fulfilled, (state, action) => {
      state.count = action.payload.count;
      state.unread_notifications = action.payload.data;
    });
    builder.addCase(markAsRead.fulfilled, (state, action) => {
      for (let item of state.notifications) {
        if (item.id === action.payload) {
          item.read_at = DateC.DateMYD(new Date());
        }
      }
      state.count = state.count - 1;
    });
    builder.addCase(removeNotification.fulfilled, (state, action) => {
      state.notifications = state.notifications.filter(
        (item) => item.id !== action.payload
      );
    });
    builder.addCase(fetchAllNotifications.fulfilled, (state, action) => {
      if (action.payload.filter_type === 'scroll') {
        state.notifications = [...state.notifications, ...action.payload.data];
        state.notifications_default = [
          ...state.notifications_default,
          ...action.payload.data,
        ];
      } else {
        state.notifications = action.payload.data;
        state.notifications_default = action.payload.data;
      }
    });
    builder.addCase(openNotifications.fulfilled, (state) => {
      state.count = 0;
      state.notifications_opened = true;
    });
  },
});
export const { filterNotifications } = notifications.actions;
