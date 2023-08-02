import { FC, useState, useEffect } from 'react';
import ShowData from './ShowData';

const KrakenSocketPrice: FC<{ symbol: string }> = ({ symbol }) => {
  const [price, setPrice] = useState<string | number>('-');
  const [percent, setPercent] = useState<string | number>('-');

  let id = 1;
  useEffect(() => {
    let mounted = true;
    let krakenSymbol: string[] = [];
    if (symbol.endsWith('USDT')) {
      krakenSymbol.push(symbol.split('USDT')[0] + '/USD');
    } else {
      krakenSymbol.push(symbol.split('USD')[0] + '/USD');
    }
    const ws = new WebSocket('wss://ws.kraken.com');
    if (mounted) {
      ws.onopen = function () {
        ws.send(
          JSON.stringify({
            event: 'subscribe',
            pair: krakenSymbol,
            subscription: {
              name: 'ticker',
            },
          })
        );
      };
      ws.onmessage = ({ data }) => {
        const info = JSON.parse(data);
        if (info[0]) {
          if (info[1]) {
            setPrice(parseFloat(info[1].c[0]));
            setPercent(
              Number(100 - (info[1].o[1] / info[1].o[0]) * 100).toFixed(3)
            );
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
  return <ShowData price={price} percent={percent} />;
};

export default KrakenSocketPrice;
