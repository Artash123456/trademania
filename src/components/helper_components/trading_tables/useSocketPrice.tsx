import { useEffect, useState, useMemo, useCallback } from 'react';
import { wss as wss_config } from 'configs/markets.wss.config';
import { useAppSelector } from 'context';
interface Elem {
  symbol: string;
  currency: string;
  side: string;
  entry_price: string | number;
  size: number;
  position_margin: string | number;
  contractSize?: string | number;
  realize_pnl: string | number;
  unrealize_pnl: string | number;
  leverage: string | number;
}

interface Props {
  elem: Elem;
  market_id: number | string;
}
const useSocketPrice = ({ elem, market_id }: Props) => {
  const { markets } = useAppSelector(({ markets }) => markets);
  const market = markets.find((item) => +item.id === +market_id)?.slug;
  const data = useMemo(() => {
    if (elem.symbol.endsWith('USDT')) {
      return '.' + elem?.symbol;
    } else {
      return '.' + elem?.symbol?.substring(0, elem?.symbol?.length - 3);
    }
  }, [elem.symbol]);
  const [state, setState] = useState<Record<string, number>>({});
  let id = 1;
  const initSocketConnection = useCallback(
    (close?: boolean) => {
      if (!market || !wss_config.get(market)) return;
      const ws = new WebSocket(
        market === 'binance' || market === 'demo'
          ? wss_config.get(market)?.url(elem.symbol)
          : market === 'bybit' && elem.symbol.includes('USDT')
          ? wss_config.get(market)?.url_linear
          : wss_config.get(market)?.url
      );
      if (close) ws.close();

      ws.onopen = function () {
        if (market === 'bybit' || market === 'bitget') {
          ws.send(wss_config.get(market)?.event(elem.symbol));
        }
        if (market === 'phemex') {
          ws.send(
            JSON.stringify({
              method: wss_config.get(market)?.event(elem.symbol),
              params: [data],
              id: id,
            })
          );
        }
        if (market === 'okx') {
          ws.send(
            JSON.stringify({
              op: 'subscribe',
              args: [
                {
                  channel: 'tickers',
                  instId: elem.symbol,
                },
              ],
            })
          );
        }
      };
      ws.onmessage = ({ data }) => {
        if (market === 'bybit') {
          let isUsd = false;
          if (JSON.parse(data)?.data?.update?.[0].symbol.includes('USDT'))
            isUsd = true;
          let check = JSON.parse(data)?.data?.update?.[0];
          (check?.mark_price || (isUsd && check?.last_price)) &&
            setState(JSON.parse(data)?.data?.update[0]);
        }
        if (market === 'binance') setState(JSON.parse(data)?.data);
        if (market === 'phemex') {
          if (elem.symbol.endsWith('USDT')) {
            setState(JSON.parse(data)?.tick_p);
          } else {
            setState(JSON.parse(data)?.tick);
          }
        }
        if (market === 'okx') setState(JSON.parse(data)?.data?.[0]);
      };
      ws.onclose = (e) => {
        ++id;
        ws.close();
        setTimeout(() => {
          initSocketConnection();
        }, 150000);
      };
      return;
    },
    [data, market, id, elem?.symbol]
  );
  useEffect(() => {
    let mounted = true;
    if (mounted) initSocketConnection();
    return () => {
      mounted = false;
      initSocketConnection(true);
    };
  }, [initSocketConnection, id]);

  const value = useMemo(() => {
    if (market === 'bybit') {
      if (elem?.symbol?.includes('USDT')) {
        return state?.last_price ? state?.last_price : 1;
      } else {
        return state?.mark_price ? state?.mark_price : 1;
      }
    }
    if (market === 'binance') return state?.p;
    if (market === 'phemex') {
      if (elem.currency === 'USDT') {
        return +state?.last;
      } else {
        return +state?.last / 10000;
      }
    }
    if (market === 'okx') return state?.last;
    return 1;
  }, [
    state?.last,
    state?.mark_price,
    state?.p,
    elem?.symbol,
    state?.last_price,
    market,
  ]);

  const countUnrealizePnl = useMemo(() => {
    if (market === 'bybit' || market === 'okx') {
      if (value !== 1) {
        if (elem?.currency !== 'USDT') {
          if (elem?.side === 'Buy') {
            return Number(
              +elem?.size * (1 / +elem?.entry_price - 1 / +value)
            )?.toFixed(6);
          } else {
            return Number(
              +elem?.size * (1 / +value - 1 / +elem?.entry_price)
            )?.toFixed(6);
          }
        } else {
          if (elem?.side === 'Buy') {
            return Number(
              (+elem?.size * (+value - +elem?.entry_price)) / +value
            )?.toFixed(6);
          } else {
            return Number(
              (+elem?.size * (+elem?.entry_price - +value)) / +value
            )?.toFixed(6);
          }
        }
      } else {
        return Number(0).toFixed(6);
      }
    }
    if (market === 'binance') {
      return Number(
        +elem?.size * (1 / +elem?.entry_price - 1 / +value) * +value
      )?.toFixed(6);
    }
    if (market === 'phemex') {
      if (elem?.currency === 'USDT') {
        return (
          ((Number(value) - Number(elem?.entry_price)) * Number(elem.size)) /
          +value
        );
      } else {
        return (
          ((Number(value) - Number(elem?.entry_price)) * Number(elem.size)) /
          +value /
          10000
        );
      }
    }
  }, [
    elem?.contractSize,
    elem?.entry_price,
    market,
    value,
    elem?.size,
    elem?.side,
    elem?.currency,
  ]);
  const countRealizePnl: string = useMemo(() => {
    if (market === 'bybit') {
      return elem?.currency === 'USDT'
        ? Number(Number(elem?.realize_pnl) / +value)?.toFixed(6)
        : Number(elem?.realize_pnl)?.toFixed(6);
    }
    if (market === 'binance') {
      return Number(elem?.realize_pnl)?.toFixed(6);
    }
    if (market === 'phemex') {
      return elem?.currency === 'USDT'
        ? Number(Number(elem?.realize_pnl) / +value)?.toFixed(6)
        : Number(elem?.realize_pnl)?.toFixed(6);
    }
    if (market === 'okx') {
      return Number(Number(elem?.realize_pnl) / +value)?.toFixed(6);
    }
    return '';
  }, [market, value, elem?.realize_pnl, elem?.currency]);
  const countMargin: string = useMemo(() => {
    if (market === 'bybit' || market === 'okx') {
      return elem?.currency === 'USDT'
        ? Number(Number(elem?.position_margin) / +value)?.toFixed(6)
        : Number(elem?.position_margin)?.toFixed(5);
    }
    if (market === 'binance') {
      return Number(elem?.position_margin)?.toFixed(5);
    }
    if (market === 'phemex') {
      return elem?.currency === 'USDT'
        ? Number(Number(elem?.position_margin) / +value)?.toFixed(6)
        : Number(elem?.position_margin)?.toFixed(5);
    }

    return '0';
  }, [market, value, elem?.currency, elem?.position_margin]);
  const val = (elem: Elem, type: string): string => {
    if (type === 'value') {
      if (value && countUnrealizePnl) {
        return (Number(countUnrealizePnl) * +value)?.toFixed(2);
      } else {
        return Number(elem?.unrealize_pnl)?.toFixed(2);
      }
    }
    if (type === 'percent') {
      if (elem?.position_margin !== 0) {
        return Number(
          (100 / Number(elem?.position_margin)) * Number(countUnrealizePnl)
        )?.toFixed(2);
      } else {
        return Number(
          (100 / (Number(elem?.size) * Number(elem?.entry_price))) *
            Number(countUnrealizePnl)
        )?.toFixed(2);
      }
    }
    return '0';
  };

  const realized_pnl_color = useMemo(() => {
    if (value && countRealizePnl && !isNaN(+value * Number(countRealizePnl))) {
      return +value * Number(countRealizePnl) < 0 ? '#e03131' : '#18D690';
    } else {
      return Number(elem?.realize_pnl) < 0 ? '#e03131' : '#18D690';
    }
  }, [value, countRealizePnl]);
  if (!wss_config || !markets.length || !market)
    return { position_margin: '', unrealized_pnl: '', realized_pnl: '' };
  return {
    position_margin: (
      <span>
        {value && countMargin
          ? (value * Number(countMargin))?.toFixed(4)
          : Number(elem?.position_margin)?.toFixed(4)}
        {elem?.symbol?.includes('USDT') ? 'USDT' : 'USD'}
        <br /> ({elem.leverage}X)
      </span>
    ),
    unrealized_pnl: (
      <span
        id={`unrealized_pnl_${market_id}_${elem.symbol}`}
        aria-valuetext={String(
          !isNaN(Number(val(elem, 'percent'))) ? val(elem, 'percent') : 0
        )}
        style={{ color: +val(elem, 'value') < 0 ? '#e03131' : '#18D690' }}
      >
        {val(elem, 'value')} {elem?.symbol?.includes('USDT') ? 'USDT' : 'USD'}
        <br />({!isNaN(Number(val(elem, 'percent'))) ? val(elem, 'percent') : 0}
        %)
      </span>
    ),
    realized_pnl: (
      <span
        style={{
          color: realized_pnl_color,
        }}
      >
        {value && countRealizePnl && !isNaN(+value * Number(countRealizePnl))
          ? (+value * Number(countRealizePnl))?.toFixed(2)
          : Number(elem?.realize_pnl)?.toFixed(2)}{' '}
        {elem?.symbol?.includes('USDT') ? 'USDT' : 'USD'}
      </span>
    ),
  };
};

export default useSocketPrice;
