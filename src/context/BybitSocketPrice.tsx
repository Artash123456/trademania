let price = 0,
  percent = 0;
export const BybitSocketPrice = (symbol: string) => {
  if (!symbol) return { price, percent };
  const ws = new WebSocket('wss://stream.bybit.com/spot/quote/ws/v2');
  ws.onopen = function () {
    ws.send(
      JSON.stringify({
        topic: 'realtimes',
        event: 'sub',
        params: {
          symbol: symbol,
          binary: false,
        },
      })
    );
  };
  ws.onmessage = ({ data }) => {
    const info = JSON.parse(data);
    if (info?.data) {
      price = info.data.c;
      percent = info.data.m;
    }
  };
  ws.onclose = (e) => {
    ws.close();
  };

  return { price, percent };
};
