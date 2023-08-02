import { FC, useEffect, useState } from 'react';
import { FilledTable } from 'components';
import { fetchFilled } from 'redux/actions/trading_actions';
import { DashboardTableProps, FilledOrderData } from 'types';
import { useAppDispatch } from 'context';

const DashboardFilled: FC<DashboardTableProps> = ({
  market_id = 0,
  has_credential,
  refresh,
  is_spot,
  pair,
}) => {
  const dispatch = useAppDispatch();
  const [filledTbody, setFilledTbody] = useState<FilledOrderData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (market_id && has_credential && pair?.value) {
      const formData: FormData = new FormData();
      formData.append('market', market_id.toString());
      formData.append('symbol', pair.value);
      dispatch(
        fetchFilled({ market: market_id, symbol: pair.value, is_spot })
      ).then(({ payload }) => {
        if (mounted) {
          setLoading(false);
          setFilledTbody(payload);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [dispatch, market_id, pair.value, has_credential, is_spot, refresh]);
  return (
    <FilledTable
      filledTbody={filledTbody}
      market_id={market_id}
      loading={loading}
      pair={pair?.value}
    />
  );
};

export default DashboardFilled;
