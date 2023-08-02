import { useLayoutEffect, useState, FC } from 'react';
import { fetchActivePositions } from 'redux/actions/trading_actions';
import { handleOpenLimitMarketModal } from 'redux/reducers/manual';
import { OpenPositionTable } from 'components';
import { useDispatch } from 'react-redux';
import { Dispatch, MarketAsProps, OpenPositionData } from 'types';
import { openModal } from 'redux/actions/other_actions';
import { useAppSelector } from 'context';
const OpenPositions: FC<MarketAsProps> = ({ market }) => {
  const dispatch: Dispatch = useDispatch();
  const { symbol, openTbody, refresh } = useAppSelector(({ manual }) => ({
    symbol: manual.symbol,
    openTbody: manual.table.openTbody,
    refresh: manual.refresh,
  }));

  const [loading, setLoading] = useState(true);
  useLayoutEffect(() => {
    let mounted = true;
    if (market.id && symbol.currency) {
      dispatch(
        fetchActivePositions({
          market: market.id,
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
  }, [dispatch, market.id, refresh]);

  return (
    <OpenPositionTable
      loading={loading}
      openTbody={openTbody}
      onLimitClick={(elem: OpenPositionData) => {
        dispatch(handleOpenLimitMarketModal({ data: elem, type: 'Limit' }));
        dispatch(openModal('manual_limit_market'));
      }}
      onMarketClick={(elem: OpenPositionData) => {
        dispatch(handleOpenLimitMarketModal({ data: elem, type: 'Market' }));
        dispatch(openModal('manual_limit_market'));
      }}
      market_id={market.id}
      manual={true}
    />
  );
};
export default OpenPositions;
