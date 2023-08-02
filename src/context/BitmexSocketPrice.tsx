let price = 0,
  percent = 0;
export const BitmexSocketPrice = (symbol: string) => {
  if (!symbol) return { price, percent };

  const ws = new WebSocket('wss://ws.bitmex.com/realtime');
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
      price = info?.data?.[0]?.markPrice;
      percent = info?.data?.[0]?.lastChangePcnt;
    }
  };
  ws.onclose = (e) => {
    ws.close();
  };

  return { price, percent };
};
