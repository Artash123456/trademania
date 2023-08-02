import axios from 'axios';
import { openModal } from 'redux/actions/other_actions';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { getDeviceToken } from 'context/firebase';
// import { saveFirebaseToken } from './save_user_firebase_token';

export const getUser = createAsyncThunk('getUser', async (_, { dispatch }) => {
  if (
    !window.location.hash.startsWith('#/settings') &&
    !window.location.pathname.startsWith('/settings')
  ) {
    dispatch({ type: 'LOADING', payload: { get_user: true } });
  }
  try {
    return await axios('/api/user').then(({ data }) => {
      if (data) {
        if (!data?.data?.copy_accepted) dispatch(openModal('copy_warning'));
        // getDeviceToken().then((token) =>
        //   dispatch(saveFirebaseToken({ token, user_id: data?.data.id }))
        // );

        return data?.data;
      }
    });
  } finally {
    dispatch({ type: 'LOADING', payload: { get_user: false } });
  }
});
