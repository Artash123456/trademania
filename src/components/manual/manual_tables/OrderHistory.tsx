import { useEffect, useState, FC } from 'react';
import { fetchOrderHistory } from 'redux/actions/trading_actions';
import { OrderHistoryTable } from 'components';
import { useAppDispatch, useAppSelector } from 'context';
import { MarketAsProps } from 'types';

const OrderHistory: FC<MarketAsProps> = ({ market }) => {
  const dispatch = useAppDispatch();
  const { symbol, orderHistoryTbody, refresh } = useAppSelector(
    ({ manual }) => ({
      symbol: manual.symbol,
      orderHistoryTbody: manual.table.orderHistoryTbody,
      refresh: manual.refresh,
    })
  );

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    if (market.id && symbol.value) {
      dispatch(
        fetchOrderHistory({
          market: market.id,
          symbol: symbol.value,
          currency: symbol.base,
          quote: symbol.quote,
          is_spot: 0,
        })
      ).then(() => {
        if (mounted) {
          setLoading(false);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, market.id, symbol.value, refresh, symbol.base, symbol.quote]);
  return (
    <OrderHistoryTable
      orderHistoryTbody={orderHistoryTbody}
      loading={loading}
      pair={symbol?.value}
    />
  );
};
export default OrderHistory;
