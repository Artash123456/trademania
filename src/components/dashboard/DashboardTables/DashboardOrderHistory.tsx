import { FC, useEffect, useState } from 'react';
import { fetchOrderHistory } from 'redux/actions/trading_actions';
import { OrderHistoryData } from 'types';
import { OrderHistoryTable } from 'components';
import { DashboardTableProps } from 'types';
import { useAppDispatch } from 'context';

const DashboardOrderHistory: FC<DashboardTableProps> = ({
  market_id,
  has_credential,
  refresh,
  pair,
  is_spot,
}) => {
  const dispatch = useAppDispatch();

  const [orderHistoryTbody, setOrderHistoryTbody] = useState<
    OrderHistoryData[]
  >([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    if (market_id && has_credential && pair?.value) {
      dispatch(
        fetchOrderHistory({
          market: market_id,
          symbol: pair.value,
          is_spot,
          currency: pair.base,
          quote: pair.quote,
        })
      ).then(({ payload }) => {
        if (mounted) {
          setLoading(false);
          setOrderHistoryTbody(payload);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [
    dispatch,
    market_id,
    has_credential,
    pair?.value,
    is_spot,
    refresh,
    pair.base,
    pair.quote,
  ]);

  return (
    <OrderHistoryTable
      orderHistoryTbody={orderHistoryTbody}
      loading={loading}
      pair={pair?.value}
    />
  );
};

export default DashboardOrderHistory;
