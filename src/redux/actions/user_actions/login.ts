import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { getUser, isElectron } from 'redux/actions/user_actions';

interface Values {
  email: string;
  password: string;
}

export const handleLogin = createAsyncThunk(
  'handleLogin',
  async (
    {
      values,
      navigate,
      setErrors,
    }: {
      values: Values;
      navigate: NavigateFunction;
      setErrors: Function;
    },
    { dispatch }
  ) => {
    dispatch({ type: 'LOADING', payload: { login: true } });
    try {
      if (!isElectron()) {
        return await axios
          .post('/login', values)
          .then((response) => {
            if (response) {
              if (response.data.two_factor) {
                navigate('/two-factor');
              } else {
                dispatch(getUser()).catch((error) => {
                  if (error?.response?.status === 403) {
                    navigate('/verify-email');
                  }
                });
              }
            }
          })
          .catch((error) => {
            setErrors(error?.response?.data?.errors);
          });
      } else {
        const { data } = await axios
          .post('/api/m-login', values)
          .then(({ data }) => {
            if (data) {
              axios.defaults.headers.common[
                'Authorization'
              ] = `Bearer ${data?.data?.access_token}`;
              if (data?.data?.two_factor_confirmed) {
                navigate('/two-factor');
              }
              if (!Boolean(data?.data?.email_verified)) {
                navigate('/verify-email');
              }
            }
            return data;
          })
          .catch((error) => {
            setErrors(error?.response?.data?.errors);
          });
        return data;
      }
    } finally {
      dispatch({ type: 'LOADING', payload: { login: false } });
    }
  }
);
