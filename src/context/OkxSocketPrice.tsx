let price = 0;

export const OkxSocketPrice = (symbol: string) => {
  if (!symbol) return { price };
  const ws = new WebSocket('wss://ws.okx.com:8443/ws/v5/public');
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
    if (info) {
      if (info.data?.[0]) {
        price = parseFloat(info.data[0].last);
      }
    }
  };
  ws.onclose = (e) => {
    ws.close();
  };

  return { price };
};
