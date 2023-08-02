import { useEffect } from 'react';
import { getAllBots } from 'redux/actions/admin_actions';
import { Table } from 'components';
import {
  DateC,
  detectMarketById,
  useAppDispatch,
  useAppSelector,
} from 'context';
import { createRequestBody } from 'redux/reducers/admin';

const AdminBot = () => {
  const { bots, request_body } = useAppSelector(({ admin }) => admin);
  const dispatch = useAppDispatch();
  const handleChangePage = (page: number) => {
    dispatch(
      getAllBots({
        page,
        values: JSON.parse(request_body),
      })
    );
  };
  useEffect(() => {
    dispatch(createRequestBody('bots'));
    dispatch(getAllBots({ page: 1, values: JSON.parse(request_body) }));
  }, [dispatch, request_body]);
  return (
    <Table
      currentPage={bots.current_page || bots.last_page || 1}
      onChangePage={handleChangePage}
      columns={[
        { name: 'Bot Name', selector: (item) => item.bot.name_en },
        {
          name: 'User',
          selector: (item) => (
            <>
              {item.user.first_name ? item.user.first_name : ''}
              {item.user.last_name ? item.user.last_name : ''}
              {!item.user.last_name && !item.user.first_name ? 'N/A' : ''}
            </>
          ),
        },
        {
          name: 'Market',
          selector: (item) => (
            <div className="flac">
              <img
                src={detectMarketById(item.pair.market_id).img}
                alt={detectMarketById(item.pair.market_id).name}
                width="25px"
              />
              <span>{detectMarketById(item.pair.market_id).name}</span>
            </div>
          ),
        },
        { name: 'Symbol', selector: (item) => item.pair.value },
        { name: 'Investment', selector: (item) => item.amount },
        { name: 'Income', selector: (item) => '-' },
        {
          name: 'Create Date',
          selector: (item) => DateC.DateDYMHM(item?.created_at),
        },
      ]}
      paginationServer
      pagination
      paginationPerPage={bots.per_page}
      total={bots.total}
      rows={bots.data}
    />
  );
};

export default AdminBot;
