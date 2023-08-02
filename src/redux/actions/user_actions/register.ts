import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
interface Values {
  email: string;
  password: string;
  password_confirmation: string;
  terms_accepted: boolean;
}

export const handleRegister = createAsyncThunk(
  'handleRegister',
  async (
    {
      values,
      setErrors,
      navigate,
      affiliate_token,
    }: {
      values: Values;
      setErrors: Function;
      navigate: NavigateFunction;
      affiliate_token: string | (string | null)[] | null;
    },
    { dispatch }
  ) => {
    return await axios
      .post('/register', { ...values, affiliate_token })
      .then((response) => {
        if (response && response?.status === 201) {
          navigate('/verify-email', { state: values?.email });
        }
      })
      .catch((error) => {
        setErrors(error?.response?.data?.errors);
      })
      .finally(() =>
        dispatch({ type: 'LOADING', payload: { register: false } })
      );
  }
);
