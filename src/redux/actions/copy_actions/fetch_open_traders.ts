import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const getOpenTraders = createAsyncThunk('getOpenTraders', async ({ isDemo }:{ isDemo?:boolean }) => {
  const { data } = await axios('/api/open-traders', {params:{
      is_demo: isDemo ? true : undefined
    }});
  return data?.data;
});
