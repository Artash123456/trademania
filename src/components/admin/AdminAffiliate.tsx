import { Table } from 'components';
import { useEffect } from 'react';
import { changeFilters, createRequestBody } from 'redux/reducers/admin';
import Avatar from 'react-avatar';
import picture from 'assets/images/profile_picture.jpg';
import { fetchAdminAffiliates } from 'redux/actions/admin_actions';
import { DateC, useAppDispatch, useAppSelector } from 'context';
import { useNavigate } from 'react-router-dom';

const AdminAffiliate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, current_page, per_page, total, last_page } = useAppSelector(
    ({ admin }) => admin.affiliates
  );
  const { request_body } = useAppSelector(({ admin }) => admin);
  const handleChangePage = (page: number) => {
    dispatch(
      fetchAdminAffiliates({
        page,
        values: JSON.parse(request_body),
      })
    );
  };
  useEffect(() => {
    dispatch(createRequestBody('affiliate'));
    dispatch(
      fetchAdminAffiliates({ page: 1, values: JSON.parse(request_body) })
    );
  }, [dispatch, request_body]);

  return (
    <>
      <Table
        currentPage={current_page || last_page || 1}
        onChangePage={handleChangePage}
        columns={[
          {
            name: 'Name',
            selector: (item) => (
              <div
                className="flac"
                onClick={() => {
                  dispatch(
                    changeFilters({
                      name: 'user',
                      value: { value: item.id, label: item.email },
                    })
                  );
                  dispatch(createRequestBody('orders'));
                  navigate('/admin/orders');
                }}
              >
                <Avatar
                  size={'30'}
                  src={
                    item.picture
                      ? import.meta.env.VITE_BASE_URL +
                        '/' +
                        item.picture.toString()
                      : picture
                  }
                />
                <span>
                  {item?.first_name ? item?.first_name : ''}{' '}
                  {item?.last_name ? item?.last_name : ''}
                  {!item?.last_name && !item?.first_name ? 'N/A' : ''}
                </span>
              </div>
            ),
          },
          { name: 'Email', selector: (item) => item?.email },
          {
            name: 'Fee',
            selector: (item) => (item?.system_fee ? item?.system_fee : 0),
          },
          {
            name: 'Income',
            selector: (item) =>
              item?.affiliate_income ? item?.affiliate_income : 0,
          },
          {
            name: 'Created Date',
            selector: (item) => DateC.DateDYMHM(item?.created_at),
          },
        ]}
        paginationServer
        pagination
        paginationPerPage={per_page}
        total={total}
        rows={data}
      />
    </>
  );
};

export default AdminAffiliate;
