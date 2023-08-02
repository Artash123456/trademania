import { PairTypes } from 'types';

let price = 0;

export const KrakenSocketPrice = (symbol: PairTypes) => {
  if (!symbol) return { price };
  const ws = new WebSocket('wss://ws.kraken.com');
  let krakenSymbol: string[] = [];
  if (symbol?.value.endsWith('USDT')) {
    krakenSymbol.push(symbol?.value?.split('USDT')[0] + '/USD');
  } else {
    krakenSymbol.push(symbol?.value?.split('USD')[0] + '/USD');
  }
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
        price = parseFloat(info[1].c[0]);
      }
    }
  };
  ws.onclose = (e) => {
    ws.close();
  };

  return { price };
};
