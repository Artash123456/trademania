import { Table } from 'components';
import { useEffect } from 'react';
import {
  getMyAffiliateOrdersAndEarnings,
  getMyAffiliates,
} from 'redux/actions/affiliate_actions';
import { createRequestBody } from 'redux/reducers/affiliate';
import { DateC, useAppDispatch, useAppSelector } from 'context';

const AffiliateOrdersAndEarnings = () => {
  const dispatch = useAppDispatch();
  const { last_page, data, total, per_page, current_page } = useAppSelector(
    ({ affiliate }) => affiliate.my_affiliate_orders
  );

  const { request_body } = useAppSelector(({ affiliate }) => affiliate);

  useEffect(() => {
    dispatch(
      getMyAffiliates({
        page: 1,
        values: { per_page_count: 5000 },
      })
    );
  }, [dispatch]);
  useEffect(() => {
    dispatch(createRequestBody('orders-earnings'));
    dispatch(
      getMyAffiliateOrdersAndEarnings({
        page: 1,
        values: JSON.parse(request_body),
      })
    );
  }, [dispatch, request_body]);
  const handleChangePage = (page: number) => {
    dispatch(
      getMyAffiliateOrdersAndEarnings({
        page,
      })
    );
  };
  return (
    <Table
      currentPage={current_page || last_page || 1}
      onChangePage={handleChangePage}
      columns={[
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
              <span>{item.market.name}</span>
            </div>
          ),
        },
        {
          name: 'Order Type',
          selector: (item) => `${item?.order_type} (${item?.market_type})`,
        },
        { name: 'Symbol', selector: (item) => item?.symbol?.value },
        { name: 'Side', selector: (item) => item?.side },
        { name: 'Quantity', selector: (item) => item?.quantity },
        { name: 'Price', selector: (item) => item?.price },
        {
          name: `Fee (${0})`,
          selector: (item) => (item?.fee ? item?.fee : '-'),
        },
        {
          name: `Affiliate Income (${0})`,
          selector: (item) =>
            item?.affiliate_income ? item?.affiliate_income : '-',
        },
        {
          name: 'Order Date',
          selector: (item) => DateC.DateDYMHM(item?.created_at),
        },
      ]}
      paginationServer
      pagination
      paginationPerPage={per_page}
      total={total}
      rows={data}
    />
  );
};

export default AffiliateOrdersAndEarnings;
