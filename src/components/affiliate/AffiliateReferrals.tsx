import { Table } from 'components';
import { useEffect } from 'react';
import { getMyAffiliates } from 'redux/actions/affiliate_actions';
import { createRequestBody } from 'redux/reducers/affiliate';
import Avatar from 'react-avatar';
import picture from 'assets/images/profile_picture.jpg';
import { useAppSelector, useAppDispatch } from 'context';

const AffiliateReferrals = () => {
  const dispatch = useAppDispatch();
  const { last_page, data, total, per_page, current_page } = useAppSelector(
    ({ affiliate }) => affiliate.my_affiliates
  );
  const { request_body } = useAppSelector(({ affiliate }) => affiliate);
  useEffect(() => {
    dispatch(createRequestBody('referrals'));
    dispatch(
      getMyAffiliates({
        page: 1,
        values: JSON.parse(request_body),
      })
    );
  }, [dispatch, request_body]);
  const handleChangePage = (page: number) => {
    dispatch(getMyAffiliates({ page }));
  };
  return (
    <Table
      currentPage={current_page || last_page || 1}
      onChangePage={handleChangePage}
      columns={[
        {
          name: 'Email',
          selector: (item) => (
            <div className="flac">
              <Avatar
                size={'30'}
                src={
                  item.picture
                    ? import.meta.env.VITE_BASE_URL +
                      '/' +
                      item.picture.toString()
                    : picture
                }
                style={{ marginRight: '5px' }}
              />
              <span>{item.email}</span>
            </div>
          ),
        },
        {
          name: 'Registered Date',
          selector: (item) =>
            item.created_at
              ? new Date(item.created_at).toLocaleDateString()
              : '-',
        },
        {
          name: 'Affiliate Income',
          selector: (item) => item.affiliate_income || '-',
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

export default AffiliateReferrals;
