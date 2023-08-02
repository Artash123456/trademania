import { useEffect } from 'react';
import { getUserBalance } from 'redux/actions/admin_actions';
import Avatar from 'react-avatar';
import picture from 'assets/images/profile_picture.jpg';
import { Table } from 'components';
import { createRequestBody } from 'redux/reducers/admin';
import { copy, useAppDispatch, useAppSelector } from 'context';

const AdminUserBalances = () => {
  const { data, total, per_page, current_page, last_page } = useAppSelector(
    ({ admin }) => admin.user_balance
  );
  const { request_body } = useAppSelector(({ admin }) => admin);
  const dispatch = useAppDispatch();
  const handleChangePage = (page: number) => {
    dispatch(
      getUserBalance({
        page,
        values: JSON.parse(request_body),
      })
    );
  };
  useEffect(() => {
    dispatch(createRequestBody('user-balance'));
    dispatch(getUserBalance({ page: 1, values: JSON.parse(request_body) }));
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
                {item.first_name ? item.first_name : 'N/A'}
              </>
            ),
          },
          {
            name: 'Email',
            selector: (item) => item.email,
          },
          {
            name: 'Address',
            selector: (item) => item.transaction_address?.address,
          },
          {
            name: 'Balance',
            selector: (item) => item.balance?.balance,
          },
          {
            name: 'Private key',
            selector: (item) => (
              <span
                onClick={() =>
                  copy(JSON.parse(item.transaction_address?.data).privateKey)
                }
              >
                {JSON.parse(item.transaction_address?.data).privateKey}
              </span>
            ),
          },
        ]}
        paginationServer
        rows={data}
        pagination
        paginationPerPage={per_page}
        total={total}
      />
      {/* <Modal
        open={admin_edit_user}
        onClose={() => dispatch(openModal('admin_edit_user'))}
        with_close_icon="admin_edit_user"
      >
      </Modal> */}
    </>
  );
};

export default AdminUserBalances;
