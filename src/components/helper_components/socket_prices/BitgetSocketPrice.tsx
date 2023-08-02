import { FC, useState, useEffect } from 'react';
import ShowData from "./ShowData";

const BitgetSocketPrice: FC<{ symbol: string }> = ({ symbol }) => {
  const [price, setPrice] = useState<string | number>('-');
  const [percent, setPercent] = useState<string | number>('-');

  let id = 1;
  useEffect(() => {
    let mounted = true;
    const ws = new WebSocket('wss://ws.bitget.com/spot/v1/stream');
    if (mounted) {
      ws.onopen = function () {
        ws.send(
          JSON.stringify({
            op: 'subscribe',
            args: [
              {
                instType: 'SP',
                channel: 'ticker',
                instId: symbol.split('_')[0],
              },
            ],
          })
        );
      };
      ws.onmessage = ({ data }) => {
        const info = JSON.parse(data);
        if (info.action === 'snapshot') {
          if (info?.data) {
            setPrice(info.data[0]?.last);
            setPercent(Number(info.data[0]?.chgUTC).toFixed(3));
          }
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
  return (
    <ShowData price={price} percent={percent} />
  );
};

export default BitgetSocketPrice;
