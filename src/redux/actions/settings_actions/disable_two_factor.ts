import { FormikValues } from 'formik';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { openModal } from 'redux/actions/other_actions';
import { getUser } from 'redux/actions/user_actions';

export const disableTwoFactor = createAsyncThunk(
  'disableTwoFactor',
  async (values: FormikValues, { dispatch }) => {
    return await axios.post('/user/confirm-password', values).then(() => {
      dispatch(openModal('confirm_password'));
      axios.delete('/api/user/two-factor-authentication').then(() => {
        dispatch(getUser());
      });
    });
  }
);
