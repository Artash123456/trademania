export const wss = new Map();
wss.set('phemex', {
  url: import.meta.env.VITE_PHEMEX_WSS_URL,
  event(symbol: string) {
    return symbol?.endsWith('USDT') ? 'tick_p.subscribe' : 'tick.subscribe';
  },
});
wss.set('bybit', {
  url: import.meta.env.VITE_BYBIT_WSS_URL,
  url_linear: import.meta.env.VITE_BYBIT_WSS_URL_PUBLIC,
  event: function (symbol: string): string {
    return `{"op": "subscribe", "args": ["instrument_info.100ms.${symbol}"]}`;
  },
});
wss.set('binance', {
  url: function (symbol: string): string {
    return `${
      import.meta.env.VITE_BINANCE_WSS_URL
    }?streams=${symbol?.toLowerCase()}@markPrice`;
  },
});
wss.set('okx', {
  url: 'wss://ws.okx.com:8443/ws/v5/public',
});
wss.set('bitget', {
  url: import.meta.env.VITE_BITGET_WSS_URL,
  event(symbol: string) {
    return `{
        op: 'subscribe',
        args: [
          {
            instType: 'mc',
            channel: 'ticker',
            instId: ${symbol.split('_')[0]},
          },
        ],
      }`;
  },
});
wss.set('kraken', {
  url: import.meta.env.VITE_KRAKEN_WSS_URL,
  event(symbol: string) {
    return `{
        event: 'subscribe',
        pair: ${symbol},
        subscription: {
            name: 'ticker'
        }
      }`;
  },
});
wss.set('demo', {
  url: function (symbol: string) {
    return `${
      import.meta.env.VITE_BINANCE_WSS_URL
    }?streams=${symbol?.toLowerCase()}@markPrice`;
  },
});
