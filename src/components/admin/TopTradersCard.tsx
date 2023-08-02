import { Table } from 'components';
import { useAppDispatch, useAppSelector } from 'context';
import { useEffect } from 'react';
import { fetchTopTraders } from 'redux/actions/admin_actions';

const TopTradersCard = () => {
  const { top_traders, request_body } = useAppSelector(({ admin }) => admin);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTopTraders(JSON.parse(request_body)));
  }, [dispatch, request_body]);

  return (
    <Table
      title="Top Traders"
      columns={[
        {
          name: 'Name',
          selector: (item) => (item.first_name ? item.first_name : 'N/A'),
        },
        {
          name: 'Email',
          selector: (item) => item.email,
        },
        {
          name: 'Registered At',
          selector: (item) => new Date(item.created_at).toLocaleDateString(),
        },
        {
          name: 'Pnl avg (%)',
          selector: (item) =>
            `${Number(item.daily_pnl_avg_pnl_percent).toFixed(5)}%`,
        },
      ]}
      rows={top_traders}
    />
  );
};
export default TopTradersCard;
