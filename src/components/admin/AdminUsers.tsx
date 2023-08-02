import { useEffect, useState } from 'react';
import {
  editUserData,
  getAllUsers,
  loginAsUser,
} from 'redux/actions/admin_actions';
import Avatar from 'react-avatar';
import picture from 'assets/images/profile_picture.jpg';
import { Button, Modal, Table, Warning } from 'components';
import { RiEdit2Line, RiUserUnfollowLine } from 'react-icons/ri';
import { MdSettingsBackupRestore, MdOutlineVerified } from 'react-icons/md';
import { openModal } from 'redux/actions/other_actions';
import EditUserModal from './EditUserModal';
import { createRequestBody } from 'redux/reducers/admin';
import { DateC, useAppDispatch, useAppSelector } from 'context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
  const { data, total, per_page, current_page, last_page } = useAppSelector(
    ({ admin }) => admin.users
  );
  const navigate = useNavigate();
  const { request_body, users } = useAppSelector(({ admin }) => admin);
  const admin_id = useAppSelector(({ user }) => user.data.id);
  const { admin_edit_user } = useAppSelector(({ modal }) => modal.types);

  const [user, setUser] = useState({});
  const { role } = useAppSelector(({ user }) => user?.data);
  const dispatch = useAppDispatch();
  const [refresh, setRefresh] = useState(0);
  const handleChangePage = (page: number) => {
    dispatch(
      getAllUsers({
        page,
        values: JSON.parse(request_body),
      })
    );
  };
  useEffect(() => {
    dispatch(createRequestBody('users'));
    dispatch(getAllUsers({ page: 1, values: JSON.parse(request_body) }));
  }, [dispatch, request_body, refresh]);
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
            name: 'Refer Bonus Rate',
            selector: (item) => item.refer_bonus_rate || '-',
          },
          {
            name: 'Referrer',
            selector: (item) => item.referrer?.email || '-',
          },
          {
            name: `Registered (${users.total})`,
            selector: (item) => DateC.DateDYMHM(item?.updated_at),
          },
          {
            name:
              JSON.parse(request_body)?.status === 'deleted' ? 'Deleted' : '',
            selector: (item) =>
              JSON.parse(request_body)?.status === 'deleted'
                ? DateC.DateDYMHM(item?.deleted_at)
                : '',
          },
          {
            name: role === 'super-admin' ? 'Action' : '',
            selector: (item) => (
              <>
                {' '}
                {role === 'super-admin' && (
                  <div className="svg-actions">
                    {item.deleted_at ? (
                      <MdSettingsBackupRestore
                        onClick={() => {
                          toast.warn(
                            <Warning
                              message="Do you really want to restore user"
                              onConfirm={() => {
                                dispatch(
                                  editUserData({
                                    values: { deleted_at: null },
                                    id: item.id + '',
                                    method: 'PUT',
                                  })
                                ).then(() => setRefresh((p) => ++p));
                              }}
                            />
                          );
                        }}
                        title="Restore"
                      />
                    ) : (
                      <RiUserUnfollowLine
                        onClick={() => {
                          toast.warn(
                            <Warning
                              message="Do you really want to delete user"
                              onConfirm={() => {
                                dispatch(
                                  editUserData({
                                    id: item.id + '',
                                    method: 'DELETE',
                                  })
                                ).then(() => setRefresh((p) => ++p));
                              }}
                            />
                          );
                        }}
                        title="Remove"
                        color="#a70000"
                      />
                    )}
                    <RiEdit2Line
                      onClick={() => {
                        setUser(item);
                        dispatch(openModal('admin_edit_user'));
                      }}
                      title="Edit"
                    />
                    {!item.email_verified_at && (
                      <MdOutlineVerified
                        color="#afd530"
                        title="Verify"
                        onClick={() => {
                          toast.warn(
                            <Warning
                              message="Do you really want to verify user"
                              onConfirm={() => {
                                dispatch(
                                  editUserData({
                                    values: {
                                      email_verified_at: new Date(),
                                    },
                                    id: item.id + '',
                                    method: 'PUT',
                                  })
                                ).then(() => setRefresh((p) => ++p));
                              }}
                            />
                          );
                        }}
                      />
                    )}
                  </div>
                )}
              </>
            ),
          },
          {
            name: '',
            selector: (item) => (
              <Button.Blue
                height="35px"
                onClick={() =>
                  dispatch(loginAsUser({ id: item.id, admin_id })).then(() =>
                    navigate('/')
                  )
                }
              >
                Log in
              </Button.Blue>
            ),
          },
        ]}
        paginationServer
        rows={data}
        pagination
        paginationPerPage={per_page}
        total={total}
      />
      <Modal
        open={admin_edit_user}
        onClose={() => dispatch(openModal('admin_edit_user'))}
        with_close_icon="admin_edit_user"
      >
        <EditUserModal user={user} />
      </Modal>
    </>
  );
};

export default AdminUsers;
