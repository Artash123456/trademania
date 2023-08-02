import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAddress = createAsyncThunk('getAddress', async () => {
  const { data } = await axios.post('/api/get-address')
  return data.data
})
