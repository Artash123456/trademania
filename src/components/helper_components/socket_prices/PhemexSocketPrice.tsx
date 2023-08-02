import { FC, useEffect, useState } from 'react';
import ShowData from './ShowData';

const PhemexSocketPrice: FC<{ symbol: string }> = ({ symbol }) => {
  const [price, setPrice] = useState<string | number>('-');
  const [percent, setPercent] = useState<string | number>('-');

  let id = 1;
  useEffect(() => {
    let mounted = true;
    const ws = new WebSocket('wss://phemex.com/ws');
    if (mounted) {
      ws.onopen = function () {
        ws.send(
          JSON.stringify({
            method: 'kline.subscribe',
            params: [symbol, 86400],
            id: id,
          })
        );
      };
      ws.onmessage = ({ data }) => {
        const info = JSON.parse(data);
        if (info && info.type === 'incremental') {
          setPrice(info?.kline[0][6] / 100000000);
          setPercent(
            Number(
              (info?.kline[0][2] /
                100000000 /
                (info?.kline[0][6] / 100000000)) *
                100 -
                100
            )?.toFixed(2)
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

export default PhemexSocketPrice;
