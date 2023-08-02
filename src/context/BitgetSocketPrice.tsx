import { PairTypes } from 'types';

let price = 0;

export const BitgetSocketPrice = (symbol: PairTypes) => {
  if (!symbol) return { price };
  const ws = new WebSocket('wss://ws.bitget.com/spot/v1/stream');
  ws.onopen = function () {
    const symb = symbol?.value.split('_')[0];
    ws.send(
      JSON.stringify({
        op: 'subscribe',
        args: [
          {
            instType: 'SP',
            channel: 'ticker',
            instId: symb,
          },
        ],
      })
    );
  };
  ws.onmessage = ({ data }) => {
    const info = JSON.parse(data);
    if (info?.data) {
      price = info.data[0]?.last;
    }
  };
  ws.onclose = (e) => {
    ws.close();
  };

  return { price };
};
