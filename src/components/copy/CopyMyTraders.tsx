import { useEffect } from 'react';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { editMyTraderDetails, getMyTraders } from 'redux/actions/copy_actions';
import styled from 'styled-components';
import { Table, Warning } from 'components';
import { openModal } from 'redux/actions/other_actions';
import {
  saveTrader,
  storeUnfollowInformation,
  storeUserDataModal,
  viewTraderPositions,
} from 'redux/reducers/copy';
import {
  RiEdit2Line,
  RiListOrdered,
  RiStarSmileLine,
  RiUserUnfollowLine,
} from 'react-icons/ri';
import { toast } from 'react-toastify';

const CopyMyTraders = () => {
  const dispatch = useAppDispatch();
  const { pending } = useAppSelector(({ loading }) => loading);
  const { my_traders } = useAppSelector(({ copy }) => copy);
  const { isDemo } = useAppSelector(({ markets }) => markets);
  useEffect(() => {
    dispatch(getMyTraders({ isDemo }));
  }, [dispatch, isDemo]);
  return (
    <StyledMyTraders>
      <div className="head">{translation('my_traders')}</div>
      <Table
        columns={[
          {
            name: translation('name'),
            selector: (elem) => elem?.open_trader?.nickname,
          },
          {
            name: translation('total'),
            selector: (elem) => (
              <span className={Number(elem.pnl_total) < 0 ? 'pl' : 'min'}>
                {Number(elem.pnl_total).toFixed(2)}USD <br />(
                {Number(elem.pnl_total_percent).toFixed(2)}%)
              </span>
            ),
          },
          {
            name: translation('today'),
            selector: (elem) => (
              <span className={Number(elem.pnl_daily) < 0 ? 'pl' : 'min'}>
                {Number(elem.pnl_daily).toFixed(2)}USD
                <br /> ({Number(elem.pnl_daily_percent).toFixed(2)}%)
              </span>
            ),
          },
          {
            name: 'act. days',
            selector: (elem) => elem.open_days,
          },
          {
            name: 'inv. capital',
            selector: (elem) => elem.initial_investment,
          },
          {
            name: 'bal. remain',
            selector: (elem) => elem.amount_remains,
          },
          {
            name: '',
            selector: (elem) => (
              <div className="icons">
                <RiUserUnfollowLine
                  onClick={() => {
                    toast.warn(
                      <Warning
                        message="Are you sure you want to unfollow? If yes, please proceed to the next steps."
                        onConfirm={() => {
                          dispatch(openModal('copy_unfollow_warning'));
                          dispatch(storeUnfollowInformation(elem));
                        }}
                        button_text="Procced"
                      />
                    );
                  }}
                  title="Unfollow"
                />
                <RiEdit2Line
                  onClick={() => {
                    if (!pending) {
                      dispatch(storeUserDataModal(elem));
                      dispatch(editMyTraderDetails({ data: elem, step: 5 }));
                      dispatch(openModal('copy_follow'));
                    }
                  }}
                  title="Edit"
                />
                <RiListOrdered
                  onClick={() => {
                    dispatch(openModal('view_trader_positions'));
                    dispatch(
                      viewTraderPositions({
                        ...elem,
                        initial_investment: elem.initial_investment,
                        per_trade_amount: elem.per_trade_amount,
                      })
                    );
                  }}
                  title="Orders"
                />
                {elem.can_rate && (
                  <RiStarSmileLine
                    onClick={() => {
                      dispatch(openModal('copy_rate_user'));
                      dispatch(saveTrader(elem));
                    }}
                    title="Rate"
                  />
                )}
              </div>
            ),
          },
        ]}
        rows={my_traders}
      />
    </StyledMyTraders>
  );
};
const StyledMyTraders = styled.div`
  background-color: ${({ theme }) => theme.background_color};
  overflow: hidden;
  padding: 2.4vmin;
  .icons {
    display: flex;
    justify-content: center;
    > svg {
      font-size: 2rem;
      cursor: pointer;
      &:not(:last-child) {
        margin-right: 15px;
      }
      &:first-child {
        color: ${({ theme }) => theme.error_red};
      }
    }
  }
`;
export default CopyMyTraders;
