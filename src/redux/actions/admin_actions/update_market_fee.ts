import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Props {
  market_id: number;
  leverage_fee: number;
  spot_fee: number;
  open_input: boolean;
}
export const updateMarketFee = createAsyncThunk(
  'updateMarketFee',
  async ({ values }: { values: Props }) => {
    const { data } = await axios.post('/admin/api/update-market-fees', {
      market_id: values.market_id,
      spot_fee: values.spot_fee,
      leverage_fee: values.leverage_fee,
    });
    return data?.data;
  }
);
