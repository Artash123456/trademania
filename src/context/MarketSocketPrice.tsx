import {
  PhemexSocketPrice,
  BinaneSocketPrice,
  BybitSocketPrice,
  BitgetSocketPrice,
  OkxSocketPrice,
  KrakenSocketPrice,
} from 'context';
import { PairTypes } from 'types';
import { BitmexSocketPrice } from './BitmexSocketPrice';
export const MarketSocketPrice = (market: string, symbol: PairTypes) => {
  if (!market || !symbol) return { price: 0, percent: 0 };
  if (market === 'binance') {
    const { price } = BinaneSocketPrice(symbol);
    return { price };
  }
  if (market === 'bybit') {
    const { price, percent } = BybitSocketPrice(symbol.value);
    return { price, percent };
  }
  if (market === 'phemex') {
    const { price, percent } = PhemexSocketPrice(symbol.value);
    return { price, percent };
  }
  if (market === 'demo') {
    const { price } = BinaneSocketPrice(symbol);
    return { price };
  }
  if (market === 'bitget') {
    const { price } = BitgetSocketPrice(symbol);
    return { price };
  }
  if (market === 'kraken') {
    const { price } = KrakenSocketPrice(symbol);
    return { price };
  }
  if (market === 'okx') {
    const { price } = OkxSocketPrice(symbol.value);
    return { price };
  }
  if (market === 'bitmex') {
    const { price } = BitmexSocketPrice(symbol.value);
    return { price };
  }
  return { price: 0, percent: 0 };
};
