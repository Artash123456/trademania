import { useEffect, useState } from 'react';
import { fetchCopyOpenPositions } from 'redux/actions/copy_actions';
import { CopyTradePositionsTable } from 'components';
import { useAppDispatch, useAppSelector } from 'context';

const CopyOpenPositions = () => {
  const { view_trader_positions } = useAppSelector(({ copy }) => copy);
  const { copy_table_loading } = useAppSelector(({ loading }) => loading);
  const { isDemo } = useAppSelector(({ markets })=>markets)
  const [copyTbody, setCopyTbody] = useState([]);
  const dispatch = useAppDispatch();
  const markets = Boolean(view_trader_positions?.open_trader?.my_markets)
    ? view_trader_positions?.open_trader?.my_markets.join(',')
    : '';
  useEffect(() => {
    dispatch(
      fetchCopyOpenPositions({
        trade_id: view_trader_positions?.open_trader?.user_id,
        markets,
        isDemo
      })
    ).then(({ payload }) => setCopyTbody(payload.positions));
  }, [dispatch, view_trader_positions?.open_trader?.user_id, markets, isDemo]);
  return (
    <CopyTradePositionsTable data={copyTbody} loading={copy_table_loading} />
  );
};

export default CopyOpenPositions;
