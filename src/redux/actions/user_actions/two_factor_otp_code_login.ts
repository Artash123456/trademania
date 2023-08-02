import axios from 'axios';
import { getUser, isElectron } from 'redux/actions/user_actions';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';

export const loginForTwoFactorUsers = createAsyncThunk(
  'loginForTwoFactorUsers',
  async (
    {
      code,
      navigate,
    }: {
      code: FormData;
      navigate: NavigateFunction;
    },
    { dispatch }
  ) => {
    dispatch({ type: 'LOADING', payload: { two_factor_login: true } });
    try {
      if (isElectron()) {
        return await axios
          .post('/api/m-two-factor-challenge', code)
          .then(async () => {
            return await dispatch(getUser()).then(() => {
              navigate('/');
              dispatch({
                type: 'LOADING',
                payload: { two_factor_login: false },
              });
            });
          });
      } else {
        return await axios
          .post('/two-factor-challenge', code)
          .then(async () => {
            await dispatch(getUser()).then(() => {
              navigate('/');
              dispatch({
                type: 'LOADING',
                payload: { two_factor_login: false },
              });
            });
          });
      }
    } finally {
      dispatch({ type: 'LOADING', payload: { two_factor_login: false } });
    }
  }
);
