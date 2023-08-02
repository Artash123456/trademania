import { useEffect } from 'react';
import { LineChart } from 'charts';
import { Button, Table, Warning } from 'components';
import { copy, translation, useAppDispatch, useAppSelector } from 'context';
import { Rating } from 'react-simple-star-rating';
import { getOpenTraders } from 'redux/actions/copy_actions';
import { openModal } from 'redux/actions/other_actions';
import { storeUserDataModal } from 'redux/reducers/copy';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createAddress } from 'redux/actions/user_actions';

const CopyAllTraders = () => {
  const { copy_ratings } = useAppSelector(({ copy }) => copy);
  const { pending } = useAppSelector(({ loading }) => loading);
  const { balance, transaction_address } = useAppSelector(({ user }) => user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const has_credential = useAppSelector(({ markets }) =>
    markets.markets.find((item) => item.has_credential)
  );
  const { isDemo } = useAppSelector(({ markets }) => markets);
  useEffect(() => {
    dispatch(getOpenTraders({ isDemo }));
  }, [dispatch, isDemo]);
  return (
    <StyledAllTraders>
      <div className="head">{translation('all_traders')}</div>
      <Table
        progressPending={pending}
        columns={[
          {
            name: translation('name'),
            selector: (elem) => (
              <>
                <span>{elem?.open_trader.nickname}</span>
                <br />
                <span>{elem.base}</span>
              </>
            ),
          },
          {
            name: translation('total'),
            selector: (elem) => (
              <span className={Number(elem.pnl_total) < 0 ? 'pl' : 'min'}>
                {Number(elem.pnl_total).toFixed(2)}USD
                <br />
                {Number(elem.pnl_total_percent).toFixed(2)}%
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
            name: translation('active_days'),
            selector: (elem) => elem.open_days,
          },
          { name: 'Followers', selector: (elem) => elem.followers },
          {
            name: translation('performance'),
            selector: (elem) => (
              <LineChart
                data={elem.kline_week?.length ? elem.kline_week : undefined}
              />
            ),
          },
          {
            name: translation('follower_equity'),
            selector: (elem) => elem.followers_equity,
          },
          {
            name: translation('rating'),
            selector: (elem) => (
              <Rating
                fillColor="gold"
                ratingValue={elem.rate}
                size={25}
                iconsCount={5}
                readonly
              />
            ),
          },
          {
            name: '',
            selector: (elem) => (
              <Button.Add
                value="follow"
                className="unfollow fol"
                onClick={() => {
                  if (!has_credential) {
                    toast.warn(
                      <Warning
                        message="You didn't connect to any of marketplaces, to be able to copy traders you need to connect at least one marketplace"
                        onConfirm={() => navigate('/settings/api-connections')}
                        button_text="Add Now"
                      />
                    );
                  } else if (
                    import.meta.env.VITE_DEPLOY_MODE === 'development' &&
                    (!balance ||
                      balance <
                        Number(import.meta.env.VITE_ALLOWED_AMOUT_FOR_BOT_COPY))
                  ) {
                    toast.warn(
                      <Warning
                        message={`In order to follow  ${elem?.open_trader.nickname} trader you need to fill your balance`}
                        onConfirm={() => {
                          if (transaction_address) {
                            copy(transaction_address);
                          } else {
                            dispatch(createAddress());
                          }
                        }}
                        button_text={
                          transaction_address
                            ? 'Copy Address'
                            : 'Create Transaction Address'
                        }
                      />
                    );
                    return;
                  } else {
                    dispatch(openModal('copy_user_info'));
                    dispatch(storeUserDataModal(elem));
                  }
                }}
              />
            ),
          },
        ]}
        rows={copy_ratings}
        pagination
        paginationPerPage={8}
      />
    </StyledAllTraders>
  );
};
const StyledAllTraders = styled.div`
  background-color: ${({ theme }) => theme.background_color};
  overflow: hidden;
  flex-basis: calc(100% - 15px - 25%);
  padding: 2.4vmin;
`;
export default CopyAllTraders;
