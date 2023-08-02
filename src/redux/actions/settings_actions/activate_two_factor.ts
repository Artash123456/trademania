import { FormikValues } from 'formik';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { openModal } from 'redux/actions/other_actions';
import { isElectron } from '../user_actions';

export const twoFactor = createAsyncThunk(
  'twoFactor',
  async (values: FormikValues, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { two_factor_activate: true } });
    try {
      if (isElectron()) {
        return await axios
          .post('/api/m-confirm-password', values)
          .then(async (res) => {
            if (res.status === 201)
              return await axios
                .post('/api/m-two-factor-authentication')
                .then(async () => {
                  dispatch(openModal('confirm_password'));
                  dispatch(openModal('activate_qr_code'));
                  return await axios('/api/m-two-factor-qr-code').then(
                    (res) => {
                      return res.data.svg.replace(/\\/g, '');
                    }
                  );
                });
          });
      } else {
        return await axios('/sanctum/csrf-cookie').then(() =>
          axios.post('/user/confirm-password', values).then(() => {
            return axios.post('/user/two-factor-authentication').then(() => {
              dispatch(openModal('confirm_password'));
              dispatch(openModal('activate_qr_code'));
              return axios('/user/two-factor-qr-code').then((res) => {
                return res.data.svg.replace(/\\/g, '');
              });
            });
          })
        );
      }
    } finally {
      dispatch({ type: 'LOADING', payload: { two_factor_activate: false } });
    }
  }
);
