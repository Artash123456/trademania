import { useEffect, useState } from 'react';
import { fetchCopyActiveOrders } from 'redux/actions/copy_actions';
import { ActiveOrdersData, DashboardElement } from 'types';
import { OrderHistoryTable } from 'components';
import { useAppDispatch, useAppSelector } from 'context';

const CopyActiveOrders = () => {
  const { view_trader_positions } = useAppSelector(({ copy }) => copy);
  const dispatch = useAppDispatch();
  const { isDemo } = useAppSelector(({ markets }) => markets);
  const { copy_table_loading } = useAppSelector(({ loading }) => loading);
  const [activeTbody, setActiveTbody] = useState<ActiveOrdersData[]>([]);

  useEffect(() => {
    dispatch(
      fetchCopyActiveOrders({
        trade_id: view_trader_positions?.open_trader?.user_id,
        my_markets: Object.keys(
          view_trader_positions?.open_trader.market_pairs
        ).join(','),
        date: view_trader_positions?.created_at,
        isDemo,
      })
    ).then(({ payload }) => {
      const data = payload.actives
        .map((item: { actives: DashboardElement }) => item)
        .flat();
      setActiveTbody(data);
    });
  }, [
    dispatch,
    view_trader_positions?.open_trader?.user_id,
    view_trader_positions?.open_trader?.market_pairs,
    view_trader_positions?.created_at,
    isDemo,
  ]);

  return (
    <OrderHistoryTable
      orderHistoryTbody={activeTbody}
      loading={copy_table_loading}
    />
  );
};

export default CopyActiveOrders;
