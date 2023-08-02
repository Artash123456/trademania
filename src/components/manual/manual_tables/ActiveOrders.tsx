import { useEffect, useState, FC } from 'react';
import { fetchActiveOrders } from 'redux/actions/trading_actions';
import { cancelOrder } from 'redux/actions/manual_actions';
import { ActiveOrderTable, Warning } from 'components';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'context';
import { MarketAsProps } from 'types';
const ActiveOrders: FC<MarketAsProps> = ({ market }) => {
  const dispatch = useAppDispatch();
  const { symbol, activeTbody, refresh } = useAppSelector(({ manual }) => ({
    symbol: manual.symbol,
    activeTbody: manual.table.activeTbody,
    refresh: manual.refresh,
  }));

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      if (market.id) {
        dispatch(
          fetchActiveOrders({
            market: market.id,
            is_spot: false,
          })
        );
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch, market.id, symbol.value, refresh]);
  return (
    <ActiveOrderTable
      loading={loading}
      activeTbody={activeTbody}
      onCancelClick={({
        symbol,
        order_no,
      }: {
        symbol: string;
        order_no: string;
      }) => {
        toast.warn(
          <Warning
            message="Are you sure you want to cancel this order?"
            onConfirm={() => {
              dispatch(cancelOrder({ symbol, order_no, market: market.id }));
            }}
          />,
          { autoClose: 15000 }
        );
      }}
    />
  );
};
export default ActiveOrders;
