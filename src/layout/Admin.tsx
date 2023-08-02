import { useLocation } from 'react-router-dom';
import { AdminFilters, Modal } from 'components';
import { Outlet } from 'react-router';
import { openModal } from 'redux/actions/other_actions';
import EditUserModal from 'components/admin/EditUserModal';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useAppSelector } from 'context';
const Admin = () => {
  const { admin_create_user } = useAppSelector(({ modal }) => modal.types);
  const dispatch = useDispatch();
  const location = useLocation();
  const head = location.pathname.split('/').at(-1);
  return (
    <Container className="container">
      <h1>{head === 'copy' ? 'Open Traders' : head}</h1>
      <AdminFilters />
      <Outlet />
      <Modal
        open={admin_create_user}
        onClose={() => dispatch(openModal('admin_create_user'))}
        with_close_icon="admin_create_user"
      >
        <EditUserModal
          user={{ email: '', password: '', last_name: '', first_name: '' }}
          create
        />
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  > h1 {
    text-transform: capitalize;
  }
  .table {
    background-color: ${({ theme }) => theme.body_color};
    .rdt_TableCell {
      max-width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
`;

export default Admin;
