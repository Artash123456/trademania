import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { openModal } from 'redux/actions/other_actions';
import { FormikValues } from 'formik';
import { isElectron } from '../user_actions';
import { got401status } from 'redux/reducers/user';

export const deleteAccount = createAsyncThunk(
  'deleteAccount',
  async (values: FormikValues, { dispatch }) => {
    try {
      if (isElectron()) {
        return await axios
          .post('/api/m-confirm-password', values)
          .then(() =>
            axios.post('/api/user/delete').then(() => dispatch(got401status()))
          );
      } else {
        return await axios.post('/user/confirm-password', values).then(() =>
          axios.post('/api/user/delete').then(() => {
            dispatch(got401status());
            localStorage.removeItem('state');
          })
        );
      }
    } finally {
      dispatch(openModal('delete_account'));
    }
  }
);
