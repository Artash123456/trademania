import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchTransactions = createAsyncThunk('fetchTransactions', async ({page}:{page?:number}) => {
    const { data } = await axios.post('/api/user-transactions', { page })
    return data.data
})
