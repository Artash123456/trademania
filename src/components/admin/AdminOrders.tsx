import { Table } from 'components';
import { useEffect } from 'react';
import { createRequestBody, resetAffiliateUsers } from 'redux/reducers/admin';
import { retSource } from 'types';
import Avatar from 'react-avatar';
import picture from 'assets/images/profile_picture.jpg';
import {
  fetchUsersAffiliates,
  getAdminOrders,
} from 'redux/actions/admin_actions';
import { DateC, useAppDispatch, useAppSelector } from 'context';

const AdminOrders = () => {
  const dispatch = useAppDispatch();
  const { data, statistics, total, per_page, current_page, last_page } =
    useAppSelector(({ admin }) => admin.orders);
  const { request_body, filters } = useAppSelector(({ admin }) => admin);
  const handleChangePage = (page: number) => {
    dispatch(
      getAdminOrders({
        page,
        values: JSON.parse(request_body),
      })
    );
  };
  useEffect(() => {
    dispatch(createRequestBody('orders'));
    dispatch(getAdminOrders({ page: 1, values: JSON.parse(request_body) }));
  }, [dispatch, request_body]);
  useEffect(() => {
    dispatch(fetchUsersAffiliates({ page: filters.users_drop_down }));
    return () => {
      dispatch(resetAffiliateUsers());
    };
  }, [dispatch, filters.users_drop_down]);
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
          name: 'Order Type',
          selector: (item) => item?.order_type,
        },
        {
          name: 'Side',
          selector: (item) => item?.side,
        },
        {
          name: 'Quantity',
          selector: (item) => item?.quantity,
        },
        {
          name: 'Price',
          selector: (item) => item?.price,
        },
        {
          name: 'Source',
          selector: (item) => retSource(item.order_source),
        },
        {
          name: `Fee (${statistics?.total?.toFixed(5) || 0})`,
          selector: (item) => item?.system_fee || '-',
        },
        {
          name: `Income (${statistics?.income || 0})`,
          selector: (item) => item?.fee?.income || '-',
        },
        {
          name: `Outcome (${statistics?.outcome || 0})`,
          selector: (item) => item?.fee?.outcome || '-',
        },
        {
          name: 'Created Date',
          selector: (item) => DateC.DateDYMHM(item?.created_at),
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

export default AdminOrders;
