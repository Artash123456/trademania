import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { storeSocketPrice } from 'redux/actions/trading_actions';

export const fetchManualMarketPrice = createAsyncThunk(
  'fetchManualMarketPrice',
  async ({ market_id, symbol }: { market_id: number; symbol: string }, { dispatch }) => {
    if (market_id === 2) {
      await axios(
        `https://fapi.binance.com/fapi/v1/ticker/24hr?symbol=${symbol}`,
        { withCredentials: false }
      )
        .then((res) => dispatch(storeSocketPrice(res?.data.price)))
        .catch(async () => {
          await axios(
            `https://dapi.binance.com/dapi/v1/ticker/24hr?symbol=${symbol}_PERP`,
            { withCredentials: false }
          ).then((res) => dispatch(storeSocketPrice(res?.data.lastPrice)));
        });
    }
    if (market_id === 1) {
      await axios(`https://api.bybit.com/v2/public/tickers?symbol=${symbol}`, {
        withCredentials: false,
      }).then((res) =>
        dispatch(storeSocketPrice(res?.data?.result?.[0]?.mark_price))
      );
    }
    if (market_id === 3) {
      await axios(`https://api.phemex.com/md/ticker/24hr?symbol=${symbol}`, {
        withCredentials: false,
      }).then((res) =>
        dispatch(storeSocketPrice(+res?.data?.result?.markPrice / 10000))
      );
    }
  }
);
