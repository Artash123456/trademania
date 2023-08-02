import { FC } from 'react';
import PhemexSocketPrice from './PhemexSocketPrice';
import BinanceSocketPrice from './BinanceSocketPrice';
import BybitSocketPrice from './BybitSocketPrice';
import BitgetSocketPrice from './BitgetSocketPrice';
import OkxSocketPrice from './OkxSocketPrice';
import KrakenSocketPrice from './KrakenSocketPrice';
import BitmexSocketPrice from './BitmexSocketPrice';

const SocketPriceMarkets: FC<{ symbol: string; market: string }> = ({
  symbol,
  market,
}) => {
  if (market === 'binance' || market === 'demo') {
    return <BinanceSocketPrice symbol={symbol} />;
  }
  if (market === 'bybit') {
    return <BybitSocketPrice symbol={symbol} />;
  }
  if (market === 'phemex') {
    return <PhemexSocketPrice symbol={symbol} />;
  }
  if (market === 'bitget') {
    return <BitgetSocketPrice symbol={symbol} />;
  }
  if (market === 'okx') {
    return <OkxSocketPrice symbol={symbol} />;
  }
  if (market === 'kraken') {
    return <KrakenSocketPrice symbol={symbol} />;
  }
  if (market === 'bitmex') {
    return <BitmexSocketPrice symbol={symbol} />;
  }
  return <></>;
};
export default SocketPriceMarkets;
