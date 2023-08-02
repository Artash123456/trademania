import { PairTypes } from 'types';

let price = 0,
  id = 1;

export const BinaneSocketPrice = (symbol: PairTypes) => {
  if (!symbol) return { price };
  const ws = new WebSocket(
    `wss://${symbol.quote === 'USD' ? 'd' : 'f'}stream.binance.com/stream`
  );
  id++;
  ws.onopen = function () {
    const symb = symbol?.value?.toLowerCase();
    ws.send(
      JSON.stringify({
        method: 'SUBSCRIBE',
        params: [`${symb}@markPrice`],
        id: id,
      })
    );
  };
  ws.onmessage = ({ data }) => {
    const info = JSON.parse(data);
    if (info?.data) {
      if (symbol.quote === 'USD') {
        price = info.data.at(-1).p;
      } else price = info.data.p;
    }
  };
  ws.onclose = (e) => {
    ++id;
    ws.close();
  };

  return { price };
};
