import { FC, useState, useEffect } from 'react';
import ShowData from './ShowData';

const BinanceSocketPrice: FC<{ symbol: string }> = ({ symbol }) => {
  const [price, setPrice] = useState<string | number>('-');
  const [percent, setPercent] = useState<string | number>('-');
  useEffect(() => {
    let id = 1;
    let mounted = true;
    const ws = new WebSocket(`wss://fstream.binance.com/stream`);
    if (mounted) {
      id++;
      ws.onopen = function () {
        ws.send(
          JSON.stringify({
            method: 'SUBSCRIBE',
            params: [`${symbol.toLowerCase()}@ticker`],
            id: id,
          })
        );
      };
      ws.onmessage = ({ data }) => {
        const info = JSON.parse(data);
        if (info?.data) {
          setPrice(info.data.c);
          setPercent(info.data.P);
        }
      };
      ws.onclose = (e) => {
        ++id;
        ws.close();
      };
    }
    return () => {
      ws.close();
      mounted = false;
    };
  }, [symbol]);
  return <ShowData price={price} percent={percent} />;
};

export default BinanceSocketPrice;
