import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from './get_user_data';
import { AlternativeAuthProps } from 'types';
import { openDesktopApp } from './open_desktop_app';

export const loginWithGoogle = createAsyncThunk(
  'loginWithGoogle',
  async (
    {
      token,
      affiliate_token,
      password,
      password_confirmation,
    }: AlternativeAuthProps,
    { dispatch }
  ) => {
    dispatch({ type: 'LOADING', payload: { login: true } });
    try {
      if (token) {
        return await axios
          .post('/auth/google/callback', {
            token,
            affiliate_token: affiliate_token ? affiliate_token : undefined,
            password: password ? password : undefined,
            password_confirmation: password_confirmation
              ? password_confirmation
              : undefined,
          })
          .then(({ data }) => {
            if (data) {
              if (data?.data?.access_token) {
                axios.defaults.headers.common[
                  'Authorization'
                ] = `Bearer ${data?.data?.access_token}`;
                if (window.location.pathname === '/google')
                  openDesktopApp(data.data.access_token);
                dispatch(getUser());
              }
              return data?.data;
            }
          });
      }
    } finally {
      dispatch({ type: 'LOADING', payload: { login: false } });
      dispatch({ type: 'LOADING', payload: { logout: false } });
    }
  }
);
