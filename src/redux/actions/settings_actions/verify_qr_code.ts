import axios from 'axios';
import { getUser, isElectron } from 'redux/actions/user_actions';
import { openModal } from 'redux/actions/other_actions';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const verifyQrCode = createAsyncThunk(
  'verifyQrCode',
  async (code: string | number, { dispatch }) => {
    dispatch({ type: 'LOADING', payload: { verify_qr: true } });
    try {
      if (isElectron()) {
        return await axios
          .post('/api/m-confirmed-two-factor-authentication', { code })
          .then(() => {
            dispatch(openModal('activate_qr_code'));
            dispatch(getUser());
          });
      } else {
        return await axios
          .post('/user/confirmed-two-factor-authentication', { code })
          .then(() => {
            dispatch(getUser());
            dispatch(openModal('activate_qr_code'));
          });
      }
    } finally {
      dispatch({ type: 'LOADING', payload: { verify_qr: false } });
    }
  }
);
