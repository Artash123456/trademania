import { FC, useEffect, useState } from 'react';
import { fetchClosedPositions } from 'redux/actions/trading_actions';
import { ClosePositionTable } from 'components';
import {
  ClosedPositionData,
  DashboardTableProps,
  OpenPositionData,
} from 'types';
import { useAppDispatch } from 'context';

const DashboardClosedPositions: FC<DashboardTableProps> = ({
  market_id,
  has_credential,
  refresh,
  is_spot,
  pair,
}) => {
  const dispatch = useAppDispatch();
  const [closedTbody, setClosedTbody] = useState<ClosedPositionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (market_id && has_credential) {
      dispatch(fetchClosedPositions({ market: market_id, is_spot })).then(
        ({ payload }) => {
          if (mounted) {
            setLoading(false);
            setClosedTbody(payload);
          }
        }
      );
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, market_id, has_credential, is_spot, refresh]);
  return (
    <ClosePositionTable
      loading={loading}
      closedTbody={closedTbody}
      dashboard={true}
    />
  );
};

export default DashboardClosedPositions;
