import styled from 'styled-components';
import {
  Modal,
  CopyMyTraders,
  CopyFollowMainModal,
  CopyUserModal,
  CopyRateUserModal,
  CopyTables,
  RevenueCard,
  CopyAllTraders,
  CopyUnfollowTable,
  AddBalanceButton,
} from 'components';
import { openModal } from 'redux/actions/other_actions';
import { storeUserDataModal } from 'redux/reducers/copy';
import { useAppDispatch, useAppSelector } from 'context';

const CopyContainer = () => {
  const dispatch = useAppDispatch();
  const {
    copy_follow,
    copy_user_info,
    copy_rate_user,
    view_trader_positions,
    copy_unfollow_warning,
  } = useAppSelector(({ modal }) => modal.types);
  const { edit_follow_details, revenue, pnl } = useAppSelector(
    ({ copy }) => copy
  );
  return (
    <>
      <div className="container">
        <h1>
          Copy Trading{' '}
          {import.meta.env.VITE_DEPLOY_MODE === 'development' && (
            <AddBalanceButton />
          )}
        </h1>
        <StyledContainer>
          <RevenueCard
            heading="trader earnings"
            day_perc={pnl?.daily?.percent}
            month_perc={pnl?.monthly?.percent}
            year_perc={pnl?.annual?.percent}
            day_price={pnl?.daily?.sum}
            month_price={pnl?.monthly?.sum}
            year_price={pnl?.annual?.sum}
            no_trades={revenue?.count}
            capital={revenue?.investment}
            img_num={2}
          />
          <CopyMyTraders />
          <CopyAllTraders />
        </StyledContainer>
      </div>
      <Modal open={copy_follow} with_close_icon="copy_follow">
        <CopyFollowMainModal
          initialStep={edit_follow_details.initialStep}
          initialValues={edit_follow_details.initialValues}
        />
      </Modal>
      <Modal
        open={copy_unfollow_warning}
        onClose={() => dispatch(openModal('copy_unfollow_warning'))}
        with_close_icon="copy_unfollow_warning"
      >
        <CopyUnfollowTable />
      </Modal>
      <Modal
        open={copy_user_info}
        onClose={() => {
          dispatch(openModal('copy_user_info'));
          dispatch(storeUserDataModal({}));
        }}
        with_close_icon="copy_user_info"
      >
        <CopyUserModal />
      </Modal>
      <Modal
        open={copy_rate_user}
        onClose={() => dispatch(openModal('copy_rate_user'))}
        with_close_icon="copy_rate_user"
      >
        <CopyRateUserModal />
      </Modal>
      <Modal
        open={view_trader_positions}
        onClose={() => dispatch(openModal('view_trader_positions'))}
      >
        <CopyTables />
      </Modal>
    </>
  );
};

const StyledContainer = styled.div`
  display: grid;
  grid-gap: 32px;
`;

export default CopyContainer;
