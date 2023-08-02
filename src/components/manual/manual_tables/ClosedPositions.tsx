import { useEffect, useState, FC } from 'react';
import { fetchClosedPositions } from 'redux/actions/trading_actions';
import { ClosePositionTable } from 'components';
import { useAppDispatch, useAppSelector } from 'context';
import { MarketAsProps } from 'types';

const ClosedPositions: FC<MarketAsProps> = ({ market }) => {
  const dispatch = useAppDispatch();
  const { symbol, closedTbody, refresh } = useAppSelector(({ manual }) => ({
    symbol: manual.symbol,
    closedTbody: manual.table.closedTbody,
    refresh: manual.refresh,
  }));
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    if (market.id) {
      dispatch(
        fetchClosedPositions({
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
  }, [dispatch, market.id, symbol.value, refresh]);
  return <ClosePositionTable closedTbody={closedTbody} loading={loading} />;
};
export default ClosedPositions;
