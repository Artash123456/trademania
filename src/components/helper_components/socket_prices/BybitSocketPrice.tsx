import { FC, useState, useEffect } from 'react';
import ShowData from './ShowData';

const BybitSocketPrice: FC<{ symbol: string }> = ({ symbol }) => {
  const [price, setPrice] = useState<string | number>('-');
  const [percent, setPercent] = useState<string | number>('-');

  let id = 1;
  useEffect(() => {
    let mounted = true;
    const ws = new WebSocket('wss://stream.bybit.com/spot/quote/ws/v2');
    if (mounted) {
      ws.onopen = function () {
        ws.send(
          JSON.stringify({
            topic: 'realtimes',
            event: 'sub',
            params: {
              symbol: symbol,
              binary: false,
            },
          })
        );
      };
      ws.onmessage = ({ data }) => {
        const info = JSON.parse(data);
        if (info?.data) {
          setPrice(info.data.c);
          setPercent(info.data.m);
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
  }, [symbol, id]);
  return <ShowData price={price} percent={percent} />;
};

export default BybitSocketPrice;
