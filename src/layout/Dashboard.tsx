import { useEffect } from 'react';
import { getDashboardWidgets } from 'redux/actions/dashboard_actions';
import {
  DashboardContainer,
  Modal,
  DashboardAddItems,
  EditWidgetsButtons,
} from 'components';
import { openModal } from 'redux/actions/other_actions';
import styled from 'styled-components';
import { cancelChanges, setToEditable } from 'redux/reducers/dashboard';
import { useAppDispatch, useAppSelector } from 'context';
const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { items_to_add, dashboard_items } = useAppSelector(
    ({ dashboard, modal }) => ({
      items_to_add: dashboard.items_to_add,
      dashboard_items: modal.types.dashboard_items,
    })
  );
  useEffect(() => {
    dispatch(getDashboardWidgets()).then(() =>
      setTimeout(() => dispatch(cancelChanges()))
    );
    return () => {
      dispatch(setToEditable(false));
    };
  }, [dispatch]);
  return (
    <>
      <StyledDashboard className="container">
        <h1>
          DASHBOARD <EditWidgetsButtons />
        </h1>

        {items_to_add?.length ? (
          <Modal
            open={dashboard_items}
            onClose={() => dispatch(openModal('dashboard_items'))}
            with_close_icon="dashboard_items"
          >
            <DashboardAddItems />
          </Modal>
        ) : (
          <></>
        )}
      </StyledDashboard>
      {!dashboard_items || !items_to_add?.length ? <DashboardContainer /> : ''}
    </>
  );
};
const StyledDashboard = styled.section`
  width: 100%;
  overflow: auto;
  padding-bottom: 0;
  h1 {
    margin-bottom: 0;
  }
`;
export default Dashboard;
