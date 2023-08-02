import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const saveTronPrivateKey = createAsyncThunk(
  'saveTronPrivateKey',
  async ({ tron_private_key }: { tron_private_key: string }, { dispatch }) => {
    dispatch({
      type: 'LOADING',
      payload: { tron_private_key_loading: true },
    })
    try {
      const { data } = await axios.post(`/admin/api/save-tron-private-key`, {
        tron_private_key,
      })
      return data?.data.data
    } finally {
      dispatch({
        type: 'LOADING',
        payload: { tron_private_key_loading: false },
      })
    }
  }
)
