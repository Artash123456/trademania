let price = 0,
  percent = '',
  id = 1;
export const PhemexSocketPrice = (symbol: string) => {
  if (!import.meta.env.VITE_PHEMEX_WSS_URL) return { price, percent };
  const ws = new WebSocket(import.meta.env.VITE_PHEMEX_WSS_URL);
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
      price = info?.kline[0][6] / 10000;
      percent = Number(
        (info?.kline[0][2] / 10000 / (info?.kline[0][6] / 10000)) * 100 - 100
      )?.toFixed(2);
    }
  };
  ws.onclose = (e) => {
    ++id;
    ws.close();
  };

  return { price, percent };
};
