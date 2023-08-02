import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const createAddress = createAsyncThunk('createAddress', async () => {
  const { data } = await axios.post('/api/create-address')
  return data.data
})
