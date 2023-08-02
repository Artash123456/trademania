import { Table } from 'components';
import { useEffect } from 'react';
import { createRequestBody } from 'redux/reducers/admin';
import Avatar from 'react-avatar';
import picture from 'assets/images/profile_picture.jpg';
import { fetchAdminPositions } from 'redux/actions/admin_actions';
import { DateC, useAppDispatch, useAppSelector } from 'context';

const AdminPositions = () => {
  const dispatch = useAppDispatch();
  const { data, total, per_page, current_page, last_page } = useAppSelector(
    ({ admin }) => admin.positions
  );
  const { request_body } = useAppSelector(({ admin }) => admin);
  const handleChangePage = (page: number) => {
    dispatch(
      fetchAdminPositions({
        page,
        values: JSON.parse(request_body),
      })
    );
  };
  useEffect(() => {
    dispatch(createRequestBody('positions'));
    dispatch(
      fetchAdminPositions({ page: 1, values: JSON.parse(request_body) })
    );
  }, [dispatch, request_body]);
  return (
    <Table
      currentPage={current_page || last_page || 1}
      onChangePage={handleChangePage}
      columns={[
        {
          name: 'Name',
          selector: (item) => (
            <>
              <Avatar
                size={'30'}
                src={
                  item.picture
                    ? import.meta.env.VITE_BASE_URL +
                      '/' +
                      item.picture.toString()
                    : picture
                }
              />{' '}
              {item?.user?.first_name ? item?.user?.first_name : ''}{' '}
              {item?.user?.last_name ? item?.user?.last_name : ''}
              {!item?.user?.last_name && !item?.user?.first_name ? 'N/A' : ''}
            </>
          ),
        },
        {
          name: 'Email',
          selector: (item) => item?.user?.email,
        },
        {
          name: 'Market',
          selector: (item) => (
            <div className="flac">
              <img
                src={import.meta.env.VITE_BASE_URL + item?.market?.icon}
                alt="sd"
                width="23px"
              />
              <span style={{ marginLeft: '5px' }}>{item.market.name}</span>
            </div>
          ),
        },
        {
          name: 'Symbol',
          selector: (item) => item?.symbol?.value,
        },
        {
          name: 'Realized PNL',
          selector: (item) => item?.realize_pnl?.toFixed(2),
        },
        {
          name: 'Unrealized PNL',
          selector: (item) => item?.unrealize_pnl?.toFixed(2),
        },
        {
          name: 'Size',
          selector: (item) => item?.size,
        },
        {
          name: 'Entry Price',
          selector: (item) => item?.entry_price?.toFixed(2),
        },
        {
          name: 'Market Price',
          selector: (item) => item?.market_price?.toFixed(2),
        },
        {
          name: 'Updated Date',
          selector: (item) => DateC.DateDYMHM(item?.updated_at),
        },
      ]}
      paginationServer
      rows={data}
      pagination
      paginationPerPage={per_page}
      total={total}
    />
  );
};

export default AdminPositions;
