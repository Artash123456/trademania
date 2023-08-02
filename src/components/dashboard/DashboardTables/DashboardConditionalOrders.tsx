import { FC, useEffect, useState } from 'react';
import { fetchConditionalOrders } from 'redux/actions/trading_actions';
import { ConditionalOrderTable } from 'components';
import { DashboardTableProps } from 'types';
import { useAppDispatch } from 'context';

const DashboardConditionalOrders: FC<DashboardTableProps> = ({
  market_id,
  has_credential,
  refresh,
  is_spot,
  pair,
}) => {
  const dispatch = useAppDispatch();

  const [conditionalTbody, setConditionalTbody] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (market_id && has_credential) {
      dispatch(
        fetchConditionalOrders({
          market: market_id,
          is_spot,
        })
      ).then(({ payload }) => {
        if (mounted) {
          setLoading(false);
          setConditionalTbody(payload);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, market_id, has_credential, is_spot, refresh]);

  return (
    <ConditionalOrderTable
      loading={loading}
      conditionalTbody={conditionalTbody}
      dashboard={true}
    />
  );
};

export default DashboardConditionalOrders;
