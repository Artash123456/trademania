import { useEffect, FC, useState } from 'react';
import { fetchFilled } from 'redux/actions/trading_actions';
import { FilledTable } from 'components';
import { useAppDispatch, useAppSelector } from 'context';
import { MarketAsProps } from 'types';
const Filled: FC<MarketAsProps> = ({ market }) => {
  const dispatch = useAppDispatch();
  const { symbol, filledTbody, refresh } = useAppSelector(({ manual }) => ({
    symbol: manual.symbol,
    filledTbody: manual.table.filledTbody,
    refresh: manual.refresh,
  }));

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    if (market.id && symbol.value) {
      dispatch(fetchFilled({ market: market.id, symbol: symbol.value })).then(
        () => {
          if (mounted) {
            setLoading(false);
          }
        }
      );
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, market.id, symbol.value, refresh]);
  return (
    <FilledTable
      filledTbody={filledTbody}
      market_id={market.id}
      loading={loading}
      pair={symbol?.value}
    />
  );
};
export default Filled;
