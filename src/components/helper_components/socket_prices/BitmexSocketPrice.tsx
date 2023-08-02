import { FC, useState, useEffect } from 'react';
import ShowData from './ShowData';

const BitmexSocketPrice: FC<{ symbol: string }> = ({ symbol }) => {
  const [price, setPrice] = useState<string | number>('-');
  const [percent, setPercent] = useState<string | number>('-');
  let id = 1;
  useEffect(() => {
    let mounted = true;
    const ws = new WebSocket('wss://ws.bitmex.com/realtime');
    if (mounted) {
      ws.onopen = function () {
        ws.send(
          JSON.stringify({
            op: 'subscribe',
            args: [`instrument:${symbol}`],
          })
        );
      };
      ws.onmessage = ({ data }) => {
        const info = JSON.parse(data);
        if (info?.data) {
          setPrice(info?.data?.[0]?.markPrice);
          setPercent(info?.data?.[0]?.lastChangePcnt);
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

export default BitmexSocketPrice;
