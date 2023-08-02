import { OrdersLoading } from 'components';
import { FC, useEffect, useState } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import styled from 'styled-components';
import { OrderBookType } from 'types';
const Orders: FC<{
  market: string;
  symbol: string;
}> = ({ market, symbol }) => {
  const [result, setResult] = useState<OrderBookType[]>([]);
  useEffect(() => {
    let ws: WebSocket;
    if (market === 'bybit' || market === 'binance') {
      let req_id = 1;
      ws = new WebSocket('wss://stream.bybit.com/contract/inverse/public/v3');
      let arr: OrderBookType[] = [];
      let newArray: OrderBookType[] = [];
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            op: 'subscribe',
            args: [`publicTrade.${symbol}`],
            req_id,
          })
        );
      };
      ws.onmessage = ({ data }) => {
        ++req_id;
        const info = JSON.parse(data);
        arr.push({
          price: info.data?.[0]?.p,
          quantity: Number(+info.data?.[0]?.v / +info.data?.[0]?.p).toFixed(8),
          sell: info.data?.[0]?.S === 'Sell',
        });
        newArray = arr.slice(-20);
        setResult(newArray);
      };
    }
    if (market === 'phemex') {
      let id = 1;
      ws = new WebSocket('wss://phemex.com/ws');
      let arr: OrderBookType[] = [];
      let newArray: OrderBookType[] = [];
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            id,
            method: 'trade.subscribe',
            params: [symbol],
          })
        );
      };
      ws.onmessage = ({ data }) => {
        ++id;
        const info = JSON.parse(data);
        const trades = info.trades?.[0];
        arr.push({
          price: trades?.[2] / 10000,
          quantity: Number(+trades?.[3] / (+trades?.[2] / 10000)).toFixed(4),
          sell: trades?.[1] === 'Sell',
        });
        newArray = arr.slice(-20);
        setResult(newArray);
      };
    }
    if (market === 'kraken') {
      ws = new WebSocket('wss://ws.kraken.com');
      let arr: OrderBookType[] = [];
      let newArray: OrderBookType[] = [];
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            event: 'subscribe',
            pair: [symbol],
            subscription: {
              name: 'trade',
            },
          })
        );
      };
      ws.onmessage = ({ data }) => {
        const info = JSON.parse(data);
        if (info.length) {
          const trades = info[1][0];
          arr.push({
            price: parseFloat(trades[0]),
            quantity: parseFloat(trades[1]),
            sell: trades?.[3] === 's',
          });
          newArray = arr.slice(-20);
          setResult(newArray);
        }
      };
    }
    if (market === 'bitget') {
      ws = new WebSocket('wss://ws.bitget.com/mix/v1/stream');
      let arr: OrderBookType[] = [];
      let newArray: OrderBookType[] = [];
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            op: 'subscribe',
            args: [
              {
                instType: 'mc',
                channel: 'trade',
                instId: symbol.split('_')[0],
              },
            ],
          })
        );
      };
      ws.onmessage = ({ data }) => {
        const info = JSON.parse(data);
        if (info.data.length) {
          const trades = info.data[0];
          arr.push({
            price: parseFloat(trades[1]),
            quantity: parseFloat(trades[2]),
            sell: trades?.[3] === 'sell',
          });
          newArray = arr.slice(-20);
          setResult(newArray);
        }
      };
    }
    if (market === 'okx') {
      ws = new WebSocket('wss://ws.okx.com:8443/ws/v5/public');
      let arr: OrderBookType[] = [];
      let newArray: OrderBookType[] = [];
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            op: 'subscribe',
            args: [{ channel: 'trades', instId: symbol }],
          })
        );
      };
      ws.onmessage = ({ data }) => {
        const info = JSON.parse(data);
        if (info.data.length) {
          const trades = info.data[0];
          arr.push({
            price: parseFloat(trades.px),
            quantity: parseFloat(trades.sz),
            sell: trades?.side === 'sell',
          });
          newArray = arr.slice(-20);
          setResult(newArray);
        }
      };
    }
    if (market === 'bitmex') {
      ws = new WebSocket('wss://ws.bitmex.com/realtime');
      let arr: OrderBookType[] = [];
      let newArray: OrderBookType[] = [];
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            op: 'subscribe',
            args: [`trade:${symbol}`],
          })
        );
      };
      ws.onmessage = ({ data }) => {
        const info = JSON.parse(data);
        if (info.data.length) {
          const trades = info.data[0];
          arr.push({
            price: parseFloat(trades.price),
            quantity: Number(trades.size / +trades.price).toFixed(8),
            sell: trades?.side === 'Sell',
          });
          newArray = arr.slice(-20);
          setResult(newArray);
        }
      };
    }

    return () => {
      if (ws) ws.close();
    };
  }, [symbol, market]);

  return (
    <StyledOrders className="recent-trades">
      {result.length ? <ShowRow orders={result} /> : <OrdersLoading />}
    </StyledOrders>
  );
};

const ShowRow: FC<{ orders: OrderBookType[] }> = ({ orders }) => {
  return (
    <>
      <StyledRow head>
        <span>Price</span>
        <span>Quantity</span>
        <AiOutlineArrowUp />
      </StyledRow>
      {orders.map((item, index) => {
        if (!item.price || !item.quantity) return <></>;
        return (
          <StyledRow sell={item.sell} key={index}>
            <span>{item.price}</span>
            <span>{item.quantity}</span>
            <AiOutlineArrowUp />
          </StyledRow>
        );
      })}
    </>
  );
};
const StyledOrders = styled.div`
  max-width: 300px;
`;
const StyledRow = styled.div<{ sell?: boolean; head?: boolean }>`
  background-color: ${({ sell, theme, head }) =>
    head ? theme.dark_input : sell ? '#e031314d' : '#18D6904d'};
  border: 1px solid
    ${({ sell, theme, head }) =>
      head ? theme.font_gray : sell ? '#e03131' : '#18D690'};
  border-radius: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 2px 16px;
  > span,
  svg {
    font-size: 16px;
    color: ${({ sell, theme, head }) =>
      head ? theme.font_gray : sell ? '#e03131' : '#18D690'};
  }
  svg {
    justify-self: flex-end;
    transform: rotate(${({ sell }) => (sell ? '180' : '0')}deg);
  }
`;
export default Orders;
