import { FC, useState, useEffect } from 'react';
import ShowData from './ShowData';

const OkxSocketPrice: FC<{ symbol: string }> = ({ symbol }) => {
  const [price, setPrice] = useState<string | number>('-');
  const [percent, setPercent] = useState<string | number>('-');

  let id = 1;
  useEffect(() => {
    let mounted = true;
    const ws = new WebSocket('wss://ws.okx.com:8443/ws/v5/public');
    if (mounted) {
      ws.onopen = function () {
        ws.send(
          JSON.stringify({
            op: 'subscribe',
            args: [
              {
                channel: 'tickers',
                instId: symbol,
              },
            ],
          })
        );
      };
      ws.onmessage = ({ data }) => {
        const info = JSON.parse(data);
        if (info.data?.[0]) {
          setPrice(parseFloat(info.data[0]?.last));
          setPercent(
            Number(
              100 - (info.data[0]?.high24h / info.data[0].low24h) * 100
            ).toFixed(3)
          );
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

export default OkxSocketPrice;
