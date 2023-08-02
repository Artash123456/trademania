import { Styled, Table } from 'components';
import { copy, useAppDispatch, useAppSelector } from 'context';
import { BiCopy } from 'react-icons/bi';
import {
  createAddress,
  fetchTransactions,
  refreshTransactionBalance,
} from 'redux/actions/user_actions';
import { useEffect } from 'react';
import styled from 'styled-components';
import green2 from 'assets/images/pattern-card_green.svg';
import blue1 from 'assets/images/pattern-card_blue.svg';
import { AiOutlineReload } from 'react-icons/ai';
import { countDownRefreshBalance } from 'redux/reducers/user';
const Transactions = () => {
  const dispatch = useAppDispatch();
  const { transaction_address } = useAppSelector(({ user }) => user.data);
  const { data, total, per_page, current_page, last_page } = useAppSelector(
    ({ user }) => user.transactions
  );
  const { next_refresh_balance } = useAppSelector(({ user }) => user);
  const { balance } = useAppSelector(({ user }) => user.data);
  const { refresh_transaction_balance } = useAppSelector(
    ({ loading }) => loading
  );
  useEffect(() => {
    dispatch(fetchTransactions({ page: 1 }));
  }, [dispatch]);
  useEffect(() => {
    const interval = setInterval(
      () => dispatch(countDownRefreshBalance()),
      1000
    );
    if (next_refresh_balance <= 0) clearInterval(interval);
    return () => clearInterval(interval);
  }, [dispatch, next_refresh_balance]);
  const handleChangePage = (page: number) => {
    dispatch(fetchTransactions({ page }));
  };
  return (
    <Container className="container">
      <h1>Transactions</h1>
      <div className="flac">
        <Styled.Card
          onClick={() => {
            if (transaction_address) {
              copy(transaction_address);
            } else {
              dispatch(createAddress());
            }
          }}
          head={
            <div className="flacjsb">
              {transaction_address
                ? 'Copy your transaction address'
                : 'Create transaction address'}
              <span
                onClick={() => {
                  if (transaction_address) {
                    copy(transaction_address);
                  } else {
                    dispatch(createAddress());
                  }
                }}
              >
                {transaction_address ? '' : 'TOP UP'}
                {transaction_address ? (
                  <BiCopy color="#FFFFFF" size={50} />
                ) : (
                  ''
                )}
              </span>
            </div>
          }
          data={`Please do not worry, your transaction is updated every 30 minutes.`}
          white
          img={blue1}
        />
        <Styled.Card
          data="BALANCE"
          head={
            <div className="flacjsb">
              {balance}
              {next_refresh_balance ? (
                <h2 style={{ margin: 0 }}>
                  Next try in: {next_refresh_balance}s
                </h2>
              ) : (
                <AiOutlineReload
                  size={50}
                  onClick={() => {
                    if (!refresh_transaction_balance)
                      dispatch(refreshTransactionBalance()).then(
                        ({ payload }) => {
                          if (!payload || !payload.next)
                            setTimeout(
                              () => dispatch(fetchTransactions({ page: 1 })),
                              5000
                            );
                        }
                      );
                  }}
                />
              )}
            </div>
          }
          img={green2}
        />
      </div>
      <Table
        currentPage={current_page || last_page || 1}
        onChangePage={handleChangePage}
        columns={[
          { name: 'Amount', selector: (item) => item.amount },
          {
            name: 'Transaction ID',
            selector: (item) => <span>{item.transaction_id}</span>,
          },
          { name: 'Date', selector: (item) => item.transaction_time },
        ]}
        paginationServer
        pagination
        paginationPerPage={per_page}
        total={total}
        rows={data}
      />
    </Container>
  );
};
const Container = styled.div`
  > button {
    margin-bottom: 24px;
  }
  > div {
    background: ${({ theme }) => theme.background_color};
  }

  .flac {
    margin-bottom: 24px;
    gap: 24px;
    > div {
      flex: 1;
      span {
        text-decoration: underline;
        font-size: 1.6rem;
      }
    }
    svg {
      cursor: pointer;
    }
  }
`;
export default Transactions;
