import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Data {
  discord_id?: string;
  last_name?: string;
  first_name?: string;
  email?: string;
  user_name?: string;
}

export const changeNameEmail = createAsyncThunk(
  'changeNameEmail',
  async (
    {
      values,
      id,
      setErrors,
    }: { values: Data; id: string; setErrors: Function },
    { dispatch }
  ) => {
    dispatch({ type: 'LOADING', payload: { profile_information: true } });
    const { first_name, last_name, email } = values;
    const { data } = await axios
      .put(`/api/user/${id}`, {
        first_name,
        last_name,
        email,
      })
      .catch((error) => setErrors(error?.response?.data?.errors))
      .finally(() =>
        dispatch({ type: 'LOADING', payload: { profile_information: false } })
      );
    return data.data;
  }
);
