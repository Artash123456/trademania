import { FC, useEffect } from 'react';
import { cancelOrder, fetchSpotActiveOrders } from 'redux/actions/spot_actions';
import styled from 'styled-components';
import { translation, useAppDispatch, useAppSelector } from 'context';
import { BsArrowDownShort, BsArrowUpShort } from 'react-icons/bs';
import { Table, Warning } from 'components';
import { SpotMarket } from 'types';
import { MdCancel } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Scroll } from 'assets/styles';

interface Props {
  market?: SpotMarket;
  addItem?: boolean;
  loading?: boolean;
}

const SpotActiveOrders: FC<Props> = ({
  market = { name: '', id: 0 },
  addItem,
  loading,
}) => {
  const { active_orders, symbol } = useAppSelector(({ spot }) => spot);
  const { pending } = useAppSelector(({ loading }) => loading);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (market?.id && symbol.value && !addItem)
      dispatch(
        fetchSpotActiveOrders({ market: market.id, symbol: symbol.value })
      );
  }, [dispatch, market?.id, symbol.value, addItem]);
  return (
    <StyledActive>
      <div className="head">{translation('active_orders')}</div>
      <Scroll height="calc(100% - 20px)">
        {!addItem && (
          <Table
            progressPending={loading}
            columns={[
              {
                name: 'Coin',
                selector: (item) => (
                  <div className="flacjsb">
                    {' '}
                    {item.side?.toLowerCase() === 'sell' ? (
                      <BsArrowDownShort color="#CC2664" />
                    ) : (
                      <BsArrowUpShort color="#36D0C0" />
                    )}
                    <span>{item.displaySymbol}</span>
                  </div>
                ),
              },
              {
                name: translation('price'),
                selector: (item) => item.price,
              },
              {
                name: translation('total'),
                selector: (item) => (
                  <div className="flacjsb">
                    <span>
                      {item.market_id === 3 && item?.qtyType === 'ByBase'
                        ? item?.value?.toFixed(4) + ` ${item.currency}`
                        : item?.value?.toFixed(2) + ' USDT'}
                    </span>
                    <MdCancel
                      onClick={() => {
                        toast.warn(
                          <Warning
                            message="Are you sure you want to cancel this order?"
                            onConfirm={() => {
                              if (!pending)
                                dispatch(
                                  cancelOrder({
                                    market: market.id,
                                    symbol: item.symbol,
                                    order_no: item.order_no,
                                  })
                                );
                            }}
                          />
                        );
                      }}
                    />
                  </div>
                ),
              },
            ]}
            rows={active_orders}
          />
        )}
      </Scroll>
    </StyledActive>
  );
};

const StyledActive = styled.div`
  height: 100%;
  min-height: 130px;
  width: 100%;
  padding: 1.6vmin;
  .head {
    margin-bottom: 0;
  }
  svg {
    font-size: 2rem;
  }
  svg:last-child {
    cursor: pointer;
    margin-left: 1px;
    color: ${({ theme }) => theme.light_gray};
  }
`;
export default SpotActiveOrders;
