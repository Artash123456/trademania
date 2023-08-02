import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

interface Values {
  password: string;
  password_confirmation: string;
}

export const handleResetPassword = createAsyncThunk(
  'handleResetPassword',
  async (
    {
      values,
      email,
      token,
      navigate,
    }: {
      values: Values;
      email: string | (string | null)[] | null;
      token: string | (string | null)[] | null;
      navigate: NavigateFunction;
    },
    { dispatch }
  ) => {
    dispatch({ type: 'LOADING', payload: { reset_password: true } });
    try {
      return await axios
        .post('/reset-password', {
          password: values.password,
          password_confirmation: values.password_confirmation,
          email,
          token,
        })
        .then((res) => {
          if (res) navigate('/');
        });
    } finally {
      dispatch({
        type: 'LOADING',
        payload: { reset_password: false },
      });
    }
  }
);
