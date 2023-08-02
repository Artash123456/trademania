import { useEffect, useState, FC } from 'react';
import { fetchConditionalOrders } from 'redux/actions/trading_actions';
import { cancelOrder } from 'redux/actions/manual_actions';
import { ConditionalOrderTable } from 'components';
import { ConditionalOrderData, MarketAsProps } from 'types';
import { refreshTable } from 'redux/reducers/manual';
import { useAppDispatch, useAppSelector } from 'context';
const ConditionalOrders: FC<MarketAsProps> = ({ market }) => {
  const dispatch = useAppDispatch();
  const { symbolG, conditionalTbody, refresh } = useAppSelector(
    ({ manual }) => ({
      symbolG: manual.symbol,
      conditionalTbody: manual.table.conditionalTbody,
      refresh: manual.refresh,
    })
  );

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    if (market.id && symbolG.value) {
      dispatch(
        fetchConditionalOrders({
          market: market.id,
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
  }, [dispatch, market.id, symbolG.value, refresh]);
  return (
    <ConditionalOrderTable
      loading={loading}
      conditionalTbody={conditionalTbody}
      onCancelClick={({ symbol, order_no, plan_type }: ConditionalOrderData) =>
        dispatch(
          cancelOrder({
            symbol,
            order_no,
            market: market.id,
            plan_type,
            quote: symbolG.quote,
            currency: symbolG.base,
          })
        ).then(() => dispatch(refreshTable()))
      }
    />
  );
};
export default ConditionalOrders;
