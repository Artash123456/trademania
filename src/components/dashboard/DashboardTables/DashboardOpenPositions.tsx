import { FC, useEffect, useState } from 'react';
import { downloadPosition } from 'redux/reducers/styles';
import {
  fetchActivePositions,
  fetchAllActivePositions,
} from 'redux/actions/trading_actions';
import { DashboardTableProps, OpenPositionData } from 'types';
import { OpenPositionTable } from 'components';
import { useAppDispatch } from 'context';

const DashboardOpenPositions: FC<DashboardTableProps> = ({
  market_id,
  has_credential,
  refresh,
  is_all,
}) => {
  const dispatch = useAppDispatch();
  const [openTbody, setOpenTbody] = useState<OpenPositionData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    try {
      if (is_all) {
        dispatch(fetchAllActivePositions()).then(({ payload }) => {
          if (mounted) {
            setOpenTbody(payload?.positions);
          }
        });
      } else {
        if (market_id && has_credential) {
          dispatch(
            fetchActivePositions({
              market: market_id,
            })
          ).then(({ payload }) => {
            if (mounted) {
              setOpenTbody(payload?.positions);
            }
          });
        }
      }
    } finally {
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [dispatch, market_id, has_credential, refresh, is_all]);

  return (
    <OpenPositionTable
      loading={loading}
      openTbody={openTbody}
      market_id={market_id}
      is_all={is_all}
      onDownload={(elem: OpenPositionData) => {
        dispatch(downloadPosition(elem));
        setTimeout(() => dispatch(downloadPosition(null)), 50);
      }}
    />
  );
};

export default DashboardOpenPositions;
