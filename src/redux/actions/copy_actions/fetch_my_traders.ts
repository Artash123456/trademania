import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getMyTraders = createAsyncThunk('getMyTraders', async ({ isDemo }:{ isDemo?:boolean }) => {
  const { data } = await axios('/api/my-traders', {params:{
      is_demo: isDemo ? true : undefined
    }});
  return data?.data;
});
