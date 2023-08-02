import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUser } from '../user_actions';
import { getMarketplaces } from '../market_actions';
import { NavigateFunction } from 'react-router-dom';
export const returnAdminBack = createAsyncThunk(
  'returnAdminBack',
  async (
    {
      back_token,
      admin_id,
      navigate,
    }: { back_token: string; admin_id?: string; navigate: NavigateFunction },
    { dispatch }
  ) => {
    try {
      dispatch({ type: 'LOADING', payload: { return_admin_back: true } });
      return await axios
        .post('/api/back-to-admin', {
          back_token,
          admin_id,
        })
        .then(() => {
          localStorage.removeItem('state');
          delete axios.defaults.headers.common['Authorization'];
          dispatch(getUser()).then(() => {
            dispatch(getMarketplaces());
            navigate('/admin/users');
          });
        });
    } finally {
      dispatch({ type: 'LOADING', payload: { return_admin_back: false } });
    }
  }
);
