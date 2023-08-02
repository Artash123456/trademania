import axios from 'axios';
import { storeSocketPrice } from '../trading_actions/store_socket_price';
import { Dispatch } from 'types';

export const fetchMarketPrice =
  (market: string, symbol: string) => async (dispatch: Dispatch) => {
    if (!market || !symbol) return;
    if (market === 'binance') {
      await axios(
        `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`,
        { withCredentials: false }
      ).then((res) => dispatch(storeSocketPrice(res?.data.price)));
    }
    if (market === 'bybit') {
      await axios(
        `https://api.bybit.com/spot/quote/v1/ticker/24hr?symbol=${symbol}`,
        { withCredentials: false }
      ).then((res) => dispatch(storeSocketPrice(res?.data?.result?.lastPrice)));
    }
    if (market === 'phemex') {
      await axios(
        `https://api.phemex.com/md/spot/ticker/24hr?symbol=${symbol}`,
        {
          withCredentials: false,
        }
      ).then((res) =>
        dispatch(storeSocketPrice(+res?.data?.result?.lastEp / 10000))
      );
    }
  };
