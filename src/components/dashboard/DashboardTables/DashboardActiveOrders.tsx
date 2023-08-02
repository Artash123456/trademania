import { FC, useEffect, useState } from 'react';
import {
  fetchActiveOrders,
  fetchAllActiveOrders,
} from 'redux/actions/trading_actions';
import { ActiveOrderTable } from 'components';
import { ActiveOrdersData, DashboardTableProps } from 'types';
import { useAppDispatch } from 'context';

const DashboardActiveOrders: FC<DashboardTableProps> = ({
  market_id = 0,
  has_credential,
  refresh,
  is_spot,
  is_all,
}) => {
  const dispatch = useAppDispatch();
  const [activeTbody, setActiveTbody] = useState<ActiveOrdersData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    if (is_all) {
      dispatch(fetchAllActiveOrders({ is_spot })).then(({ payload }) => {
        if (mounted) {
          setLoading(false);
          setActiveTbody(payload);
        }
      });
    } else {
      if (market_id && has_credential) {
        dispatch(fetchActiveOrders({ market: market_id, is_spot })).then(
          ({ payload }) => {
            if (mounted) {
              setLoading(false);
              setActiveTbody(payload);
            }
          }
        );
      }
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, has_credential, market_id, refresh, is_spot, is_all]);
  return (
    <ActiveOrderTable
      loading={loading}
      activeTbody={activeTbody}
      dashboard={true}
      is_all={is_all}
      is_spot={Boolean(is_spot)}
    />
  );
};

export default DashboardActiveOrders;
