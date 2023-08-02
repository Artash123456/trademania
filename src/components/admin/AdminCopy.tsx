import { useEffect, useState } from 'react';
import {
  getTraderFollowers,
  getAdminOpenTraders,
} from 'redux/actions/admin_actions';
import styled from 'styled-components';
import { CopyUserModal, Modal, Table } from 'components';
import { DateC, translation, useAppDispatch, useAppSelector } from 'context';
import { LineChart } from 'charts';
import { Rating } from 'react-simple-star-rating';
import { AiOutlineEye } from 'react-icons/ai';
import { openModal } from 'redux/actions/other_actions';
import { storeUserDataModal } from 'redux/reducers/copy';
import { createRequestBody } from 'redux/reducers/admin';
import { TraderFollowers } from 'types';

const AdminCopy = () => {
  const { open_traders, request_body } = useAppSelector(({ admin }) => admin);
  const { admin_show_trader_info, admin_followers } = useAppSelector(
    ({ modal }) => modal.types
  );
  const [followers, setFollowers] = useState<TraderFollowers[]>([]);

  const dispatch = useAppDispatch();
  const handleChangePage = (page: number) => {
    dispatch(
      getAdminOpenTraders({
        page,
        values: JSON.parse(request_body),
      })
    );
  };
  useEffect(() => {
    dispatch(createRequestBody('copy'));
    dispatch(
      getAdminOpenTraders({ page: 1, values: JSON.parse(request_body) })
    );
  }, [dispatch, request_body]);

  return (
    <>
      {' '}
      <Table
        currentPage={open_traders.current_page || open_traders.last_page || 1}
        onChangePage={handleChangePage}
        columns={[
          {
            name: translation('name'),
            selector: (elem) => (
              <div
                onClick={() => {
                  dispatch(openModal('admin_show_trader_info'));
                  dispatch(storeUserDataModal(elem));
                }}
              >
                <span>{elem?.open_trader.nickname}</span>
                <br />
                <span>{elem.base}</span>
              </div>
            ),
          },
          {
            name: translation('active_days'),
            selector: (elem) => elem.open_days,
          },
          {
            name: 'Followers',
            selector: (elem) => (
              <div className="svg-actions">
                <span> {elem.followers}</span>
                {elem.followers ? (
                  <AiOutlineEye
                    onClick={() =>
                      dispatch(getTraderFollowers({ id: elem.id })).then(
                        ({ payload }) => {
                          setFollowers(payload);
                          dispatch(openModal('admin_followers'));
                        }
                      )
                    }
                  />
                ) : (
                  ''
                )}
              </div>
            ),
          },
          {
            name: translation('performance'),
            selector: (elem) => (
              <LineChart
                data={elem.kline_week?.length ? elem.kline_week : undefined}
              />
            ),
          },
          {
            name: 'Created Date',
            selector: (elem) => DateC.DateDYMHM(elem?.created_at),
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
        ]}
        paginationServer
        pagination
        paginationPerPage={open_traders.per_page}
        total={open_traders.total}
        rows={open_traders.data}
      />
      <Modal
        open={admin_followers}
        onClose={() => {
          dispatch(openModal('admin_followers'));
          setFollowers([]);
        }}
        with_close_icon="admin_followers"
      >
        <StyledCopy>
          <Table
            columns={[
              {
                name: 'Name',
                selector: (elem) => elem?.subscriber?.first_name,
              },
              {
                name: 'Email',
                selector: (elem) => elem?.subscriber?.email,
              },
              {
                name: 'Days Following',
                selector: (elem) => DateC.CountDate(elem.created_at),
              },
              {
                name: 'Total Investment',
                selector: (elem) => elem.initial_investment,
              },
              {
                name: 'Amount Remains',
                selector: (elem) => elem.amount_remains,
              },
              {
                name: 'Per Trade Amount',
                selector: (elem) => elem.per_trade_amount,
              },
              {
                name: 'Created Date',
                selector: (elem) => DateC.DateMYD(elem?.created_at),
              },
            ]}
            rows={followers}
          />
        </StyledCopy>
      </Modal>
      <Modal
        onClose={() => dispatch(openModal('admin_show_trader_info'))}
        open={admin_show_trader_info}
        with_close_icon="admin_show_trader_info"
      >
        <CopyUserModal />
      </Modal>
    </>
  );
};
const StyledCopy = styled.div`
  background: ${({ theme }) => theme.background_color};
`;

export default AdminCopy;
