import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const cancelOrder = createAsyncThunk(
  'cancelOrder',
  async ({
    market,
    symbol,
    order_no,
    plan_type,
    currency,
    quote,
  }: {
    symbol: string;
    order_no: string;
    market: number;
    plan_type?: string;
    currency?: string;
    quote?: string;
  }) => {
    await axios.post(`/api/cancel-order`, {
      symbol,
      order_id: order_no,
      market,
      plan_type,
      currency,
      quote,
    });
    return order_no;
  }
);
